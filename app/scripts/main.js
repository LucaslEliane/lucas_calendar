var Calendar = function(option) {

	//element
	this.divElement;
	this.table = [];
	this.monthTable = [];
	this.calendarElement;	
	this.size = {
		width: option.width,
		height: option.height
	};
	this.callback = option.choose;
	this.button = {};
	this.panel;


	

	//date information
	this.nowDate = new Date(Date.now());
	this.pageDate = this.nowDate;
	//current day's information object
	this.dateInfo = {
		date:0,
		month:0,
		year:0,
		dateOfMonth:0,
		dayOfWeek:0,
		firstDayOfThisMonth:0
	};



	this.calendarElement = this.createCalendar();	//input area
	this.panel = this.createPanel();				//toggle menu
	this.monthPanel = this.createMonthPanel();
	this.setFontSize();								//set the font size of calendar
	this.setDateInformation(this.nowDate,this.dateInfo);	//set the information of date
	this.calendarFill(this.dateInfo,this.table);	//fill the calendar content

	this.bind();									//bind the event solving function
	
}
/**
 * create the calendar input text area
 * @return {DOM element} input element
 */
Calendar.prototype.createCalendar = function() {
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("lucas-calendar")) {
		return false;
	}
	this.divElement = document.getElementById("lucas-calendar");
	var input = document.createElement('input');
	input.setAttribute("class","lucas-calendar");
	input.setAttribute("name","lucas-calendar");
	this.divElement.appendChild(input);
	return input;
}
/**
 * set the font size of the calendar
 */
Calendar.prototype.setFontSize = function() {
	//font size of input area
	this.divElement.style.width = this.size.width;
	this.calendarElement.style.width = this.size.width;
	this.calendarElement.style.height = this.size.height;
	this.calendarElement.style.fontSize = parseInt(this.size.height)*0.6+"px";
	this.panel.style.fontSize = parseInt(this.size.height)*0.4 + "px";
	console.log(this.calendarElement.style.fontSize);
	console.log(window.getComputedStyle(this.calendarElement,null).fontSize);
	console.log(window.getComputedStyle(this.panel,null).fontSize);

	//font size of the calendar date area
	this.panel.style.fontSize = window.getComputedStyle(this.table[1],null).height;
}
/**
 * create the day showing panel of the calendar
 * @return {DOM element} the day's panel element
 */
Calendar.prototype.createPanel = function() {
	var panel = document.createElement("div");
	panel.setAttribute("class","lucas-calendar-panel");
	panel.setAttribute("name","lucas-calendar-panel");
	panel.style.width = parseInt(this.size.width)*1.01+"px";
	panel.style.height = parseInt(this.size.width)*1.2+"px";
	this.divElement.appendChild(panel);
	
	this.createButton(this.button,panel);
	this.createContent(panel,7,7);
	
	$(panel).hide();
	return panel;
}
/**
 * create the Button
 * @param  {object} button the button group
 * @param  {DOM   } panel  the day's panel div
 */
Calendar.prototype.createButton = function(button,panel) {
	var buttonGroup = document.createElement('div');
	buttonGroup.setAttribute("class","lucas-calendar-buttonGroup");
	buttonGroup.setAttribute("name","lucas-calendar-buttonGroup");

	panel.appendChild(buttonGroup);
	this.createButtonHelp('left',button,buttonGroup);
	this.createButtonHelp('right',button,buttonGroup);
	this.createButtonHelp('YandM',button,buttonGroup);

}
/**
 * create button function helper
 * @param  {String} content     name of button
 * @param  {object}	button      button object
 * @param  {DOM element} buttonGroup buttonGroup DOM element
 */
Calendar.prototype.createButtonHelp = function(content,button,buttonGroup) {
	button[content] = document.createElement('button');
	button[content].setAttribute('class','calendar-button-'+content);
	buttonGroup.appendChild(button[content]);
}
/**
 * create date selecting table
 * @param  {DOM element} panel   toggle panel
 * @param  {int} rows    rows of calendar
 * @param  {int} columns columns of calendar
 */
