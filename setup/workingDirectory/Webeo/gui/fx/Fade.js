ek.register("gui.fx.Fade");

//FadeManager.prototype.version = "1.0";

/** 
 * Define the singleton
 * @return the FadeManager singleton
 */
//Fade = new Object();
function Fade(){}

/**
 * Define an object to parameterize the FadeManager special fx.
 * @class
 * @param timeToFadeIn the time to fade in in milliseconds
 * @param timeToFadeOut  the time to fade out in milliseconds
 * @param fadeInUnit the opacity unit to fade in
 * @param fadeOutUnit the opacity unit to fade out
 * @param opacityMax the maximum of opacity reached, 100 by default (opaque)
 * @param opacityMin the minimum of opacity reached, 0 by default (transparent)
 * @constructor
 */
function FadeParams(timeToFadeIn, timeToFadeOut, fadeInUnit, fadeOutUnit, opacityMax, opacityMin) {

	this.timeToFadeIn = (timeToFadeIn) ? timeToFadeIn : 40;
	this.timeToFadeOut = (timeToFadeOut) ? timeToFadeOut : 40;
	this.fadeInUnit = (fadeInUnit) ? fadeInUnit : 10;
	this.fadeOutUnit = (fadeOutUnit) ? fadeOutUnit : 10;
	this.opacityMax = (opacityMax) ? opacityMax : 100;
	this.opacityMin = (opacityMin) ? opacityMin : 0;

}

/**
 * Construct a fadeManager Object used to control all fade events of the application.
 * @class
 * @version 1.0
 * @constructor
 *//*
function FadeManager(params) {
    
	this.mainParams = (params) ? params : new FadeParams();
	
	this.params = new Array();
	this.objects = new Array();
	this.opacities = new Array();
	this.fadeInWTO = new Array();
	this.fadeOutWTO = new Array();

}*/
	Fade.mainParams = new FadeParams();
	
	Fade.params = new Array();
	Fade.objects = new Array();
	Fade.opacities = new Array();
	Fade.fadeInWTO = new Array();
	Fade.fadeOutWTO = new Array();
/** 
 * Register a domObject and set the default opacity.
 * @param keyName the id of the element to register
 * @param domObject the dom element of this id
 * @param params the FadeParams object used to parameterize this fade fx
 */
Fade.register = function (keyName, params, visible){
	//alert('register '+keyName + ' ' + domObject);
	this.objects[keyName] = Dom.getElement(keyName);
	this.opacities[keyName] = (visible)?100:0;
	this.params[keyName] = (params) ? params : this.mainParams;
	this.changeOpacity(keyName);
}

/** 
 * Unregister a domObject 
 * @param keyName the id of the element to unregister
 */
Fade.unregister = function (keyName){
	Fade.objects[keyName] = undefined;
	Fade.opacities[keyName] = undefined;
	Fade.params[keyName] = undefined;
	Fade.fadeInWTO[keyName] = undefined;
	Fade.fadeOutWTO[keyName] = undefined;
}

/** 
 * Clear all time out .TODO
 * @private
 */
Fade.clear = function (keyName, fadeIn){
	if(fadeIn){
		if(Fade.fadeInWTO[keyName]){
			window.clearTimeout(Fade.fadeInWTO[keyName]);
			Fade.fadeInWTO[keyName] = undefined;
		}
	}else{
		if(Fade.fadeOutWTO[keyName]){
			window.clearTimeout(Fade.fadeOutWTO[keyName]);
			Fade.fadeOutWTO[keyName] = undefined;
		}
	}
}

/** 
 * Start to fade In, let the element be more opaque.
 * @param keyName
 * @param nextActionToDo
 * @param delay
 */
Fade.fadeIn = function (keyName, nextActionToDo, delay){
	
	Fade.clear(keyName, false);
	
	if (Fade.opacities[keyName] < Fade.params[keyName].opacityMax) {
		Fade.opacities[keyName] += Fade.params[keyName].fadeInUnit;
		Fade.changeOpacity(keyName);
		if(nextActionToDo){
			delay = (delay) ? delay : 0 ;
			Fade.fadeInWTO[keyName] = window.setTimeout("Fade.fadeIn('"+keyName+"', '"+nextActionToDo+"', "+delay+")", Fade.params[keyName].timeToFadeIn);
		}else{
			Fade.fadeInWTO[keyName] = window.setTimeout("Fade.fadeIn('"+keyName+"')", Fade.params[keyName].timeToFadeIn);
		}
	}else{
		if(nextActionToDo)//{
			/*this.fadeInWTO[keyName] = */window.setTimeout(nextActionToDo, delay);
		//}else{
			Fade.fadeInWTO[keyName] = undefined;
		//}
	}
}

/** 
 * Start to fade Out, let the element be more transparent.
 * @param keyName
 * @param nextActionToDo
 * @param delay
 */
Fade.fadeOut = function (keyName, nextActionToDo, delay){

	Fade.clear(keyName, true);

    if (Fade.opacities[keyName] > Fade.params[keyName].opacityMin) {
      Fade.opacities[keyName] -= Fade.params[keyName].fadeInUnit;
      Fade.changeOpacity(keyName);
	  if(nextActionToDo){
		delay = (delay) ? delay : 0 ;
		Fade.fadeOutWTO[keyName] = window.setTimeout("Fade.fadeOut('"+keyName+"', '"+nextActionToDo+"', "+delay+")", Fade.params[keyName].timeToFadeOut);
	  }else{
		Fade.fadeOutWTO[keyName] = window.setTimeout("Fade.fadeOut('"+keyName+"')", Fade.params[keyName].timeToFadeOut);
	  }
    }else{
		if(nextActionToDo)//{
			/*this.fadeOutWTO[keyName] = */window.setTimeout(nextActionToDo, delay);
		//}else{
			Fade.fadeOutWTO[keyName] = undefined;
		//}
	}
}

/**
 * Modifiy the opacity of the dom object
 * @param opacity 0 to 100
 * @private
 */
Fade.changeOpacity = function(keyName) {
  
  //TODO Use boolean for navigator determination
  
	var opacity = Fade.opacities[keyName];
	var obj = Fade.objects[keyName];
	
	// IE/Win
	obj.style.filter = "alpha(opacity:"+opacity+")";

	// Safari<1.2, Konqueror
	obj.style.KHTMLOpacity = opacity / 100;

	// Older Mozilla and Firefox
	obj.style.MozOpacity = opacity / 100;

	// Safari 1.2, newer Firefox and Mozilla, CSS3
	obj.style.opacity = opacity / 100;
	
	if(opacity == 0){
		obj.style.display = 'none';
	}else{
		obj.style.display = '';
	}
}