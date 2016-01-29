define(['ganyijiapi', 'pagecontrol'], function(ganyijiapi, pagecontrol) {
	var deviceControl = {};
	var scanEle = $('#scan');

	function showDevices(deviceList) {
		var html = "";
		for (var i = 0; i < deviceList.length; i++) {
			html = html + "<div class='deviceItem'><div id='deviceItem_img'></div><div id='deviceItem_name'>" + deviceList[i].deviceId.substr(0, 9) + "</div><div id='deviceItem_right'>></div></div>";
		}
		$(html).insertBefore(scanEle);
		$('.deviceItem').click(function() {
			//进入到功能主页
			$('#deviceList').hide();
			$('#ganyiji').show();
			pagecontrol.switchPage(0);
		})
	}

	function bindEvt() {
		scanEle.on('click', function() {
			//调用微信扫一扫功能
			// wx.scanQRCode({
			// 	needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			// 	scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			// 	success: function(res) {
			// 		var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			// 		alert('result is: '+JSON.stringify(res));
			// 	}
			// });
			wx.invoke('startScanWXDevice', {btVersion:'ble'}, function(res) {
				alert(res.err_msg);
			});
		});
	}

	showDevices([{
		deviceId: 'iojaojdoadoj'
	}]);

	function readyFunc(){
		// 1.初始化设备库函数
							alert(WeixinJSBridge);
							WeixinJSBridge.invoke('openWXDeviceLib', {}, function(res) {
								if (res.err_msg.indexOf('ok') >= 0 && res.isSupportBLE == 'yes') {
									if (res.bluetoothState == 'unauthorized') {
										//用户没有授权微信使用蓝牙功能
										alert('not unauthorized');
									} else if (res.bluetoothState == 'off') {
										//蓝牙没有打开
										alert('open ble');
									}
								}
							});
							// 2.查找设备
							WeixinJSBridge.invoke('getWXDeviceInfos', {}, function(res) {
								if (res.err_msg.indexOf('fail') >= 0) {
									//异常场景
									alert(6556);
								} else {
									DEVICE_ID = res.deviceInfos[0].deviceId;
									showDevices(res.deviceInfos);

									alert(JSON.stringify(res.deviceInfos));
									
								}
							});

							WeixinJSBridge.on('onScanWXDeviceResult',function(result){
								alert(9999);
								alert(result);
							});
							//  3.启动收到数据的监听
							// wx.on('onReceiveDataFromWXDevice', function(argv) {
							// 	//这里的obj就是你收到的数据对象
							// 	//这里你要对数据再做一次解码
							// 	alert("receive: ");
							// });

							// wx.on('onScanWXDeviceResult', function(result) {
							// 		alert('haha '+JSON.stringify(result));
							// });
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

							bindEvt();
	}

	

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return 0;
	}
	var code_login = getQueryString('code');
	var DEVICE_ID = '';

	deviceControl['init'] = function() {
		$.ajax({
			type: "POST",
			dataType: "json",
			"async": true,
			url: "http://120.26.223.73:3000/api/WechatFans/login_by_code",
			"data": {
				code: code_login
			},
			success: function(msg) {
				$.ajax({
					type: "POST",
					url: "http://120.26.223.73:3000/api/JsConfigs/getConfig",
					beforeSend: function(request) {
						request.setRequestHeader("authorization", msg.id);
					},
					data: {
						"beta": true,
						"debug": true,
						"jsApiList": ["openWXDeviceLib", "getWXDeviceInfos", "onReceiveDataFromWXDevice", "sendDataToWXDevice",
							"startScanWXDevice", "onScanWXDeviceResult", "scanQRCode"
						],
						"url": window.location.href
					},
					success: function(msg) {
						msg['beta'] = true;
						wx.config(msg);
						// wx.ready(function() {
							

						// });

						if (typeof WeixinJSBridge === "undefined") {
							document.addEventListener('WeixinJSBridgeReady', readyFunc, false);
						} else {
							readyFunc();
						}
					},
					error: function(err) {}
				});
			},
			error: function(err) {}
		});
	}

	return deviceControl;
});