var monitordata = [];
var monitorstatus = "success";
var statuses = "正常";
//var refreshtime = 300; //How often to refresh in seconds
// KEY
var monitorskey = [
	'm779374787-4f7d1fd2c7317e6ef4973780', //blog
	'm779381938-48d282623b9ce8df15c373b2'  //st
];
function display(data) {
	$("#uptimerobot").html("");
    $.each(data, function( index, value ){
		// 判断服务是否正常，对应选择绿、黄、红CSS样式及文字
        if (value['monitors'][0]['status'] == 9) {monitorstatus = "danger";statuses = "宕机";}
        else if (value['monitors'][0]['custom_uptime_ratio'] <= 95 || value['monitors'][0]['status'] == 8) {monitorstatus = "warning";statuses = "异常";}
        else {monitorstatus = "success";statuses = "正常";}
		// 输出HTML
        $("#uptimerobot").append('<div class="col-lg-6 col-sm-6"><div class="panel panel-success"><div class="panel-heading">' + value['monitors'][0]['friendly_name'] + ' - ' + value['monitors'][0]['average_response_time'] + 'ms</div><div class="panel-body">服务器' + statuses + '，本周 ' + value['monitors'][0]['custom_uptime_ratio'] + '% 可用<br/><br/><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" style="width:' + parseInt(value['monitors'][0]['custom_uptime_ratio']) + '%"></div><div class="progress-bar progress-bar-danger" role="progressbar" style="width:' + (100- parseInt(value['monitors'][0]['custom_uptime_ratio'])) + '%"></div></div></div></div></div>');
    });
    $("#uptimerobot").show();
    monitordata.length = 0;
}
// 数据合并
function jsonUptimeRobotApi(data) {
  monitordata.push(data);
  if (monitordata.length >= monitorskey.length) {
      display(monitordata);
  }
}
// 获取uptimerobot数据（V2）
function load() {
  $("#uptimerobot").hide();
  $.each(monitorskey, function (index, value) {
    $.ajax({
      type: 'POST',
      url: 'https://api.uptimerobot.com/v2/getMonitors',
      data: {
        'api_key': value, //KEY
        'format': 'json', //数据格式
        'response_times': '1', //响应时间数据
        'response_times_average': '1', //响应时间平均值
        'custom_uptime_ratios': '7', //计算正常运行时间比例的天数
		'all_time_uptime_ratio': '0' //全部正常运行时间比例
      },
      dataType: 'json' ,
      success: function (data) {
          jsonUptimeRobotApi(data);
      },
      error: function() { 
          console.log("请求数据失败");
      }
    });
  });
}

/*
function load() {
  $("#uptimerobot").hide();
  console.log(monitorskey.length);
  for (var fordata=0; fordata < monitorskey.length; fordata++){
	  console.log(fordata);
    $.ajax({
      type: 'POST',
      url: 'https://api.uptimerobot.com/v2/getMonitors',
      data: {
        'api_key': monitorskey[fordata], //KEY
        'format': 'json', //数据格式
        'response_times': '1', //响应时间数据
        'response_times_average': '1', //响应时间值
        'custom_uptime_ratios': '7', //计算正常运行时间比例的天数
		'all_time_uptime_ratio': '0' //全部正常运行时间比例
      },
      dataType: 'json' ,
      success: function (data) {
          jsonUptimeRobotApi(data);
		  console.log(data);
      },
      error: function() { 
          console.log("请求数据失败");
      }
    });
  }
}
*/
/*
// 获取uptimerobot数据（V1）
function load() {
    $("#uptimerobot").hide();
    $.each(monitors, function( index, value ){
        $.ajax({
            dataType: 'jsonp',
            url: "https://api.uptimerobot.com/getMonitors?apiKey=" + value + "&format=json&responseTimes=1&responseTimesAverage=1&customUptimeRatio=14",
             async: false,
             cache: false,
      
        });
    });
}
*/
// 自动刷新
//var counter = refreshtime;
$(document).ready(function(){
    load();
//	display();
/*    window.setInterval(function(){
        if (counter > 0) {
            $("#reloading-message").html("Reloading in " + counter + " second" + (counter != 1 ? 's' : ''));
            counter -= 1;
        } else {
            counter = refreshtime;
            load();
        }
    }, 1000);
*/
});
