document.documentElement.style.fontSize = (document.body.clientWidth / 20)+'px';

require.config({
    paths: {
        weixinapi: 'lib/WeixinApi',
        ganyijiapi: 'ganYiJi', //定义干衣机的功能，具体是发送指令等
        maincontrol: 'mainControl',//首页
        appiontment: 'appiontment',//预约页面
        status: 'status',//状态页面
        pagecontrol: 'pageControl',
        jssha: 'sha',
        sign: 'sign'
    }
});

require(['maincontrol'], function(mainControl) {
    mainControl.init();
});

$('body').on('touchmove', function (event) {
    event.preventDefault();
});

function showDevices(deviceList){
  var parent = $('#deviceList');
  var html = "";
  for(var i=0; i<deviceList.length; i++){
    html = html+"<div id='deviceItem'><div id='deviceItem_img'></div><div id='deviceItem_name'>"+deviceList[i].deviceId.substr(0,9)+"</div><div id='deviceItem_right'>></div></div>";
  }
  parent.html(html);
  $('#deviceItem').click(function(){
    //进入到功能主页
    $('#deviceList').hide();
    $('#ganyiji').show();
  })
}

showDevices([{deviceId:'iojaojdoadoj'}]);

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
      return unescape(r[2]);
   return 0;
}

var code_login = getQueryString('code');
var DEVICE_ID = '';

require(['ganyijiapi'], function(ganYiApi) {
  $.ajax({
     type: "POST",
     dataType:"json",
     "async": true,
     url: "http://120.26.223.73:3000/api/WechatFans/login_by_code",
     "data":{
       code:code_login
     },
     success: function(msg){

       $.ajax({
          type: "POST",
          url: "http://120.26.223.73:3000/api/JsConfigs/getConfig",
          beforeSend: function(request) {
            request.setRequestHeader("authorization", msg.id);
          },
          data: {
           "beta": true,
           "debug":true,
           "jsApiList":["openWXDeviceLib","getWXDeviceInfos","onReceiveDataFromWXDevice","sendDataToWXDevice"],
           "url":window.location.href
         },
          success: function(msg){
            msg['beta'] = true;
            wx.config(msg);
            wx.ready(function(){
                 // 1.初始化设备库函数
                 wx.invoke('openWXDeviceLib',{}, function(res){
                    if(res.err_msg.indexOf('ok') >= 0 && res.isSupportBLE=='yes'){
                      if(res.bluetoothState == 'unauthorized'){
                        //用户没有授权微信使用蓝牙功能
                        alert('not unauthorized');
                      }else if(res.bluetoothState == 'off'){
                        //蓝牙没有打开
                        alert('open ble');
                      }
                    }
                 });

                 // 2.查找设备
                 wx.invoke('getWXDeviceInfos',{}, function(res){
                    if(res.err_msg.indexOf('fail') >= 0){
                      //异常场景
                    }else{
                       DEVICE_ID = res.deviceInfos[0].deviceId;
                       showDevices(res.deviceInfos);
                    }
                 });

                 //  3.启动收到数据的监听
                 wx.on('onReceiveDataFromWXDevice', function(argv) {

                       //这里的obj就是你收到的数据对象
                       //这里你要对数据再做一次解码
                       alert("receive: ");

                 });

                //  //  4.启动蓝牙状态的监听
                //  wx.on('onWXDeviceBindStateChange', function(argv) {
                 //
                //        //这里的obj就是你收到的数据对象
                //        //这里你要对数据再做一次解码
                //        alert("onWXDeviceBindStateChange");
                 //
                //  });
                 //
                //  wx.on('onWXDeviceStateChange', function(argv) {
                 //
                //        //这里的obj就是你收到的数据对象
                //        //这里你要对数据再做一次解码
                //        alert("onWXDeviceStateChange");
                 //
                //  });
                 //
                 //
                //  wx.on('onWXDeviceBluetoothStateChange', function(argv) {
                 //
                //        //这里的obj就是你收到的数据对象
                //        //这里你要对数据再做一次解码
                //        alert("onWXDeviceBluetoothStateChange");
                 //
                //  });



           });
         },
         error:function(err){
         }
       });

     },
     error:function(err){
     }
  });
});
