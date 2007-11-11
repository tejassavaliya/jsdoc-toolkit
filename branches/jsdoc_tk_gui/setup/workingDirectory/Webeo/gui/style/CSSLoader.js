ek.require("gui.tools.Dom");
ek.require("gui.layout.ToolBar");//To call only if necessary
ek.register("gui.style.CSSLoader");

/**
 * @fileoverview
 * The CSSLoader class allow you to change the css source file dynamically
 *@author Sebastien Bordes => Sebastien dot Bordes at webeo dot fr
 *@version 0.9
 */
  
/**
 * Construct a CSSLoader object
 * @class
 * This class is used to manage easily Cascading Style Sheets
 * @constructor
 * @param container : The container which will hold the buttons/links/ComboBox
 * @param cssId : The id of the link element node
 * @param defaultCSS : The default selected CSS
 * @return a new CSSLoader Object
 */
function CSSLoader (container, cssId, defaultCSS){
	
	this.container = (typeof container == "object")? container : Dom.getElement(container);
	this.cssId = (cssId) ? cssId : "default";
	this.defaultCSS = (defaultCSS) ? defaultCSS : "index";
	this.sheets = new Array();
} 

/**
 * Add a CSS to the list.
 * @param text : Name of the styleSheet , could be displayed
 * @param src : url of the style sheet, must be unique
 */
CSSLoader.prototype.addCSS = function (text, src){
	this.sheets[src] = text;
}

/** 
 * Remove a CSS 
 * @param src :  url of the style sheet
 */
CSSLoader.prototype.removeCSS = function (src){
	this.sheets[src] = undefined;
}

/**
 * Create and draw some buttons to allow to change the current CSS
 * @param loadFirst : boolean =>  if true the first CSS will be loaded
 */
CSSLoader.prototype.drawButtons = function (loadFirst){
	tb = new ToolBar(this.container.id, 200, null, "simpleBar");

	for(var src in this.sheets){
		bt = new TextButton(src, this.sheets[src], null, true, null, null, this.chooseByLink);
		bt.getDom().cssL = this;		
		tb.addButton(bt);
	}
	if(loadFirst)
		ek.requireCSS(this.cssId, this.defaultCSS, true);	
}

/**
 * Create and draw some links to allow to change the current CSS
 * @param loadFirst : boolean =>  if true the first CSS will be loaded
 */
CSSLoader.prototype.drawLinks = function (loadFirst){
	
	for(var src in this.sheets){
		var br = Dom.createHTMLBRElement();
		var a = Dom.createHTMLAnchorElement(this.sheets[src], null, null, null, this.sheets[src]);
		//Attach model
		a.cssL = this;
		//Attahc onclick action method
		a.onclick = this.chooseByLink;
		this.container.appendChild(a);
		this.container.appendChild(br);
	}
	if(loadFirst)
		ek.requireCSS(this.cssId, this.defaultCSS, true);	
}

/**
 * Create and draw a combo bow to allow to change the current CSS
 * @param loadFirst : boolean =>  if true the first CSS will be loaded
 */
CSSLoader.prototype.drawCombo = function (loadFirst){
	
	var select = Dom.createHTMLSelectElement();
	//Attach model
	select.cssL = this;
	//Attach onchange action method
	select.onchange = this.chooseByCombo;
	this.container.appendChild(select);	
	
	for(var src in this.sheets){

		var o = Dom.createHTMLOptionElement(this.sheets[src], src);
		select.appendChild(o);	
	}
	if(loadFirst)
		ek.requireCSS(this.cssId, this.defaultCSS, true);
}

/** 
 * Called when a link was clicked to change the current CSS.
 * @param e the click event
 * @private
 */
CSSLoader.prototype.chooseByLink = function (e){
	ek.requireCSS(this.cssL.cssId, this.id, true);
}

/**
 * Called when the selection of the combo box has changed to change the current CSS.
 * @param e the change event
 * @private
 */
CSSLoader.prototype.chooseByCombo = function (e){
	ek.requireCSS(this.cssL.cssId, this.options[this.selectedIndex].value, true);
}
