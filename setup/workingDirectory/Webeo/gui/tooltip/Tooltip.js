//TODO
ek.require("gui.tools.Position");
ek.require("gui.tools.Dom");
ek.require("gui.fx.Fade");
ek.require("gui.tooltip.TooltipManager");
ek.require("gui.tooltip.TooltipTemplate");

ek.register("gui.tooltip.Tooltip");

ek.requireCSS("css.gui.tooltip.Tooltip", "tooltip.Tooltip");

//LINKS
//Tooltip = Tooltip;

/**
 * The Object used to parameterize a Tooltip component.
 *
 * @param cssClass
 * @param pos
 * @param timeToShow
 * @param timeToHide
 * @param isAlpha
 * @param mustManageEvent 
 * @param tooltipTemplate The template used to render the tooltip
 * @param logLevel the level of the logger
 * @class
 * @constructor
 */
function TooltipParams (cssClass, pos, timeToShow, timeToHide, isAlpha, mustManageEvent, tooltipTemplate, logLevel){

	this.cssClass = (cssClass)? cssClass : 'tooltip';
	this.position = (pos && pos instanceof Position) ? pos : new Position();
	this.timeToShow = (timeToShow)? timeToShow : 1000;
	this.timeToHide = (timeToHide)? timeToHide : 500;
	
	this.isAlpha = (isAlpha!=null && !isAlpha instanceof FadeParams) ? isAlpha : true;
	this.fadeParams = (isAlpha instanceof FadeParams) ? isAlpha : null;
	
	this.mustManageEvent = (mustManageEvent!=null)? mustManageEvent : true;
	
	this.tooltipTemplate = new TooltipTemplate(tooltipTemplate); 
	
	this.logLevel = (logLevel) ? logLevel : Logger.LEVEL_NONE;
}


Tooltip.prototype.version = "1.0";

/**
 *@vis public
 */
Tooltip.prototype.getVersion = function (alert){
	if(alert)
		alert('Tooltip.js => version: ' +this.version);
	else
		return this.version;
}

/**
  * Affiche un Tooltip pour un élement Dom
  * Exemple de classe CSS pour le tooltip
  * .tooltip{
  *	position: absolute;
  *	z-index: 3;
  *	background-color : #cdd7e1;
  *	border-style: solid;
  *	border-width: 1px;
  *	border-color: #6688aa;
  *	text-align: center  ;
  *	color:637e9a;
  *	font-size: 11pt;
  *	font-style: normal;		
  * }
  *@requires Position
  *@requires Fade
  *@requires Dom
  *@requires Logger
  *@param dom élément Dom du tooltip ou l'id de l'élément dom
  *@param relativeDom élément Dom par rapport auqiel le tooltip se placera ou l'id de l'élément dom
  *@param mustManageEvent si Vrai on gére les event de la souris Sinon le developpeur doit appeler mayShow et mayHide
  *@param toolTipText Texte du tooltip
  *@param cssClass ==> Classe CSS à utiliser par le tooltip
  *@param timeToShow ==> temps d'attente avant de montrer le tooltip
  *@param timeToHide ==> temps d'attente avant de caher le tooltip
  *@param pos Objet position
  *@vis public
 */
function Tooltip (dom, toolTipText, params, relativeDom){
	
	this.hideTimer = undefined;
	this.showTimer = undefined;	
	
	this.parentDom = new Array();
	
	//PARAMETERS SET
	this.params = (params !=null && params instanceof TooltipParams)? params : new TooltipParams();

	//try{
	
		if(dom instanceof Array){
			for(var i = 0 ; i < dom.length ; i++){
				this.parentDom[i] = (typeof dom[i] == "object")? dom[i] : Dom.getElement(dom[i]);
			}
		}else{
			this.parentDom[0] = (typeof dom == "object")? dom : Dom.getElement(dom);
		}
		
		
		this.getLogger().trace("new Tooltip( dom="+dom+", tooltiptext="+toolTipText+", params="+params+", relativeDom="+relativeDom+")");

		this.divNameTT = this.parentDom[0].id + '_TT';
		this.drawTooltip(toolTipText, this.params.cssClass);	

		if(relativeDom != null )
			this.relativeDom = (typeof relativeDom == "object") ? relativeDom : Dom.getElement(relativeDom);
	    else
			this.relativeDom = this.parentDom[0];
		
		//this.domTT.innerHTML = toolTipText;
		//this.domTT.className = this.params.cssClass;
		
		//Sauvegarde this pour les événements
		this.domTT.ttModel = this;
		
		//Gestion des événements
		this.domTT.onmouseover = this.getOver;
		this.domTT.onmouseout = this.getOut;

		//Positionnement par rapport à l'élément parent
		if(this.parentDom[0].style.position=="")
			this.parentDom[0].style.position = "relative";
		
		this.domTT.style.position = "absolute";
		if(this.params.mustManageEvent){
			for(var i = 0 ; i < this.parentDom.length; i++){
				this.parentDom[i].ttModel = this;
				this.parentDom[i].onmouseover = this.getParentOver;
				this.parentDom[i].onmouseout = this.getParentOut;
			}
		}
		//Else you must call the mayShow and mayHide functions with your own listener

		if(this.params.isAlpha){
			Fade.register(this.divNameTT, this.params.fadeParams);
		}
		this.hide();
			
	/*}catch(e){
		alert("Tooltip error: "+e);
	}*/
} 

