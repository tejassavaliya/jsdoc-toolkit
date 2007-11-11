/**
 * @fileoverview
 * The AjaxManager file allow you to create a real framework for your Ajax logical website
 *
 *@requires ao.ajax.Ajax
 *@requires gui.tools.Dom
 *@requires gui.tools.Logger
 *@author Sébastien Bordes => Sebastien dot Bordes at webeo dot fr
 *@version 1.0
 */
 
ek.require("ao.ajax.Ajax");
ek.require("gui.tools.Dom");
ek.require("gui.tools.Logger");

//Google AjaXslt library
/*ek.require("ao.ajaxslt.util");
ek.require("ao.ajaxslt.xmltoken");
ek.require("ao.ajaxslt.dom");
ek.require("ao.ajaxslt.xpath");
ek.require("ao.ajaxslt.xslt");*/

ek.register("ao.ajax.AjaxManager");

/**
 * Static field used to determine the LINK type of an Ajax Action Object
 * @final
 * @type int
 */
AjaxAction.LINK_TYPE = 1;

/**
 * Static field used to determine the type of an Ajax Action
 * @final
 * @type int
 */
AjaxAction.FORM_TYPE = 2;

/**
 * Static field used to determine the type of an Ajax Action
 * @final
 * @type int
 */
AjaxAction.MESSAGE_TYPE = 3;

/**
 * Private field used to store the id of the Ajax Action
 * @private
 * @type int
 */
AjaxAction.prototype.id = null;

/**
 * Private field used to store the Dom Element of the Ajax Action
 * @private
 * @type int
 */
AjaxAction.prototype.dom = null;

/**
 * Private field used to type of the Ajax Action
 * @private
 * @type int
 */
AjaxAction.prototype.type = AjaxAction.LINK_TYPE;

/**
 * Private field used to store an XMLHTTPRequest
 * @private
 * @type Ajax
 */
AjaxAction.prototype.ajax = null;

/**
 * public field used to store the form id in order to extract datas
 * @private
 * @type String
 */
AjaxAction.prototype.formName = null;

/**
 * Private field used to store the propagate atrribute
 * The default value is false
 * @private
 * @type boolean
 */
AjaxAction.prototype.propagate = false;

/**
 * public field used to tell if the content has been loaded
 * @public
 * @type boolean
 */
AjaxAction.prototype.isLoaded = false;

/**
 * public field used to tell if the template has been loaded
 * @public
 * @type boolean
 */
AjaxAction.prototype.isTemplateLoaded = false;

/**
 * public field used to delete the action if necesary
 * @public
 * @type boolean
 */
AjaxAction.prototype.toSave = false;

/**
 * Construct an AjaxAction object
 * @class
 * This class is used to create some Ajax Action
 * An AjaxAction is attached to an UserAction and have some personal attributes 
 * @constructor
 * @requires gui.tools.Dom 
 *
 * @param id : id of the Ajax Action
 * @param type : type of the Ajax Action
 * @param ajax : the ajax object used to communicate
 * @param formName :  the name of the form for an FORM_TYPE AjaxAction
 * @param propagate : if true the event must be propagated, stopped otherwise
 *
 * @return a new Ajax Action object
 */
function AjaxAction (id, type, ajax, formName, propagate){
	this.id = id;
	this.dom = Dom.getElement(id);
	this.type = type;
	this.ajax = ajax;
	this.formName = formName;
	this.propagate = (propagate) ? propagate : false;
}

/**
 * Add Parameters to the Ajax embeded object.
 * @param params: parameters to add
 */
AjaxAction.prototype.setParams = function (params){
	this.ajax.setParams(params);
}

/**
 * Add Parameters to the Ajax embeded object by parsing the form attached to the AjaxAction Object.
 * If the the form's name of the AjaxAction is null the parameters will be unsetted
*/
AjaxAction.prototype.formToParams = function (){
	if(this.formName != null){
		this.ajax.setParams(Dom.formToParams(this.formName, true));
	}else{
		this.ajax.setParams(null);	
	}
}

/*----------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * public field used to store the name of the element to display or not
 * @public
 * @type string
 */
AjaxDisplay.prototype.name = null;

