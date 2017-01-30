function randomBuildData() {/*生成数据*/
	var returnData = [];
	var dat = new Date();
	var datStr = "";
	for (var i = 0; i < 24; i++){
		datStr = getDataStr(dat);
		returnData[datStr] = Math.floor(Math.random()*10+10) * 100;
		dat.setHours(dat.getHours()+1);
	}
	return returnData;
}

function getDataStr(dat) {/*返回时间格式*/
	var h = dat.getHours();
	var returnH = "";
	if(h == 10 || h == 11 || h == 22 || h == 23) {
		returnH = h <= 11 ? h + ":00 am" : (h-12) +":00 pm";
	}
	else{
		returnH = h <= 11 ? "0" + h + ":00 am" : "0"+(h-12) +":00 pm";
	}
	return returnH;
}
function rander(showData) {/*渲染表格*/
	var history = document.getElementById('history');
	var contentText = "";	
	for(var i = 0; i<showData.length; i++){
		contentText += showData[i];
	}
	history.innerHTML = contentText;
}
function returnShowData(max) {/*生成数据*/
	var showData = new Array(6);	
	var i = 0;
	var sub = 0;
	var source = randomBuildData();
	var min = max - 6;
	for(time in source){
		i++;
		if(i > min && i <= max){
			showData[sub] = ( "<div><dl><dt>"+time+"<dd>￥<span>"+source[time]+"</span></dd></dt></dl></div>");
			sub++;		
		};	
	}
	rander(showData);
}
var turnHistorySignArray = [6,12,18,24];
var historySign =0;
function eventClickleft() {/*左向按钮绑定点击事件*/
	var left = document.getElementById('queryLeft');
	addEventHandler(left,"click",function(){
		historySign = historySign-1;
		if(historySign < 0){
			historySign = 3;
		}
		returnShowData(turnHistorySignArray[historySign])
	})
}
function eventClickRight() {/*右向按钮绑定点击事件*/
	var right = document.getElementById('queryRight');
	addEventHandler(right,"click",function(){
		historySign = historySign+1;
		if(historySign > 3){
			historySign = 0;
		}
		returnShowData(turnHistorySignArray[historySign])
	})
}
function addEventHandler(target,type,func){ /*跨浏览器监听事件*/
  if(target.addEventListener){ 
    //监听IE9，谷歌和火狐 
    target.addEventListener(type, func, false); 
  }else if(target.attachEvent){ 
    target.attachEvent("on" + type, func); 
  }else{ 
    target["on" + type] = func; 
  }  
} 
function onload(){
	returnShowData(6);
	eventClickleft();
	eventClickRight();
}
onload();