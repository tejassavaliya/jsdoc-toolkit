ek.require("gui.tooltip.Tooltip");

ek.register("gui.button.Button");

ek.requireCSS("css.gui.button.Button", "button.Button");

/**
  *@require  "position.js"
  *@require  "tooltip.js"
  **/

var PICTURE_BUTTON = 0;
var INPUT_BUTTON   = 1;
var TEXT_BUTTON    = 2;  

function PictureButton(idName, shortName, extension, toolTipText, toggle, mainModel, clickMethod, isAjax, url){
	return new Button(PICTURE_BUTTON, idName, shortName, extension, toolTipText, toggle, mainModel, clickMethod, isAjax, url);
}
function SimpleButton(idName, shortName, extension, toolTipText, toggle, mainModel, clickMethod, isAjax, url){
	return new Button(INPUT_BUTTON, idName, shortName, extension, toolTipText, toggle, mainModel, clickMethod, isAjax, url);
}
function TextButton(idName, shortName, toolTipText, toggle, url, target, clickMethod){
	var b = new Button(TEXT_BUTTON, idName, shortName, null, toolTipText, toggle, null, clickMethod);
	b.initCSS("textButton", "toggled");
	b.initUrlAndTarget(url, target);
	return b;
}

/**
 * Construit un bouton 
 *@param dom balise dom img de l'image utilisé comme bouton
  *@param shortName Nom des images sans sufixes
  *@param extension extension des images
  *@param tooltip Message d'aide affiché au survol du bouton
  *@param toggle true si c'est un bouton poussoir
 */
function Button(type, idName, shortName, extension, toolTipText, toggle, mainModel, clickMethod, isAjax, url){
	
 	this.type = type; 
	this.toggle = toggle;
	this.isPressed = false;
	this.isDisabled = false;
	
	if(this.type == PICTURE_BUTTON){
		
		this.isImage = true;
		
		//this.parentDom = parentDom ;
		this.domBT = document.createElement("img") ;
		this.domBT.setAttribute("id", idName);
		//this.drawButton(idName);
		
		this.normal 		= new Image();
		this.normal.src 	= shortName +   '.' + extension;
		this.over 			= new Image();
		this.over.src 		= shortName + '_o.' + extension;
		this.press 			= new Image();
		this.press.src 		= shortName + '_p.' + extension;
		this.disable 		= new Image();
		this.disable.src 	= shortName + '_d.' + extension;
		//Init
		this.domBT.src = this.normal.src;
		
		this.domBT.onmouseover = this.getOver;
		this.domBT.onmouseout  = this.getOut;
		this.domBT.onmousedown  = this.getDown;
		this.domBT.onmouseup  = this.getUp;
	
	}else if(this.type == INPUT_BUTTON){
	
		this.isImage = false;
		this.domBT = document.createElement("input");
		this.domBT.setAttribute("id", idName);
		this.domBT.setAttribute("type", "button");
		this.domBT.setAttribute("value", shortName);
		
	}else if(this.type == TEXT_BUTTON){
	
		this.isImage = false;
		this.domBT = document.createElement("a");
		this.domBT.setAttribute("id", idName);
		this.domBT.textContent = shortName;
		
		this.domBT.onmouseover = this.getOver;
		this.domBT.onmouseout  = this.getOut;
		this.domBT.onmousedown  = this.getDown;
		this.domBT.onmouseup  = this.getUp;		
	}
	
	this.toolTipText = toolTipText;
	
	//On attache les modèles du bouton et du container au DOM
	this.domBT.buttonModel = this;
	this.domBT.mainModel = mainModel;
	
	//Gestion du clic
	/*if(isAjax){
		this.url = url;
		this.domBT.onclick = clickMethod;
	}else{*/
	if(clickMethod){
		this.domBT.onclick = clickMethod;
	}
	//}
	
}
/**
 *
 */
Button.prototype.drawButton = function(parentName){
	document.getElementById(parentName).appendChild(this.getDom());
	var ttp = new TooltipParams();
	ttp.mustManageEvent = false;
	this.tooltip = new Tooltip(this.domBT, this.toolTipText, ttp);
}


Button.prototype.initCSS = function(mainCSS, toggledCSS){
	this.mainCSS = mainCSS;
	this.toggledCSS = toggledCSS;
	this.domBT.setAttribute("class", this.mainCSS);
}
Button.prototype.initUrlAndTarget = function(url, target){
	if(target)
		this.domBT.setAttribute("target", target);
	if(url)
		this.domBT.setAttribute("href", url);
}
Button.prototype.gotoUrl = function(){
	//parent.frames[1].location.href = "sport.html";
	//this.domBT.setAttribute("target", target);
}

