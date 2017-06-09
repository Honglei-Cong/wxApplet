function __args() {
	var setting = {};
	if (arguments.length === 1 && typeof arguments[0] !== 'string') {
		setting = arguments[0];
	} else {
		setting.url = arguments[0];
		if (typeof arguments[1] === 'object') {
      if ('Authorization' in arguments[1]) {
        setting.header = {}
        setting.header['Authorization'] = arguments[1].Authorization;
      }
      if ('data' in arguments[1]) {
        setting.data = arguments[1].data;
      }
			setting.success = arguments[2];
		} else {
			setting.success = arguments[1];
		}
	}
	if (setting.url.indexOf('https://') !== 0) {
		setting.url = 'https://chaincloud.tech/' + setting.url;
	}
	return setting;
}
function __json(method, setting) {
	setting.method = method;
  if (setting.header === undefined) {
    setting.header = {};
  }
	setting.header['content-type'] ='application/x-www-form-urlencoded';
	wx.request(setting);
}

module.exports = {
	getJSON: function () {
		__json('GET', __args.apply(this, arguments));
	},
	postJSON: function () {
		__json('POST', __args.apply(this, arguments));
	}
}
