define(['ganyijiapi'],function(ganyiApi) {
 	var statusControl = {};
 	var canvasObj = '';
 	statusControl['drawCanvas'] = function(value){
    canvasObj = document.getElementById('cvs');
    canvasObj.width = document.body.clientWidth;
    var thickness = 5*document.body.clientWidth/320;
    canvasObj.height = document.body.clientWidth/3*2 + 2*thickness;
    var context = canvasObj.getContext('2d');

    var offsetPI = -Math.PI * 0.5;
    var tempColor = '';
    var yuanzhou = Math.PI * 2;
    for(var i=0; i<2; i++){
        if(i == 0){
            tempColor = '#353d40';
        }else{
            tempColor = '#f19b37';
        }
        context.beginPath();
        context.strokeStyle = tempColor;
        context.lineWidth = thickness;
        if(i==0){
        	context.arc(document.documentElement.clientWidth/2, canvasObj.height/2, 90*document.body.clientWidth/320, 0,yuanzhou, false);
        }else{
        	context.arc(document.documentElement.clientWidth/2, canvasObj.height/2, 90*document.body.clientWidth/320, offsetPI,yuanzhou*value+offsetPI, false);
        }
        context.stroke();
    }

 	};

    //柱状图方法
    statusControl['drawCharts'] = function(values){
        var name = 'Browser brands';
        var colors = Highcharts.getOptions().colors;
        var categories = [];
        var data = [];
        for(var i=0; i<values.length; i++){
          if( i == 0 || i == values.length-1 ){
            categories.push(values[i].category);
          }else{
            categories.push('');
          }
          data.push({y:values[i].y,color:'#1fc6f8'});
        }

        function setChart(name, categories, data, color) {
            chart.xAxis[0].setCategories(categories, false);
            chart.series[0].remove(false);
            chart.addSeries({
                name: name,
                data: data,
                color: color || 'white'
            }, false);
            chart.redraw();
        }

        var chart = $('#charts_container').highcharts({
            credits: {
                enabled: false
            },
            chart: {
                type: 'column',
                style:{
                    color:'red',
                    fontWeight:'bold',

                },
                //spacingBottom: 1,
                marginBottom:30,
                backgroundColor: 'transparent',
                theme:{
                    stroke:'transparent',//银色边框
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: categories,
                gridLineWidth:0,
                tickWidth:0,
                lineWidth:0
            },
            yAxis: {
                lineWidth:2,
                title: {
                    text: '°C',
                    align:'high',
                    rotation:0,
                    x:60
                },
                // labels:{
                //     step:3
                // },
                gridLineWidth:0,
                tickInterval: 30,
                lineColor:'#a5acb1',
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    borderWidth:0,
                    width:10,
                    point: {
                        events: {
                            click: function() {

                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        color: colors[0],
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function() {
                            //return this.y +'%';
                            return '';
                        }
                    }
                }
            },
            legend:{
                enabled:false
            },
            tooltip: {
                enabled:false,
                // formatter: function() {
                //     return false;
                // }
            },
            series: [{
                name: '      ',
                data: data,
                color: '#ffffff',
                stroke: 'blue',
                strokeWidth: 2,
                lineWidth: 55
            }],
            exporting: {
                enabled: false
            }
        }).highcharts(); // return chart
    };

  //获取耗电量
  function getHaoDian(){
    $('#current_dian').text(0.5);
  }
  //展示预约或者剩余时间
  function showTime(){
    if(isYuYue){
      $('#appiontTime').css('color','#c7ced3');
      $('#lastTime').css('color','#353d43');
    }else{
      $('#appiontTime').css('color','#353d43');
      $('#lastTime').css('color','c7ced3');
    }
    $('#bigTime').text('12:00');
  }

  function refreshStatus(){
    setInterval(function(){getHaoDian();showTime();},1000*60);
  }

 	statusControl['init'] = function(){
    statusControl['drawCanvas'](1/4);
    var chartData = [{y:55,category:'12:00'},{y:44,category:'12:00'},{y:44,category:'12:00'},{y:22,category:'16:00'},
                     {y:55,category:'12:00'},{y:44,category:'12:00'},{y:44,category:'12:00'},{y:22,category:'16:00'},
                     {y:55,category:'12:00'},{y:44,category:'12:00'},{y:44,category:'12:00'},{y:22,category:'16:00'}];
    statusControl['drawCharts'](chartData);
 	}
  return statusControl;
});
