  document.documentElement.style.fontSize = (document.body.clientWidth / 20) + 'px';

  $('body').on('touchmove', function(event) {
    event.preventDefault();
  });

  require.config({
    paths: {
      weixinapi: 'lib/WeixinApi',
      ganyijiapi: 'ganYiJi', //定义干衣机的功能，具体是发送指令等
      maincontrol: 'mainControl', //首页
      appiontment: 'appiontment', //预约页面
      status: 'status', //状态页面
      pagecontrol: 'pageControl',
      jssha: 'sha',
      sign: 'sign',
      devicecontrol: 'device'
    }
  });

  require(['devicecontrol'], function(devicecontrol) {
    devicecontrol.init();
  });