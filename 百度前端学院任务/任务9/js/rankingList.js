function returnRandom(range) {//返回随机数
	return Math.floor(Math.random() * range + 1000000)
}

function randerRanking() {//渲染表格
	var inherit = new rankingSupper();
	var data = paixu(inherit.source);
	console.log(data)
	var rankingShow = document.getElementById('rankingShow');
	var huanhang = 0;
	var row = null;
	for(var i = 0; i < 11; i++){
		row = rankingShow.insertRow();
		if(i == 0){
			var cell1 = row.insertCell(0);
			cell1.innerHTML = "排行"
			var cell2 = row.insertCell(1);
			cell2.innerHTML = "品牌"
			var cell3 = row.insertCell(2);
			cell3.innerHTML = "搜索指数";
			continue;
		}
		var cell1 = row.insertCell(0);
		cell1.innerHTML = (i);
		var cell2 = row.insertCell(1);
		cell2.innerHTML = data[i][0];
		var cell3 = row.insertCell(2);
		cell3.className = "indexWrap";
		cell3.innerHTML = "<div class='rankingNum'>" + data[i][1] + "</div> <div class='barBG'><div class='bar'></div></div>";
	}
}
function rankingSupper() {//数据原形
	this.source  = [
		["大众",returnRandom(6000000)],
		["丰田",returnRandom(6000000)],
		["奥迪",returnRandom(3000000)],
		["本田",returnRandom(5500000)],
		["福特",returnRandom(2800000)],
		["宝马",returnRandom(2000000)],
		["现代",returnRandom(2000000)],
		["起亚",returnRandom(2000000)],
		["日产",returnRandom(5000000)],
		["奔驰",returnRandom(1500000)],
		["别克",returnRandom(1000000)],
		["传祺",returnRandom(600000)],
		["BYD",returnRandom(1200000)],
		["北汽",returnRandom(500000)],
	]
}
rankingSupper.prototype = {
	color:["#A4D3EE","#f19e4e","#ee6e51"],//搜索指数滚动条的颜色
}
function paixu(data) {//排序数据（由高到低）
	var returnArray = data.sort(function(num1,num2){
		return num2[1] - num1[1];
	})
	return returnArray;
}
var flag = 1;
window.onscroll = function() {
	var scrollTop = document.body.scrollTop;//获取滚动条高度
	if(scrollTop > 400 && flag == 1){//滚动条达到400时执行内部函数
		var rankingShow = document.getElementById('rankingShow');
		var rankingShowAll = rankingShow.getElementsByTagName('*');
		var indexWrap = null;
		for(var i = 0; i < rankingShowAll.length; i++) {
			if(rankingShowAll[i].className == "indexWrap"){
				indexWrap = rankingShowAll[i];
				var num = indexWrap.childNodes[0].firstChild.nodeValue;
				var bar = indexWrap.childNodes[2].firstChild;
				bar.style.width = 0 + "px";
				barMove(bar,num);
			}
		}	
		flag = 0;	
	}
	if(scrollTop < 400){
		flag = 1;
	}
}
function barMove(bar,target) {
	var inherit = new rankingSupper();
	target = Math.floor(target / 10000 * 0.24);
	var timer = setInterval(function() {
		var speed = (target - parseInt(bar.style.width)) / 5;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(bar.style.width == target + "px"){
			window.clearInterval(timer)
		}else{
			bar.style.width = parseInt(bar.style.width) + speed + "px";
		}
	},60)
	bar.style.background = inherit.color[setBarColor(target)];
}
function setBarColor() {
	if(arguments[0] >= 100){
		return 2;
	}
	else if(arguments[0] < 100 && arguments[0] >= 70){
		return 1;
	}
	else if(arguments[0] < 70 && arguments[0] > 0){
		return 0;
	}	
}
function rankingOnload() {
	randerRanking();
}

rankingOnload();