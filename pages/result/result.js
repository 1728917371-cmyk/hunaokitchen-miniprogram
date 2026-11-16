const app = getApp()
const { RESULTS } = require('../../utils/data')
const { addHistory } = require('../../utils/history')

const POSTER_WIDTH = 750
const POSTER_HEIGHT = 1250

function wrapText(ctx, text, maxWidth) {
  const lines = []
  let current = ''
  for (let i = 0; i < text.length; i++) {
    const test = current + text[i]
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = text[i]
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

// cover 模式把图片铺满目标矩形（居中裁剪）
function coverFit(ctx, img, info, dx, dy, dw, dh) {
  const sw = (info && info.width) || img.width
  const sh = (info && info.height) || img.height
  if (!sw || !sh) return false
  const scale = Math.max(dw / sw, dh / sh)
  const cw = sw * scale
  const ch = sh * scale
  ctx.drawImage(img, dx + (dw - cw) / 2, dy + (dh - ch) / 2, cw, ch)
  return true
}

// contain 模式把图片等比缩入目标矩形（居中留白）
function containFit(ctx, img, info, dx, dy, dw, dh) {
  const sw = (info && info.width) || img.width
  const sh = (info && info.height) || img.height
  if (!sw || !sh) return false
  const scale = Math.min(dw / sw, dh / sh)
  const cw = sw * scale
  const ch = sh * scale
  ctx.drawImage(img, dx + (dw - cw) / 2, dy + (dh - ch) / 2, cw, ch)
  return true
}

Page({
  data: {
    result: null,
    dimensions: [],
    partnerResult: null,
    counterResult: null,
    hasResult: false
  },

  onLoad(options) {
    const code = options.code
    let result = RESULTS[code]
    let c = Number(options.c || 0)
    let p = Number(options.p || 0)
    let h = Number(options.h || 0)
    let s = Number(options.s || 0)
    if (!result && app.globalData.lastResult && app.globalData.lastResult.result) {
      const last = app.globalData.lastResult
      result = last.result
      c = last.leftScores.C
      p = last.leftScores.P
      h = last.leftScores.H
      s = last.leftScores.S
    }
    if (!result) {
      this.setData({ result: null, hasResult: false })
      return
    }

    const dimensions = [
      {
        name: "食材相性",
        leftLabel: "C 经典合规",
        rightLabel: "A 荒谬暴走",
        leftScore: c,
        rightScore: 4 - c,
        finalKey: c >= 2 ? "C" : "A"
      },
      {
        name: "制作工序",
        leftLabel: "P 精密强迫",
        rightLabel: "M 混沌随性",
        leftScore: p,
        rightScore: 4 - p,
        finalKey: p >= 2 ? "P" : "M"
      },
      {
        name: "风味倾向",
        leftLabel: "H 温和平衡",
        rightLabel: "E 极度重口",
        leftScore: h,
        rightScore: 4 - h,
        finalKey: h >= 2 ? "H" : "E"
      },
      {
        name: "动机诉求",
        leftLabel: "S 生存糊弄",
        rightLabel: "I 奇想仪式",
        leftScore: s,
        rightScore: 4 - s,
        finalKey: s >= 2 ? "S" : "I"
      }
    ]
    dimensions.forEach((d) => {
      d.barStyle = 'width:' + (d.leftScore / 4 * 100) + '%;'
    })

    this.setData({
      result,
      dimensions,
      partnerResult: RESULTS[result.partner] || null,
      counterResult: RESULTS[result.counter] || null,
      hasResult: true
    })

    // 记录历史（仅当是刚完成测试进入时记录，历史页回看不重复记）
    if (options.from === 'test') {
      addHistory({
        code: result.code,
        name: result.name,
        enName: result.enName,
        animal: result.animal,
        recipe: result.recipe,
        comment: result.comment,
        tags: result.tags,
        c,
        p,
        h,
        s,
        timestamp: Date.now()
      })
    }
  },

  restartTest() {
    wx.redirectTo({
      url: '/pages/test/test'
    })
  },

  backHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  goHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    })
  },

  onShareAppMessage() {
    const result = this.data.result || {}
    return {
      title: '我的料理人格是 ' + result.code + ' ' + result.name,
      path: '/pages/index/index',
      imageUrl: result.image
    }
  },

  // ===== 海报 =====
  createPoster() {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .in(this)
        .select('#posterCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          try {
            const canvas = res && res[0] && res[0].node
            if (!canvas) {
              reject(new Error('canvas not found'))
              return
            }
            const dpr = (wx.getWindowInfo ? wx.getWindowInfo().pixelRatio : 2) || 2
            const width = POSTER_WIDTH
            const height = POSTER_HEIGHT
            canvas.width = width * dpr
            canvas.height = height * dpr
            const ctx = canvas.getContext('2d')
            ctx.scale(dpr, dpr)
            // 兜底看门狗：双图加载，放宽到 10 秒，防止回调不触发一直“生成中”
            const watchdog = setTimeout(() => {
              reject(new Error('canvasToTempFilePath timeout'))
            }, 10000)
            this.drawPoster(ctx, canvas, width, height)
              .then(() => {
                wx.canvasToTempFilePath(
                  {
                    canvas,
                    success: (r) => {
                      clearTimeout(watchdog)
                      resolve(r.tempFilePath)
                    },
                    fail: (e) => {
                      clearTimeout(watchdog)
                      reject(e)
                    }
                  },
                  this
                )
              })
              .catch((e) => {
                clearTimeout(watchdog)
                reject(e)
              })
          } catch (e) {
            reject(e)
          }
        })
    })
  },

  drawPoster(ctx, canvas, w, h) {
    return new Promise((resolve) => {
      const result = this.data.result
      if (!result) {
        resolve()
        return
      }

      // 单张图片加载：成功回传 {img,info}，失败/超时回传 {}，绝不阻塞出图
      const loadOne = (src) =>
        new Promise((done) => {
          let img = null
          try {
            if (canvas && typeof canvas.createImage === 'function') {
              img = canvas.createImage()
            } else if (ctx && ctx.canvas && typeof ctx.canvas.createImage === 'function') {
              img = ctx.canvas.createImage()
            }
          } catch (e) {
            img = null
          }
          if (!img) {
            done({})
            return
          }
          let settled = false
          let timer = null
          const finish = (v) => {
            if (settled) return
            settled = true
            if (timer) clearTimeout(timer)
            done(v)
          }
          img.onload = () => {
            let n = 0
            const iv = setInterval(() => {
              n++
              if (img.width > 0 || n >= 10) {
                clearInterval(iv)
                finish({ img, info: { width: img.width, height: img.height } })
              }
            }, 100)
          }
          img.onerror = () => finish({})
          timer = setTimeout(() => finish({}), 5000)
          try {
            img.src = src
          } catch (e) {
            finish({})
          }
        })

      Promise.all([loadOne(result.kitchen), loadOne(result.image)])
        .then(([bg, char]) => {
          this.paintPoster(ctx, w, h, result, bg, char)
          resolve()
        })
        .catch(() => {
          resolve()
        })
    })
  },

  paintPoster(ctx, w, h, result, bg, char) {
    try {
      // 奶油兜底底色
      ctx.fillStyle = '#F8F1DF'
      ctx.fillRect(0, 0, w, h)

      // 全屏厨房背景（cover 铺满；失败则用暖色渐变兜底）
      let bgOk = false
      if (bg && bg.img) bgOk = coverFit(ctx, bg.img, bg.info, 0, 0, w, h)
      if (!bgOk) {
        const g = ctx.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, '#FBEED6')
        g.addColorStop(1, '#F3E2C4')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
      // 顶部轻压暗，保证品牌字可读
      const shade = ctx.createLinearGradient(0, 0, 0, 180)
      shade.addColorStop(0, 'rgba(154,91,37,0.32)')
      shade.addColorStop(1, 'rgba(154,91,37,0)')
      ctx.fillStyle = shade
      ctx.fillRect(0, 0, w, 180)

      // 顶部品牌小字
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(255,248,236,0.96)'
      ctx.font = '600 24px sans-serif'
      ctx.fillText('胡闹厨房 · 料理人格图鉴', w / 2, 58)

      // 高透明玻璃信息面板（透出厨房背景，蓝边贴纸感）
      roundRectPath(ctx, 45, 300, w - 90, 898, 36)
      ctx.fillStyle = 'rgba(255,253,246,0.56)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(240,211,168,0.78)'
      ctx.lineWidth = 2
      ctx.stroke()

      // 放大透明角色 + 蓝色柔光圆底
      const pxCX = w / 2
      const pxCY = 430
      const rr = 215
      ctx.beginPath()
      ctx.arc(pxCX, pxCY, rr, 0, Math.PI * 2)
      const halo = ctx.createRadialGradient(pxCX, pxCY - 24, 16, pxCX, pxCY, rr)
      halo.addColorStop(0, 'rgba(255,243,220,0.92)')
      halo.addColorStop(1, 'rgba(255,243,220,0)')
      ctx.fillStyle = halo
      ctx.fill()
      if (char && char.img) {
        containFit(ctx, char.img, char.info, pxCX - 220, pxCY - 220, 440, 440)
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'alphabetic'

      // 人格代码
      ctx.fillStyle = '#D97634'
      ctx.font = '800 62px sans-serif'
      ctx.fillText(result.code, w / 2, 668)

      // 中文名
      ctx.fillStyle = '#5C3E24'
      ctx.font = '800 42px sans-serif'
      ctx.fillText(result.name, w / 2, 724)

      // 英文名
      ctx.fillStyle = '#A98A63'
      ctx.font = '400 22px sans-serif'
      ctx.fillText(result.enName, w / 2, 764)

      // 角色描述（最多两行居中）
      ctx.fillStyle = '#6B4A2E'
      ctx.font = '400 24px sans-serif'
      const animalLines = wrapText(ctx, result.animal, 600).slice(0, 2)
      let ay = 800
      animalLines.forEach((line) => {
        ctx.fillText(line, w / 2, ay)
        ay += 30
      })

      // 分隔线
      const dy = ay + 8
      ctx.strokeStyle = 'rgba(181,106,46,0.22)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(64, dy)
      ctx.lineTo(w - 64, dy)
      ctx.stroke()

      // 评语（左对齐，最多 4 行）
      ctx.textAlign = 'left'
      ctx.fillStyle = '#6B4A2E'
      ctx.font = '400 27px sans-serif'
      let cy = dy + 42
      const commentLines = wrapText(ctx, result.comment, 622).slice(0, 4)
      commentLines.forEach((line) => {
        ctx.fillText(line, 64, cy)
        cy += 36
      })

      // 标签胶囊（自动换行）
      ctx.font = '700 24px sans-serif'
      let tx = 64
      let ty = cy + 26
      const chipH = 38
      ;(result.tags || []).slice(0, 4).forEach((t) => {
        const label = '#' + t
        const tw = ctx.measureText(label).width + 44
        if (tx + tw > w - 64) {
          tx = 64
          ty += chipH + 10
        }
        roundRectPath(ctx, tx, ty - 28, tw, chipH, 20)
        ctx.fillStyle = 'rgba(251,232,203,0.62)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(240,211,168,0.55)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = '#B56A2E'
        ctx.textAlign = 'center'
        ctx.fillText(label, tx + tw / 2, ty)
        ctx.textAlign = 'left'
        tx += tw + 14
      })

      // 拍档 / 克星
      let ry = ty + chipH + 18
      ctx.fillStyle = '#6B4A2E'
      ctx.font = '400 26px sans-serif'
      ctx.textAlign = 'left'
      const partner = this.data.partnerResult
      const counter = this.data.counterResult
      ctx.fillText('天生拍档：' + (partner ? partner.name : result.partner), 64, ry)
      ctx.fillText('厨房克星：' + (counter ? counter.name : result.counter), 64, ry + 34)

      // 底部玻璃引导条
      ctx.textAlign = 'center'
      roundRectPath(ctx, 180, 1208, 390, 40, 20)
      ctx.fillStyle = 'rgba(255,253,246,0.78)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(240,211,168,0.65)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = '#B56A2E'
      ctx.font = '700 24px sans-serif'
      ctx.fillText('长按识别小程序 · 测测厨房人格', w / 2, 1235)

      console.log('[海报] 绘制完成', result.code)
    } catch (e) {
      // 兜底：绘制异常时也保证输出一张奶油底海报，不阻塞保存/预览
      try {
        ctx.fillStyle = '#F8F1DF'
        ctx.fillRect(0, 0, w, h)
      } catch (e2) {
        // ignore
      }
    }
  },

  showPosterError(err) {
    const msg = (err && err.errMsg) || (err && err.message) || String(err)
    console.error('[poster error]', err)
    wx.hideLoading()
    wx.showModal({
      title: '海报生成失败',
      content: msg + '（请将此内容反馈）',
      showCancel: false
    })
  },

  savePoster() {
    wx.showLoading({ title: '生成中…' })
    this.createPoster()
      .then((tempFilePath) => {
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: () => {
            wx.showToast({ title: '已保存到相册', icon: 'success' })
          },
          fail: (err) => {
            const msg = err && err.errMsg ? err.errMsg : ''
            if (msg.indexOf('auth deny') > -1 || msg.indexOf('authorize') > -1) {
              wx.showModal({
                title: '需要相册权限',
                content: '请在设置中开启「保存到相册」权限，才能保存海报。',
                confirmText: '去设置',
                cancelText: '取消',
                success: (r) => {
                  if (r.confirm) {
                    wx.openSetting()
                  }
                }
              })
            } else {
              wx.showModal({
                title: '保存失败',
                content: '未能保存到相册，可预览海报后长按保存到手机。',
                confirmText: '预览海报',
                cancelText: '取消',
                success: (r) => {
                  if (r.confirm) {
                    this.previewPoster()
                  }
                }
              })
            }
          }
        })
      })
      .catch((err) => {
        this.showPosterError(err)
      })
  },

  previewPoster() {
    wx.showLoading({ title: '生成中…' })
    this.createPoster()
      .then((tempFilePath) => {
        wx.hideLoading()
        wx.previewImage({ urls: [tempFilePath], current: tempFilePath })
      })
      .catch((err) => {
        this.showPosterError(err)
      })
  }
})
