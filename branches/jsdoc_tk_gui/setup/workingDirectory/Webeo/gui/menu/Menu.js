ek.require("gui.layout.ToolBar");

ek.register("gui.menu.Menu");

ek.requireCSS("css.gui.menu.Menu", "menu.Menu");


/**
 * 
 */
function Link (id, text, image){
	this.id = id;
	this.text = text;
	this.image = image;
	this.children = new Array();
}
 
function Menu (divName){
	this.mainUL = document.getElementById(divName);
	this.links = new Array();
}

Menu.prototype.read = function (){
	this.readULNode(this.mainUL, null);
}
Menu.prototype.readULNode = function (ulNode, parentLink){

	var liNodes = ulNode.childNodes;
	for(var i = 0 ; i < liNodes.length ; i++){
		if(liNodes[i] instanceof Text){
			continue;
		}else if(liNodes[i] instanceof HTMLLIElement){
			this.addLink(parentLink, liNodes[i]);
		}
	}
}

Menu.prototype.addLink = function (parentLink, liNode){
	var l ;
	if(parentLink == null){
		l = new Link("Menu_"+this.links.length, liNode.firstChild.textContent);
		this.links.push(l);
	}else{
		l = new Link(parentLink.id + "_" + parentLink.children.length, liNode.firstChild.textContent);
		parentLink.children.push(l);
	}
	children = liNode.childNodes;
	for(var i = 0 ; i < children.length ; i++){
		if(children[i] instanceof Text){
			continue;
		}else if(children[i] instanceof HTMLUListElement){
			this.readULNode(children[i], l);
		}
	}
}

Menu.prototype.draw = function (){
	
	this.mainUL.style.display = 'none';
	var menuDiv = document.createElement('div');
	menuDiv.setAttribute('id', this.mainUL.id+'_drawed');
	this.mainUL.parentNode.appendChild(menuDiv);

	this.toolbar = new ToolBar(menuDiv.id, 400, 50, "simpleBar");
	
	for(var i = 0 ; i <  this.links.length ; i++){
		var bt = new TextButton(this.links[i].id, this.links[i].text, "", true)
		bt.initCSS("horizontal", "toggled");
		
		bt.domBT.onmouseover = this.getButtonOver;
		bt.domBT.onmouseout = this.getButtonOut;
		
		this.toolbar.addButton(bt);
		
		if(this.links[i].children.length>0){
			bt.domBT.sonsDom = this.drawWindow(this.links[i].children, this.links[i].id);
			this.toolbar.domBar.appendChild(bt.domBT.sonsDom);	
		}
	}

}
Menu.prototype.drawWindow = function (children, idParent){
	
	var windowDiv = document.createElement('div');
	windowDiv.setAttribute('id', idParent + '_children');
	windowDiv.style.position = "absolute";
	windowDiv.style.top = "0px";
	windowDiv.style.left = "0px";
	windowDiv.style.width = "200px";
	
	for(var i = 0 ; i <  children.length ; i++){
		var a = document.createElement("a");
		a.setAttribute("id", children[i].id);
		a.innerHTML = children[i].text;
		windowDiv.appendChild(a);
		
		a.container = windowDiv;
		a.onmouseover = this.getLinkOver;
		a.onmouseout = this.getLinkOut;
		
		if(children[i].children.length>0){
			a.childrenDom = this.drawWindow(children[i].children, children[i].id);	
			windowDiv.appendChild(a.childrenDom);
		}			
	}
	windowDiv.className = 'hidden';
	
	return windowDiv;
}
Menu.prototype.getButtonOver = function (){
	if(this.sonsDom)
		this.sonsDom.className = 'showed';

}
Menu.prototype.getButtonOut = function (){
	if(this.sonsDom)
		this.sonsDom.className = 'hidden';
}
Menu.prototype.getLinkOver = function (){
	this.container.className = 'showed';
	if(this.childrenDom)
		this.childrenDom.className = 'showed';
}
Menu.prototype.getLinkOut = function (){
	this.container.className = 'hidden';
	if(this.childrenDom)
		this.childrenDom.className = 'hidden';
}