ek.register("gui.tools.Dom");

/**
 * DOM Utilities
 */
var Dom = new Object(); 
 
Dom.NBSP = "&#160;"; 

/** STATIC METHOD*/ 
/**
 * Create an HTMLAnchorElement <a href="href" target="target class="clazz" id="id">text</a>
*/
Dom.createHTMLAnchorElement = function(text, href, target, clazz, id){
	var a = document.createElement("a");
	if(typeof text == "string") 
		a.appendChild(Dom.createTextElement(text));
	else if(text instanceof Object)
		a.appendChild(text);
	if(href) a.setAttribute("href", href);
	if(target) a.setAttribute("target", target);
	if(clazz) a.setAttribute("class", clazz);
	if(id) a.setAttribute("id", id);	

	return a;
}
// HTMLAppletElement
// HTMLAreaElement
/**
 * Create an HTMLBRElement <br />
*/
Dom.createHTMLBRElement = function(){
	return document.createElement("br");
}
// HTMLBaseElement
// HTMLBaseFontElement
// HTMLBodyElement
// HTMLButtonElement
// HTMLCanvasElement
// HTMLCollection
// HTMLDListElement
// HTMLDirectoryElement

/**
 * Create an HTMLDivElement <div class="clazz" id="id">content</div>
*/
Dom.createHTMLDivElement = function(content, clazz, id){
	var div = document.createElement("div");

	Dom.appendContent(div, content);
	
	if(clazz) div.setAttribute("class", clazz);	
	if(id) div.setAttribute("id", id);	

	return div;
}
// HTMLDocument
// HTMLElement
// HTMLEmbedElement
// HTMLFieldSetElement
// HTMLFontElement
// HTMLFormElement
// HTMLFrameElement
// HTMLFrameSetElement
/**
 * Create an HTMLHRElement <hr />
*/
Dom.createHTMLHRElement = function(){
	var hr = document.createElement("hr");
	//TODO
	return hr;
}
// HTMLHeadElement
// HTMLHeadingElement
// HTMLHtmlElement
// HTMLIFrameElement

/** HTMLImageElement 
  border (bordure)
 complete (état du chargement)
 height (hauteur)
 hspace (espace horizontal)
 length (nombre de graphiques)
 lowsrc (graphique- aperçu)
 name (nom)
 src (fichier graphique)
 vspace (espace vertical)
 width (largeur)
 */
Dom.createHTMLImageElement = function(src, name, clazz, width, height, border, id){
	var img = document.createElement("img");

	if(src) img.setAttribute("src", src);
	if(name) img.setAttribute("name", name);
	if(clazz) img.setAttribute("class", clazz);	
	if(width) img.setAttribute("width", width);
	if(height) img.setAttribute("height", height);
	if(border) img.setAttribute("border", border);
	if(id) img.setAttribute("id", id);	

	return img;
}
// HTMLInputElement
// HTMLIsIndexElement
// HTMLLIElement
// HTMLLabelElement
// HTMLLegendElement
// HTMLLinkElement
// HTMLMapElement
// HTMLMenuElement
// HTMLMetaElement
// HTMLModElement
// HTMLOListElement
// HTMLObjectElement
// HTMLOptGroupElement
/** 
 * HTMLOptionElement <option class="clazz" id="id" value="value">content</select>
 TODO
	1. text = texte affiché dans la liste 
	2. value = valeur de la liste à transmettre (facultatif)
	3. defaultSelected = transmettre true quand l'élément doit être l'élément sélectionné par défaut, sinon false (facultatif)
	4. selected = transmettre true quand l'élément doit être sélectionné (facultatif)
 */
Dom.createHTMLOptionElement = function(content, value, clazz, id){
	var option = document.createElement("option");
	if(content) option.innerHTML = content;
	if(value) option.setAttribute("value", value);
	if(clazz) option.setAttribute("class", clazz);
	if(id) option.setAttribute("id", id);
	return option;
}
// HTMLOptionsCollection
// HTMLParagraphElement
// HTMLParamElement
// HTMLPreElement
/** 
 * HTMLQuoteElement <q class="clazz" id="id">content</q>
 */
