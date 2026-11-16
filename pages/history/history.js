const { getHistory, clearHistory, getStats } = require('../../utils/history')
const { RESULTS } = require('../../utils/data')

function formatTime(ts) {
  const d = new Date(ts)
  const pad = (n) => (n < 10 ? '0' + n : '' + n)
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  )
}

Page({
  data: {
    list: [],
    stats: { total: 0, topCode: null, topCount: 0 },
    topResult: null,
    empty: true
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const list = getHistory()
    const stats = getStats(list)
    const topResult = stats.topCode ? RESULTS[stats.topCode] || null : null
    const items = list.map((it) => ({
      code: it.code,
      image: (RESULTS[it.code] || {}).image || '',
      name: it.name,
      animal: it.animal,
      c: it.c,
      p: it.p,
      h: it.h,
      s: it.s,
      time: formatTime(it.timestamp)
    }))
    this.setData({
      list: items,
      stats,
      topResult,
      empty: items.length === 0
    })
  },

  viewResult(e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.list[index]
    if (!item) return
    wx.navigateTo({
      url:
        `/pages/result/result?code=${item.code}` +
        `&c=${item.c || 0}&p=${item.p || 0}&h=${item.h || 0}&s=${item.s || 0}`
    })
  },

  clearAll() {
    const self = this
    wx.showModal({
      title: '清空历史',
      content: '确定要清空全部测试历史记录吗？',
      confirmText: '清空',
      cancelText: '取消',
      success(r) {
        if (r.confirm) {
          clearHistory()
          self.loadData()
          wx.showToast({ title: '已清空', icon: 'none' })
        }
      }
    })
  },

  startTest() {
    wx.redirectTo({
      url: '/pages/test/test'
    })
  },

  backHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})
