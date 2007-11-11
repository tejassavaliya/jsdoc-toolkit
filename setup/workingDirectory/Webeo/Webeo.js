/**
 * @fileoverview
 * The Webeo class allow you to manage all package easily, you can create dependancies between a lot of js files
 * Webeo will import only the required files
 *@author Sébastien Bordes => Sebastien dot Bordes at webeo dot fr
 *@version 1.0
 */
/** Create a single and easily accessible instance */ 
ek = new Webeo(false);
//ek = new Webeo(false, "fr", "webeo", "component");  //for web use

/**
 * Field used to get the current version of this component
 * @type String
 * @see #getVersion
 */
Webeo.version = "1.0";

/**
 * Field used to choose the import method by ajax or by Dom addition.
 * The first method will eval all js script reurned by an Ajavx Call (and so on for style sheet).
 * The second method will add a <script> dom node into the head element.
 * @private
 * @type boolean
 */
Webeo.prototype.isAjax = false ;

/**
 * Field used to say how the url must be constructed.
 * If true relative of a folder, ie: /myLibFolder ; 
 * if false absolute with a complete url, ie: http://component.emukina.fr/
 * @private
 * @type boolean
 */
Webeo.prototype.isRelative = true;

/**
 * Field used to initialize the top-level domain name to construct an absolute Url
 * @private
 * @type String
 * @see #setLocation
 */	
Webeo.prototype.tld = "fr";

/**
 * Field used to initialize the domain name to construct an absolute Url
 * @private
 * @type String
 * @see #setLocation
 */
Webeo.prototype.domain = "webeo";

/**
 * Field used to initialize the sub-domain name to construct an absolute Url
 * @private
 * @type String
 * @see #setLocation
 */
Webeo.prototype.subDomain = "component";

/**
 * Field used to store the script folder name.
 * This folder name is concatened with the absolute or relative url (depending on isRelative attribute)
 * to obtain the full path of the js reposiory folder (where all .js files are stored).
 * @private
 * @type String
 * @see #setPath
 */
Webeo.prototype.jsRepository = "js/";

/**
  * Field used to store the css folder name.
 * This folder name is concatened with the absolute or relative url (depending on isRelative attribute)
 * to obtain the full path of the css reposiory folder (where all .css files are stored).
 * @private
 * @type String
 * @see #setPath
 */
Webeo.prototype.cssRepository = "css/";

/**
 * Array used to store which .js file was loaded.
 * @private
 * @type boolean
 */
Webeo.prototype.loaded = new Array();
/**
 * Array used to store which .css file was loaded.
 * @private
 * @type boolean
 */
Webeo.prototype.loadedCSS = new Array();


/**
 * Construct an Webeo object
 * @class
 * This class is used to manage easily all other Webeo's package and files
 * @constructor
 * @param isAjax : import script and CSS with ajax method (see Webeo.isAjax attribute)
 * @param tld : Top-Level Domain; for example '.fr' , '.com' (see Webeo.tld attribute)
 * @param domain : Domain name ; for example 'emukina' , 'google' (see Webeo.domain attribute)
 * @param subDomain : Sub-Domain name (optional); for example 'component', 'www' (see Webeo.subDomain attribute)
 * @param jsPath : JS folder name (optional); for example 'js/', 'jsLib/' (see Webeo.jsRepository attribute)
 * @param cssPath : CSS folder name (optional); for example 'css/', 'stylesheet/' (see Webeo.cssRepository attribute)
 * @return a new Webeo Object
 */
function Webeo (isAjax, tld, domain, subDomain, jsPath, cssPath){

	this.isAjax = (isAjax!=undefined) ? isAjax : false ;
	
	this.isRelative = tld == undefined && domain == undefined;
	this.tld = tld;
	this.domain = domain;
	this.subDomain = subDomain;
	
	//this.setJSPath(jsPath);
	//this.setCSSPath(cssPath);
	
	this.loaded = new Array();
	this.loadedCSS = new Array();
	this.defaultCSS = new Array();
	
	this.version = new Array();
}

/**
 * Return or display the version of Webeo Object
 * @param alert : must show an alert message wi the current version or not
 * @return the current version if alert =  false
 */
Webeo.prototype.getWebeoVersion = function (alert){
	if(alert){
		alert('Webeo.js => version: ' +this.version);
	}else{
		return this.version;
	}
}

/**
 * Set the default Location of the main package.
 * @param tld : Top-Level Domain; for example '.fr' , '.com'
 * @param domain : Domain name ; for example 'emukina' , 'google' 
 * @param subDomain : Sub-Domain name (optional); for example 'component', 'www'
 */
Webeo.prototype.setLocation = function (tld, domain, subDomain){
	
	this.isRelative = tld == undefined && domain == undefined;
	
	this.subDomain = subDomain;
	this.domain = domain;
	this.tld = tld; //TODO same thing setJSPath
}

/**
 * Set the default path of the js source folder
 * @param jsPath : The path of the js source folder ; for example 'js'
 */