/**
 * public field used to store the Dom Element to display or not
 * @public
 * @type Dom Element
 */
AjaxDisplay.prototype.dom = null;

/**
 * public field used to determine the display method : ( displayed | disabled | hide)
 * @public
 * @type String
 */
AjaxDisplay.prototype.type = false;

/**
 * public field used to hide all other element of the same parent element
 * @public
 * @type boolean
 */
AjaxDisplay.prototype.isSingle = false;

/**
 * Construct an AjaxDisplay object
 * @class
 * This class is used to create an Ajax Display object used to manage an HTML Area
 * @constructor
 * @requires gui.tools.Dom
 * @param name : name of the element to display or not
 * @param type : determine the display method : ( displayed | disabled | hide)
 * @param isSingle :  if true hide all other element of the same parent element
 *
 * @return a new Ajax Display Object
 */
function AjaxDisplay (name, type, isSingle){
	this.name = name;
	if(Dom.isElement(name)){
		this.dom = Dom.getElement(name);
	}
	this.type = type;
	this.isSingle = isSingle;
}

/**
 * Active this Display.
 */
AjaxDisplay.prototype.run = function (){
	if(this.dom != null || Dom.isElement(this.name) ){
		
		if(this.dom == null){
			this.dom = Dom.getElement(this.name);	
		}
	
		switch(this.type){
			case "displayed" : this.dom.style.display = ""; 
				break;
			case "hide" : this.dom.style.display = "none"; 
				break;
			case "disabled" : this.dom.style.display = "";
					//this.dom.style.className = "disabled"; //TO CHECK		
				break;
		}
	}
}

/*----------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * Static field used to determine the type of a response node
 * @final
 * @type int
 */
AjaxManager.RESPONSE_TYPE_CONTENT 		= 0 ;

/**
 * Static field used to determine the type of a response node
 * @final
 * @type int
 */
AjaxManager.RESPONSE_TYPE_XML			= 1 ;

/**
 * Static field used to determine the type of a response node
 * @final
 * @type int
 */
AjaxManager.RESPONSE_TYPE_XSL			= 2 ;

/**
 * Static field used to determine the type of a response node
 * @final
 * @type int
 */
AjaxManager.RESPONSE_TYPE_ACTION		= 3 ;

/**
 * Static field used to determine the type of a response node
 * @final
 * @type int
 */
AjaxManager.RESPONSE_TYPE_COMPONENT 	= 4 ;

/**
 * Static field used to determine the type of a response node
 * @final
 * @type int
 */
AjaxManager.RESPONSE_TYPE_ECMASCRIPT	= 5 ;
	
	
/**
 * Construct an AjaxManager Object
 * @class
 * This class is used to manage easily all other Emukilook's pakage and files
 * @constructor
 * @require ao.ajax.Ajax
 * @require gui.tools.Dom
 * @param defaultDiv : the default div which will contain all other div
 */
function AjaxManager (defaultDiv){
	
	this.getLogger().trace("AjaxManager Contructor");
	
	this.defaultDiv = (defaultDiv) ? Dom.getElement(defaultDiv) : Dom.getElement("content"); 	
		
	this.display	= new Array();
	this.container	= new Array();
	this.actions 	= new Array();
	this.content	= new Array();
	this.xsl		= new Array();
	this.xml		= new Array();
	this.component	= new Array();

}

/**
 * Register a link Element
 * @param the id attribute of the link Element  
 *
 * @see AjaxAction
 * @type AjaxAction
 * @return an Ajax Action
 */
AjaxManager.prototype.registerLink = function(id, url, method, contentType, params){
	this.getLogger().trace("Register Link :" + id + " " + url + " " + method );
	
	var aj = new Ajax(this, this.onLoad, this.onError, url, method, contentType, params);

	return new AjaxAction(id, AjaxAction.LINK_TYPE, aj);
}

/*
 * register a form Element
 */
AjaxManager.prototype.registerForm = function (id, url, method, form, contentType, params){
	this.getLogger().trace("Register Form :" + id + " " + url + " " + method + " form: "+form);
	
	var aj = new Ajax(this, this.onLoad, this.onError, url, method, contentType, params);
	
	return new AjaxAction(id, AjaxAction.FORM_TYPE, aj, form);
}

