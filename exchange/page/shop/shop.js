var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    userToken: "",
    reserveCount: 0
	},
	onLoad: function (options) {
		var productId = options.id;
		for (var i = 0; i < app.globalData.products.length; ++i) {
      if (app.globalData.products[i].product_id == productId) {
				this.setData({
					product: app.globalData.products[i]
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
  setReserveCount: function (e) {
    this.setData({
      reserveCount: parseInt(e.detail.value)
      });
  },
  isReserveCountValid: function() {
    return this.data.reserveCount > 0
  },
	submit: function (e) {
    var self = this;
    console.log("submit reserve request", this.data.reserveCount)
    server.postJSON('/upexchange/product/reserveProduct', {
      Authorization: self.data.userToken,
      data: {
        productCode: this.data.product.product_code,
        reserveAmount: this.data.reserveCount
      }
    }, function (res) {
      console.log("success:", res)
      if (res.data.code == 0) {
        wx.showModal({
          showCancel: false,
          title: '恭喜',
          content: '产品申购顺利完成。',
          success: function (res) {
            wx.navigateBack();
          }
        });
      }
    })
	}
});

