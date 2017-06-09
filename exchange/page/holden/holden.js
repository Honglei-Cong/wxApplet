var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    userToken: "",
    repurCount: 0
	},
	onLoad: function (options) {
		for (var i = 0; i < app.globalData.holdens.length; ++i) {
      if (app.globalData.holdens[i].id == options.id) {
				this.setData({
					holden: app.globalData.holdens[i]
				});
				break;
			}
		}
    this.setData({
      userToken: app.globalData.userToken
    })
	},
	onShow: function () {
	},
  setRepurCount: function (e) {
    this.setData({
      repurCount: parseInt(e.detail.value)
      });
  },
  isRepurCountValid: function() {
    return this.data.repurCount > 0
  },
	submit: function (e) {
    var self = this;
    console.log("submit repur request", this.data.repurCount)
    server.postJSON('/upexchange/product/repurProduct', {
      Authorization: self.data.userToken,
      data: {
        productCode: this.data.holden.product_code,
        repurAmount: this.data.repurCount
      }
    }, function (res) {
      console.log("success:", res)
      if (res.data.code == 0) {
        wx.showModal({
          showCancel: false,
          title: '恭喜',
          content: '产品赎回顺利完成。',
          success: function (res) {
            wx.navigateBack();
          }
        });
      }
    })
	}
});

