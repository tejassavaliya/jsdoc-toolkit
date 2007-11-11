ek.require("gui.tools.Dom");
ek.require("ao.data.Json");
ek.require("ao.ajax.Ajax");
ek.require("gui.button.Button");
ek.register("gui.tree.Tree");

ek.requireCSS("css.gui.tree.Tree", "tree.Tree");


function TreeItem(value, href, target){

	this.dom;
	this.id;
	this.value = (value) ? value : "?";
	
	this.href = href;
	this.target = target;
	
	this.isLast = true;
	
	this.parent = null;
	this.expanded = true;
	this.children = new Array();
	
	this.actions = new Array();
}

TreeItem.prototype.add = function(treeItem){
	treeItem.parent = this;
	this.children.push(treeItem);
}
/* TODO IMPROVE */
TreeItem.prototype.mustDrawVerticalLines = function(level){
	if(this.parent == null)
		return false;
	var vlArray = new Array();
	vlArray.push(this.parent.isLast);
	
	for(var i = 0 ; i < level-1 ; i++){
		pp ="";
		for(var j = 0 ; j < i ; j++){
			pp += "parent.";
		}
		vlArray.push(!eval("this.parent."+ pp +"isLast"));
	}
	return vlArray.reverse();
}

TreeItem.prototype.showChildren = function(){
	this.expanded = true;
	for(var i = 0 ;  i < this.children.length ; i++){
		this.children[i].dom.style.display = "";
		this.children[i].expanded = true;
		if(this.children[i].children.length>0){
			this.children[i].showChildren();
		}
	}
}
TreeItem.prototype.hideChildren = function(){
	this.expanded = false;
	for(var i = 0 ;  i < this.children.length ; i++){
		this.children[i].dom.style.display = "none";
		this.children[i].expanded = false;
		if(this.children[i].children.length>0){
			this.children[i].hideChildren();
		}
	}
}



function TreeParams(showRoot, icons){

	this.showRoot = (showRoot) ? showRoot : true;

	this.rt = (icons && icons[0])  ? icons[0] : "rt.gif"; //Root icon
	this.nd = (icons && icons[1])  ? icons[1] : "nd.gif"; //Node
	this.no = (icons && icons[2])  ? icons[2] : "no.gif"; //Node opened
	this.lf = (icons && icons[3])  ? icons[3] : "lf.gif"; //Leaf
	this.ls = (icons && icons[4])  ? icons[4] : "ls.gif"; //Leaf selected
	this.vl = (icons && icons[5])  ? icons[5] : "vl.gif"; //Vertical line
	this.ml = (icons && icons[6])  ? icons[6] : "ml.gif"; //mid line
	this.cl = (icons && icons[7])  ? icons[7] : "cl.gif"; //corner line
	this.mm = (icons && icons[8])  ? icons[8] : "mm.gif"; //mid minus
	this.cm = (icons && icons[9])  ? icons[9] : "cm.gif"; //corner minus
	this.mp = (icons && icons[10]) ? icons[10]: "mp.gif"; //mid plus
	this.cp = (icons && icons[11]) ? icons[11]: "cp.gif"; //corner plus
	this.em = (icons && icons[12]) ? icons[12]: "pixel.gif"; //Empty
	
}


/**
 * Construction d'un nouveau Tree dans le conteneur passé en paramètre
 * @param divId l'id du div contenant le tableau
 */ 
function Tree(divId, root, params){
		
	this.divName = divId;
	this.divDOM = document.getElementById(this.divName);
	this.divDOM.model = this;
	
	// DEBUT DU PARAMETRAGE

	this.params = (params) ? params :  new TreeParams();
	
	this.alt_bgcolor1 = "white";
	this.alt_bgcolor2 = "grey";
	
	this.repImg = "img/tree/"
		
	// FIN DU PARAMETRAGE
	
	this.root = (root) ? root : new TreeItem("Root");
	
/*	manager[manager.length] = this;
	ajax[this.divName] = new XMLHttpRequest();
  	ajax[this.divName].model = this;
	ajax[this.divName].onreadystatechange= this.readyToLoad;*/
}

Tree.prototype.addTreeItem = function(treeItem){
	this.root.add(treeItem);
}


