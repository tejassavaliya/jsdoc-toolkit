ek.require("gui.tools.Logger");

ek.register("gui.tooltip.TooltipParams");
ek.setVersion("gui.tooltip.TooltipParams", "0.8");

/**
 *
 */
function TabbedParams(cssClass, pos, timeToShow, timeToHide, isAlpha, mustManageEvent, logLevel){

	this.cssClass = (cssClass)? cssClass : 'tooltip';
	this.position = (pos && pos instanceof Position) ? pos : new Position();
	this.timeToShow = (timeToShow)? timeToShow : 1000;
	this.timeToHide = (timeToHide)? timeToHide : 500;
	
	this.isAlpha = (isAlpha!=null && !isAlpha instanceof FadeParams) ? isAlpha : true;
	this.fadeParams = (isAlpha instanceof FadeParams) ? isAlpha : null;
	
	this.mustManageEvent = (mustManageEvent!=null)? mustManageEvent : true;
	
	this.logLevel = (logLevel) ? logLevel : Logger.LEVEL_NONE;
}