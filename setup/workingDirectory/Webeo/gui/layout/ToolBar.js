ek.require("gui.button.Button");
ek.require("gui.button.ToggleButtonManager");

ek.register("gui.layout.ToolBar");

ek.requireCSS("css.gui.layout.ToolBar", "layout.ToolBar");

/**
 * require 'button.js'
  * require 'ToggleButtonManager.js'
  **/

/**
 * Construit une ToolBar horizontale ou verticale
 */
function ToolBar(divName, width, height, cssBar){
	
	this.domBar = document.getElementById(divName);
	
	this.domBar.style.width = (width) ? width : "auto";
	this.domBar.style.height = (height) ? height : "auto";
	this.domBar.className = cssBar;
	
	this.items = new Array();
	
	this.mgr = new ToggleButtonManager(divName);
}
/**
 *
 */
ToolBar.prototype.addTitle = function(text){
	var t = document.createElement("h3");
	t.setAttribute("class", this.getLayout());
	t.textContent = text;
	this.addItem(t);
}
/**
 *
 */
ToolBar.prototype.setTooltipParams = function(params){
	for(var i = 0 ; i < this.items.length; i++){
		if(this.items[i].buttonModel){
			this.items[i].buttonModel.tooltip.applyParams(params);
		}
	}
}
/**
 *
 */
ToolBar.prototype.addButton = function(b){
	/*var t = document.createElement("h2");
	t.setAttribute("class", this.getLayout());
	t.textContent = text;*/
	if(b instanceof Button){
		this.addItem(b.getDom());
		b.getTooltipDom();
		this.mgr.addButton(b);
	}
}
ToolBar.prototype.getLayout = function(){
	if(this.domBar.style.width == "auto" || 
		(this.domBar.style.width > this.domBar.style.height && this.domBar.style.height != "auto")){
		return "horizontal";
	}else{
		return "vertical";
	}
}
/**
 * Ajoute plusieurs items
 */
ToolBar.prototype.addItems = function(items){
	for(var i = 0 ; i < items.length; i++){
		this.addItem(items[i]);
	}
}
/**
 * Ajoute un item
 */
ToolBar.prototype.addItem = function(itemDom){
	this.items.push(itemDom);
	this.domBar.appendChild(itemDom);
}
/**
 * Enlève un item
 */
ToolBar.prototype.removeItem = function(item){
	this.domBar.removeChild(item);
	var idx = 0;
	while(idx < this.items.length){
		if(this.items[idx] == item)
			break;
		idx++;
	}
	this.items.splice(idx,1);
}