Dom.createHTMLQuoteElement = function(content, clazz, id){
	var q = document.createElement("a");
	if(content) q.innerHTML = content;
	if(clazz) q.setAttribute("class", clazz);
	if(id) q.setAttribute("id", id);	
	return q;
}
/** 
 * HTMLScriptElement <script type="type" src="src" id="id"></script>
 */
Dom.createHTMLScriptElement = function(type, src, id){
	var script = document.createElement("script");
	if(type) script.setAttribute("type", type);
	if(src) script.setAttribute("src", src);
	if(id) script.setAttribute("id", id);	
	return script;
}
/** 
 * HTMLSelectElement <select class="clazz" id="id"></select>
 */
Dom.createHTMLSelectElement = function(clazz, id, options){
	var select = document.createElement("select");
	if(clazz) select.setAttribute("class", clazz);
	if(id) select.setAttribute("id", id);
//TODO options add	
	return select;
}
/** 
 * HTMLSpanElement <span class="clazz" id="id">content</q>
 */
Dom.createHTMLSpanElement = function(content, clazz, id){
	var span = document.createElement("span");
	span.innerHTML = (content) ? content : Dom.NBSP;
	if(clazz) span.setAttribute("class", clazz);
	if(id) span.setAttribute("id", id);	
	return span;
}
// HTMLStyleElement
// HTMLTableCaptionElement
// HTMLTableCellElement
// HTMLTableRowElement
Dom.createHTMLTableCellElement = function(content, clazz, id, colspan, rowspan){
	var td = document.createElement("td");
	Dom.appendContent(td, content);
	if(clazz) td.setAttribute("class", clazz);
	if(id) td.setAttribute("id", id);
	if(colspan) td.setAttribute("colspan", colspan);
	if(rowspan) td.setAttribute("rowspan", rowspan);	
	return td;
}
// HTMLTableColElement
// HTMLTableElement
Dom.createHTMLTableElement = function(clazz, id){
	var tbl = document.createElement("table");
	if(clazz) tbl.setAttribute("class", clazz);
	if(id) tbl.setAttribute("id", id);	
	//tbl.setAttribute("border", 2);
	return tbl;
}
// HTMLTableRowElement
Dom.createHTMLTableRowElement = function(clazz, id, colspan, rowspan){
	var tr = document.createElement("tr");
	if(clazz) tr.setAttribute("class", clazz);
	if(id) tr.setAttribute("id", id);	
	if(colspan) td.setAttribute("colspan", colspan);
	if(rowspan) td.setAttribute("rowspan", rowspan);	
	return tr;
}
// HTMLTableSectionElement
// HTMLTextAreaElement
// HTMLTitleElement
// HTMLUListEleme
/** 
 * Text Node text
 */
Dom.createTextElement = function(text){
	var t = document.createTextNode(
		(text == null || text == undefined || text == "") ? "\u00a0" : text );
	return t;	
}

/**
 * Return a Dom Element or throw an error
 *@param domId id of a dom element
 */
Dom.getStyle = function(dom, property){
	if(window.getComputedStyle){
		return window.getComputedStyle(dom, null).getPropertyValue(property);
	}
	if(dom.currentStyle){
		// Formatage (IE) de la propriété CSS
		while (property.indexOf('-') != -1) {
			var c = property.charAt(property.indexOf('-')+1);
			property = property.replace(/-\S{1}/,c.toUpperCase());
		}
		return eval("dom.currentStyle."+property);	
	}
	throw("Impossible to retrieve the correct style for this DOM Element ");	
}

/**
// Récupérer la valeur d'une propriété CSS d'un élément id
function getStyle(elt,pro)
{
var element = document.getElementById(elt);
if (window.getComputedStyle) // Mozilla Firefox & cie
{
var propriete = window.getComputedStyle(element,null).getPropertyValue(pro);
}
else if (element.currentStyle) // Microsoft Internet Explorer{
// Formatage (IE) de la propriété CSS
while (pro.indexOf('-') != -1) {
var lettresuivtiret = pro.charAt(pro.indexOf('-')+1);
pro = pro.replace(/-\S{1}/,lettresuivtiret.toUpperCase());
}
var propriete = eval('element.currentStyle.'+pro);
}
return propriete;
}

*/

