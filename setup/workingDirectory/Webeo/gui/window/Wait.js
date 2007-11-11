ek.require("gui.tools.Dom");

ek.register("gui.window.Wait");


ek.requireCSS("css.gui.window.Wait", "wait.Wait");
/**
 *@displayName Affiche une fenetre d'attente
 *@src wait.js
 *@env Client
 *@hint Permet de bloquer l ecran pendant une operation synchrone
 *@version 1.0
 */
function Wait (dom, message, cssClass, timeToShow, timeToHide, offsetLeft, offsetTop){

	this.hideTimer = undefined;
	this.showTimer = undefined;	
	
    //PARAMETRAGE
	this.cssClass = (cssClass != undefined)? cssClass : 'wait';
	this.timeToShow = (timeToShow != undefined)? timeToShow : 0;
	this.timeToHide = (timeToHide != undefined)? timeToHide : 1000;
	this.offsetLeft = (offsetLeft != undefined)? offsetLeft : 0;
	this.offsetTop = (offsetTop != undefined)? offsetTop : 0;
	//Fin PARAMETRAGE
	
	this.parentDom = Dom.getElement(dom);
    this.divNameWait = dom.id + '_WAIT' ;
	this.drawWait(message, this.cssClass);	
	
	this.isShown = false;
	this.hide();
	
	

	//Positionnement par rapport à l'élément parent
	//if(this.parentDom.style.position=="")
	//	this.parentDom.style.position = "relative";
} 
/**
  * Ecrit la fenêtre d'attente dans le document
  * @param content : the text content of the wait div
  */
Wait.prototype.drawWait = function (content){
	//Create the wait div
	this.domWait = Dom.createHTMLDivElement(content, this.cssClass, this.divNameWait);
	//Save the component for event handler
	this.domWait.waitModel = this;
	//Append wait element to the parent node
	this.parentDom.appendChild(this.domWait);
}
/**
  * Affiche la fenetre d'attente
  */
Wait.prototype.show = function (){	
	this.domWait.style.display = '';
	this.domWait.style.left = this.parentDom.offsetLeft + this.parentDom.offsetWidth / 2 - this.domWait.offsetWidth / 2 + this.offsetLeft ;
	this.domWait.style.top = this.parentDom.offsetTop + this.parentDom.offsetHeight / 2 - this.domWait.offsetHeight / 2 + this.offsetTop ;
	this.isShown = true;
}

/**
 *
 */
Wait.prototype.hide = function(){
	this.domWait.style.display = 'none';
	this.isShown = false;
}

/** 
 * On affiche la fenêtre au bout de quelques millisecondes
 */
Wait.prototype.mayShow = function (){
	//On affiche un tooltip après l'avoir survolé pendant au moins 1000ms
	this.showTimer = window.setTimeout("document.getElementById('" + this.divNameWait + "').waitModel.show()", this.timeToShow);
}
/** 
 * Lors d'un survol du tooltip on le montre
 */
Wait.prototype.mayHide = function (){
	//On annule le timeout destiné à affiché le tooltip
	//window.clearTimeout(this.showTimer);
	this.showTimer = undefined;
	//if(this.isShown)
		this.hideTimer = window.setTimeout("document.getElementById('" + this.divNameWait + "').waitModel.hide()", this.timeToHide);
}
