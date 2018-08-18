var http = require( '../../utils/util' )
var app = getApp()
var bishijie ='https://api.bishijie.com/newsv17'

Page( {
  data: {
    timestamp: Date.parse(new Date()) / 1000,
    loadingHide: false,
    hideFooter: true,
    kxData: []
  },
  hideOrShow:function(e){
    let index = e.currentTarget.dataset.index;
    let dataIndex = e.currentTarget.dataset.dataindex;
    //console.log(index,dataIndex)
    let key = `kxData[${dataIndex}].buttom[${index}].selected`;
    this.setData({
     [key]: !this.data.kxData[dataIndex].buttom[index].selected
    });
  },
  onLoad: function( options ) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //请求笑话列表
    http.request(bishijie, this.data.timestamp, function( dataJson ) {
      let lastButtom = dataJson[dataJson.length - 1].buttom;
      let lastTime = lastButtom[lastButtom.length-1].issue_time;
      let dataList = dataJson.map(e => ({
        ...e,
        today: `${e.top[2]} ${e.top[0]} ${e.top[1]}`
      }));
      for(let i=0;i<dataList.length;i++){
        let item =dataList[i];
        dataList[i].buttom = item.buttom.map(e=>({...e,selected:true}))
      }

      that.setData({
          kxData: that.data.kxData.concat(dataList),
          loadingHide: true,
          timestamp: lastTime,
      })
    }
    , function( reason ) {
      //console.log( reason )
      that.setData( {
        loadingHide: true
      })
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    // var that = this
    // this.setData( {
    //   page: 1,
    //   jokeList:[]
    // })
    // http.request( url, this.data.page, function( dataJson ) {
    //   that.setData( {
    //     jokeList: that.data.jokeList.concat( dataJson.result.data )
    //   })
    //   wx.stopPullDownRefresh()
    // }, function( reason ) {
    //   console.log( reason )
    //   wx.stopPullDownRefresh()
    // })
  },

  /**
   * 滑动到底部 加载更多
   */
  loadMore() {
    //请求笑话列表
    var that = this
    //显示footer
    this.setData( {
      hideFooter: !this.data.hideFooter
    })
    // //请求笑话列表
    console.log(this.data.timestamp)
     http.request(bishijie, this.data.timestamp, function( dataJson ) {
      let lastButtom = dataJson[dataJson.length - 1].buttom;
      let lastTime = lastButtom[lastButtom.length - 1].issue_time;
      if (that.data.timestamp == lastTime){
        return;
      }
      let dataList = dataJson.map(e => ({
        ...e,
        today: `${e.top[2]} ${e.top[0]} ${e.top[1]}`
      }));
      for (let i = 0; i < dataList.length; i++) {
        let item = dataList[i];
        dataList[i].buttom = item.buttom.map(e => ({ ...e, selected: true }))
      }
      that.setData({
        kxData: that.data.kxData.concat(dataList),
        hideFooter: !that.data.hideFooter,
        timestamp: lastTime,
      })
    },
     function( reason ) {
      console.log( reason )
      that.setData( {
        hideFooter: !that.data.hideFooter
      })
    })
  },
  getHttpData:function(){
    
  }
})