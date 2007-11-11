ek.require("gui.event.KeyListener");
ek.require("gui.layout.TabbedPane");

ek.register("gui.tools.Logger");

ek.requireCSS("css.gui.tools.Logger", "tools.Logger");

//EXPLODE IN THREE FILE

Logger.prototype.version = "1.0";
/** 
 * Define the singleton
 */ 
function getLoggerManager(){
	if(!top.loggerMgr){
		top.loggerMgr = new LoggerManager();	
	}
	return top.loggerMgr;
}
function getLogger(appenderName){
	return getLoggerManager().getLogger(appenderName);
}

function LoggerManager() {
	this.loggers = new Array();
	this.visible = true;
	this.tabbedPane = new TabbedPane('debug');
	this.toggleVisibility();
	//Show Hide Log Panel ShortCut ==> Alt + L
	getKeyListener().add(76, "getLoggerManager().toggleVisibility()", false, false, true);//alt + L
	//Manage Generic LogLevel
	getKeyListener().add(48, "getLoggerManager().setLevel(Logger.LEVEL_NONE)", false, false, true);//Shift + Ctrl + 0
	getKeyListener().add(49, "getLoggerManager().setLevel(Logger.LEVEL_TRACE)", false, false, true);//Shift + Ctrl + 1
	getKeyListener().add(50, "getLoggerManager().setLevel(Logger.LEVEL_DEBUG)", false, false, true);//Shift + Ctrl + 2
	getKeyListener().add(51, "getLoggerManager().setLevel(Logger.LEVEL_INFO)", false, false, true);//Shift + Ctrl + 3
	getKeyListener().add(52, "getLoggerManager().setLevel(Logger.LEVEL_WARN)", false, false, true);//Shift + Ctrl + 4
	getKeyListener().add(53, "getLoggerManager().setLevel(Logger.LEVEL_ERROR)", false, false, true);//Shift + Ctrl + 5
	getKeyListener().add(54, "getLoggerManager().setLevel(Logger.LEVEL_FATAL)", false, false, true);//Shift + Ctrl + 6
	getKeyListener().add(57, "getLoggerManager().setLevel(Logger.LEVEL_ALL)", false, false, true);//Shift + Ctrl + 9
	
}
LoggerManager.prototype.toggleVisibility = function(){
	this.tabbedPane.mainPanel.style.display = (this.visible) ? "none" : "";
	this.visible = !this.visible;
}
LoggerManager.prototype.getLogger = function(appenderName){
	if(appenderName){
		if(!this.loggers[appenderName]){
			this.tabbedPane.addTab(appenderName, "");
			this.loggers[appenderName] = new Logger(appenderName, this);
		}
		return this.loggers[appenderName];
	}else{
		if(this.loggers["default"]){
			this.loggers["default"] = new Logger("default", this);
		}
		return this.loggers["default"];
	}
}

LoggerManager.prototype.getTabbedPane = function(){
	return this.tabbedPane;
}

LoggerManager.prototype.setLevel = function(level){
	for(var i in this.loggers){
		this.loggers[i].setLevel(level);
	}
}

function LoggerParams(theme, traceCSS, debugCSS, infoCSS, warnCSS, errorCSS, fatalCSS, date, mustShowCurrentLogger) {

	this.theme = (theme) ? theme : "DefaultLogger";
	this.traceCSS = ((traceCSS) ? traceCSS : "trace" )+this.theme;
	this.debugCSS = ((debugCSS) ? debugCSS : "debug")+this.theme;
	this.infoCSS = ((infoCSS) ? infoCSS : "info")+this.theme;
	this.warnCSS = ((warnCSS) ? warnCSS : "warn")+this.theme;
	this.errorCSS = ((errorCSS) ? errorCSS : "error")+this.theme;
	this.fatalCSS = ((fatalCSS) ? fatalCSS : "fatal")+this.theme;
	this.date = (date) ? date : true;
	this.mustShowCurrentLogger = (mustShowCurrentLogger) ? mustShowCurrentLogger : true;
}

Logger.LEVEL_NONE = 0;
Logger.LEVEL_TRACE = 1;
Logger.LEVEL_DEBUG = 2;
Logger.LEVEL_INFO = 3;
Logger.LEVEL_WARN = 4;
Logger.LEVEL_ERROR = 5;
Logger.LEVEL_FATAL = 6;
Logger.LEVEL_ALL = 9;

