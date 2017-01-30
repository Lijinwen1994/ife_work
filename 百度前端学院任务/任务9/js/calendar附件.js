function setMonth(year) {/*将返回全年的日期数据*/
	// var dat = new Date(year+"-01-01");
	var returnData = {
		"1月":setdata(year,1),//调用setData获取1月份数据
		"2月":setdata(year,2),
		"3月":setdata(year,3),
		"4月":setdata(year,4),
		"5月":setdata(year,5),
		"6月":setdata(year,6),
		"7月":setdata(year,7),
		"8月":setdata(year,8),
		"9月":setdata(year,9),
		"10月":setdata(year,10),
		"11月":setdata(year,11),
		"12月":setdata(year,12)
	};
	return returnData;
}
function setdata(_year,_month) {/*设置日期，将返回每个月每日的数据*/
	var returnMonth = {};
	var month = new Date(_year + "-" + _month +"-01");//获取每月的1日
	var dat = month;
	var curMonthDays = new Date(month.getFullYear(),(month.getMonth()+1),0).getDate();//获取每月的天数
	for(var i = 0; i < curMonthDays; i++) {
		returnMonth[dat.getDate()] = {
			day : dat.getDate(),//日期
			week : dat.getDay(),//周几
			CTC : GetLunarDay(dat.getFullYear(),(dat.getMonth()+1),dat.getDate())//调用CTC.js的方法获取农历
		}
		dat.setDate(dat.getDate()+1);//自增当月日期
	}
	return returnMonth;

}

function calendarSupper(){
	this.sourse = {
		2010:setMonth(2010),
		2011:setMonth(2011),
		2012:setMonth(2012),
		2013:setMonth(2013),
		2014:setMonth(2014),
		2015:setMonth(2015),//获取全年数据
		2016:setMonth(2016),
		2017:setMonth(2017),
		2018:setMonth(2018),
		2019:setMonth(2019),
		2020:setMonth(2020)
	}
}
// calendarSupper.prototype.dateSign = {//储存年，月标记
// 	"year":new Date().getFullYear(),//年份，输出如：2016
//     "month":new Date().getMonth()//基数为0。如9月，输出8
// }
calendarSupper.prototype = {
	dateSign : {
		year:new Date().getFullYear(),//年份，输出如：2016
	    month:new Date().getMonth()//基数为0。如9月，输出8		
	},
	yearClickSign : true,
	monthClickSign : true,
	timer :null
}

function praperaCalenderData() {//准备单月日历数据
	var inherit = new calendarSupper();/*继承*/

	var sourse = inherit.sourse;/*获取数据源*/
	var showDateData = {};
	var yearString = inherit.dateSign["year"];
	var monthString = (inherit.dateSign["month"] + 1) + "月";	
	for(var year in sourse) {
		if(year == yearString){
			var thisYear = sourse[year];
			for(var month in thisYear){
				if(month == monthString){
					showDateData = thisYear[month];
					break;
				}
			}
		}
	}
	randerCalender(showDateData);
}

