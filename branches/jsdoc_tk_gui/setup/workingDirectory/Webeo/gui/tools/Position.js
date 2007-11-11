ek.register("gui.tools.Position");
ek.setVersion("gui.tools.Position", "0.5");
/**
 * @fileoverview
 * The Position class allow you to place a Dom Object somewhere in the document
 *@author Sébastien Bordes => Sebastien dot Bordes at webeo dot fr
 *@version 1.0
 */

/**
 * Field used to get the current version of this component
 * @type String
 * @see #getVersion
 */
Position.version = "1.0"; 
 
/**
 * Field used to say if the left gap must be applied to the left side or the right
 * @private
 * @type boolean
 */
Position.prototype.isLeft = false;

/**
 * Field used to store the horizontal gap in pixels
 * @private
 * @type int
 */
Position.prototype.leftPos = 10;

/**
 * Field used to say if the top gap must be applied to the top side or the bottom
 * @private
 * @type boolean
 */
Position.prototype.isTop = false;

/**
 * Field used to store the vertical gap in pixels
 * @private
 * @type int
 */
Position.prototype.topPos = 5;

/**
 * Indicate if the position must be horizontally centered
 * @private
 * @type boolean
 */
Position.prototype.isLeftCentered = false;

/**
 * Indicate if the position must be vertically centered
 * @private
 * @type boolean
 */
Position.prototype.isTopCentered = false;	

/**
 * Indicate if the position is relative or aboslute
 * @private
 * @type boolean
 */
Position.prototype.isRelative = false;

/**
 * Construct a Position object
 * @class
 * This class is used to create a position for a dom object
 * Retourne les coordonnées d'un élèment en fonction d'un autre
 * @constructor
 * @param isLeft
 * @param leftPos ==> décalage horizontal du tooltip
 * @param isTop
 * @param topPos ==> décalage vertical du tooltip
 * @param isLeftCentered ==> Centré horizontalement
 * @param isTopCentered ==> Centré verticalement
 * @param isRelative ==> Is relative or absolute
 * @return a new Position Object
 */
function Position (isLeft, leftPos, isTop, topPos, isLeftCentered, isTopCentered, isRelative){
	
	this.isLeft = (isLeft)? isLeft : false;
	this.leftPos = (leftPos != undefined)? leftPos : 10;
	this.isTop = (isTop)? isTop : false;
	this.topPos = (topPos != undefined)? topPos : 5;
	this.isLeftCentered = (isLeftCentered)? isLeftCentered : false;
	this.isTopCentered = (isTopCentered)? isTopCentered : false;	
	this.isRelative = (isRelative)? isRelative : false;
} 

/**
 * Return the left position
 * @param offset the offset
 * @param width 
 * @param ownWidth 
 * @return the left position in pixels , for example: "20"
 */
Position.prototype.getLeftPosition = function (offset, width, ownWidth){
	if(this.isRelative)
		return this.leftPos;
	if(this.isLeftCentered)
		return offset + (width/2) + this.leftPos - (ownWidth/2);
	else
		return offset + ( (this.isLeft) ? 0 : width ) + this.leftPos ;	
}

/**
 * Return the top position
 * @param offset 
 * @param height 
 * @param ownHeight 
 * @return the top position in pixels , for example: "60"
 */
Position.prototype.getTopPosition = function (offset, height, ownHeight){
	if(this.isRelative)
		return this.topPos;
	if(this.isTopCentered)
		return offset + (height/2) + this.topPos - (ownHeight/2);
	else{
		return offset + ( (this.isTop) ? 0 : height ) + this.topPos ;
	}
}

/**
 * Return or display the version of Position Object
 * @param alert : must show an alert message wi the current version or not
 * @return the current version if alert =  true
 */
Position.prototype.getVersion = function (alert){
	if(alert)
		alert('Position.js => version: ' +this.version);
	else
		return this.version;
}

/**
 * Construct a PositionRenderer object
 * @class
 * This class is used to set the position of a dom element in fucntion of a relative element
 * @constructor
 */
function PositionRenderer (dom, relativeDom, position){
		
	this.dom = Dom.getElement(dom);
	this.relativeDom = Dom.getElement(relativeDom);
	this.position = (position) ? position: new Position();
	this.render();
}

/**
 * Change the position of an element
 *@param position the new position of the element
 */
PositionRenderer.prototype.setPosition =  function (position){
	this.position = (position) ? position: new Position();
	this.render();
}

/**
 * Render the dom element
 *@private
 */
PositionRenderer.prototype.render =  function (){
	
	var ll = Dom.getStyle(this.dom, "width");
	this.dom.style.left = this.position.getLeftPosition(this.relativeDom.offsetLeft, this.relativeDom.offsetWidth, ll.substring(0,ll.indexOf('px')) ) +"px";

	var tt = Dom.getStyle(this.dom, "height");
	this.dom.style.top = this.position.getTopPosition(this.relativeDom.offsetTop, this.relativeDom.offsetHeight , tt.substring(0,tt.indexOf('px')) ) +"px";

	this.dom.style.position = (this.position.isRelative) ? "relative" : "absolute";
	
	alert('render left='+this.dom.style.left +' top='+this.dom.style.top);

} 