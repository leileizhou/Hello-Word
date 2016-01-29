define(function(){
	var ganYiApi = {};
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	function base64encode(str) {
	  var out, i, len;
	  var c1, c2, c3;
	  len = str.length;
	  i = 0;
	  out = "";
	  while(i < len) {
	      c1 = str.charCodeAt(i++) & 0xff;
	      if(i == len)
	      {
	          out += base64EncodeChars.charAt(c1 >> 2);
	          out += base64EncodeChars.charAt((c1 & 0x3) << 4);
	          out += "==";
	          break;
	      }
	      c2 = str.charCodeAt(i++);
	      if(i == len)
	      {
	          out += base64EncodeChars.charAt(c1 >> 2);
	          out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	          out += base64EncodeChars.charAt((c2 & 0xF) << 2);
	          out += "=";
	          break;
	      }
	      c3 = str.charCodeAt(i++);
	      out += base64EncodeChars.charAt(c1 >> 2);
	      out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
	      out += base64EncodeChars.charAt(c3 & 0x3F);
	  }
	  return out;
	}
	//关闭设备库
	ganYiApi['closeDeviceLib'] = function(type){
		wx.invoke('closeWXDeviceLib',function(res){
		   //回调

		});
	};

	//断开蓝牙连接
	ganYiApi['disconnectDevice'] = function(type){
		wx.invoke('disconnectWXDevice',{deviceId:''},function(res){
		   //回调

		});
	};

	//解绑
	ganYiApi['unBindDevice'] = function(type){
		wx.invoke('getWXDeviceTicket',{deviceId:'',type:'2'},function(res){
		   //回调

		});
	};


	//各种功能
	ganYiApi['sendData'] = function(type){
		var tempData = base64encode(type);
		var data = {deviceId:DEVICE_ID,base64Data:tempData};
		wx.invoke('sendDataToWXDevice', data, function(res){
		   //回调
			 alert("send: "+JSON.stringify(res));
		});
	};

	//接受数据
	ganYiApi['receiveData'] = function(){
			wx.on('onReceiveDataFromWXDevice', function(argv) {

	          //这里的obj就是你收到的数据对象
	          //这里你要对数据再做一次解码
						alert("receive: ");

	  	});
	};

	//监听链接状态
	ganYiApi['onConnectStateChange'] = function(){
			wx.on('onWXDeviceStateChange', function(argv) {
	          //state（必填）：connecting 连接中， connected 连接上，disconnected 连接断开。

	  	});
	};

	//监听绑定状态
	ganYiApi['onDeviceBindStateChange'] = function(){
			wx.on('onWXDeviceBindStateChange', function(argv) {
	          //state（必填）:bind 绑定，unbind 解绑

	  	});
	};

	//监听蓝牙状态
	ganYiApi['onBluetoothStateChange'] = function(){
			wx.on('onWXDeviceBluetoothStateChange', function(argv) {
	          //state：值有on、off

	  	});
	};

	ganYiApi['deviceList'] = [];
	//获取设备列表
	ganYiApi['getDeviceList'] = function(){
		wx.invoke('getWXDeviceInfos', {}, function(res){
		   //回调
			 console.log(res);
			 if(res.err_msg == 'ok'){
				 ganYiApi['deviceList'] = res.deviceInfos;
			 }else{
				 //获取设备失败
			 }
		});
	};



	return ganYiApi;
});
