// JavaScript Document
$(function() {
	/*控制活动区域的整体切换*/
	$("#control ul li").each(function(index) {		/*遍历获取对象并传入索引值*/
		$(this).click(function() {/*对象点击事件*/

			newsWordTurn(index);	/*调用newsWordTurn参数*/
		});
	});
	function newsWordTurn(i){
		$(".message div:eq(" + i + ")").show()/*显示对应区域，*/
			.siblings().hide();/*隐藏其他同级区域*/
		$("#control ul li:eq(" + i + ")")
			.attr({style:"background:#999;border:1px solid #999"})/*给点击按钮添加灰色的样式*/
			.siblings().attr({style:"border:1px solid #666;;background:#FFF"});/*给其他未选中的3和按钮添加未选中样式*/
		$(".time-site div:eq(" + i + ")").show()/*显示相应的时间，地点区域*/
		.siblings().hide();
		$("#top-left").attr({style:"background-image:url(images/top-left-"+ i +".jpg) "});/*修改新世界上左区域的图片*/
		$("#bottom-right").attr({style:"background-image:url(images/bottom-right-"+ i +".jpg)"});/*修改新世界下右区域的图片*/

	}

  var currentIndex;//当前索引值
  var liTotal = $("#control ul>li").length;//当前按钮数量
  var ToDisplayPicNumber = 0;//当前自动轮播索引值 
  function autoDisplayPic(){
    ToDisplayPicNumber = (ToDisplayPicNumber + 1) % liTotal;
    $("#control ul>li").eq(ToDisplayPicNumber).trigger("click");
  }
  var interval = setInterval(function() {
    autoDisplayPic();
  },3000);

  $("#top-left").mouseover(function() {//鼠标移入图片清除定时器
      clearInterval(interval);
    }).mouseout(function() {
      interval = setInterval(function(){//鼠标移出图片恢复定时器
        autoDisplayPic();
      },3000);
    })


/*活动搜索的值切换*/
	 var arrData = { //定义一个数组保存相关数据
	    广东省:{ 
  			广州市:"荔湾区,越秀区,海珠区,天河区,芳村区,白云区,黄埔区,番禺市,花都市,增城市,从化市",
			深圳市:"罗湖区,福田区,南山区,宝安区,龙岗区,盐田区",
			珠海市:"香洲区,斗门区,金湾区",
			湛江市:"赤坎区,霞山区,坡头区,麻章区,竹溪县,徐闻县,廉江市,雷州市,吴川市"
  		},
 		河北省:{  
  			石家庄市:"深泽县,无极县,赵县",
  			唐山市:"玉田县,遵化市,迁安市"
  		},
  		山东省:{	
  			济南市:"历下区,市中区,槐荫区,天桥区,历城区,长清县,平阴县,济阳县,商河县,章丘市",
  			青岛市:"市南区,市北区,四方区,黄岛区,崂山区,李沧区,城阳区"
      	}
              
    };
   var i = 0;
   
    var selectValue = new Array;/*创建数组来存储提示内容*/
    $("#activity-search option").each(function(i){
    	selectValue[i] = $(this).html();
    	i++;
    });

   function setSelect(obj){
      var thisInput = obj; 
    	var index = $(thisInput).index();//利用index()函数获取传入的对象的索引值，匹配数组下标
    	 $(thisInput).html("<option >" + selectValue[index] + "</option>");
    };
    $.each(arrData,function(_provinse){/*遍历数组增加省份*/
    	$("#provinse").append("<option >"+_provinse+"</option>");
    });

    $("#provinse").change(function() {//省份列表改变事件
    	setSelect("#city");//当省份列表被修改，需要初始化后面2个列表内容
    	setSelect("#town");
      $.each(arrData,function(_provinse,content){
    		if($("#provinse option:selected").text() == _provinse){//对比省份
          $.each(content,function(_city,_town){
    				$("#city").append("<option>"+_city+"</option>");/*增加城市列表内容*/
    			});

    			$("#city").change(function() {//城市列表改变事件
    				setSelect("#town");//初始化区县
    				$.each(content,function(_city,_town){
    					if($("#city option:selected").text() == _city){//对比城市
    						$.each(_town.split(","),function() {
    							$("#town").append("<option>"+ this+"</option>");//增加区县列表内容
    						});
    					}
    				})
    			});
    		}
    	})
	 });

    

    




});