Calendar.prototype.createContent = function(panel,rows,columns) {
	var table = document.createElement('table');
	var table_rows = [];
	var table_body,
		table_head,
		td_temp,
		table_position = 1,
		weekString = ['一','二','三','四','五','六','日'];
	table.setAttribute('cellspacing',0);
	table.setAttribute('cellpadding',0);
	table_body = document.createElement('tbody');
	table_head = document.createElement('thead');
	for (var i = 0; i < rows; i++) {
		if (i === 0) {
			table_rows[i] = document.createElement('tr');
			for (var j = 0; j < columns; j++) {
				td_temp = document.createElement('th');
				td_temp.textContent = weekString[j];
				table_rows[i].appendChild(td_temp);

			}
			table_head.appendChild(table_rows[i]);
			table.appendChild(table_head);
		} else {
			table_rows[i] = document.createElement('tr');
			table_body.appendChild(table_rows[i]);
			for (var k = 0; k < columns; k++) {
				td_temp = document.createElement('td');
				table_rows[i].appendChild(td_temp);
				this.table[table_position++] = td_temp;
			}	
		}

	}
	table.appendChild(table_body);
	panel.appendChild(table);
}
Calendar.prototype.createMonthPanel = function() {
	var panel = document.createElement("div");
	panel.setAttribute("class","lucas-calendar-monthPanel");
	panel.setAttribute("name","lucas-calendar-monthPanel");
	panel.style.width = parseInt(this.size.width)*1.01+"px";
	panel.style.height = parseInt(this.size.width)*0.9+"px";
	this.divElement.appendChild(panel);

	$(panel).hide();
	this.createMButton(this.button,panel);
	this.createMonthContent(panel,3,4);

	return panel;
}
Calendar.prototype.createMonthContent = function(panel,rows,columns) {
	var table = document.createElement('table');
	var month_table_rows = [];
	var table_body = document.createElement('tbody'),
		table_position = 1;
	table.setAttribute('cellspacing',0);
	table.setAttribute('cellpadding',0);
	for (var i = 0; i < rows; i++) {
		month_table_rows[i] = document.createElement('tr');
		for (var j = 0; j < columns ; j++) {
			this.monthTable[table_position] = document.createElement('td');
			this.monthTable[table_position].textContent = table_position+"月";
			month_table_rows[i].appendChild(this.monthTable[table_position++]);
		}
		table_body.appendChild(month_table_rows[i]);
	}

	table.appendChild(table_body);
	panel.appendChild(table);	
}
Calendar.prototype.createMButton = function(button,panel) {
	var buttonGroup = document.createElement('div');
	buttonGroup.setAttribute("class","lucas-calendar-buttonGroup");
	buttonGroup.setAttribute("name","lucas-calendar-buttonGroup");

	panel.appendChild(buttonGroup);
	this.createButtonHelp('mleft',button,buttonGroup);
	this.createButtonHelp('mright',button,buttonGroup);
	this.createButtonHelp('month',button,buttonGroup);

}
/**
 * bind the event solve function
 */
