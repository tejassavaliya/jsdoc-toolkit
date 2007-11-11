ek.require("ao.ajax.Ajax");
ek.require("gui.fx.Fade");
ek.require("gui.tools.Dom");

ek.register("gui.layout.TabbedPane");

ek.requireCSS("css.gui.layout.TabbedPane", "layout.tab1"); 

/**
 * require "tabbedPane.css"
 *@require ao.ajax.Ajax.js
 *@require gui.tools.FadeManager.js
 *@require gui.tools.Dom.js
 */
function TabbedPane (divName, isFading, requiredCSS){
	try{
		this.isFading = (isFading != undefined) ? isFading : true;

		this.mainPanel = (typeof divName == "object")? divName : Dom.getElement(divName);
		if(this.mainPanel == null){
		//TODO
			this.mainPanel = document.createElement("div");
			var id = document.createAttribute("id");
			id.nodeValue = divName;
			this.mainPanel.setAttributeNode(id);
			document.body.appendChild(this.mainPanel);
		}	
		
		this.showedPanelCSS = "selectedPanel";
		this.hiddenPanelCSS = "panel";
		
		this.showedHeaderCSS = "selectedHeader";
		this.hiddenHeaderCSS = "header";
		
		this.headers = new Array();
		this.panels = new Array();
		this.ajax = new Array();
		
		this.currentPanel = -1;
	}catch(e){
		alert(e);
	}
}

/**
 * 
 */
TabbedPane.prototype.read = function (){
	var nodes = this.mainPanel.childNodes;
	for(var i = 0 ; i < nodes.length ; i++){
		//TODO IE COMPATIBILITY alert(typeof nodes[i] +' ' + nodes[i]);
		//alert(nodes[i].innerHTML);
		if(nodes[i].nodeName == "#text" /* instanceof Text*/){
			continue;
		}else if(nodes[i].nodeName == "DIV" /*instanceof HTMLDivElement*/){
			if(nodes[i].id == this.mainPanel.id + "_headers"){
				this.readHeaders(nodes[i].childNodes);
				this.headersDom = nodes[i];
			}else if(nodes[i].id == this.mainPanel.id + "_panels"){
				this.readPanels(nodes[i].childNodes);
				this.panelsDom = nodes[i];
			}
		}
	}	
	this.createTooltip();
	this.show(0);
}
TabbedPane.prototype.readHeaders = function (divHeaders){
	for(var i = 0 ; i < divHeaders.length ; i++){
		if(divHeaders[i].nodeName == "#text"/* instanceof Text*/){
			continue;
		}else if(divHeaders[i].nodeName == "A" /*instanceof HTMLAnchorElement*/){
			divHeaders[i].model = this;
			divHeaders[i].panel = this.headers.length;
			divHeaders[i].onclick = this.performClick;
			this.createSpanElements(divHeaders[i]);
			//this.checkOutSpanElement(divHeaders[i].childNodes);
			this.addHeader(divHeaders[i]);
		}
	}
}
TabbedPane.prototype.createSpanElements = function (anchorNode){
	var content = anchorNode.innerHTML;
	anchorNode.innerHTML = "";
	anchorNode.appendChild(Dom.createHTMLSpanElement(null, "leftHeader"));
	anchorNode.appendChild(Dom.createHTMLSpanElement(content, "midHeader"));
	anchorNode.appendChild(Dom.createHTMLSpanElement(null , "rightHeader"));
}

TabbedPane.prototype.checkOutSpanElement = function (anchorChildNodes){
	var spanCounter = 0;
	for(var i = 0 ; i < anchorChildNodes.length ; i++){
		if(anchorChildNodes[i].nodeName == "SPAN"){
			spanCounter++;
			switch(spanCounter){
				case 1: anchorChildNodes[i].className = "leftHeader";
						anchorChildNodes[i].innerHTML = Dom.NBSP;
					break;
				case 2: anchorChildNodes[i].className = "midHeader";
					break;
				case 3: anchorChildNodes[i].className = "rightHeader";
						anchorChildNodes[i].innerHTML = Dom.NBSP;
					break;
				default: break;	
			}
		}
	}
}