/**
  * Ecrit le button dans le document
  * <img id="test1" />
  *//*
Button.prototype.drawButton = function (idName){
	this.domBT = document.createElement("img");
	var id = document.createAttribute("id");
	id.nodeValue = idName;
	this.domBT.setAttributeNode(id);
	this.parentDom.parentNode.appendChild(this.domBT);
}*/
Button.prototype.getDom = function(){
	return this.domBT;
}
Button.prototype.getTooltipDom = function(){
	this.tooltip = new Tooltip(this.domBT, this.toolTipText);
}
Button.prototype.getHTML = function(){
	return this.domBT.innnerHTML;
}
Button.prototype.unselect = function(){
	
	if(this.type == PICTURE_BUTTON){		
		if(this.toggle){
			this.domBT.src = this.normal.src;
			this.isPressed = false;
		}
	}else if(this.type == TEXT_BUTTON){
		if(this.toggle){
			this.domBT.className = this.mainCSS;
			this.isPressed = false;
		}
	}
}
Button.prototype.select = function(){
	if(this.type == PICTURE_BUTTON){		
		if(this.toggle){
			this.domBT.src = this.press.src;
			this.isPressed = true;
		}
	}else if(this.type == TEXT_BUTTON){
		if(this.toggle){
			this.domBT.className = this.mainCSS + " " + this.toggledCSS;
			this.isPressed = true;
		}
	}
}

/**
 *@return true si le bouton est desactivé et false sinon
 */
Button.prototype.isDisable = function(){
	return this.isDisabled;
}

Button.prototype.changeVisibility = function(enable, visible){
	if(enable){
		this.domBT.src = this.normal.src;
		this.domBT.style.visibility = 'visible';
		this.isDisabled = false;
	}else{
		this.isDisabled = true;
		if(visible){
			if(this.type == PICTURE_BUTTON){
				this.domBT.src = this.disable.src;
			}
			this.domBT.style.visibility = 'visible';
		}else{
			this.domBT.style.visibility = 'hidden';
			
		}
	}
}

/**
 * Methods called by an event
 */
Button.prototype.getOver = function(){

	//On affiche un tooltip après l'avoir survolé pendant au moins 1000ms
	if(this.buttonModel.tooltip)
		this.buttonModel.tooltip.mayShow();
	
	if(this.buttonModel.type == PICTURE_BUTTON && !this.buttonModel.isDisable() && !this.buttonModel.isPressed){
		this.src = this.buttonModel.over.src;	
	}else if(this.buttonModel.type == TEXT_BUTTON && !this.buttonModel.isDisable() && !this.buttonModel.isPressed){
		this.className = this.buttonModel.mainCSS + " " + "over";
	}
}

Button.prototype.getOut = function(){
	
	if(this.buttonModel.tooltip)
		this.buttonModel.tooltip.mayHide();

	if(this.buttonModel.type == PICTURE_BUTTON && !this.buttonModel.isDisable() && !this.buttonModel.isPressed){
		this.src = this.buttonModel.normal.src;
	}else if(this.buttonModel.type == TEXT_BUTTON && !this.buttonModel.isDisable() && !this.buttonModel.isPressed){
		this.className = this.buttonModel.mainCSS;
	}
}

Button.prototype.getDown = function(e){
	if(!this.buttonModel.isDisable())
		if(this.buttonModel.type == PICTURE_BUTTON){
			
			if(this.buttonModel.toggle){
				if(this.buttonModel.isPressed){
					this.src = this.buttonModel.normal.src;
					this.buttonModel.isPressed = false;
				}else{
					this.src = this.buttonModel.press.src;
					this.buttonModel.isPressed = true;
				}
			}else{
				this.src = this.buttonModel.press.src;
			}
		}else if(this.buttonModel.type == TEXT_BUTTON){
			if(this.buttonModel.toggle){
				if(this.buttonModel.isPressed){
					this.className = this.buttonModel.mainCSS;
					this.buttonModel.isPressed = false;
				}else{
					this.className = this.buttonModel.mainCSS + " " + this.buttonModel.toggledCSS;
					this.buttonModel.isPressed = true;
				}
			}else{
				this.className = this.buttonModel.mainCSS;
			}
			
		}
}

/**
 *
 */
Button.prototype.getUp = function(){
	if(this.buttonModel.type == PICTURE_BUTTON && !this.buttonModel.isDisable() && !this.buttonModel.toggle)
		this.src = this.buttonModel.normal.src;
}