var ProjectData = {//数据源
	"项目一":{
		"价格":buildData("①"),
		"负责人":returnResponsibler()
	},
	"项目二":{
		"价格":buildData("②"),
		"负责人":returnResponsibler()
	},
	"项目三":{
		"价格":buildData("③"),
		"负责人":returnResponsibler()
	},
	"项目四":{
		"价格":buildData("④"),
		"负责人":returnResponsibler()
	},
	"项目五":{
		"价格":buildData("⑤"),
		"负责人":returnResponsibler()
	}
}
function projectSupper(){//项目的超类
	this.ProjectTitle = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五", 
	"十六","十七","十八","十九","二十","二十一","二十二","二十三","二十四"];
	this.responsibler = ["小A","小B","小C","小D","小E","李进文"];
	//因为有2个函数用到用showProjectDetails(),所以将其封装到超类中,
	//切换项目时在右边展示栏中预设表格第一个数据
	this.showProjectDetails = function(td) {
		var price = document.getElementById('price');
		var leader = document.getElementById('leader');
		var materialName = document.getElementById('materialName');
		materialName.innerHTML = td.innerHTML;		
		price.innerHTML = "<h4>价格</h4> ￥"+td.getAttribute("data-prices");
		leader.innerHTML = "<h4>负责人</h4>" +td.getAttribute("data-leading");			
	}

}
function buildData(sign) {//返回价格等数据
	var inherit = new projectSupper();
	var returnArray = {};
	for(var i = 0; i < 24; i++){
		returnArray[sign+"材料"+inherit.ProjectTitle[i]] = returnPrice();  
	}
	return returnArray;
}
function returnResponsibler() {//返回负责人
	var inherit = new projectSupper();
	var randomNum = Math.floor(Math.random() * 6);
	return inherit.responsibler[randomNum];
}
function returnPrice() {//返回随机生成的价格
	return Math.floor(Math.random() * 1000 + 1000);
}


function randerProject() {//渲染项目的表格
	var title = document.getElementById('projectTitle');
	var table = document.getElementById('projectTable');
	var titleContent = "";
	var cell = 0;//为换行做准备
	var datasetNum = 0;		
	for(var project in ProjectData) {
		titleContent += "<h4 data-sign = "+datasetNum+">"+project+"</h4>";
		datasetNum++;
		var _projectObject = ProjectData[project];
		var material = _projectObject["价格"];
		var leading = _projectObject["负责人"];
		var createTable = document.createElement("table");
		var x = createTable.insertRow(0);		
		for(var price in material){
			y = x.insertCell(cell);
			y.innerHTML = price;//设置项目
			y.dataset.prices = material[price];//设置价格
			y.dataset.leading = leading;//设置负责人
			cell++;
			if(cell == 4) {
				cell = 0;
				rows = createTable.rows.length;
				x = createTable.insertRow(rows);
			}
		}
		table.appendChild(createTable);
	}
	title.innerHTML = titleContent;
}
function tableOperation() {//显示每个材料的详细信息在右栏
	var inherit = new projectSupper();
	var LeftTitle = document.getElementById('projectLeftTitle');
	var RightTitle = document.getElementById("projectRightTitle");
	var title = document.getElementById('projectTitle');
	var table = document.getElementById('projectTable');
	var presetDetail = table.childNodes[0].childNodes[0].firstChild.firstChild;
	inherit.showProjectDetails(presetDetail);
	for(var i = 0; i < table.childNodes.length; i++) {//先隐藏所有表格
		table.childNodes[i].style.display = "none";
	}
	table.childNodes[0].style.display = "block";//显示第一个表格
	title.childNodes[0].className = "projectChecked";

	for(var i = 0; i < title.childNodes.length; i++){//项目的样式切换
		title.childNodes[i].onclick = function() {
			for(var j = 0; j < 5; j++){
				title.childNodes[j].className = "";//点击时，隐藏所有项目标题
				table.childNodes[j].style.display = "none";//点击时，隐藏所有项目列表
			}
			this.className = "projectChecked";//显示选中的标题
			var sign = this.dataset.sign;//获取dataSet标记
			table.childNodes[sign].style.display = "block";//根据项目标记显示相应的表格
			LeftTitle.innerHTML = "第"+inherit.ProjectTitle[sign]+ "组项目";//切换左栏相应标题
			RightTitle.innerHTML = "第"+inherit.ProjectTitle[sign]+ "组项目";//切换右栏相应标题
			var thisTd = table.childNodes[sign].childNodes[0].firstChild.firstChild;
			inherit.showProjectDetails(thisTd);
		}
	}
}
function tdOpeartion() {
	var inherit = new projectSupper();
	var table = document.getElementById('projectTable');
	var all = [];
	var all = table.getElementsByTagName('*');//获取table所有元素
	var tdAll = [];
	for(var i = 0; i < all.length; i++) {//筛选出Td
		if(all[i].nodeName == "TD"){
			tdAll.push(all[i]);
		}
	}
	for(var i = 0; i < tdAll.length; i++){
		var thisTd = tdAll[i];	
		 thisTd.onmouseover = function() {
		   	inherit.showProjectDetails(this);
		 }
	}
}

randerProject();
tableOperation();
tdOpeartion();

