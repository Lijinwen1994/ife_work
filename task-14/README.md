#[任务14](http://ife.baidu.com/2016/task/detail?taskId=14) <br/>
##要求
      var aqiData = [
      ["北京", 90],
      ["上海", 50],
      ["福州", 10],
      ["广州", 50],
      ["成都", 90],
      ["西安", 100]
    ];
将数组以，将提供的空气质量数据数组，按照某种逻辑（比如空气质量大于60）进行过滤筛选，最后将符合条件的数据按照一定的格式要求显示在网页上 </br> 
##[查看demo](https://lijinwen1994.github.io/ife_work/task-14/任务14.html "查看效果")。
* filter 过滤数据，return可支持链式调用。
* sort(function(a,b) {return a - b }) 可以支持按降序排列数据，并支持链式调用
* 使用forEach遍历并渲染dom
* 《JavaScript高级程序》提到 用字符串存储要渲染的标签以及文本，之后一次性写入目标中。 要比document.createElement快
