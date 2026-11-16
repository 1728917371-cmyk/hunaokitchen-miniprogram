const KEY = 'kitchen_history'
const MAX = 30

function getHistory() {
  try {
    const list = wx.getStorageSync(KEY)
    return Array.isArray(list) ? list : []
  } catch (e) {
    return []
  }
}

function addHistory(entry) {
  const list = getHistory()
  // 去除完全相同的最近一次记录，避免重复跳转时重复记录
  if (list.length && list[0].timestamp === entry.timestamp) return
  list.unshift(entry)
  const trimmed = list.slice(0, MAX)
  try {
    wx.setStorageSync(KEY, trimmed)
  } catch (e) {
    // 存储失败不阻塞流程
  }
}

function clearHistory() {
  try {
    wx.removeStorageSync(KEY)
  } catch (e) {
    // ignore
  }
}

function getStats(list) {
  const source = list || getHistory()
  const total = source.length
  const freq = {}
  source.forEach((it) => {
    const code = it.code
    freq[code] = (freq[code] || 0) + 1
  })
  let topCode = null
  let topCount = 0
  Object.keys(freq).forEach((k) => {
    if (freq[k] > topCount) {
      topCode = k
      topCount = freq[k]
    }
  })
  return {
    total,
    topCode,
    topCount,
    freq
  }
}

module.exports = {
  getHistory,
  addHistory,
  clearHistory,
  getStats
}
