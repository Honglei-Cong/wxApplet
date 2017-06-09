var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    userToken: "",
    userBalance: 0,
  },
	onLoad: function () {
	},
/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.updateHoldenList();
  },

	onShow: function () {
    var self = this;
    self.setData({
      userToken: app.globalData.userToken,
      userInfo: app.globalData.userInfo,
      userInfo2: app.globalData.userInfo2,
    });
    self.updateHoldenList();
	}, 

  updateHoldenList: function() {
    var self = this;
    server.getJSON('/upexchange/user/getAccountPositions', {
      Authorization: self.data.userToken,
    }, function (res) {
      console.log('get holden', res.data.data);
      var holdens = res.data.data
      for (var i = 0; i < holdens.length; i += 1) {
        holdens[i].id = i;
      }
      self.setData({
        holdens: holdens,
      })
      app.globalData.holdens = holdens;
    });
    server.getJSON('/upexchange/user/getAccountBalance', {
      Authorization: self.data.userToken,
    }, function (res) {
      console.log('get balance', res.data.data);
      self.setData({
        userBalance: res.data.data.balance
      })
    });
  }
});

