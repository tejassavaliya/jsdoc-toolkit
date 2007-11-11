ek.register("gui.layout.Bar");

/**
  *@require  "position.js"
  *@require  "tooltip.js"
  *
  */

/**
 * Construit une barre horizontale ou verticale
 */
function Bar(divName, width, height, css){
	
	this.domBar = document.getElementById(divName);
	
	this.domBar.style.width = width;
	this.domBar.style.height = height;
	this.domBar.className = css;
	
	this.items = new Array();
	
}
/**
 *
 *//*
Bar.prototype.drawBar = function(parentName){
	document.getElementById(parentName).appendChild(this.getDom());
}*/
/**
 * Ajoute plusieurs items
 */
Bar.prototype.addItems = function(items){
	for(var i = 0 ; i < items.length; i++){
		this.addItem(items[i]);
	}
}
/**
 * Ajoute un item
 */
Bar.prototype.addItem = function(itemDom){
	this.items.push(itemDom);
	this.domBar.appendChild(itemDom);
}
/**
 * Enlève un item
 */
Bar.prototype.removeItem = function(item){
	this.domBar.removeChild(item);
	var idx = 0;
	while(idx < this.items.length){
		if(this.items[idx] == item)
			break;
		idx++;
	}
	this.items.splice(idx,1);
}