/*
 * Register a Message Element
 */
AjaxManager.prototype.registerMessage = function (id, url, method, message, contentType, params){
	this.getLogger().trace("Register Message :" + id + " " + url + " " + method );
	
	var aj = new Ajax(this, this.onLoad, this.onError, url, method, contentType, params);

	return new AjaxAction(id, AjaxAction.MESSAGE_TYPE, aj);
}

/**
*/
AjaxManager.prototype.registerAction = function (clickDiv, parentName, ajaxAction){
	this.getLogger().trace("Register Action Click: " + clickDiv + " Parent: " + parentName);
	
	if(this.actions[parentName] == null){ // or undefined
		this.actions[parentName] = new Array();
	}
	
	this.actions[parentName].push(ajaxAction); //If not exist !!!! TODO
	
	//Register the user action
	try{
		var domClick = Dom.getElement(clickDiv);
		domClick.ajaxManager = this;
		domClick.ajaxAction = ajaxAction;
		domClick.onclick = this.launchAction;
	}catch(e){
		this.getLogger().error("Register Action failed the " + clickDiv + " doesn't exist ");
	}
}

/**
*/
AjaxManager.prototype.registerDisplay = function (name, ajaxDisplay){
	if(this.display[name] == null){
		this.display[name] = new Array();
	}
	this.getLogger().trace("Register Display for : " + name + " -> " + ajaxDisplay.name);
	this.display[name].push(ajaxDisplay);
}

/**
 * Clean All action related to the given name
 * @param name : the name of the element who need a total delete of its actions 
*/
AjaxManager.prototype.cleanActions = function (name){
	this.getLogger().trace("Clean Actions for : " + name);
	if(this.actions[name] != null){ 
		for(var i = this.actions[name].length-1 ;  i >= 0 ; i--){
			if(!this.actions[name][i].toSave){
				this.getLogger().trace("Delete Action : " + this.actions[name][i]);
				//Remove the element
				this.actions[name].splice(i,1);
			}
		}	
	}	
}

/**
 * Check a div and create it if it doesn't exist
 * Manage a package arbo for example admin.category.index must create this div arbo <div id=content> <div id=admin> <div id=admin.category> <div id=admin.category.index /> </div> </div> </div>
 * @private
 * @param the name of the div to check
 * @type Dom Element
 * @return the Dom Element to check
 */
AjaxManager.prototype.checkDiv = function (divName){
	
	if(!Dom.isElement(divName)){
		var dom = document.createElement("div");
		dom.setAttribute("id", divName);
		
		this.getLogger().trace("Create Div: " + divName);

		if(divName.lastIndexOf(".")>-1){
			var parentDom = this.checkDiv( divName.substring(0, divName.lastIndexOf(".")) );//admin.category.index => admin.category
			parentDom.appendChild(dom);
			this.getLogger().trace("Append Div: " + dom.id + " into " + parentDom.id);
			//TODO this.container
		}else{
			//else we add the current Div into the root element defined in the Ajaxmanager Constructor
			if(this.defaultDiv){
				this.defaultDiv.appendChild(dom);
				this.getLogger().trace("Append Div: " + dom.id + " into " + this.defaultDiv.id);
				this.container[dom.id] = new Array();
			}
		}	
		return dom;	
	}
	return Dom.getElement(divName);

}

/**
  * Called after a click on the link element
  */
AjaxManager.prototype.launchAction = function (){
	//this.getLogger().trace("Launch Action");
	
	if(!this.ajaxAction.isLoaded){
		if(this.ajaxAction.isTemplateLoaded){
			this.ajaxAction.ajax.url += "tpl/no";
			alert(this.ajaxAction.ajax.url); //TODO DELETE THIS
		}
		if(this.ajaxAction.type == AjaxAction.FORM_TYPE){
			this.ajaxAction.formToParams();
		}		
		this.ajaxAction.ajax.sendRequest();
	}
	//this.ajaxManager.render(this.ajaxAction.id);
	
	//This line is very useful to propagate or not the click event, for example for an anchor element if true the href attribute will be used
	return this.ajaxAction.propagate;
}
	
/**
 * Display or hide the elements
 */
