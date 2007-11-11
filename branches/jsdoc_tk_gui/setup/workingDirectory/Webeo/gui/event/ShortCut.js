ek.register("gui.event.ShortCut");
/**
 * @fileoverview
 * The ShortCut class allow you record a keyboard shorcut
 *@author Sébastien Bordes => Sebastien dot Bordes at emukina dot fr
 *@version 1.0
 */
 
/**
 * Field used to get the current version of this component
 * @type String
 * @see #getVersion
 */
ShortCut.version = "1.0"; 
 
/**
 * Number correponding at the keyboard button
 * @private
 * @type boolean
 */
ShortCut.prototype.key = null;

/**
 * Action to do if all required buttons are pressed 
 * @private
 * @type function
 */
ShortCut.prototype.action = null;

/**
 * The shift button must be pressed to launch the action
 * @private
 * @type boolean
 */
ShortCut.prototype.shift = false;

/**
 * The control button must be pressed to launch the action
 * @private
 * @type boolean
 */
ShortCut.prototype.ctrl = false;

/**
 * The alt button must be pressed to launch the action
 * @private
 * @type boolean
 */
ShortCut.prototype.alt = false;

/**
 * Construct a ShortCut object
 * @class
 * This class is used to create a keyboard shortCut to do a special action
 * @constructor
 * @param key : number correponding at the keyboard button
 * @param action : Action to do if all required buttons are pressed 
 * @param shift : if true Shift button must be pressed to launch the action
 * @param ctrl : if true  Control button must be pressed to launch the action 
 * @param alt : if true Alt button must be pressed to launch the action
 * @return a new ShortCut Object
 */
function ShortCut(key, action, shift, ctrl, alt) {
	this.key = key;
	this.action = action;
	this.shift = (shift) ? shift : false;
	this.ctrl = (ctrl) ? ctrl : false;
	this.alt = (alt) ? alt : false;
}

/**
 * Return a String representing the shorcut
 * @type String
 * @return a String representing the shorcut
 */
ShortCut.prototype.index = function(){
	var idx = this.key + "-";
	idx += (this.shift) ? "y": "n";
	idx += (this.ctrl) ? "y": "n";
	idx += (this.alt) ? "y": "n";
	return idx; 
}

/**
 * Return or display the version of ShortCut Object
 * @param alert : must show an alert message wi the current version or not
 * @return the current version if alert =  true
 */
ShortCut.prototype.getVersion = function (alert){
	if(alert)
		alert('ShortCut.js => version: ' +this.version);
	else
		return this.version;
}