ek.require("gui.tools.Dom");

ek.register("gui.tooltip.TooltipTemplate");

TooltipTemplate.DEFAULT = 0;

TooltipTemplate.ARRAY = 7;//TODO REMOVE ASAP

TooltipTemplate.ARRAY_LEFT_TOP 		= 1;
TooltipTemplate.ARRAY_TOP 			= 2;
TooltipTemplate.ARRAY_RIGHT_TOP 	= 3;
TooltipTemplate.ARRAY_RIGHT 		= 4;
TooltipTemplate.ARRAY_RIGHT_BOTTOM 	= 5;
TooltipTemplate.ARRAY_BOTTOM 		= 6;
TooltipTemplate.ARRAY_LEFT_BOTTOM	= 7;
TooltipTemplate.ARRAY_LEFT 			= 8;


/**
 *
 */
function TooltipTemplate (templateId){
	this.templateId = (templateId) ? templateId : TooltipTemplate.DEFAULT;
	this.templateDom = new Array();
	this.container = new Array();
}

/** */
TooltipTemplate.prototype.getTemplate = function (text, clazz, id){

	if(!this.templateDom[id]){
		switch(this.templateId){
			case TooltipTemplate.DEFAULT : 
				this.createDefaultTemplate(id);
			break;
			case TooltipTemplate.ARRAY_LEFT_TOP :
			case TooltipTemplate.ARRAY_TOP :
			case TooltipTemplate.ARRAY_RIGHT_TOP :
			case TooltipTemplate.ARRAY_RIGHT :
			case TooltipTemplate.ARRAY_RIGHT_BOTTOM :
			case TooltipTemplate.ARRAY_BOTTOM :
			case TooltipTemplate.ARRAY_LEFT_BOTTOM :
			case TooltipTemplate.ARRAY_LEFT :
				this.createArrayTemplate(id);
			break;
		}
		//Set class, id and content
		this.templateDom[id].setAttribute("class", clazz);
		this.templateDom[id].setAttribute("id", id);
		this.container[id].innerHTML = text;
	}
	return this.templateDom[id];
}

/** */
TooltipTemplate.prototype.createDefaultTemplate = function (id){
	
	this.templateDom[id] = Dom.createHTMLDivElement("");
	this.container[id] = this.templateDom[id];
}

/** */
TooltipTemplate.prototype.createArrayTemplate = function (id){
	this.templateDom[id] = Dom.createHTMLTableElement("");
	
	//First Row
	var row1 = Dom.createHTMLTableRowElement("top");
	row1.appendChild(this.createOneCell("topleft corner", "leftTopArrow"));
	row1.appendChild(this.createOneCell("top", "topArrow"));
	row1.appendChild(this.createOneCell("topright corner", "rightTopArrow"));
	
	//Middle Row
	var row2 = Dom.createHTMLTableRowElement();
	row2.appendChild(this.createOneCell("left", "leftArrow"));
	
	this.container[id] = Dom.createHTMLTableCellElement("", "content");
	row2.appendChild(this.container[id]);
	
	row2.appendChild(this.createOneCell("right", "rightArrow"));
	
	//Last Row
	var row3 = Dom.createHTMLTableRowElement("bottom");
	row3.appendChild(this.createOneCell("bottomleft corner", "leftBottomArrow"));
	row3.appendChild(this.createOneCell("bottom", "bottomArrow"));
	row3.appendChild(this.createOneCell("bottomright corner", "rightBottomArrow"));

	this.templateDom[id].appendChild(row1);
	this.templateDom[id].appendChild(row2);
	this.templateDom[id].appendChild(row3);
}
/** */
TooltipTemplate.prototype.createOneCell = function (tdClass, divClass){
	return Dom.createHTMLTableCellElement(Dom.createHTMLDivElement("", divClass), tdClass);
}