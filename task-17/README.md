#任务17 [任务发布地址](http://ife.baidu.com/2016/task/detail?taskId=17)
##任务描述
 将数据实现可视化。
##学到的东西
 所有城市数据都使用JavaScriceData`提取相应数据，存储到`charData`中，pt 随机函数生成了100天数据，储存在`aqiSourceData`数据源中，根据用户的选择（城市,日期）再从数据源`aqiSour
  并进行渲染，期间遇到的问题
* 随机生成的数据为单日数据，选择中有日，周，月。期中周和月是不能盲目计算的。
  * 一周有7天，但总天数未必能整除7，所以得求出余数，保证最后一周的数据准确，
  * 月份分大月31天，小月30天。还有闰月2月。需要获得当月天数，才能计算。获取方法


    getDate() 方法可返回月份的某一天。取值范围是1~31<br>
    如果是0的话，就返回最后一天。这样就能取得当月的天数了<br>
    比如获取16年2月份的天数<br>
```javascript
  var  day = new Date(2016,2,0);
  var daycount = day.getDate();
  alert(daycount);//29
```




##预览demo https://lijinwen1994.github.io/ife_work/task-17/任务17.html