TabbedPane.prototype.readPanels = function (divPanels){
	for(var i = 0 ; i < divPanels.length ; i++){
		if(divPanels[i].nodeName == "#text"/* instanceof Text*/){
			continue;
		}else if(divPanels[i].nodeName == "DIV"/* instanceof HTMLDivElement*/){
			divPanels[i].className = this.hiddenPanelCSS;
			this.addPanel(divPanels[i]);
		}
	}
}
TabbedPane.prototype.createTooltip = function (header){
	/*for(var i = 0 ; i < this.panels.length ;i++){
		t = new Tooltip(this.panels[i], null, true, "Hellowwww", "tooltip", 50, 50, new Position(false,0,true,0));
	}*/
}
TabbedPane.prototype.addHeader = function (header){
	header.className = this.hiddenHeaderCSS;
	this.headers.push(header);
}
TabbedPane.prototype.addPanel = function (panel){
	panel.className = this.hiddenPanelCSS;
	this.panels.push(panel);
	if(this.isFading){
		panel.id = this.mainPanel.id + '_panel_' + this.panels.length;
		Fade.register(panel.id);
	}
}

TabbedPane.prototype.addTab = function (tabName, contentOrLocation){
	if(!this.headersDom){
		if(Dom.getElement(this.mainPanel.id + "_headers")==null){
			this.headersDom = Dom.createHTMLDivElement(null, "headers", this.mainPanel.id + "_headers");
			this.mainPanel.appendChild(this.headersDom);
		}else{
			this.headersDom = Dom.getElement(this.mainPanel.id + "_headers");
		}
	}
	if(!this.panelsDom){
		if(Dom.getElement(this.mainPanel.id + "_panels")==null){
			this.panelsDom = Dom.createHTMLDivElement(null, "panels", this.mainPanel.id + "_panels");
			this.mainPanel.appendChild(this.panelsDom);
		}else{
			this.panelsDom = Dom.getElement(this.mainPanel.id + "_panels");
		}
	}
	
	a = Dom.createHTMLAnchorElement("", null, null, null);
	a.appendChild(Dom.createHTMLSpanElement(null, "leftHeader"));
	a.appendChild(Dom.createHTMLSpanElement(tabName, "midHeader"));
	a.appendChild(Dom.createHTMLSpanElement(null , "rightHeader"));
	
	//a = document.createElement("a");
	//a.textContent = tabName;
	a.model = this;
	a.panel = this.headers.length;
	a.onclick = this.performClick;
	//this.headersDom.appendChild(Dom.createHTMLQuoteElement("&nbsp;", "leftHeader"));
	this.headersDom.appendChild(a);
	//this.headersDom.appendChild(Dom.createHTMLQuoteElement("&nbsp;", "rightHeader"));
	this.addHeader(a);
	
	d = document.createElement("div");
	if(contentOrLocation instanceof Ajax){
		contentOrLocation.onload = this.loadAjaxTab;
		this.ajax[this.headers.length] = contentOrLocation;
	
	}else{
		d.innerHTML = contentOrLocation;
	}
	this.panelsDom.appendChild(d);
	this.addPanel(d);
}
TabbedPane.prototype.loadAjaxTab = function (){
	this.panels[i].innerHTML = 'titi';//.show(this.panel);
}
TabbedPane.prototype.performClick = function (){
	this.model.show(this.panel);
}

/**
 * This method is used to change the panel shown.
 * @newPanel the panel to show
 */
TabbedPane.prototype.show = function (newPanel){
	
	//If same panel no change
	if(newPanel == this.currentPanel)
		return;
		
	if(this.isFading){
		
		//Fadeout old Panel
		if(this.currentPanel>=0){
			//Clear the fading timeout of the current panel
			//alert(getFadeManager().get(this.panels[this.currentPanel].id));
			//Fix the min height of the main panel
			//TODO CHECK minheight
			this.mainPanel.style.minHeight = this.headers[this.currentPanel].offsetHeight + this.panels[this.currentPanel].offsetHeight + 'px';

			this.headers[this.currentPanel].className = this.hiddenHeaderCSS;
			Fade.fadeOut(this.panels[this.currentPanel].id, "Fade.fadeIn(\""+this.panels[newPanel].id+"\")");
			
		}else{
			Fade.fadeIn(this.panels[newPanel].id); //first init
		}
			
		//FadeIn the new panel
		this.headers[newPanel].className = this.showedHeaderCSS;
		this.panels[newPanel].className = this.showedPanelCSS;

		//getFadeManager().fadeIn(this.panels[newPanel].id);
	}else{
		if(this.currentPanel>=0){
			this.headers[this.currentPanel].className = this.hiddenHeaderCSS;
			this.panels[this.currentPanel].className = this.hiddenPanelCSS;
		}
		//On selectionne le header et on montre le panel
		this.headers[newPanel].className = this.showedHeaderCSS;
		this.panels[newPanel].className = this.showedPanelCSS;
		//this.panels[i].style.left = "-500";
		//this.panels[i].id = "panel"+i;
		//move(this.panels[i].id, "0");
	}
	
	//O n change l'index du panel courant
	this.currentPanel = newPanel;
}