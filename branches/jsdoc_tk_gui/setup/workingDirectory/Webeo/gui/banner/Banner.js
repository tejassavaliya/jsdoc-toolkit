ek.require("ao.ajax.Ajax");
ek.require("gui.tooltip.Tooltip");
ek.require("gui.fx.Fade");

ek.register("gui.banner.Banner");

ek.requireCSS("css.gui.banner.Banner", "banner.Banner");

/**
 * @fileoverview
 * The Banner.js file class allow you to create simple banner/SlideShow
 * The banner can hold Picture, SWF applet and other pub script.
 * You can find some Demo Examples at this address : http://component.webeo.fr/banner.html
 *
 *@author Sébastien Bordes => Sebastien dot Bordes at webeo dot fr
 *@version 1.0
 */
 
/**
 * Create a pictureBanner object
 * @param src the image source
 * @param link the link of the image, if null no link is available
 * @param border the border of the image
 * @param target the target of the image link
 * @param width the width of the image
 * @param height the height of the image
 * @private
 */
function PictureBanner (src, link, border, target, width, height){
	this.src = src;
	this.link = link;
	this.border = (border) ? border : 0 ;
	this.target = (target) ? target : "_blank";
	this.width = width; //No default Value
	this.height = height; //No default Value
} 

/**
 * Get the node of the picture banner ( like this : <a> <img /></a>)
 * @private
*/
PictureBanner.prototype.getHTMLNode = function (){
	if(!this.node){
		var imgNode = Dom.createHTMLImageElement(this.src, null, null, this.width, this.height, this.border, null);
		this.node = Dom.createHTMLAnchorElement(imgNode, this.link, this.target, null, null);
	}
	return this.node;
} 
/*TODO
function SWFBanner (src, params, width, height){
	this.src = src;
	this.width = width;
	this.height = height;
	this.params = (params) ? params : new Array();
}
SWFBanner.prototype.getHTMLNode = function (){
	var res = '<object classid="CLSID:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
	res    += 'codebase="http://active.macromedia.com/flash2/cabs/swflash.cab#version=4,0,0,0" ';
	res    += 'width="600" height="400">';
	res += '<param name="movie" value="'+this.src+'">';
	for(var param in this.params){
		res += '<param name="'+param+'" value="'+this.param[param]+'">';
	}
	res += '</object>';
	return res;
} 

function ScriptBanner (jsCode){
	this.jsCode = jsCode;
}
ScriptBanner.prototype.getHTMLNode = function (){
	return '<script language="Javascript">'+this.jsCode+'</script>';
}
*/
 
/**
 * Create a banner object
 *@param divName the id of the container element.
 *@param delay the delay between 2 slides in seconds.
*/
function Banner (divName, delay, isFading){
	
	this.divName = (divName) ? divName : "banners";
	this.delay = (delay) ? delay * 1000 : 10000; //10 seconds by default
	this.isFading = (isFading) ? isFading : false;
	
	if(this.isFading){
		Fade.register(this.divName);
	}
	
	this.divDom = Dom.getElement(this.divName);
	this.divDom.bannerModel = this;
	
	this.banners = new Array();
	this.index = 0 ;
	
	var params = new TooltipParams("banner_tooltip", new Position(false, 0, false, 0), 200, 2000);
	this.tooltip = new Tooltip(this.divDom, '<div id="play_'+this.divName+'">Pause</div>', params);
	
	Dom.getElement('play_'+this.divName).onclick = this.clickButton;
	Dom.getElement('play_'+this.divName).model = this;
	
	
} 
/**
 * Add a PictureBanner Element to the SlideShow
 * @param src the image source
 * @param preload if true all image to be preloaded
 * @param link the link of the image, if null no link is available
 * @param border the border of the image
 * @param target the target of the image link
 * @param width the width of the image
 * @param height the height of the image
 */
Banner.prototype.addPictureBanner = function (src, preload, link, border, target, width, height){
	b = new PictureBanner(src, link, border, target);
	if(preload){
		img = new Image();
		img.src = src;
		//while(!img.complete){
			//wait
		//}
	}
	this.banners.push(b);
	//TODO IMPROVE
	//b.getHTMLNode().id = this.divName + "_banner_" + this.banners.length;
}

/*TODO
Banner.prototype.addSWFBanner = function (src, params, width, height){
	b = new SWFBanner(src, width, height, params);
	this.banners.push(b);
}
Banner.prototype.addScriptBanner = function (jsCode){
	b = new ScriptBanner(jsCode);
	this.banners.push(b);
}
*/

/**
 * Start the slideShow, or restart if the slideShow was paused
 * @private
 */
Banner.prototype.start = function (){
	//Load the first banner/slide
	this.changeCurrentNode(this.banners[this.index].getHTMLNode());
	
	//puis toutes les n  secondes on charge la bannière suivante
	this.timer = window.setInterval("document.getElementById('"+this.divName+"').bannerModel.next()",this.delay);
}

/**
 * Start the slideShow with the Ajax method, or restart if the slideShow was paused
 * @private
 */
Banner.prototype.startAjax = function (ajaxObject){
	//on charge la première bannière
	this.ajaxObject = ajaxObject;
	
	//puis après n secondes on charge les bannières avec une requête ajax
	this.ajaxTimer = window.setTimeout("document.getElementById('"+this.divName+"').bannerModel.next()",this.delay);
}

/**
 * Stop the slideshow if it was previsously started. 
 * @private
 */
Banner.prototype.stop = function (){
	if(this.timer){
		window.clearInterval(this.timer);	
		this.timer = undefined;
	}
}

/**
 * Show the next element of the queue.
 * @private
 */
Banner.prototype.next = function (){
	
	if(this.index< this.banners.length - 1){
		this.index ++;
	}else{
		this.index = 0;
	}
	//if(this.isFading){
	//	Fade.fadeOut(this.divName, "Dom.getElement('"+this.divName+".model.changeCurrentNode()')");
	//}else{
		this.changeCurrentNode(this.banners[this.index].getHTMLNode());
	//}
}

/**
 * Change the current node, if it's the first time append it otherwise replace the older one.
 * @param newNode the new node to show
 * @private
 */
Banner.prototype.changeCurrentNode = function (newNode){
	
	if(this.currentNode){
		this.divDom.replaceChild(newNode,this.currentNode);
	}else{//FirstTime
		this.divDom.appendChild(newNode);
	}
	this.currentNode = newNode;
	
	if(this.isFading){
		Fade.fadeOut(this.divName);
	}
}

/*TODO
Banner.prototype.getOver = function (){
	
}

Banner.prototype.getOut = function (){
	
}
*/

/**
 * TODO Manage the play/Pause feature #see NavBarControls
 * @private
 */
Banner.prototype.clickButton = function (){
	if(this.textContent == "Pause"){
		this.textContent = "Play";
		this.model.stop();
	}else{
		this.textContent = "Pause";
		this.model.start();//TODO
	}
}