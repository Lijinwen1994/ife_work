#任务15 [任务原地址](http://ife.baidu.com/2016/task/detail?taskId=15)
##任务描述
* 参考以下示例代码，读取页面上已有的source列表，从中提取出城市以及对应的空气质量
* 将数据按照某种顺序排序后，在resort列表中按照顺序显示出来<br/>
``` html
<ul id="source">
    <li>北京空气质量：<b>90</b></li>
    <li>上海空气质量：<b>70</b></li>
    <li>天津空气质量：<b>80</b></li>
    <li>广州空气质量：<b>50</b></li>
    <li>深圳空气质量：<b>40</b></li>
    <li>福州空气质量：<b>32</b></li>
    <li>成都空气质量：<b>90</b></li>
</ul>
``` 

需要将上列数据存入城市和空气质量值提取存入数组
    data = [
        ["北京", 90],
        ["北京", 90]
        ……
    ]

* 使用正则 str.match(/(\S*?)空气/) 提取城市名称 
* parseInt(str)提取数值
* data.sort(function(a1,a2) {return  a2-a1;});排序</br>

#demo预览https://lijinwen1994.github.io/ife_work/task-15/任务15.html
