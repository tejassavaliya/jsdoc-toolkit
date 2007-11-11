ek.require("gui.event.ShortCut");
ek.register("gui.event.KeyListener");


KeyListener.version = "1.0"; 


document.onkeyup = function(e){

	var isShiftPressed;
	var isCtrlPressed;
	var isAltPressed;
	var key;
	
	if(/*isIE*/ false){ //TODO NAVIGATOR DETERMINATION IN ANOTHER COMPONENT
		isCtrlPressed = window.event.ctrlKey;
		key = window.event.keyCode;
	}else{
		isShiftPressed = e.shiftKey;
		isCtrlPressed = e.ctrlKey;
		isAltPressed = e.altKey;
		key = e.which;
	}
	getKeyListener().onKeyUp(key, isShiftPressed, isCtrlPressed,	isAltPressed);
}
/** 
 * Define the singleton
 */
function getKeyListener(){
	if(!top.keyMgr){
		top.keyMgr = new KeyListener();	
	}
	return top.keyMgr;
}
function KeyListener() {
	this.shortCuts = new Array();
	
	this.key;
	this.shift;
	this.ctrl;
	this.alt;
}
KeyListener.prototype.add = function(key, action, shift, ctrl, alt){
	var sc = new ShortCut(key, action, shift, ctrl, alt);
	this.shortCuts[sc.index()] = sc;
}
KeyListener.prototype.onKeyUp = function(key, shift, ctrl, alt){
	for(var i in this.shortCuts){
		var sc = this.shortCuts[i];
		if(sc.key == key && sc.shift == shift && sc.ctrl == ctrl && sc.alt == alt){
			eval(sc.action);
		}
	}
}