/**
 * Add text content into a Dom node.
 * @param dom the coontainer node
 * @param content the text or the child node to add
 */
Dom.appendContent = function(dom, content){

	if(content != null && typeof content == "object"){
		dom.appendChild(content);
	}else if(typeof content == "string" || content == null || content == undefined){
		dom.appendChild(Dom.createTextElement(content));
	}else{
		throw("the content "+ content + " is corrupted");
	}
}

/**
 * Return a Dom Element or throw an error
 *@param domId id of a dom element
 */
Dom.getElement = function (domId){
	if(typeof dom == "object")
		return dom;//Nothing to do
	var dom = document.getElementById(domId);
	if(typeof dom == "object")
		return dom;
	throw("The DOM Element '" +domId+ "' doesn't exist !");	
}
 
/**
 * Return true if a dom element exists
 * @param domId id of a dom element
 * @type boolean
 * @return true if the dom node exists false otherwise
 */
Dom.isElement = function (domId){
	var dom = document.getElementById(domId);
	if(dom !=null && typeof dom == "object")
		return true;
	return false;
}

/**
 * Concatenate all elements of a form 
 */
Dom.formToParams = function (formName, ignoreButtons){
	var ignoreButtons = (ignoreButtons != null ) ? ignoreButtons : true;
	var params = "" ;
	var formDom = document.forms[formName];

	//Parcours de tous les champs du formulaire 
	var ele = formDom.elements;
	var c = 0;
	for(var i = 0 ; i < ele.length ; i ++ ){
		var type = ele[i].getAttribute("type");
		var name = ele[i].getAttribute("name");
		var value = ele[i].value;
		var checked = ele[i].checked;
		
		if(value != null && value != ""){
			if(type == "text" || type == "password" || type == "hidden" || type == "file" || (!ignoreButtons && type == "button")){ 
				if(c>0)
					params += "&";
				params += name +"="+ value;//encodeURIComponent(value) ;
				c++;
			}else if(type == "checkbox" || type == "radio"){
				if(checked){
					if(c>0)
						params += "&";
					params += name +"="+ value;//encodeURIComponent(value) ;
					c++;
				}
			}else if(ele[i].nodeName == "TEXTAREA"){
				if(c>0)
					params += "&";
				params += name +"="+ value;//encodeURIComponent(value) ;
				c++;
			}else if(ele[i].nodeName == "SELECT"){
				if(!ele[i].multiple){
					if(c>0)
						params += "&";
					params += name +"="+ value;//encodeURIComponent(value) ;
					c++;
				}else{
					for(var j = 0 ; j < ele[i].options.length ; j++){
						if( ele[i].options[j].selected){
							if(c>0)
								params += "&";
							params += name +"="+ ele[i].options[j].value;//encodeURIComponent(ele[i].options[j].value) ;
							c++;
						}
					}
				
				}
			}//Ignore type = submit et = reset
		}
	}
	return params;
}





try{
HTMLSelectElement.prototype.addOption = function(attributes, text){
	var newOption = document.createElement("option");
	for(var i = 0 ; i < attributes.length ; i++){
		if(attributes[i][0] && attributes[i][1]){
			newOption.setAttribute(attributes[i][0], attributes[i][1]);
		}
	}
	newOption.appendChild(document.createTextNode(text));
	this.appendChild(newOption);
} 

HTMLInputElement.prototype.addAttributes = function(attributes){
	for(var i = 0 ; i < attributes.length ; i++){
		if(attributes[i][0] && attributes[i][1]){
			this.setAttribute(attributes[i][0], attributes[i][1]);
		}
	}
}
}catch(e){
alert("Trouve toi un navigateur digne de ce nom !!!!");
}
