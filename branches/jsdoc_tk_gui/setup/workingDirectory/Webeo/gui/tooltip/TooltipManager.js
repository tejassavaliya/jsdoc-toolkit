ek.require("gui.tooltip.Tooltip");

ek.register("gui.tooltip.TooltipManager");

//Link
//TooltipManager = fr_emukina_TooltipManager;
/**
 * @class
 */
function TooltipManager (params){

	this.tooltips = new Array();
	this.params = (params !=null && params instanceof TooltipParams)? params : new TooltipParams();
}
/** */
TooltipManager.prototype.add = function (domId, text, relativeDomId){
	var tt = new Tooltip(domId, text, this.params, relativeDomId);
	this.tooltips[domId] = tt;
}
/** */
TooltipManager.prototype.remove = function (id){
	this.tooltips[id].erase();
	this.tooltips.remove(id);
}