function randerCalender(data){/*渲染表格*/
	//data的值为一整个月的数据
	var showTable = document.getElementById('calendarShow');
	// newLine 计算当月1号是星期几，如果是周六，则只需要打印2个td，所以将newLine 设置为2，在后面的生成tr的for循环中
	// 使用newLineSign自增来与newLine进行判断，如果2个变量相等，就换新的一行，
	// 同时在打印第二行时就将newLine值设置为7，来达到每行打印7个td的目的;

	showTable.innerHTML = "";
	var newLine = data[1]["week"] ? ((7-(data[1]["week"]))+1) : 1;//获取当月1号是星期几
	var newLineSign = 1;
	var emptyTd = 7 - newLine;//空Td的数量
	var praperaDiv = document.createElement("div");
	var thisYearDayNumAll = Object.keys(data).length;//获取对象属性的数量，即这个月的天数，用于解决打印空的第六行tr的bug  
	//keys可用getOwnProperyNames()代替，前者只输出可枚举属性，后者把不可枚举属性也输出了
	var daySign = 0;
	var tr = showTable.insertRow(0);
	for(var i = 0; i < emptyTd; i++){//为首行添加空的td以填充格式
		td = tr.insertCell(i);
		td.innerHTML = "";
	}
	for(var day in data){
		td = tr.insertCell();//插入新列(td)
		var clone = praperaDiv.cloneNode(false);//克隆准备好的空Div.克隆比createElement(div)要快
		clone.innerHTML = data[day]["CTC"];
		td.innerHTML = data[day]["day"];//写入日期
		td.appendChild(clone);
		daySign++;
		thisYearDayNumAll--;
		if(newLineSign == newLine){
			 if(thisYearDayNumAll != 0){//如果没有这个判断，在某些特殊的月份，比如2016年7月会打印6行tr,第六行tr是空的。
				tr = showTable.insertRow(showTable.length);
				newLineSign = 0;
				newLine = 7;				
			 }
		}
		newLineSign++;
	}
	//一般情况下，tr会有5行，但有这样一个情况，就是大月（31天）当月的1号是周六日，那么tr就有6行。
	//所以获取Tr的length,如果为6，日历的外包裹要增加42PX(一个td高度为42px)
	var trNum = showTable.getElementsByTagName('tr');
	if(trNum.length == 6) {
		var calendar = document.getElementById('calendar');
		calendar.style.height = 397 + "px";
	}
	if(trNum.length < 6) {//如果小于6行，恢复原来的5行的高度
		var calendar = document.getElementById('calendar');
		calendar.style.height = 355 + "px";
	}
}

function setConcrolShow() {//设置年份的控制菜单
	var yearShow = document.getElementById("yearShow");
	var monthShow = document.getElementById('monthShow');
	var dat = new Date();
	yearShow.innerHTML = dat.getFullYear() + "年";//设置年份
	yearShow.dataset.year = dat.getFullYear();//设置dataSet值
	monthShow.innerHTML = (dat.getMonth() + 1) + "月";
	monthShow.dataset.month = (dat.getMonth() + 1);
	yearHideList();
}

function yearHideList(){//写入年列表
	var yearList = document.getElementById('yearList');
	var inherit = new calendarSupper();
	var yearString = "";
	var flag = true;
	for(var year in inherit.sourse){//循环数据源找出年份
		yearString += "<div display='none'; data-year="+year+">"+year+"年</div>";
	}
	yearList.innerHTML = yearString;//将年份写入Dom中
	MonthHideList();
}

function yearShowHover() {	//点击年份菜单时的逻辑处理
	var inherit = new calendarSupper();
	var yearShow = document.getElementById("yearShow");
  	var yearList = document.getElementById("yearList");	
  	var countYearNum = Object.keys(inherit.sourse).length;//统计源数据有多少年的数据,用于设置年份下拉列表高度
  	var yearShowHeight = countYearNum * 19;//年份下拉列表高度
  	addEventHandler(yearShow,"click",function() {//为yearShow绑定点击事件
	// yearShow.onclick = function() {
		if(inherit.yearClickSign){
			inherit.yearClickSign = false;
			yearList.style.display = "block";
			yearList.style.height = 0 + "px";//js无法获取css值，所以预先设置一个height
			movement(yearList,yearShowHeight);//调用缓冲运动
			setTimeout(function() {
				var hideYearDiv = yearList.getElementsByTagName('div');
				for(var i = 0; i < hideYearDiv.length; i++) {
					hideYearDiv[i].style.display = "block";
				}
				changeYear();
			},500);
			
		}else{
			var hideYearDiv = yearList.getElementsByTagName('div');
			for(var i = 0; i < hideYearDiv.length; i++) {
				hideYearDiv[i].style.display = "none";
			}
			yearList.style.height = yearShowHeight + "px";
			movement(yearList,0);
			inherit.yearClickSign = true;
		}
	})
}

