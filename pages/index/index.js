const { RESULTS } = require('../../utils/data')

Page({
  data: {
    homeBg: '/assets/kitchen/bg03.jpg',
    characters: [],
    featured: null
  },

  onLoad() {
    const characters = Object.keys(RESULTS).map((code) => ({
      code,
      name: RESULTS[code].name,
      image: RESULTS[code].image,
      kitchen: RESULTS[code].kitchen
    }))
    this.setData({
      characters,
      featured: characters[0] || null
    })
  },

  startTest() {
    wx.navigateTo({
      url: '/pages/test/test'
    })
  },

  goHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    })
  }
})
