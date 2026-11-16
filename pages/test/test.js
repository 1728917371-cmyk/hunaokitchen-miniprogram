const app = getApp()
const { QUESTIONS, calcResult } = require('../../utils/data')

Page({
  data: {
    quizBg: '/assets/kitchen/bg09.jpg',
    questions: QUESTIONS,
    currentIndex: 0,
    answers: {},
    progress: 0
  },

  onLoad() {
    this.updateProgress()
  },

  updateProgress() {
    const { currentIndex, questions } = this.data
    const progress = Math.round(((currentIndex + 1) / questions.length) * 100)
    this.setData({ progress })
  },

  selectOption(e) {
    // 防连点锁：避免快速多次点击导致跳过题目或重复提交
    if (this._submitting) return
    const key = e.currentTarget.dataset.key
    const qid = e.currentTarget.dataset.qid
    const answers = Object.assign({}, this.data.answers)
    answers[qid] = key
    this.setData({ answers })
    if (this.data.currentIndex < this.data.questions.length - 1) {
      this.setData(
        {
          currentIndex: this.data.currentIndex + 1
        },
        () => {
          this.updateProgress()
        }
      )
    } else {
      this.submitTest()
    }
  },

  prevQuestion() {
    if (this.data.currentIndex === 0) return
    this.setData(
      {
        currentIndex: this.data.currentIndex - 1
      },
      () => {
        this.updateProgress()
      }
    )
  },

  nextQuestion() {
    const currentQuestion = this.data.questions[this.data.currentIndex]
    const currentAnswer = this.data.answers[currentQuestion.id]
    if (!currentAnswer) {
      wx.showToast({
        title: '请先选择一个选项',
        icon: 'none'
      })
      return
    }
    if (this.data.currentIndex < this.data.questions.length - 1) {
      this.setData(
        {
          currentIndex: this.data.currentIndex + 1
        },
        () => {
          this.updateProgress()
        }
      )
    }
  },

  submitTest() {
    if (this._submitting) return
    const { answers, questions } = this.data
    const answerCount = Object.keys(answers).length
    if (answerCount < questions.length) {
      wx.showToast({
        title: '还有题目未完成',
        icon: 'none'
      })
      return
    }
    this._submitting = true
    const resultData = calcResult(answers)
    app.globalData.lastResult = resultData
    const { code, leftScores } = resultData
    wx.navigateTo({
      url:
        `/pages/result/result?code=${code}` +
        `&c=${leftScores.C}&p=${leftScores.P}&h=${leftScores.H}&s=${leftScores.S}` +
        `&from=test`
    })
  }
})