Webeo.prototype.setJSPath = function (jsPath){
	this.jsRepository = (jsPath!=undefined) ? jsPath : "js/" ;
}

/**
 * Set the default path of the css source folder
 * @param cssPath : The path of the css source folder ; for example 'css'
 */
Webeo.prototype.setCSSPath = function (cssPath){
	this.cssRepository = (cssPath!=undefined) ? cssPath : "css/" ;
}

/**
 * Register a js source file or a js source folder
 * @param name : The full name of the source file ; for example 'gui.tooltip.Tooltip' or the name of a package with .* (gui.tooltip.*)
 * => /yourAppRoot/yourJsfolder/gui/tooltip/Tooltip.js or /yourAppRoot/yourJsfolder/gui/tooltip/package.js
 */
Webeo.prototype.register = function (name){

	if(this.loaded[name] != undefined){
		this.loaded[name] = true;
	}
}

/**
 */
Webeo.prototype.setVersion = function (name, version){
	this.version[name] = version;	
}

/**
 */
Webeo.prototype.getVersion = function (){
	for(var name in this.version){
		if(!this.version[name])
			txt += name + " : " + this.version[name] + "\n";
	}
	alert('Webeo Components version \n' + txt);
}

/**
 * Register a css source file or a css source folder
 * @param name : The full name of the source file ; for example 'tooltip.Tooltip-red' => /yourAppRoot/yourCssfolder/tooltip/Tooltip-red.css
 */
Webeo.prototype.registerCSS = function (name){

	if(this.loadedCSS[name] != undefined){
		this.loadedCSS[name] = true;
	}
}

/**
 * Tell that the current file require another one
 * and so the Webeo object will import it
 * @param name : The full name of the source file to import 
 */
Webeo.prototype.require = function (name){
	if(this.loaded[name] == undefined){
		this.loaded[name] = false;
		this.load(name);
	}
}

/**
 * Tell that the current file require another the CCS file passed in argument
 * and so the Webeo object will import it or replace the existing one
 * @param name : The id of the link Dom object, useful to replace a stylesheet by another 
 * @param defaultName :  The full name of the source file to import 
 * @param ignoreDefault : if true ignore the default value stored in the defaultCSS array
 */
Webeo.prototype.requireCSS = function (id, defaultName, ignoreDefault){
	if(defaultName){
		if(this.loadedCSS[id] == undefined){
			this.loadedCSS[id] = false;
			this.loadCSS((this.defaultCSS[id] && !ignoreDefault)?this.defaultCSS[id]:defaultName, false, id);
		}else{
			this.loadedCSS[id] = false;
			this.loadCSS((this.defaultCSS[id] && !ignoreDefault)?this.defaultCSS[id]:defaultName, true, id);
		}
	}else{
		if(this.loadedCSS[id] == undefined){
			this.loadedCSS[id] = false;
			this.loadCSS(id, false, id);
		}
	}
}

/**
 * Store the default value (the css name) for a component with its id
 * @param id : The id of the link Dom object, useful to replace a stylesheet by another 
 * @param defaultName :  The full name of the source file to import 
 */
Webeo.prototype.initCSS = function (id, defaultName){
	if(id){
		this.defaultCSS[id] = defaultName;
	}
}

/**
 * This metod is used to initialize the framework
 * The real initialisation will begin after the end of the document load
 * due to an Opera Bug
 * @param initFunction : The method to call when the framework is ready , Typically init() described in the main js file of the web framework page
 */
Webeo.prototype.start = function (initFunction){
	
	//Avoid the opera bug
	if(window.opera){
		document.onload = function(){
			ek.startAfterDocumentLoad(initFunction);
		}
	}else{
		ek.startAfterDocumentLoad(initFunction);
	}
}

/**
 * This metod is used to initialize the framework
 * All dependancies will import only required files
  * @param initFunction : The method to call when the framework is ready , Typically init() described in the main js file of the web framework page
 */
Webeo.prototype.startAfterDocumentLoad = function (initFunction){

	
	if(this.run == undefined){
		//Set the loop flag to force 
		this.loop = true;
		this.run = window.setTimeout("ek.loop = false;", 10000);	
	}
	var ready = true;
	for(var name in this.loaded){
		ready = ready && this.loaded[name];
	}
	if(ready){
		//All required Script have been loaded, launch the init function
		initFunction();
		//alert(initFunction.toString() + " - " + typeof initFunction);
		//initFunction.apply(this, null);
		//eval(initFunction+"()");
	}else{
		if(this.loop){
			//Wait 1000 ms and retry to start the init function 
			window.setTimeout("ek.start("+initFunction+")", 1000);
		}else{
			var txt = "";
			for(var name in this.loaded){
				if(!this.loaded[name])
					txt += name + "\n";
			}
			alert("Error loading file :\n" + txt);
		}
	}
}

/** PRIVATE METHODS */

/**
 * Load the current file name give in arguments
 * Choose the method to import , with ajax request or Dom include
 *@private
 * @param name : The full name of the source file to import 
 */
