var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
	},
	onLoad: function () {
    this.setData({
      filterId: 1,
    })
	},
	onShow: function () {
    this.updateProductList();
    console.log('index.js data products', this.data.products)
	},
  onPullDownRefresh: function () {
    this.updateProductList();
  },
	onScroll: function (e) {
		if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}
	},
	tapFilter: function (e) {
		switch (e.target.dataset.id) {
			case '1':
				this.data.products.sort(function (a, b) {
          return a.exp_annual_rate - b.exp_annual_rate;
				});
				break;
			case '2':
        this.data.products.sort(function (a, b) {
					return (b.risk_rate > a.risk_rate) ? 1 : -1;
				});
				break;
			case '3':
        this.data.products.sort(function (a, b) {
          return a.issue_scale - b.issue_scale;
				});
				break;
		}
		this.setData({
			filterId: e.target.dataset.id,
      products: this.data.products
		});
	},
  updateProductList: function() {
    var self = this;
    server.getJSON('/upexchange/product/getProducts', function (res) {
      console.log('get products', res.data.data);
      self.setData({
        products: res.data.data
      });
      app.globalData.products = res.data.data;
    });
  }
});