AjaxManager.prototype.render = function(name){
	var ad;
	for(var i = 0  ; i < this.display[name].length ; i++){
		ad = this.display[name][i];
		if(ad.isSingle){
			//Hide all other elements of the same parent
			var parentName = name.substring(0, name.lastIndexOf("."));
			this.hideAllExceptOne(parentName, name);
		}
		ad.run();
	}	
}	

/**
 * 
 */
AjaxManager.prototype.hideAllExceptOne = function(parentName, name){
	//for(var child in this.container[parentName] ){
	//	Dom.getElement(child).style.display = "none";
	//}
}
	
/**
 * Load the XML document returned by parsing it
 */
AjaxManager.prototype.onLoad = function (){
	this.manager.parseResponse(this.query.responseXML);
}

/**
 * Display an Alert message if an ajx request failed
 */
AjaxManager.prototype.onError = function (){
	alert("Error : the current Ajax request has failed");
}

/**
 * Parse the xml document of the Ajax response and launch the appropriate method to loadand register an AjaxAction
 * @param xmlNode : The root node of the Ajax response
 */
AjaxManager.prototype.parseResponse = function (xmlNode){
	var root = xmlNode.getElementsByTagName("ajax-response")[0];		 
	var results = root.getElementsByTagName("response");
	for(var i = 0 ; i < results.length ; i ++ ){
		var node = results[i];
		var type = node.getAttribute("type");
		var name = node.getAttribute("name");
		
		switch(type){
			case "content" : 
				this.loadContent(name, node);//TODO loaded = true
				break;	
			case "xml" : 
				this.loadXML(name, node);
				break;		
			case "xsl" :
				this.loadXSL(name, node);//TODO loaded = true
				break;		
			case "ecmascript" : 
				this.loadEcmascript(node);
				break;
			case "action" : 
				this.loadActions(node);
				break;	
			case "display" : 
				this.loadDisplay(node);
				break;					
			case "component" : 
				this.loadComponent(name, node);
				break;	
		}
	}

}

/**
 * Load the static content into its dedicated container
 * @param name : Name of the action
 * @param parentNode : Node of the content node
 */
AjaxManager.prototype.loadContent = function (name, parentNode){
	this.content[name] = this.checkDiv(name);
	this.content[name].innerHTML = this.getContentAsString(parentNode);
	if(this.actions[name]!=undefined){
		this.actions[name].isLoaded = true;
	}
}

/**
 * Parse the xml document of the Ajax response and launch the appropriate method to loadand register an AjaxAction
 * @param xmlNode : The root node of the Content type Ajax response
 */
AjaxManager.prototype.getContentAsString = function( parentNode ) {
	return parentNode.xml != undefined ? this.getContentAsStringIE(parentNode) : this.getContentAsStringMozilla(parentNode);
}

AjaxManager.prototype.getContentAsStringIE = function(parentNode) {
     var contentStr = "";
     for ( var i = 0 ; i < parentNode.childNodes.length ; i++ ) {
         var n = parentNode.childNodes[i];
         if (n.nodeType == 4) {
             contentStr += n.nodeValue;
         }else {
           contentStr += n.xml;
         }
     }
     return contentStr;
  }

AjaxManager.prototype.getContentAsStringMozilla = function(parentNode) {
     var xmlSerializer = new XMLSerializer();
     var contentStr = "";
     for ( var i = 0 ; i < parentNode.childNodes.length ; i++ ) {
          var n = parentNode.childNodes[i];
          if (n.nodeType == 4) { // CDATA node
              contentStr += n.nodeValue;
          }else {
            contentStr += xmlSerializer.serializeToString(n);
     	  }
     }
     return contentStr;
}

AjaxManager.prototype.loadXML = function (name, xmlNode){
	if(this.xsl[name] != null /*&& this.xsl[name] != "" BUG IE CHECK THIS*/){
		
		var html = this.transform(xmlNode, this.xsl[name]);
		Dom.getElement(name).innerHTML = ""; //removeChild
		Dom.getElement(name).appendChild(html);
		//Dom.getElement(name).innerHTML = html;
		
	}//Nothing to do
}

/**
 * Load the XSLT document node to store it
 * @param name : Name of the action
 * @param xslt : Node of the content node
 */