Calendar.prototype.bind = function() {
	var that = this;
	this.calendarElement.addEventListener('focus',function(event){
		$('#lucas-calendar').find('.lucas-calendar-panel')
			.fadeIn(800,'linear');

		that.setDateInformation(that.pageDate,that.dateInfo);
	});
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest('#lucas-calendar').length == 0){
			$('#lucas-calendar').find('.lucas-calendar-panel').fadeOut('slow');
		}
		e.stopPropagation();
	});
	$('#lucas-calendar').on('mouseenter mouseleave','td,th',function(event){
		if(event.type === 'mouseenter') {
			$(this).css('border-color','white');
		} else {
			$(this).css('border-color','#343434');
		}
	});

	this.button.left.addEventListener('click',function(event){

		
		that.pageDate.setMonth(that.dateInfo.month-2);
		that.setDateInformation(that.pageDate,that.dateInfo);
		that.calendarFill(that.dateInfo,that.table);
	});
	this.button.right.addEventListener('click',function(event){

		
		that.pageDate.setMonth(that.dateInfo.month);
		that.setDateInformation(that.pageDate,that.dateInfo);
		that.calendarFill(that.dateInfo,that.table);
	});
	this.button.mleft.addEventListener('click',function(event){

		that.pageDate.setYear(that.dateInfo.year-1);
		that.setDateInformation(that.pageDate,that.dateInfo);
		that.calendarFill(that.dateInfo,that.table);
	});
	this.button.mright.addEventListener('click',function(event){
		that.pageDate.setYear(that.dateInfo.year+1);
		that.setDateInformation(that.pageDate,that.dateInfo);
		that.calendarFill(that.dateInfo,that.table);
	});
	this.button.YandM.addEventListener('click',function(event){
		$(".lucas-calendar-panel").animate({
			height: "toggle",
			opacity:"toggle"
		},400,'linear').promise().done(function(){
			$(".lucas-calendar-monthPanel").animate({
				height: "toggle",
				opacity: "toggle"
			},400,'linear');
		});
	});
	for (var i = 1; i < this.table.length; i++) {
		(function(that){
			that.table[i].addEventListener('click',function(event){
				var monthStr,
					dayStr;
				if (that.dateInfo.month<10) {
					monthStr = '0' + that.dateInfo.month;
				} else {
					monthStr = that.dateInfo.month;
				}
				if (event.target.textContent<10) {
					dayStr = '0' + event.target.textContent;
				} else {
					dayStr = event.target.textContent;
				}
				var str = that.dateInfo.year + "-" +
					monthStr + "-" +
					dayStr;
				if (event.target.textContent === "") {
					str = "";
				}

				that.calendarElement.value = str;
				that.callback(str);
				$('#lucas-calendar').find('.lucas-calendar-panel')
					.fadeOut('slow');
			});
		})(this);
	}

	for (var j = 1; j < this.monthTable.length; j++) {
		(function(that){
			that.monthTable[j].addEventListener('click',function(event){
				that.pageDate.setMonth(parseInt(event.target.textContent)-1);
				that.setDateInformation(that.pageDate,that.dateInfo);
				that.calendarFill(that.dateInfo,that.table);
				$(".lucas-calendar-monthPanel").animate({
					height: "toggle",
					opacity:"toggle"
				},400,'linear').promise().done(function(){
					$(".lucas-calendar-panel").animate({
						height: "toggle",
						opacity: "toggle"
					},400,'linear');
				});
			});
		})(this);
	}
}
Calendar.prototype.setDateInformation = function(date,dateInfo) {
	dateInfo.date = date.getDate();
	dateInfo.month = date.getMonth()+1;
	dateInfo.year = date.getYear()+1900;
	dateInfo.dayOfWeek = date.getDay();
	switch(dateInfo.month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			dateInfo.dateOfMonth = 31;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			dateInfo.dateOfMonth = 30;			
			break;
		case 2:
			if(dateInfo.year % 4 === 0){
				dateInfo.dateOfMonth = 29;
			} else {
				dateInfo.dateOfMonth = 28;
			}
	}
	var firstDayOfThisMonth = date;
	firstDayOfThisMonth.setDate(1);
	
	dateInfo.firstDayOfThisMonth = firstDayOfThisMonth.getDay()?firstDayOfThisMonth.getDay():7;

}
Calendar.prototype.calendarFill = function(dateInfo,table) {
	for (var j = 1; j < table.length; j++) {
		table[j].textContent = "";
	}
	for (var i = 0 ; i < dateInfo.dateOfMonth ; i++) {
		table[dateInfo.firstDayOfThisMonth+i].textContent = i+1;
	}
	this.button.YandM.textContent = dateInfo.year+"年"+dateInfo.month+"月";
	this.button.month.textContent = dateInfo.year+"年";
}
var calendar = new Calendar({
	width: '200px',
	height: '20px',
	choose:function(date){
	}
});