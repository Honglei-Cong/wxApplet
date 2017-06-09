var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    riskRate: 0,
    productPeriod: 0,
    expAnnualRate: 0,
    productScale: 0,
    productDefineValid: false,
    userToken: "",
    currencyCategory: ['人民币', '美元'],
    currencyIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userToken = app.globalData.userToken;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  setProductCode: function (e) {
    this.setData({
      productCode: e.detail.value
    });
    this.updateProductDefine();
  },
  setProductName: function (e) {
    this.setData({
      productName: e.detail.value
    });
    this.updateProductDefine();
  },
  setRiskRate: function (e) {
    this.setData({
      riskRate: parseInt(e.detail.value)
    });
    this.updateProductDefine();
  },
  setProductPeriod: function (e) {
    this.setData({
      productPeriod: parseInt(e.detail.value)
    });
    this.updateProductDefine();
  },
  setExpAnnualRate: function (e) {
    this.setData({
      expAnnualRate: parseInt(e.detail.value)
    });
    this.updateProductDefine();
  },
  setProductCurrency: function (e) {
    this.setData({
      currencyIndex: e.detail.value
    });
    this.updateProductDefine();
  },
  setProductIssuer: function (e) {
    this.setData({
      productIssuer: e.detail.value
    });
    this.updateProductDefine();
  },
  setProductScale: function (e) {
    this.setData({
      productScale: parseInt(e.detail.value)
    });
    this.updateProductDefine();
  },
  updateProductDefine: function () {
    this.setData({
      productDefineValid: this.isProductDefineValid()
    })
  },
  isProductDefineValid: function () {
    return this.data.riskRate > 0 && this.data.productPeriod > 1 && this.data.expAnnualRate > 1 && this.data.productScale > 1 && this.data.productCode.length > 1 && this.data.productName.length > 1 && this.data.productIssuer.length > 1
  },

  submit: function (e) {
    self = this
    console.log("submit reserve request", this.data.reserveCount)
    server.postJSON('/upexchange/product/createProduct', {
      Authorization: self.data.userToken,
      data: {
        username: 'test1',
        productCode: this.data.productCode,
        productName: this.data.productName,
        riskRate: this.data.riskRate,
        period: this.data.productPeriod,
        expAnnualRate: this.data.expAnnualRate,
        currency: this.data.currencyCategory[this.data.currencyIndex],
        issuer: this.data.productIssuer,
        issuerScale: this.data.productScale
      }
    }, function (res) {
      console.log("success:", res)
      if (res.data.code == 0) {
        wx.showModal({
          showCancel: false,
          title: '恭喜',
          content: '产品发布顺利完成。',
          success: function (res) {
            wx.navigateBack();
          }
        });
      }
    })
  }
})