
/dist/scripts/main.js为JavaScript源文件，
/dist/styles/main.css为样式表文件，

javaScript初始化方式：
var calendar = new Calendar({
	width: '200px',   //需要的日历宽度
	height: '20px',   //需要的日历高度
	choose:function(date){    //点选日期的回调函数
	}
});

HTML调用方法：
	<div id="lucas-calendar">
	</div>
	
需要jquery2.0+