AjaxManager.prototype.loadXSL = function (name, xslt){
	
	this.content[name] = this.checkDiv(name);
	//Store the XSLT stylesheet
	this.xsl[name] = xslt.childNodes[1];
	if(this.actions[name]!=undefined){
		this.actions[name].isTemplateLoaded = true;
	}	
}

/**
 * Load the XSLT document node to store it
 * @param name : Name of the action
 * @param xslt : Node of the content node
 */
AjaxManager.prototype.loadComponent = function (name, xml){
	this.component[name].loadXML(xml);
}

/**
 * Load the Javascript document node and eval it
 * @param xml : xmlNode to eval
 */
AjaxManager.prototype.loadEcmascript = function (xml){
	eval( this.getContentAsString(xml) );
}

/**
 * Load some AjaxActions <action type="link" click="goto.admin.category.index" name="admin.category.index" url="Cat/" method="GET" />
 * @param xml : xmlNode to eval
 */
AjaxManager.prototype.loadActions = function (actionResponse){
			 
	var parentName = actionResponse.getAttribute("name");
	this.cleanActions(parentName);
	
	var results = actionResponse.getElementsByTagName("action");
	for(var i = 0 ; i < results.length ; i ++ ){
		var node = results[i];
		var type = node.getAttribute("type");
		var click = node.getAttribute("click");
		var name = node.getAttribute("name");
		var url = node.getAttribute("url");
		var method = node.getAttribute("method");
		var contentType = node.getAttribute("contentType");
		var params = node.getAttribute("params");
		var formName = node.getAttribute("formName");
		var toSave = node.getAttribute("toSave");
		
		var aa;
		switch(type){
			case "link" : 
				aa = this.registerLink(name, url, method, contentType, params);
				aa.toSave = (toSave == "true");
				this.registerAction(click, parentName, aa);
				break;	
			case "form" : 
				aa = this.registerForm(name, url, method, formName, contentType, params);
				aa.toSave = (toSave == "true");
				this.registerAction(click, parentName, aa);
				break;		
			case "message" :
				//this.registerMessage(name, url, method, contentType, params);
				break;				
		}
	}
}

/**
 * Load some AjaxDisplay 
 * <display name="admin" type="displayed" isSingle"true" />
 * <display name="admin.category" type="displayed" isSingle"true" />
 * <display name="admin.category.index" type="disabled" />
 * <display name="admin.category.modify" type="displayed" />
 * <display name="admin.category.add" type="hide" />
 * @param xml : xmlNode to eval
 */
AjaxManager.prototype.loadDisplay = function (displayResponse){
			 
	var parentName = displayResponse.getAttribute("name");
	//this.cleanActions(parentName);
	
	var results = displayResponse.getElementsByTagName("display");
	for(var i = 0 ; i < results.length ; i ++ ){
		var node = results[i];
		var name = node.getAttribute("name");
		var type = node.getAttribute("type");
		var isSingle = node.getAttribute("isSingle");
		
		this.checkDiv(name);
		var ad = new AjaxDisplay(name, type, isSingle == "true");
		this.registerDisplay(parentName, ad);
	}
	this.render(parentName);
}

/**
 * Transform an XML node with an XSLT stylesheet
 * @param xml : xmlNode to transform
 * @param xsl : xslt stylesheet
 * @return a fragment node for Mozilla and a String for IE or throw an error
 */
AjaxManager.prototype.transform = function (xml, xsl){  
	try {
		// navigateur basé sur Gecko
		if (window.XSLTProcessor){
			var fragment;
			var xsltProcessor = new XSLTProcessor();
			xsltProcessor.importStylesheet(xsl);
			fragment = xsltProcessor.transformToFragment(xml, document);
			return fragment;
			
		} else if (window.ActiveXObject) {
			// ActiveX pour Internet Explorer
			return xml.transformNode(xsl);
		}
	} catch (e) {
		return e;
	}
}

AjaxManager.prototype.getLogger = function (){
	if(!this.logger){
		this.logger = getLogger("AjaxManager");
		this.logger.setLevel(Logger.LEVEL_ALL);
		this.logger.setCurrentID(this.defaultDiv.id);
	}
	return this.logger;
}