function changeYear() {
	var inherit = new calendarSupper();
	var yearShow = document.getElementById('yearShow');
	var yearList = document.getElementById("yearList");
	var hideYearDiv = yearList.getElementsByTagName('div');
	var monthShow = document.getElementById('monthShow');
	console.log(inherit.dateSign["year"]);
	for(var i = 0; i < hideYearDiv.length; i++) {
		hideYearDiv[i].onclick = function() {
			inherit.dateSign["year"] = parseInt(this.getAttribute("data-year"));//修改父类年份标记
			inherit.dateSign["month"] = parseInt(monthShow.getAttribute("data-month")-1);//修改父类月份标记
			yearShow.innerHTML = this.getAttribute("data-year") + "年";//修改年份菜单对应点击列表时的年份
			praperaCalenderData();//调用praperaCalenderDath函数，准备选中的年份数据以供渲染函数使用
			yearList.style.display = "none";
		}
	}
}

function MonthHideList() {//设置月份隐藏列表
	var inherit = new calendarSupper();
	var monthList = document.getElementById('monthList');	
	var yearShow = document.getElementById("yearShow");
	var yeardataSet = yearShow.dataset.year;//获取选中年份的dataset值
	var monthString = "";
	for(var year in inherit.sourse) {//循环数据源，找出选中年份对应的月份列表
		if(year == yeardataSet) {
			var thisYear = inherit.sourse[year];//将找到的选中年份的数据源赋值给thisYear
			for(var month in thisYear) {//循环thisYear,找到月份列表
				//month的值是"xx月",但设置dataset是最好只要月份的数字，
				//所以用正则表达式来筛选，但其返回的是数组，所以用toString()将数组转化成字符串，但转化成的字符串是“10,,”这类型的，所以用parseInt()将字符串转化成数字
				monthString += "<div data-month='"+parseInt(month.match(/[^月]*/g).toString())+"'>"+month + "</div>"; 
			}
			break;//跳出For循环
		}
	}
	monthList.innerHTML = monthString;//写入月份列表
}

function monthShowHover() {//点击月份菜单时的逻辑处理
	var inherit = new calendarSupper();	
	var monthShow = document.getElementById('monthShow');
	var monthList = document.getElementById('monthList');
	monthShow.onclick = function() {
		if(inherit.monthClickSign){
			inherit.monthClickSign = false;
			monthList.style.display = "block";
			monthList.style.height = 0 + "px";
			movement(monthList,230);//调用缓冲运动
			setTimeout(function() {
				var hideMonthDiv = monthList.getElementsByTagName('div');
				for(var i = 0; i < hideMonthDiv.length; i++) {
					hideMonthDiv[i].style.display = "block";
				}
			},500);
			changeMonth();
		}else{
			var hideMonthDiv = monthList.getElementsByTagName('div');
			for(var i = 0; i < hideMonthDiv.length; i++) {
				hideMonthDiv[i].style.display = "none";
			}
			monthList.style.height = 230 + "px";
			movement(monthList,0);
			inherit.monthClickSign = true;			
		}
	}
}

function changeMonth() {//月份列表改变逻辑处理
	var inherit = new calendarSupper();
	var monthList = document.getElementById("monthList");
	var hideMonthDiv = monthList.getElementsByTagName('div');
	var yearShow = document.getElementById('yearShow');
	var monthShow = document.getElementById('monthShow');
	for(var i = 0; i < hideMonthDiv.length; i++) {
		hideMonthDiv[i].onclick = function() {
			monthList.style.display = "none";
			monthShow.innerHTML =  parseInt(this.getAttribute("data-month")) + "月";
			inherit.dateSign["year"] = parseInt(yearShow.getAttribute("data-year"));
			inherit.dateSign["month"] = parseInt(this.getAttribute("data-month")-1);
			praperaCalenderData();
		}
	}
}

