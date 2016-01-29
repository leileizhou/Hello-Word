define(function() {
	var appiontmentControl = {};
	//默认干衣时间
	var defaultTime = 3;
	//总预约时间
	var countTime = 12;

	//起始点
	var startEle = document.getElementById('start');
	var j_startEle = $(startEle);
	//结束点
	var endEle = document.getElementById('end');
	var j_endEle = $(endEle);
	//起始点的角度 用来画刻度，标记要画的刻度线从哪儿开始
	var startEleDu = 0;
	//结束点的角度 用来画刻度，标记要画的刻度线到哪儿结束
	var endEleDu = 90;

	//起始点的角度 用来计算两个点之间的时间是不是大于默认干衣最短时间
	var currentStartEleDu = 0;
	//结束点的角度
	var currentEndEleDu = 90;

	//默认角度差
	var defaultJiaoDuCha = 360 * (defaultTime / countTime);

	//画布中园的圆心
	var canvas_center = {
		x: document.body.clientWidth / 2,
		y: document.body.clientWidth / 2
	};

	var appionment_start_num = document.getElementById("appionment_start_num");

	var appionment_end_num = document.getElementById("appionment_end_num");

	var start_jiao_element1 = document.getElementById('start_jiao');

	var j_start_jiao_element1 = $(start_jiao_element1);

	var end_jiao_element2 = document.getElementById('end_jiao');

	var j_end_jiao_element2 = $(end_jiao_element2);

	var canvas_kedu = document.getElementById("canvas_kedu");
	canvas_kedu.width = document.body.clientWidth;
	canvas_kedu.height = document.body.clientWidth;

	var canvas_kedu_di = document.getElementById("canvas_kedu_di");
	canvas_kedu_di.width = document.body.clientWidth;
	canvas_kedu_di.height = document.body.clientWidth;

	var ctx = canvas_kedu.getContext("2d");

	appiontmentControl['drawKeDuDi'] = function() {
		var ctx = canvas_kedu_di.getContext("2d");
		ctx.clearRect(0, 0, 1000, 1000);
		//画底色
		for (var i = 0; i < 120; i++) //注意此处的120=360/3,除以的旋转角度
		{
			ctx.save();
			//将起始点定位到圆心
			ctx.translate(canvas_center.x, canvas_center.y);
			//设置刻度的样式
			ctx.lineWidth = 2;

			ctx.strokeStyle = "#2591b0";

			ctx.rotate(i * 3 * Math.PI * 2 / 360);

			ctx.beginPath();

			ctx.moveTo(0, -(100 * document.body.clientWidth) / 320);

			ctx.lineTo(0, -(116 * document.body.clientWidth) / 320);

			ctx.stroke();

			ctx.restore();
		}
	};

	//优化
	appiontmentControl['drawKeDuChanged'] = function(flag, from, to) {
		ctx.clearRect(0, 0, 1000, 1000);
		if (flag) {
			if (!to) {
				to = from + defaultJiaoDuCha;
			}
		} else {
			from = zongRotate;
		}
		//画底色
		console.log(from + "      " + to);
		//当系数aa变成1时，再350-360之间会有个超过700的值，此时要减去360
		if (to > 720) {
			to = to - 360;
		}
		var startIndex = from / 3;
		var endIndex = (to - from) / 3 == 0 ? 120 : (to - from) / 3;
		for (var i = 0; i < endIndex; i++) //注意此处的120=360/3,除以的旋转角度
		{
			ctx.save();
			//将起始点定位到圆心
			ctx.translate(canvas_center.x, canvas_center.y);
			//设置刻度的样式
			ctx.lineWidth = 2;

			ctx.strokeStyle = "#ee821b";

			ctx.rotate((i * 3 + from) * Math.PI * 2 / 360);

			ctx.beginPath();

			ctx.moveTo(0, -(100 * document.body.clientWidth) / 320);

			ctx.lineTo(0, -(116 * document.body.clientWidth) / 320);

			ctx.stroke();

			ctx.restore();
		}
	};

	//圆心
	var point_x = canvas_kedu.width / 2;
	var point_y = canvas_kedu.offsetTop + canvas_kedu.width / 2;
	var startCenter = {
		x: point_x,
		y: point_y
	};

	function getRotate(start, end) {
		var endRotate = Math.atan2(end.x - point_x, point_y - end.y) * 180 / Math.PI;
		return endRotate;
	};


	function animateDistance(x, y, dom, rot) {
		dom.css('-webkit-transform', 'scale3d(1,1,1) rotate(' + rot + 'deg)')
	}

	var startAllDu = 0;
	var lastVal = 0;
	//是否满一圈的标志
	var flag = false;
	var zongRotate = 0;
	//坐标是否经过第三第四象区，如果经过则为负值，用来区分直接从12点位置往左滑，得到的负值
	var fuFlag = false;
	//同aa
	var bb = 0;
	var startTimeCount = 0;
	appiontmentControl['drag1'] = function(element) {
		var mc1 = new Hammer(element);

		element.addEventListener('touchend', function() {
			flag = false;
		});

		mc1.on('panleft panright panup pandown', function(evt) {
			if (flag /*|| zongRotate == 360*/ ) {
				return;
			}

			var rotateValue = getRotate(startCenter, evt.center);
			rotateValue = Math.ceil(rotateValue / 3) * 3;
			startEleDu = rotateValue;

			bb = Math.floor(zongRotate / 360);
			console.log('zhou-------------- bb' + bb);

			if ((rotateValue < 0 && fuFlag) || (startTimeCount > new Date().getHours() && rotateValue < 0)) {
				rotateValue = 360 + rotateValue;
			} else if (rotateValue < 0 && !fuFlag && bb == 0 && zongRotate < 0) { /*这里的条件是用来判断起始点在起始处往左滑动（逆时针）*/
				rotateValue = 0;
			}

			currentStartEleDu = rotateValue;
			console.log('zhou-------------- currentStartEleDu' + currentStartEleDu);
			//判断起始点是否经过第二象区，即将进入第三象区
			if (currentStartEleDu > 170 || zongRotate > 170) {
				fuFlag = true;
			} else {
				fuFlag = false;
			}

			//根据时间来判断当前滑动吧？

			//起始点最多滑动满一圈，既12小时,滑到该处，默认为重新设置
			if (currentStartEleDu > 350 && evt.direction == 4) {
				flag = true;
				rotateValue = 0;
				zongRotate = 360;
				startEleDu = 0;
				currentStartEleDu = 360;
				bb = 1;
			}
			zongRotate = currentStartEleDu;

			if (zongRotate < 0 || currentStartEleDu < 0) {
				currentStartEleDu = 0;
				zongRotate = 0;
				return;
			}

			if (currentStartEleDu <= 360 && zongEndRotate - currentStartEleDu <= 90) {
				//设置结束角的度数
				console.log(currentStartEleDu + '  ########   ' + zongEndRotate);
				animateDistance(evt.deltaX, evt.deltaY, j_endEle, rotateValue + defaultJiaoDuCha);
				currentEndEleDu = currentStartEleDu + defaultJiaoDuCha;
				zongEndRotate = currentEndEleDu;
				if (zongEndRotate > 720) {
					aa = 2;
				} else if (zongEndRotate > 360) {
					aa = 1;
				}
				//修改结束时间
				appionment_end_num.innerText = getEndTime(false, zongEndRotate / 360 * countTime * 60); //获得分钟数，再转为小时
			} else if (currentStartEleDu == 360 && 　zongEndRotate == 0) {
				zongEndRotate = currentStartEleDu + 90;
				animateDistance(evt.deltaX, evt.deltaY, j_endEle, zongEndRotate);
				if (zongEndRotate > 720) {
					aa = 2;
				} else if (zongEndRotate > 360) {
					aa = 1;
				}
			} else if (zongEndRotate - currentStartEleDu > 360) {
				return;
			}

			//设置起始角的度数
			animateDistance(evt.deltaX, evt.deltaY, j_startEle, rotateValue);

			appiontmentControl['drawKeDuChanged'](true, currentStartEleDu, zongEndRotate);

			//console.log("lei----------- " + zongEndRotate);
			//修改开始时间
			appionment_start_num.innerText = getEndTime(true, zongRotate / 360 * countTime * 60); //获得分钟数，再转为小时

		});
	};

	//是否滑动到12点的标志
	var endflag = false;
	var zongEndRotate = 0;
	//系数，转满一圈为1，转满两圈为2
	var aa = 0;
	//坐标是否经过第三第四象区，如果经过则为负值，用来区分直接从12点位置往左滑，得到的负值
	var fuEndFlag = false;
	var endTimeCount = 0;
	appiontmentControl['drag2'] = function(element) {
		var mc1 = new Hammer(element);
		mc1.on('panleft panright panup pandown', function(evt) {

			var rotateValue = getRotate(startCenter, evt.center);
			rotateValue = Math.ceil(rotateValue / 3) * 3;
			endEleDu = rotateValue;

			if (zongEndRotate <= 360 && aa == 1 && rotateValue < 0) {
				aa = 0;
			}

			if (zongEndRotate <= 720 && aa == 2 && rotateValue < 0) {
				aa = 1;
			}
			if (rotateValue < 0) {
				rotateValue = 360 + rotateValue;

			}

			zongEndRotate = rotateValue + aa * 360;

			currentEndEleDu = rotateValue;

			if (zongEndRotate > 350 && zongEndRotate < 360 && evt.direction == 4) {
				zongEndRotate = 360;
				currentEndEleDu = 0;
				rotateValue = 0;
				aa = 1;
				//同步时间和刻度线
				//修改结束时间

				appionment_end_num.innerText = getEndTime(false, 12 * 60); //获得分钟数，再转为小时

				appiontmentControl['drawKeDuChanged'](false, 0, 360);
			}

			if (zongEndRotate > 710 && zongEndRotate < 720 && evt.direction == 4) {
				zongEndRotate = 720;
				currentEndEleDu = 0;
				rotateValue = 0;
				aa = 2;
				//同步时间和刻度线
				//修改结束时间

				appionment_end_num.innerText = getEndTime(false, 2 * 12 * 60); //获得分钟数，再转为小时
				appiontmentControl['drawKeDuChanged'](false, 0, 360);
			}

			//结束点最多转到一圈之后开始点的位置
			if (zongEndRotate > currentStartEleDu + 360) {
				zongEndRotate = currentStartEleDu + 360; //到达最大角度时，保证zongEndRotate不会因为滑动而继续增大
				//修改结束时间
				appionment_end_num.innerText = getEndTime(false, zongEndRotate / 360 * countTime * 60); //获得分钟数，再转为小时
				animateDistance(evt.deltaX, evt.deltaY, j_endEle, zongRotate + 360);
				appiontmentControl['drawKeDuChanged'](false, zongRotate, zongRotate + 360);
				return;
			}

			//如果当前只有三小时干衣时间，就不能再拖结束点减少时间了
			if (zongEndRotate - currentStartEleDu <= 87) {
				return;
			}

			animateDistance(evt.deltaX, evt.deltaY, j_endEle, rotateValue);
			//console.log('(((())))   '+zongEndRotate);
			appiontmentControl['drawKeDuChanged'](false, '', zongEndRotate);

			//设置起始角的度数
			//animateDistance(evt.deltaX,evt.deltaY,startEle,rotateValue - 360 * (defaultTime / countTime));
			//修改结束时间
			appionment_end_num.innerText = getEndTime(false, zongEndRotate / 360 * countTime * 60); //获得分钟数，再转为小时

			//修改开始时间
			//appionment_start_num.innerText = getCurrentTime(currentEndEleDu / 360 * countTime * 60); //获得分钟数，再转为小时
		});
	};

	function getCurrentTime() {
		var tempDate = new Date();
		return tempDate.getHours() + ":" + (tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes());
	}

	function getStartTime() {
		var tempDate = new Date();
		return tempDate.getHours() + ":" + (tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes());
	}
	//type 为true代表起始时间，否则为结束时间
	var theSecondDay = $('#theSecondDay');

	function getEndTime(type, jiange) {
		var startTime = getCurrentTime();
		var timeArr = startTime.split(':');
		var startTime_hour = parseInt(timeArr[0]);
		var startTime_minit = parseInt(timeArr[1]);
		var totalTime = (startTime_hour * 60 + startTime_minit + jiange);
		var resultHour = 0;
		if (type) {
			startTimeCount = parseInt(totalTime / 60);
		} else {
			endTimeCount = parseInt(totalTime / 60);
		}
		if (parseInt(totalTime / 60) >= 24) {
			resultHour = parseInt(totalTime / 60) - 24;
			if (!type) {
				theSecondDay.show();
			}
		} else {
			resultHour = parseInt(totalTime / 60);
			if (!type) {
				theSecondDay.hide();
			}
		}
		return resultHour + ':' + (parseInt(totalTime % 60) < 10 ? '0' + parseInt(totalTime % 60) : parseInt(totalTime % 60));

	}

	function initKeDuPan() {
		animateDistance('', '', $('#end'), 90);
		animateDistance('', '', $('#start'), 0);
	}

	//预约启动与否标志
	var appiont_start_flag = true;

	function resetArrs() {
		//起始点的角度 用来画刻度，标记要画的刻度线从哪儿开始
		startEleDu = 0;
		//结束点的角度 用来画刻度，标记要画的刻度线到哪儿结束
		endEleDu = 90;

		//起始点的角度 用来计算两个点之间的时间是不是大于默认干衣最短时间
		currentStartEleDu = 0;
		//结束点的角度
		currentEndEleDu = 90;

		appiont_start_flag = true;
		//是否滑动到12点的标志
		endflag = false;
		zongEndRotate = 0;
		aa = 0;
		//坐标是否经过第三第四象区，如果经过则为负值，用来区分直接从12点位置往左滑，得到的负值
		fuEndFlag = false;
		startAllDu = 0;
		lastVal = 0;
		//是否满一圈的标志
		flag = false;
		zongRotate = 0;
		//坐标是否经过第三第四象区，如果经过则为负值，用来区分直接从12点位置往左滑，得到的负值
		fuFlag = false;
		bb = 0;
	}

	appiontmentControl['init'] = function() {
		//重置标志位
		resetArrs();
		appionment_start_num.innerText = getCurrentTime();
		appionment_end_num.innerText = getEndTime(false, 180);
		this['drawKeDuDi']();

		this['drawKeDuChanged'](true, 0, defaultJiaoDuCha);

		initKeDuPan();
		this['drag1'](start_jiao_element1);
		this['drag2'](end_jiao_element2);

		var appiontmentClock = document.getElementById('appiontmentClock');
		var cover = document.getElementById('cover');
		new Hammer(appiontmentClock).on('tap', function() {
			if (appiont_start_flag) {
				appiontmentClock.style.backgroundImage = "url('img/appiont_pause.png')";
				cover.style.display = 'block';
				appiont_start_flag = false;
			} else {
				appiontmentClock.style.backgroundImage = "url('img/appiont_start.png')";
				cover.style.display = 'none';
				appiont_start_flag = true;
			}
		});
	};
	return appiontmentControl;
});