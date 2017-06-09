var server = require('./utils/server');
App({
	onLaunch: function () {
		console.log('App Launch')
		var self = this;
		var rd_session = wx.getStorageSync('rd_session');
		console.log('rd_session', rd_session)
		if (!rd_session) {
			self.login();
		} else {
			wx.checkSession({
				success: function () {
					// 登录态未过期
					console.log('登录态未过期')
					self.rd_session = rd_session;
					self.getUserInfo();
				},
				fail: function () {
					//登录态过期
					self.login();
				}
			})
		}
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		hasLogin: false,
		shops: []
	},
	rd_session: null,
	login: function() {
		var self = this;
		wx.login({
			success: function (res) {
				console.log('wx.login', res);
				self.getUserInfo();
			}
		});
	},
	getUserInfo: function() {
		var self = this;
		wx.getUserInfo({
			success: function(res) {
				console.log('getUserInfo', res);
				self.globalData.userInfo = res.userInfo;
        server.postJSON('/upexchange/user/login', {
          data: {
            username: res.userInfo.nickName,
            password: "password1"
          }
        }, function (res) {
          console.log("login success:", res);
          self.globalData.userToken = res.data.data.token;
          server.getJSON('/upexchange/user/getUserInfo', {
            Authorization: self.globalData.userToken,
          }, function (res) {
            console.log("getUserInfo2 success:", res);
            self.globalData.userInfo2 = res.data.data;
          })
        })
			}
		});
	}
})
