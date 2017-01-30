var data = function(){
	this.colorArray = ["#43b29d","#388ac1","#cf4a36","#e2cd46"];/*绿，蓝，红，黄*/	
	this.colorSign = function() {/*根据生成的数据值返回颜色标记*/
		var Colorsign = [];
		for(var i = 0; i < this.source.length; i++){
			if(this.source[i] > 100000 && this.source[i] < 110000){
				Colorsign.push(0);
			}else if(this.source[i] > 110000 && this.source[i] < 120000){
				Colorsign.push(1);			
			}else if(this.source[i] > 120000 && this.source[i] < 130000){
				Colorsign.push(2);				
			}else if(this.source[i] > 130000 && this.source[i] < 140000){
				Colorsign.push(3);				
			}
		}
		return Colorsign;
	}
}
data.prototype.source = buildData();/*为了让各函数共享信息，将数据源添加到data的原型中*/

function buildData() {
	var returnData = [];
	for(var i = 0; i < 4; i++){
		returnData[i] = Math.floor(Math.random() * 40000 + 100000);
	}	
	return returnData;
}

function createCountTitle() {//创建标题
	var target = document.getElementById('countTitle');
	var dat = new Date();
	var year = dat.getFullYear();
	var month = dat.getMonth();
	target.lastChild.nodeValue = year + "年" + month + "月份统计";
}
var buildDiv = function() {//渲染表格
	var thisData = new data();//实例化data();
	var wrap = document.getElementById('countShow');
	var contentText = "";
	var colorSign = thisData.colorSign();//获取颜色标记数组
	// thisData.source.forEach(function(num) {//由于IE8 不支持forEach,只能用for循环取代
	// 	contentText += "<div><dl><dt>" + num + "</dt><dd>成交量</dd></dt><div> </div></div>"
	// })
	for(var i = 0 ;i< thisData.source.length; i++){
		contentText += "<div><dl><dt>" + thisData.source[i] + "</dt><dd>成交量</dd></dt><div> </div></div>"
	}
	wrap.innerHTML = contentText;
	for(var i = 0; i < 4; i++){
		wrap.childNodes[i].childNodes[0].lastChild.style.backgroundColor = thisData.colorArray[colorSign[i]];
		wrap.childNodes[i].style.borderLeftColor = thisData.colorArray[colorSign[i]];
	}	
}

function onload(){
	createCountTitle();
	buildDiv();
}
onload();