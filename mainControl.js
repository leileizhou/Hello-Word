define(['ganyijiapi', 'pagecontrol'], function(ganyiApi, pagecontrol) {
  var mainControl = {};
  var isGanyi = false; //表示没有启动干衣
  var typeChosed = false;
  var index2Function = [{
    type: 'chenshan'
  }, {
    type: 'wazi'
  }, {
    type: 'neiyi'
  }, {
    type: 'qita'
  }];
  var index2FunctionClass = [{
    className: 'fc_one'
  }, {
    className: 'fc_two'
  }, {
    className: 'fc_three'
  }, {
    className: 'fc_four'
  }];
  var currentPageIndex = '0';
  var currentFunctionIndex = '-1';
  //var ganyiApi2 = require('ganyijiapi');
  function bindEvtPage(id, type) {

    var element = document.getElementById(id);
    var mc = new Hammer(element);
    mc.on(type, function() {
      pagecontrol.switchPage(element.dataset.index);
    });
  }

  function bindEvtFuc(className, type) {
    var element = document.getElementsByClassName(className)[0];
    var mc = new Hammer(element);
    mc.on(type, function() {
      if (currentFunctionIndex === element.dataset.index) {
        return;
      }


      //ganyiApi['sendData']('11223344');

      if (currentFunctionIndex > -1) {
        $('.' + index2FunctionClass[currentFunctionIndex].className).removeClass(index2FunctionClass[currentFunctionIndex].className + '_focus');
      }

      $('.' + index2FunctionClass[element.dataset.index].className).addClass(index2FunctionClass[element.dataset.index].className + '_focus');
      currentFunctionIndex = element.dataset.index;
      typeChosed = true;
      ganyiApi['sendData'](index2Function[element.dataset.index].type);

    });

  }

  var currentOffset = 0;
  var lastDistanceX = 0;

  function animateDistance(px, dom) {
    if (px == 0) {
      currentOffset = 0;
    } else if (currentOffset > 172) {
      currentOffset = 172;
    }

    var translate3dValue = 'translate3d(' + px + 'px,0,0)';
    console.log(translate3dValue);
    //dom.style.-webkit-transform = translate3dValue+'scale3d(1,1,1)';
    $(dom).css("-webkit-transform", translate3dValue);
  }


  mainControl['bindEvent'] = function() {
    //绑定页面跳转
    bindEvtPage('ganyi', 'tap');
    bindEvtPage('status', 'tap');
    bindEvtPage('interaction', 'tap');
    bindEvtPage('market', 'tap');
    bindEvtPage('appointment', 'tap');
    //绑定四项以及预约功能

    bindEvtFuc('fc_one', 'tap');
    bindEvtFuc('fc_two', 'tap');
    bindEvtFuc('fc_three', 'tap');
    bindEvtFuc('fc_four', 'tap');



    //绑定启动暂停按钮
    var myElementTouch = document.getElementById('btn_control');
    var myElement = document.getElementById('startOrPause');
    var mc = new Hammer(myElementTouch);
    var mc2 = new Hammer(myElement);
    mc.on('panleft panright', function(evt) {
      console.log(evt.distance + '     ' + lastDistanceX);
      if (isGanyi || !typeChosed) {
        return;
      }
      var cha = evt.distance - lastDistanceX;
      if (cha > 40 && evt.direction == 4) {
        animateDistance(116 * document.body.clientWidth / 320, myElement);
      } else if (cha > 40 && evt.direction == 2) {
        animateDistance(0, myElement);
      }
    });
    // //小球
    mc2.on('tap', function(evt) {
      if (typeChosed) {
        if (isGanyi) {
          myElement.style.backgroundImage = "url('img/ganyi_start.png')";
          isGanyi = false;
        } else {
          myElement.style.backgroundImage = "url('img/ganyi_zanting.png')";
          isGanyi = true;
        }
      }

    });
    //背景
    mc.on('tap', function(evt) {
      if (evt.target.id == 'startOrPause') {
        return;
      }
      evt.preventDefault();
      if (typeChosed || !isGanyi) {
        animateDistance(116 * document.body.clientWidth / 320, myElement);
      }
    });

  };

  mainControl['resetArrs'] = function() {
    isGanyi = false;
    currentPageIndex = '0';
    currentFunctionIndex = '-1';
    currentOffset = 0;
    lastDistanceX = 0;
  }

  mainControl['init'] = function() {
    mainControl['bindEvent']();
    mainControl['resetArrs']();
    //ganyiApi['getDeviceList']();
  }

  return mainControl;
});