Webeo.prototype.load = function (name){
	if(this.isAjax){
		this.loadAjax(name);//Not Managed yet
	}else{
		this.loadScript(name);
	}
}

/**
 * Load the file with Ajax request
 * @private
 */
Webeo.prototype.loadAjax = function (name){
	//TODO
}

/**
 * Load the file by adding the Dom node script into the document
 * @private
 * @param name : The full name of the source file to import 
*/
Webeo.prototype.loadScript = function (name){
	var path = this.convertPackageToPath(name, true);
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.src = this.convertPathToUrl(path, true);
	script.id = name;
	script.type = "text/javascript";
	head.appendChild(document.createTextNode("\n"));
	head.appendChild(script);
	script.ek = this;
	script.onload = function(){
		//this.ek.register(this.id);
	}
	
}

/**
 * Load the file by adding the Dom node script into the document
 * @private
 * @param name : The full name of the source file to import 
*/
Webeo.prototype.loadCSS = function (name, reload, id){
	var path = this.convertPackageToPath(name, false);
	
	if(reload){
		var link = document.getElementById(id);
		link.href = this.convertPathToUrl(path, false);
	
	}else{

		var head = document.getElementsByTagName("head")[0];
		var link = document.createElement("link");
		link.setAttribute("id", id);
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", this.convertPathToUrl(path, false));
		head.appendChild(document.createTextNode("\n"));
		head.appendChild(link);
		link.ek = this;
		link.onload = function(){
			this.ek.registerCSS(this.id);
		}
	}
}

/**
 * Convert "gui.tooltip.tooltipManager" to "gui/tooltip/TooltipManager.js" or "gui.tooltip.*" to "gui/tooltip/package.js"
 * @private
 * @param pckg : The full name of the source file to import wrote with package style (with dot)
 * @param js : Used to indicate that it's a js or a css file; true => js | false => css
 * @return path the full path converted
 */
Webeo.prototype.convertPackageToPath = function (pckg, js) {
	var path = pckg.replace(/\*/, 'package');//TODO TEST IT
    path = path.replace(/\./g, '/');
    path = (js) ? path.concat('.js') : path.concat('.css');
    return path;
}

/**
 * Convert "gui/tooltip/TooltipManager.js" to "js/gui/tooltip/TooltipManager.js" or to "http://component.emukina.fr/js/gui/tooltip/TooltipManager.js"
 * @private
 * @param path : The end of the path of the source file to import 
 * @param js : Used to indicate that it's a js or a css file; true => js | false => css
 */
Webeo.prototype.convertPathToUrl = function (path, js) {
    var repo = (js) ? this.jsRepository : this.cssRepository;
	if(this.isRelative){
		return repo + path;
	}else{
		return "http://"+ ((this.subDomain)?this.subDomain+ ".": "")  + this.domain + "." + this.tld + "/" + repo + path;
	}
}

/** STATIC METHODS */

/**
 * Fonction utilitaire permettant la gestion des frames
 */
function writeFrameLink(){
	dom = document.getElementById('page');
	text = dom.innerHTML;
	res = '<a href="index.html?'+self.location+'" target="_top">Frames</a>';
	res += '&nbsp;';
	res += '<a href="'+self.location+'" target="_top">No Frames</a>';
	res += '&nbsp;';
	res += text;
	dom.innerHTML = res;
}
//TODO TO DELETE
/* TOOD DO ANOTHER
function writeApi(apiDiv, obj) {
	var result = "";
	result += "<h2>Properties</h2>";
	for (var i in obj.prototype) {
		if(typeof obj.prototype[i] == "string" || typeof obj.prototype[i] == "number")
			result += "<h3>"+i+"</h3>" + " => "+ typeof obj.prototype[i] +" -- " + obj.prototype[i] + "<br/>";
	}

	result += "<h2>Functions</h2>";
	for (var i in obj.prototype) {
		if(typeof obj.prototype[i] == "function")
			result += i + " ( "+ typeof obj.prototype[i] +" ) => " + obj.prototype[i] + "<br/><br/>";
	}
	document.getElementById(apiDiv).innerHTML = result;
} */

/*
Webeo.jsRepository = "js/";
Webeo.cssRepository = "css/";
Webeo.loaded = new Array();
Webeo.loadedCSS = new Array();
Webeo.prototype = {

    getVersion : function () { Webeo.getVersion.apply(Webeo, arguments); },
	setLocation : function () { Webeo.setLocation.apply(Webeo, arguments); },
	setPath : function () { Webeo.setPath.apply(Webeo, arguments); },
	register : function () { Webeo.register.apply(Webeo, arguments); },
	registerCSS : function () { Webeo.registerCSS.apply(Webeo, arguments); },
	require : function () { Webeo.require.apply(Webeo, arguments); },
	requireCSS : function () { Webeo.requireCSS.apply(Webeo, arguments); },
	start : function () { Webeo.start.apply(Webeo, arguments); }
};*/
