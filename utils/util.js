/**
 * 请求网络
 */
function request(url, timestamp, success, fail ) {
  if( typeof success != 'function' || typeof fail != 'function' ) {
    return
  }
  var app = getApp()
  wx.request( {
    url: url,
    data: {
      key: app.globalData.appkey,
      timestamp: timestamp,
      size: app.globalData.pagesize
    },
    success: function( res ) {
      //console.log(res)
      if( res.data.error == 0 ) {
        //console.log(res.data.data)
        success( res.data.data)
      } else {
        fail( res.data.message )
      }
    },
    fail: function() {
      fail( '网络错误' )
    }
  })
}

function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return  h + ':' + minute ;
};

module.exports = {
  request: request,
  formatDateTime: formatDateTime
}