function Logger(appenderName, manager, params) {

	this.manager = manager;
	this.appenderName = appenderName;
	
	this.params = (params) ? params :  new LoggerParams();

	this.level = 0;
	this.loggers = new Array();
	this.consoles = new Array();
	this.console = document.getElementById("debug_panel_1");
	
}

Logger.prototype.setCurrentID = function(currentID){
	this.currentID = currentID;
	if(!this.loggers[this.currentID]){
		this.loggers[this.currentID] = new Object();
		this.loggers[this.currentID].traceLog = new Array();
		this.loggers[this.currentID].debugLog = new Array();
		this.loggers[this.currentID].infoLog = new Array();
		this.loggers[this.currentID].warnLog = new Array();
		this.loggers[this.currentID].errorLog = new Array();
		this.loggers[this.currentID].fatalLog = new Array();
		
		var console = document.createElement("div");
		var id = document.createAttribute("id");
		id.nodeValue = currentID + "_Console";
		console.setAttributeNode(id);
		//Add node into the document
		this.console.appendChild(console);
		//Store the node for reusability
		this.consoles[this.currentID] = console;
	}
}

/**
 * @vis public
 */
Logger.prototype.setLevel = function(level){
	this.level = level ;
}
Logger.prototype.isLevelReady = function(level){
	return this.level == Logger.LEVEL_ALL || this.level >= level ;
}
Logger.prototype.trace = function(message){
	if(this.isLevelReady(Logger.LEVEL_TRACE)){
		this.write(this.formatMsg(Logger.LEVEL_TRACE, message), this.params.traceCSS);
		this.loggers[this.currentID].traceLog.push(message);	
	}
}
Logger.prototype.debug = function(message){
	if(this.isLevelReady(Logger.LEVEL_DEBUG)){
		this.write(this.formatMsg(Logger.LEVEL_DEBUG, message), this.params.debugCSS);
		this.loggers[this.currentID].debugLog.push(message);	
	}
}
Logger.prototype.info = function(message){
	if(this.isLevelReady(Logger.LEVEL_INFO)){
		this.write(this.formatMsg(Logger.LEVEL_INFO, message), this.params.infoCSS);
		this.loggers[this.currentID].infoLog.push(message);	
	}
}
Logger.prototype.warn = function(message){
	if(this.isLevelReady(Logger.LEVEL_WARN)){
		this.write(this.formatMsg(Logger.LEVEL_WARN, message), this.params.warnCSS);
		this.loggers[this.currentID].warnLog.push(message);	
	}
}
Logger.prototype.error = function(message){
	if(this.isLevelReady(Logger.LEVEL_ERROR)){
		this.write(this.formatMsg(Logger.LEVEL_ERROR, message), this.params.errorCSS);
		this.loggers[this.currentID].errorLog.push(message);	
	}
}
Logger.prototype.fatal = function(message){
	if(this.isLevelReady(Logger.LEVEL_FATAL)){
		this.write(this.formatMsg(Logger.LEVEL_FATAL, message), this.params.fatalCSS);
		this.loggers[this.currentID].fatalLog.push(message);	
	}
}
Logger.prototype.formatMsg = function(level, message){
	var msg = "";
	if(this.params.date){
		d = new Date();//TODO OVVERIDE TOSTRING METHOD OF DATE
		msg += d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+":"+d.getMilliseconds(); //toLocaleString() ;
	}
	switch(level){
		case Logger.LEVEL_TRACE: msg += " TRACE - ";
			break;
		case Logger.LEVEL_DEBUG: msg += " DEBUG - ";
			break;
		case Logger.LEVEL_INFO: msg += " INFO - ";
			break;
		case Logger.LEVEL_WARN: msg += " WARN - ";
			break;
		case Logger.LEVEL_ERROR: msg += " ERROR - ";
			break;			
		case Logger.LEVEL_FATAL: msg += " FATAL - ";
			break;
		default: msg += " - ";
	}
	msg += this.currentID + " : " + message
	return msg
}
Logger.prototype.write = function(message, CSSClass){
	this.consoles[this.currentID].innerHTML += "<span class="+ CSSClass +">" + message + "</span><br />";
	if(this.params.mustShowCurrentLogger)
		this.manager.getTabbedPane().show(0/*this.appenderName*/);//TODO MODIFY TABBEDPANE SHOW METHOD
}