Tree.prototype.build = function(){
	if(this.params.showRoot){
		this.writeTreeItem(this.root, 0);
	}
	this.writeRootChildren()
}
Tree.prototype.writeRootChildren = function(){
	this.getLogger().trace("writeRootChildren");
	
	for(var i = 0 ;  i < this.root.children.length ; i++){
		this.root.children[i].isLast = (i == this.root.children.length-1);
		this.writeTreeItem(this.root.children[i],1 );
	}

}
Tree.prototype.writeTreeItem = function(treeItem, level){
	this.getLogger().trace("writeTreeItem");
	
	var tiDOM = document.createElement("div");
	tiDOM.setAttribute("class", "treeItem");
	tiDOM.model = treeItem;
	
	treeItem.dom = tiDOM;
	aa = treeItem.mustDrawVerticalLines(level);
	for(var i = 0 ; i < level-1 ; i++){
		if(aa[i]){
			var vl = Dom.createHTMLImageElement(this.repImg + this.params.vl);
			tiDOM.appendChild(vl);
		}else{
			var em = Dom.createHTMLImageElement(this.repImg + this.params.em, null, null, 19, 16);
			tiDOM.appendChild(em);
		}
	}
	
	if(level == 0){
		var img = Dom.createHTMLImageElement(this.repImg + this.params.rt);//, name, class, width, height, border);
		tiDOM.appendChild(img);
		tiDOM.appendChild(document.createTextNode(treeItem.value));
	}else{
		if(treeItem.children.length > 0){
			this.writeNode(tiDOM, treeItem);
		}else{
			this.writeLeaf(tiDOM, treeItem);
		}
	}
	
	this.divDOM.appendChild(tiDOM);
	this.divDOM.appendChild(document.createTextNode("\n"));
	
	if(level != 0 && treeItem.children.length > 0){
		for(var i = 0 ;  i < treeItem.children.length ; i++){
			treeItem.children[i].isLast =(i == treeItem.children.length-1);
			this.writeTreeItem(treeItem.children[i],level+1);
		}
	}

}

Tree.prototype.writeLeaf = function(container, treeItem){
	if(treeItem.isLast){
		var sep = Dom.createHTMLImageElement(this.repImg + this.params.cl);
	}else{
		var sep = Dom.createHTMLImageElement(this.repImg + this.params.ml);
	}
	container.appendChild(sep);
	var imgNode = Dom.createHTMLImageElement(this.repImg + this.params.lf);
	container.appendChild(imgNode);
	
	container.appendChild(Dom.createHTMLAnchorElement(treeItem.value, treeItem.href, treeItem.target));

}
Tree.prototype.writeNode = function(container, treeItem){
	if(treeItem.isLast){
		var sep = Dom.createHTMLImageElement(this.repImg + this.params.cm);
	}else{
		var sep = Dom.createHTMLImageElement(this.repImg + this.params.mm);
	}
	sep.onclick = this.clickHandle;
	treeItem.sep = sep;
	container.appendChild(sep);
	var imgNode = Dom.createHTMLImageElement(this.repImg + this.params.no);
	treeItem.imgNode = imgNode;
	container.appendChild(imgNode);
	container.appendChild(document.createTextNode(treeItem.value));
}

Tree.prototype.clickHandle = function(e){
	//this.getLogger().debug(this);
	if(this.parentNode.model){
		if(this.parentNode.model.expanded){
			if(this.parentNode.model.sep.src == "img/tree/cm.gif"){
				this.parentNode.model.sep.src = "img/tree/cp.gif";
				this.parentNode.model.imgNode.src = "img/tree/no.gif";
			}else{
				this.parentNode.model.sep.src = "img/tree/mp.gif";
				this.parentNode.model.imgNode.src = "img/tree/nd.gif";
			}
			this.parentNode.model.hideChildren();
		}else{
			if(this.parentNode.model.sep.src == "img/tree/cp.gif"){
				this.parentNode.model.sep.src = "img/tree/cm.gif";
				this.parentNode.model.imgNode.src = "img/tree/nd.gif";
			}else{
				this.parentNode.model.sep.src = "img/tree/mm.gif";
				this.parentNode.model.imgNode.src = "img/tree/no.gif";
			}
			this.parentNode.model.showChildren();
		}
	}else{
		//this.getLogger().error(this);
	}
}

/**
 * Load example to test the render of the table
 */
Tree.prototype.loadExample = function(){
	this.getLogger().trace("loadExample");
	begin = new Date();
	
	this.addTreeItem(new TreeItem("Link 1"));
	this.addTreeItem(new TreeItem("Link 2"));
	this.addTreeItem(new TreeItem("Link 3"));
	this.addTreeItem(new TreeItem("Link 4"));
	this.addTreeItem(new TreeItem("Link 5"));
	
	var n6 = new TreeItem("Node 6");
	n6.add(new TreeItem("Link 6.1"));
	n6.add(new TreeItem("Link 6.2"));
	n6.add(new TreeItem("Link 6.3"));
	this.addTreeItem(n6);
	
	this.addTreeItem(new TreeItem("Link 6"));
	this.addTreeItem(new TreeItem("Link 7"));
	
	
	
	this.build();
	
	this.getLogger().trace('Arbre généré en '+ (new Date()- begin)/1000 +' s' );
}

Tree.prototype.getLogger = function (){
	if(!this.logger){
		this.logger = getLogger("TREE");
		this.logger.setLevel(Logger.LEVEL_ALL);
	}
	this.logger.setCurrentID(this.divName);
	return this.logger;
}