function clickDateToLeft() {//日期左箭头点击逻辑处理
	var inherit = new calendarSupper();
	var monthSign = 0;
	var yearSign  = 0;
	var yearShow = document.getElementById("yearShow");
	var monthShow = document.getElementById("monthShow");
	var toLeftBt = document.getElementById("dateToLeft");
	toLeftBt.onclick = function() {
		monthSign = inherit.dateSign["month"];//获取原型上记录的月份值
		yearSign = inherit.dateSign["year"];//获取原型上记录的年份值		
		// console.log(inherit.dateSign["month"])
		monthSign -= 1;//想左按钮每点一次，月份记录值减1
		console.log("monthSign"+monthSign);
		if(monthSign == 0){
			inherit.dateSign["month"] = 11;
			inherit.dateSign["year"] =  parseInt((yearSign - 1));		
			monthShow.innerHTML = 12 + "月";
			yearShow.innerHTML =(yearSign - 1) + "年";
			praperaCalenderData();
			return;
		}
		monthShow.innerHTML = (monthSign+1) + "月";
		inherit.dateSign["month"] = monthSign;//将新的月份值赋值给原型	
		console.log("后年"+inherit.dateSign["year"]);
		console.log("后月" + inherit.dateSign["month"]);
		praperaCalenderData();//调用准备数据的函数，
		//准备完数据后praperaCalenderData()会在函数内部调用渲染函数
	}
}

function clickDateToRight() {//日期左箭头点击逻辑处理
	var inherit = new calendarSupper();
	var monthSign = 0;
	var yearSign  = 0;
	var yearShow = document.getElementById("yearShow");
	var monthShow = document.getElementById("monthShow");
	var toRightBt = document.getElementById("dateToRight");
	toRightBt.onclick = function() {
		monthSign = inherit.dateSign["month"];//获取原型上记录的月份值
		yearSign = inherit.dateSign["year"];//获取原型上记录的年份值		
		// console.log(inherit.dateSign["month"])
		monthSign += 1;//想左按钮每点一次，月份记录值减1
		console.log("monthSign"+monthSign);
		if(monthSign == 11){
			inherit.dateSign["month"] = 0;
			inherit.dateSign["year"] =  parseInt((yearSign + 1));		
			monthShow.innerHTML = 1 + "月";
			yearShow.innerHTML =(yearSign + 1) + "年";
			praperaCalenderData();
			return;
		}
		monthShow.innerHTML = (monthSign+1) + "月";
		inherit.dateSign["month"] = monthSign;//将新的月份值赋值给原型	
		console.log("后年"+inherit.dateSign["year"]);
		console.log("后月" + inherit.dateSign["month"]);
		praperaCalenderData();//调用准备数据的函数，
		//准备完数据后praperaCalenderData()会在函数内部调用渲染函数
	}
}

function returnToday() {//返回今天
	var returnTodayBT = document.getElementById("comeBakeToday");
	var yearShow = document.getElementById("yearShow");
	var monthShow = document.getElementById("monthShow");
	returnTodayBT.onclick = function() {
		var inherit = new calendarSupper();
		var dat = new Date();
		inherit.dateSign["year"] = dat.getFullYear();
		inherit.dateSign["month"] = dat.getMonth();
		yearShow.innerHTML = inherit.dateSign["year"] + "年";
		monthShow.innerHTML = (inherit.dateSign["month"] + 1) + "月";
		praperaCalenderData();
	}
}
function movement(element,_height) {//缓冲运动
	var inherit = new calendarSupper();
	var transition = 0;
	clearInterval(inherit.timer);		
		inherit.timer = setInterval(function() {
			var speed = (_height-parseInt(element.style.height))/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(parseInt(element.style.height) == _height){
				window.clearInterval(inherit.timer);
			}else{
				element.style.height = parseInt(element.style.height) + speed + "px";
			}
		},30)		
}
function addEventHandler(target,type,func){ //夸浏览器绑定方法
  if(target.addEventListener){ 
    //监听IE9，谷歌和火狐 
    target.addEventListener(type, func, false); 
  }else if(target.attachEvent){ 
    target.attachEvent("on" + type, func); 
  }else{ 
    target["on" + type] = func; 
  }  
} 
function calendarOnload(){//用来放页面加载完成时执行的函数
	praperaCalenderData();//执行准备数据的函数
	setConcrolShow();//预设设置控制菜单的选项
	yearShowHover();//为年份菜单添加点击监听事件
	monthShowHover();//为月份菜单添加点击监听事件
	clickDateToLeft();//月份向左箭头添加监听事件
	clickDateToRight();//月份向右箭头添加监听事件
	returnToday();
}
calendarOnload();