Tooltip.prototype.getLogger = function (){
	if(!this.logger){
		this.logger = getLogger("TOOLTIP");
		this.logger.setLevel(this.params.logLevel);
	}
	this.logger.setCurrentID(this.parentDom[0].id);
	return this.logger;
}

/**
  * Write the tooltip into the document
  * <div class="tooltip style="display:none;" "id="TT_'+name+'_'+ this.divName+ '"></div>
  *@vis public
  */
Tooltip.prototype.drawTooltip = function (text, clazz){
	this.getLogger().trace("Drawing the tooltip");

	//this.domTT = Dom.createHTMLDivElement(text, clazz, this.divNameTT);
	this.domTT = this.params.tooltipTemplate.getTemplate(text, clazz, this.divNameTT);
	if(this.parentDom[0].parentNode)
		this.parentDom[0].parentNode.appendChild(this.domTT);
}
Tooltip.prototype.applyParams = function (params){
	this.getLogger().trace("Apply Params: "+params.toString());

	this.params = params;
	this.domTT.className = this.params.cssClass;
	if(this.params.isAlpha){
		Fade.register(this.divNameTT);
	}
}

/**
 * Affiche le Tooltip
 *@vis private
  */
Tooltip.prototype.show = function (){

	this.getLogger().trace("Show Tooltip");

	
ll = Dom.getStyle(this.domTT, "width");
this.domTT.style.left = this.params.position.getLeftPosition(this.relativeDom.offsetLeft, this.relativeDom.offsetWidth, ll.substring(0,ll.indexOf('px')) ) +"px";

tt = Dom.getStyle(this.domTT, "height");
this.domTT.style.top = this.params.position.getTopPosition(this.relativeDom.offsetTop, this.relativeDom.offsetHeight , tt.substring(0,tt.indexOf('px')) ) +"px";

//this.domTT.style.left = this.params.position.getLeftPosition(this.relativeDom.offsetLeft, this.relativeDom.offsetWidth, this.domTT.style.width.substring(0,this.domTT.style.width.indexOf('px')) );
//this.domTT.style.top = this.params.position.getTopPosition(this.relativeDom.offsetHeight, this.relativeDom.offsetHeight, this.domTT.style.height.substring(0,this.domTT.style.height.indexOf('px')) );

	//this.clearTimer(false);	
	
	if(this.params.isAlpha){
		Fade.fadeIn(this.divNameTT);
		this.isShown = true;
	}else{
		this.domTT.style.display = '';
		this.isShown = true;
	}
}
/**
  * Cache le Tooltip
   *@private
  */
Tooltip.prototype.hide = function (e){
	
	this.getLogger().trace("Hide Tooltip");
	
	//this.clearTimer(true);	
	
	if(this.params.isAlpha){
		Fade.fadeOut(this.divNameTT);
		this.isShown = false;
	}else{
		this.domTT.style.display ='none';
		this.isShown = false;
	}
}
/** 
 * Si un compte a rebours pour cacher le tooltip existe alors on le stoppe
  *@private
 */
Tooltip.prototype.clearTimer = function (show){
	
	
	(show) ? this.getLogger().trace("Clear Show-timer") : this.getLogger().trace("Clear Hide-timer");

	if(show && this.showTimer){
		window.clearTimeout(this.showTimer);	
		this.showTimer = undefined;
	}
	if(!show && this.hideTimer){
		window.clearTimeout(this.hideTimer);	
		this.hideTimer = undefined;
	}
}
/** 
 * Lors d'un survol du tooltip on le montre
  *@vis private
 */
Tooltip.prototype.getOver = function (){
	this.ttModel.getLogger().trace("onMouseOver");
	this.ttModel.clearTimer(false);	
	this.ttModel.show();
}
/** 
 * Lorsqu'on quitte le survol du tooltip on le cache
 */
Tooltip.prototype.getOut = function (){
	this.ttModel.getLogger().trace("onMouseOut");
	this.ttModel.clearTimer(true);	
	this.ttModel.hide();
}
/** 
 * Lors d'un survol du parent on montre le tooltip
  *@vis private
 */
Tooltip.prototype.getParentOver = function (){
	this.ttModel.getLogger().trace("onParentMouseOver")
	this.ttModel.mayShow();
}
/** 
 * Lorsqu'on quitte le survol du parent on cache le tooltip
 */
Tooltip.prototype.getParentOut = function (){
	this.ttModel.getLogger().trace("onParentMouseOut")
	this.ttModel.mayHide();
}
/** 
 * Lors d'un survol du tooltip on le montre
 *@vis private
 */
Tooltip.prototype.mayShow = function (){
	this.getLogger().trace("mayShow");
	this.clearTimer(false);	
	//if(!this.isShown)
		this.showTimer = window.setTimeout("document.getElementById('" + this.divNameTT + "').ttModel.show()", this.params.timeToShow);
}
/** 
 * Lors d'un survol du tooltip on le montre
 *@vis private
 */
Tooltip.prototype.mayHide = function (){
	this.getLogger().trace("mayHide");
	this.clearTimer(true);	
	//On annule le timeout destiné à affiché le tooltip
	//window.clearTimeout(this.showTimer);
	//if(this.isShown)
		this.hideTimer = window.setTimeout("document.getElementById('" + this.divNameTT + "').ttModel.hide()", this.params.timeToHide);
}
/**
 *
 */
Tooltip.prototype.erase = function (){
	this.getLogger().trace("Erase");
	alert("erasing tooltip "+this.divName);
}

