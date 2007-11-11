//TODO

ek.register("gui.calendar.Calendar");

ek.requireCSS("css.gui.calendar.Calendar", "calendar.cal1"); 

Calendar.prototype.version = "1.0";


// months as they appear in the calendar's title
Calendar.prototype.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
		"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// week day titles as they appear on the calendar
Calendar.prototype.days = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

/**
 *@vis public
 */
Calendar.prototype.getVersion = function (alert){
	if(alert)
		alert('Calendar.js => version: ' +this.version);
	else
		return this.version;
}

/**

 */
function Calendar (dom){

	this.parentDom = (typeof dom == "object")? dom : Dom.getElement(dom);

	this.currentDate = new Date();
	this.firstDayOfWeek = 1;
	
	this.rows = new Array(6);
	this.cells = new Array(6);
	for (var i = 0; i < this.cells.length; i++){
		this.cells[i] = new Array(7);
	}
	
	this.drawCalendar();
	
	this.fillCalendar();
		
} 
Calendar.prototype.drawCalendar = function(){
	table = Dom.createHTMLTableElement();
	this.drawMonthYearHeader(table);
	this.drawDays(table);	
	this.parentDom.appendChild(table);
}

Calendar.prototype.drawMonthYearHeader = function(tableDom){
	row = Dom.createHTMLTableRowElement();
	var str = this.months[this.currentDate.getMonth()];
	str += " " + (1900+this.currentDate.getYear());
	row.appendChild(Dom.createHTMLTableCellElement(str, null, null, this.days.length));
	tableDom.appendChild(row);
}

Calendar.prototype.drawDays = function(tableDom){
	this.drawDaysHeaders(tableDom);
	this.drawWeeks(tableDom);
}

Calendar.prototype.drawDaysHeaders = function(tableDom){
	row = Dom.createHTMLTableRowElement();
	for(var i = 0 ; i < this.days.length ; i++){
		col = (this.firstDayOfWeek + i) % 7;
		row.appendChild(Dom.createHTMLTableCellElement(this.days[col], "dayHeader"));
	}
	tableDom.appendChild(row);
}

Calendar.prototype.drawWeeks = function(tableDom){
	for(var i = 0 ; i < this.rows.length ; i++){
		row = Dom.createHTMLTableRowElement();
		this.drawWeekDay(i, row);
		//Store the row
		this.rows[i] = row;
		//Add the row to the table
		tableDom.appendChild(row);
	}
}
Calendar.prototype.drawWeekDay = function(rowIdx, weekDom){
	for(var i = 0 ; i < this.days.length ; i++){
		cell = Dom.createHTMLTableCellElement();
		this.cells[rowIdx][i] = cell;
		weekDom.appendChild(cell);
	}
}

Calendar.prototype.fillCalendar = function(){
	
	currentMonth = this.currentDate.getMonth();
	
	this.currentDate.setDate(1);
	startDay = this.currentDate.getDay();
	
	//Go back
	this.currentDate.setMonth(currentMonth-1);
	this.currentDate.setDate(31 - (startDay-1 - this.firstDayOfWeek));
	
	
	for(var i = 0 ; i < this.cells.length ; i++){
		
		for(var j = 0 ; j < this.cells[i].length ;j++){
			col = (this.firstDayOfWeek + j) % 7;
			if(this.currentDate.getDay() == col){
				this.cells[i][j].innerHTML = this.currentDate.getDate();
				this.cells[i][j].setAttribute("class", 
				this.getClassForCell(this.currentDate.getDay(), currentMonth ==this.currentDate.getMonth()));	
				//next day
				this.currentDate.setDate(this.currentDate.getDate()+1);
			}	
		}
	}
}
/** 
 *  
 */
Calendar.prototype.getClassForCell = function(day, sameMonth){
	if(sameMonth){
		if(day == 0 || day == 6){
			return "weekend";
		}else{
			return "day";
		}
	}else{
		return "anotherDay";
	}
}