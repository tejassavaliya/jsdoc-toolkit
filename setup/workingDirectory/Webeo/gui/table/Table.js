ek.require("gui.window.Wait");
ek.require("ao.data.Json");
ek.require("ao.ajax.Ajax");
ek.require("gui.button.Button");
ek.require("gui.event.KeyListener");

ek.register("gui.table.Table");

ek.requireCSS("css.gui.table.Table", "table.Table");


/**
  *@require  "wait.js"
  *@require  "button.js"
  *@require  "json.js"
   *@require  "sarissa.js"
  *
  *  Copyright 2006 Emuki-Group for Emukina.fr
  *
  *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
  *  file except in compliance with the License. You may obtain a copy of the License at
  *
  *         http://www.apache.org/licenses/LICENSE-2.0
  *
  *  Unless required by applicable law or agreed to in writing, software distributed under the
  *  License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
  *  either express or implied. See the License for the specific language governing permissions
  *  and limitations under the License.
  **/  
  
/** Instance Manager */
var manager = new Array();
var ajax = new Array();    

/** AJAX Manager */
//var xmlhttp;

/** Determine si le navigateur est IE */
var isIE = (navigator.userAgent.toLowerCase().indexOf("msie")>-1);
//var isIE = (navigator.appName == "Microsoft Internet Explorer");

/** 
 * Gestion des combinaisons de touches du clavier 
 * avec redirection de l'event vers le bon tableau
  * grace à l'instance manager
 *//*
document.onkeyup = function(e){

	var model = getCurrentTable();
	var isCtrlPressed;
	var key;
	if(isIE){
		isCtrlPressed = window.event.ctrlKey;
		key = window.event.keyCode;
	}else{
		isCtrlPressed = e.ctrlKey;
		key = e.which;
	}
	
	if(isCtrlPressed){
		switch (key){
			//Gauche
			case 37: model.pageCourante = (model.pageCourante-1 >1) ? model.pageCourante-1 : 1 ;
				break;
			//Haut
			case 38: model.pageCourante = 1; 
				break;
			//Droite
			case 39: model.pageCourante = (model.pageCourante+1 < model.nbPages) ? model.pageCourante+1 : model.nbPages;
				break;
			//Bas
			case 40: model.pageCourante = model.nbPages;
				break;
			case 49: model.sortAgain(0,(model.sens == 0)?1:0); break;
			case 50: model.sortAgain(1,(model.sens == 0)?1:0); break;
			case 51: model.sortAgain(2,(model.sens == 0)?1:0); break;
			case 52: model.sortAgain(3,(model.sens == 0)?1:0); break;
			case 53: model.sortAgain(4,(model.sens == 0)?1:0); break;
			case 54: model.sortAgain(5,(model.sens == 0)?1:0); break;			
			case 55: model.sortAgain(6,(model.sens == 0)?1:0); break;
			case 56: model.sortAgain(7,(model.sens == 0)?1:0); break;
			case 57: model.sortAgain(8,(model.sens == 0)?1:0); break;
			default:break;
		}
		model.rebuild();
	}
}*/

/**
 * @return  la table qui possède le focus
 */
function getCurrentTable(){
	for(i = 0 ; i < manager.length ; i++){		
		if(manager[i].hasFocus){
			return manager[i];
		}
	}
}

/**
 * Définition de l'objet métier Column
 * @param name Nom de la colonne
 * @param type Type de la colonne (String, Number)
 *@param isSorted Booléen indiquant si on peut trié la colonne
 * @param filter Type du filtre à utilisé '', input, select, number
 * @param width Largeur de la colonne en px ou %
 * @param compare Méthode de caomparaison à utiliser 
 */
function column(name, type, isSorted, filter, width, compare){
	this.name = name;
	this.type = type;
	this.isSorted = isSorted;
	this.filter = filter;
	this.width = width;
	this.compare = compare;
}

/**
 * Définition de l'objet métier row
 * @param cols Tableau contenant les valeurs pour chaque colonne
 * @param children Tableau contenant les lignes enfants
 */
function row(cols, children){
	//Array
	this.cols = cols;	
	this.expanded = false;//Par defaut false
	this.children = children;
}
row.prototype.getValueAt = function(i){
	return (this.cols[i]!= undefined)?this.cols[i]:"";
}
row.prototype.getSortValue = function(){
	return this.getValueAt(this.sortIdx);
}
  
//-----------------------------------------------------------------------------
//Gestion du TreeTableFilteredPagedSorted
//-----------------------------------------------------------------------------
/**
 * Construction d'un nouveau TreeTable dans le conteneur passé en paramètre
 * @param divId l'id du div contenant le tableau
 */ 
function TreeTable(divId){
		
	this.divName = divId;
	this.divDOM = document.getElementById(this.divName);
	this.divDOM.model = this;
	
	this.divDOM.innerHTML = "<h4><b><i>Tableau en cours d'initialisation</i></b></h4>";
	
	this.info = 'info'+ this.divName;
	this.cbb;
	this.hasFocus = false;	
	
	//Tableau source contenat toutes les lignes
	this.rows = new Array();
	
	//Tableau filtré ne contenant que les lignes corespondant aux critères
	this.filteredContent = new Array();
	
	//Tableau stockant les filtres en cours d'utilisation
	this.filtreCourant = new Array();
	
	
	//-----------------------------------------------------------------------------
	//Definition des constantes du TreeTableFilteredPagedSorted 
	//-----------------------------------------------------------------------------
	this.size = 0 ;
	this.MAX_LINES = 10;
	this.pageCourante= 1;
	this.nbPages ;
	
	this.sens = 0;
	this.sortCol = 0;
	
	// DEBUT DU PARAMETRAGE
	
	this.waitActive = true;
	
	this.alt_bgcolor1 = "white";
	this.alt_bgcolor2 = "grey";
	
	this.repImg = "img/table/"
	this.displayDisabledIcon = true;
	
	//Images du tri
	this.asc_on		= "asc.gif";
	this.asc_press	= "asc_p.gif";
	this.asc_over	= "asc_h.gif";
	this.desc_on	= "desc.gif";
	this.desc_press	= "desc_p.gif";
	this.desc_over	= "desc_h.gif";

	//Image de la pagination
	this.first	= "first.gif";
	this.first_o= "first.gif";
	this.first_p= "first.gif";
	this.first_d= "first_d.gif";	
	this.prev	= "prevt.gif";
	this.prev_o	= "prev.gif";
	this.prev_p	= "prev.gif";
	this.prev_d	= "prev_d.gif";
	this.next	= "next.gif";
	this.next_o	= "next.gif";
	this.next_p	= "next.gif";
	this.next_d	= "next_d.gif";
	this.last	= "last.gif";
	this.last_o	= "last.gif";
	this.last_p	= "last.gif";
	this.last_d	= "last_d.gif";



	//Image de l'arbre
	this.tree_closed= "plus.gif";
	this.tree_open	= "plus.gif";
	this.one_leaf	= "minus.gif";
	this.last_leaf	= "minus.gif";
		
	// FIN DU PARAMETRAGE

	//Manage hte keyboard shortcuts
	getKeyListener().add(37, "getCurrentTable().pageCourante = (getCurrentTable().pageCourante-1 >1) ? getCurrentTable().pageCourante-1 : 1 ;getCurrentTable().rebuild();", false, true, false);//Ctrl + Gauche
	getKeyListener().add(38, "getCurrentTable().pageCourante = 1; getCurrentTable().rebuild();", false, true, false);//Ctrl + Haut
	getKeyListener().add(39, "getCurrentTable().pageCourante = (getCurrentTable().pageCourante+1 < getCurrentTable().nbPages) ? getCurrentTable().pageCourante+1 : getCurrentTable().nbPages;getCurrentTable().rebuild();", false, true, false);//Ctrl+ Droite
	getKeyListener().add(40, "getCurrentTable().pageCourante = getCurrentTable().nbPages;getCurrentTable().rebuild();", false, true, false);//Ctrl + Bas
	getKeyListener().add(49, "getCurrentTable().sortAgain(0,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);
	getKeyListener().add(50, "getCurrentTable().sortAgain(1,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);
	getKeyListener().add(51, "getCurrentTable().sortAgain(2,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);
	getKeyListener().add(52, "getCurrentTable().sortAgain(3,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);
	getKeyListener().add(53, "getCurrentTable().sortAgain(4,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);
	getKeyListener().add(54, "getCurrentTable().sortAgain(5,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);		
	getKeyListener().add(55, "getCurrentTable().sortAgain(6,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);
	getKeyListener().add(56, "getCurrentTable().sortAgain(7,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);
	getKeyListener().add(57, "getCurrentTable().sortAgain(8,(getCurrentTable().sens == 0)?1:0); getCurrentTable().rebuild();", false, true, false);

	
	this.divDOM.onmouseover = function(){
		this.model.hasFocus = true;
		for(var i = 0 ; i < manager.length; i++){
			if(manager[i]==this.model){
				manager[i].hasFocus = true;
				manager[i].divDOM.className = 'container hasFocus';
			}else{
				manager[i].hasFocus = false;
				manager[i].divDOM.className = 'container';
			}
		}
	};
	
	manager[manager.length] = this;
	ajax[this.divName] = new XMLHttpRequest();
  	ajax[this.divName].model = this;
	ajax[this.divName].onreadystatechange= this.readyToLoad;
}

TreeTable.prototype.drawWaitInitWindow = function(){
	return '<h4><i>Tableau en cours d\'initialisation</i></h4>';
}

TreeTable.prototype.initWaitDiv = function(){
	this.wait = new Wait(this.divName+'_TABLE', 'Tableau en cours de rafraichissement', 'wait',0 ,200);
}

TreeTable.prototype.build = function(){
	this.getLogger().trace("build");
	//Déclaration HTML du tableau
	this.domTable = document.createElement("table");
	this.domTable.setAttribute("id", this.divName+"_TABLE");
	this.domTable.setAttribute("class", "treetable");
	
	this.drawHeaders();
	this.drawBody();
	this.drawFooters();
	
	this.divDOM.appendChild(this.domTable);
	
	//Init du wait
	this.initWaitDiv();
	
	//On init les gestionnaires d'evennements
	this.initSortButtons();//on init les boutons de tri
	this.refreshNavigateButtons(); // on init les boutons de navigations
	
	this.refreshDisplayBy(this.MAX_LINES);
	
	//TODO new Tooltip (this.gotoPage, true, 'Entrez un numéro de page');
}

TreeTable.prototype.rebuild = function(){
	this.getLogger().trace("rebuild");
	if(this.waitActive)
		this.wait.mayShow();
	var deb = new Date();
	//On reinitialise le div contenant le tableau
	var tbody = this.divDOM.getElementsByTagName('tbody')[0];
	tbody.innerHTML = '';
	this.drawRows();		
	
	//On reinit les gestionnaires d'evennements
	this.refreshSortButtons();
	this.refreshNavigateButtons();
	this.refreshListPages();
	this.refreshDisplayBy(this.MAX_LINES);
	
	//alert(new Date() - deb);
	
	if(this.waitActive)
		this.wait.mayHide();
}

/**
 * Crée l'entête du tableau permettant le tri et la ligne de filtrage
 * @param tab la liste des colonnes
 */
TreeTable.prototype.drawHeaders = function(){
	var domTHead = this.domTable.createTHead();
	
	var titleRow = document.createElement("tr");
		
	for(i = 0 ; i < this.columns.length ; i++){

		var titleCell = document.createElement("td");
		titleCell.setAttribute("class", "footer");
		
		if(this.columns[i].isSorted)
			titleCell.appendChild(this.drawOneSortButton("asc", i));
			
		titleCell.appendChild(document.createTextNode(this.columns[i].name)) ;
		
		if(this.columns[i].isSorted)
			titleCell.appendChild(this.drawOneSortButton("desc", i));
			
		titleRow.appendChild(titleCell) ;
	}
	domTHead.appendChild(titleRow);
		
	var filterRow = document.createElement("tr");
	
	for(i = 0 ; i < this.columns.length ; i++){
		var filterCell = document.createElement("td");
		filterCell.setAttribute("class", "footer");
		
		if(this.columns[i].filter != '' ){
			if(this.filtreCourant[i]== undefined)
				this.filtreCourant[i] = "";
				
			var filter = document.createElement("input");
			filter.addAttributes([["name","Filter-"+this.columns[i].name],["id","Filter-"+this.columns[i].name],["type","text"],["length","20"],["value",this.filtreCourant[i]]]);

			filter.model = this;
			filter.colNumber = i;
			filter.onkeypress = this.filterValidate;
			filter.onblur = this.filterAgain;

			filterCell.appendChild(filter);
		}else{
			filterCell.appendChild(document.createTextNode("")) ;
		}
		filterRow.appendChild(filterCell) ;
	}
	domTHead.appendChild(filterRow);
}
TreeTable.prototype.drawFooters = function(){
	var domTFoot = this.domTable.createTFoot();
		
	var infoRow = document.createElement("tr");	
	
	var bigCell = infoRow.insertCell(0);
	bigCell.setAttribute("colspan", this.columns.length);
	bigCell.innerHTML=/*appendChild(document.createTextNode(*/this.rows.length+' lignes <div id="'+this.info+'"></div>'/*))*/;//TODO
	domTFoot.appendChild(infoRow);
	
	var footRow = document.createElement("tr");	
	var firstCell = footRow.insertCell(0);
	firstCell.setAttribute("class", "footer");
	firstCell.setAttribute("colspan", this.columns.length-3);
	firstCell.appendChild(this.drawListPages());
	var secondCell = footRow.insertCell(1);
	secondCell.setAttribute("class", "footer");
	secondCell.appendChild(this.drawNavigateButtons());
	var thirdCell = footRow.insertCell(2);
	thirdCell.setAttribute("class", "footer");
	thirdCell.setAttribute("colspan", this.columns.length-3);
	thirdCell.appendChild(this.getAfficheParComboBox());

	domTFoot.appendChild(footRow);
}

TreeTable.prototype.drawOneSortButton = function(sens, col){
	var b;
	if(sens == "desc" ){
		b = new PictureButton('desc_'+i+'_'+this.divName, this.repImg+'desc', 'gif', "Ctrl + "+(col+1), true, this, this.sortByButton);
	}else{
		b = new PictureButton('asc_'+i+'_'+this.divName, this.repImg+'asc', 'gif', "Ctrl + "+(col+1), true, this, this.sortByButton);
	}
	b.domBT.setAttribute("class", "sortButton");
	return b.getDom(); 
	//TODO  TOOLTIP <div class="tooltip" style="display:none;" id="TT_'+sens+'_'+col+'_'+this.divName+'"></div>';
}


TreeTable.prototype.initSortButtons = function(){
	this.descSortButtons = new Array();
	this.ascSortButtons = new Array();
	for(var i = 0 ; i < this.columns.length ; i++){
		if(this.columns[i].isSorted){
			this.descSortButtons[i] = document.getElementById('desc_'+i+'_'+this.divName).buttonModel;
			this.ascSortButtons[i] = document.getElementById('asc_'+i+'_'+this.divName).buttonModel;
		}
	}
	this.refreshSortButtons(); //TODO TO IMPROVE
}

TreeTable.prototype.refreshSortButtons = function(){
	for(var i = 0 ; i < this.descSortButtons.length ; i++){
		if(this.sens==0){
			if(this.sortCol != i)
				this.descSortButtons[i].unselect();	
			else
				this.descSortButtons[i].select();	
			this.ascSortButtons[i].unselect(); 
		}
		if(this.sens==1){
			if(this.sortCol != i)
				this.ascSortButtons[i].unselect();
			else					
				this.ascSortButtons[i].select();
			this.descSortButtons[i].unselect(); 
		}
		
	}
}
TreeTable.prototype.drawBody = function(){
	this.getLogger().trace("drawBody");
	this.domTableBody = document.createElement("tBody");
	
	this.drawRows();
	
	this.domTable.appendChild(this.domTableBody);
}
/**
 *
 */
TreeTable.prototype.drawRows = function(){
	res = "";
	//Flush le tableau filtré
	this.filteredContent = new Array();
	
	//Boucle filtrant le tableau
	for(j = 0; j< this.rows.length  ; j++){
		
		if(this.isFiltreOK(this.rows[j])){
			this.filteredContent[this.filteredContent.length] = this.rows[j];	
			
		}
	}
	this.size = this.filteredContent.length;
	
	if(this.pageCourante > 1 && this.pageCourante > Math.ceil( this.size / this.MAX_LINES )){
		this.pageCourante = Math.ceil( this.size / this.MAX_LINES );
	}
	
	start = (this.pageCourante*this.MAX_LINES) - this.MAX_LINES; 
	//On ecrit les lignes du tableau
	writed = 0;
	for(k= start; k < this.size; k++){
	
		//Gestion de l'alternate background
		bgcolor = (writed%2 == 1)? this.alt_bgcolor2 : this.alt_bgcolor1 ;
				
		if( writed < this.MAX_LINES){
			//Write the first level row
			res += this.drawARow(this.filteredContent[k], k, bgcolor);
			//Write the first childs rows
			res += this.drawChildRows(this.filteredContent[k], k, bgcolor, this.filteredContent[k].expanded);
						
			writed++;
		}
	}
	if(writed==0){ //TODO columns length
		res += '<tr><td colspan="4">Aucunes lignes pour cette combinaison de filtre</td></tr>';
	}

	return res;
}

TreeTable.prototype.drawARow = function(row, idx, bgcolor){
	var domRow = document.createElement("tr");
	domRow.setAttribute("id", this.divName+'_row_'+idx);
	domRow.setAttribute("class", bgcolor);
	domRow.setAttribute("style", "cursor:pointer;");
	//domRow.onclick = this.toggleRow(domRow);
	domRow.onmouseover = this.toggleOver ;//Color(domRow, true);
	domRow.onmouseout = this.toggleOut ;//Color(domRow, false);
	
	for(var i = 0 ; i < this.columns.length ; i++){
		this.drawACell(domRow, row.getValueAt(i));
	}

	this.domTableBody.appendChild(domRow);
}
/**
 * Recursive method
 */
TreeTable.prototype.drawChildRows = function(row, idRoot, bgcolor, rootExpanded){
	var res = '';	 
	for(r=0 ; r < row.children.length ; r++ ){
		//res += this.drawAChildRow(row.children[r],this.divName+'_row_'+idRoot, r, bgcolor, row.expanded && rootExpanded);
		//TODOres += this.drawChildRows(row.children[r], idRoot+'_'+r, bgcolor, (row.children[r].expanded && rootExpanded) );
	}
	return res;
}

TreeTable.prototype.drawAChildRow = function(row, idxRoot, idx, bgcolor, visible){
	var display = (visible) ? '' : 'display:none;' ;	
	
	var res  = '<tr id='+idxRoot+'_'+idx+' class="'+bgcolor+'" style="cursor:pointer;'+display+'" ';
	res += 'onClick="document.getElementById(\''+this.divName+'\').model.toggleRow(this.id)" onMouseOver="document.getElementById(\''+this.divName+'\').model.toggleColor(this.id, true)" onMouseOut="document.getElementById(\''+this.divName+'\').model.toggleColor(this.id, false)">\n';
	for(var i = 0 ; i < this.columns.length ; i++){
		res += this.drawACell(row.getValueAt(i));
	}
	res +="\n</tr>\n";

	return res;
}

TreeTable.prototype.drawACell = function(domRow, value){
	//TODO <td><img src="'+this.repImg+this.tree_closed+'" ><a>'+this.filteredContent[k].nom+'</a></td>
	//return "<td>"+ value +"</td>";
	var domCell = document.createElement("td");
	domCell.appendChild(document.createTextNode(value));
	if(domRow instanceof HTMLTableRowElement && domRow.appendChild)
		domRow.appendChild(domCell);
	
}


TreeTable.prototype.updateMessage = function(message){
	
	document.getElementById(this.info).innerHTML = message;

}
//-----------------------------------------------------------------------------
//Gestion de l'affichage du TreeTable
//-----------------------------------------------------------------------------
/**
 *
 *@param rowId Id long avec prefixe ex ==> table1_row_0_0_1_0
 */
TreeTable.prototype.getRowFromRowId = function(rowId){
	//rowId == this.divName_row_0_0_0
	var firstId = rowId.substring(5+this.divName.length); // == 0_0_0
	    firstId = firstId.substring(0, (firstId.indexOf('_')>0) ? firstId.indexOf('_') : firstId.length ); 
	//firstId == 0
	var childId = rowId.substr(5+this.divName.length+firstId.length+1 );
	//childId == 0_0
	var firstRow = this.filteredContent[parseInt(firstId)];
	
	return this.getRowFromId(firstRow, childId);
}
/**
 *@param row Ligne courante
 *@param childId Id court sans prefixe ex ==> 0_1_0
 */
TreeTable.prototype.getRowFromId = function(row, childId){
	if(childId.length == 0){
		return row;
	}
	//childId == 0_0
	var firstChildId = childId.substring(0, (childId.indexOf('_')>0)?childId.indexOf('_'):childId.length );
	var nextChildId = childId.substr(firstChildId.length+1);
	//firstChildId == 0  &&  nextChildId == 0
	if(row.children.length>0){
		var childRow = row.children[parseInt(firstChildId)];
		return this.getRowFromId(childRow, nextChildId);
	}
	return;		
}
TreeTable.prototype.toggleRow = function(rowToToggle){
	//alert(rowId);
	//var rowToToggle = this.getRowFromRowId(rowId);	
	
	for(i = 0 ; i<rowToToggle.children.length ;i++){
		if(document.getElementById(rowId+'_'+i).style.display == ''){
			document.getElementById(rowId+'_'+i).style.display = 'none';
			rowToToggle.expanded = false;
		}else{
			document.getElementById(rowId+'_'+i).style.display = '';
			rowToToggle.expanded = true;
		}
		this.revealChildren(rowToToggle.children[i], rowId+'_'+i, rowToToggle.expanded);
	}
}
TreeTable.prototype.revealChildren = function(row, rowId, visible){
	
	for(var i = 0 ; i < row.children.length; i++ ){
		if(visible && row.expanded){
			document.getElementById(rowId+'_'+i).style.display = '';
		}else{
			document.getElementById(rowId+'_'+i).style.display = 'none';
		}
		this.revealChildren(row.children[i], rowId+'_'+i, visible)
	}
	
}

TreeTable.prototype.toggleAllVisibleRow = function(expand){
	//TODO Optimize only visible
	for(i = 0 ; i<this.filteredContent.length ;i++){
		for(j = 0 ; j<this.filteredContent[i].children.length ;j++){
			if(expand){
				document.getElementById(i+'_'+j).style.display = '';
				this.filteredContent[i].expanded = true;
			}else{
				document.getElementById(i+'_'+j).style.display = 'none';
				this.filteredContent[i].expanded = false;
			}
		}
	}
}
TreeTable.prototype.toggleAllRow = function(expand){
	
	row.prototype.expanded = expand;	
		
	this.rebuild();
}

TreeTable.prototype.toggleColor = function(tr, mouseOver){

	if(mouseOver){
		tr.oldClassName = tr.className; 
		tr.className = 'highlighted';
	}else{
		tr.className = tr.oldClassName;
	}

}
TreeTable.prototype.toggleOver = function(){
		this.oldClassName = this.className; 
		this.className = 'highlighted';
}
TreeTable.prototype.toggleOut = function(){
		this.className = this.oldClassName;
}

//-----------------------------------------------------------------------------
//Gestion du Tri
//-----------------------------------------------------------------------------
/**
 *
 * @param col numéo de la colonne à trier
 * @param sens type du tri asc=0 desc=1
 */
TreeTable.prototype.sortByButton = function(){
	var infos = this.id.split("_");
	var sens = (infos[0]== "asc") ? 1 : 0;
	var col = infos[1];
	this.mainModel.sortAgain(col, sens);
}
/**
 *
 * @param col numéo de la colonne à trier
 * @param sens type du tri asc=0 desc=1
 */
TreeTable.prototype.sortAgain = function(col , sens){
	
	if(col>=this.columns.length)	
		return;
	
	begin = new Date();

	this.sens = sens;
	this.sortCol = col;
	row.prototype.sortIdx = col;
	this.rows.sort(this.columns[col].compare);
	
	//On inverse le tableau si le tri est de type desc
	if(this.sens == 1){
		this.rows.reverse()
	}
	
	this.rebuild();	
	this.updateMessage('Tableau trié en '+ (new Date()- begin)/1000 +' s' );
}

//-----------------------------------------------------------------------------
//Gestion du Filtrage
//-----------------------------------------------------------------------------
TreeTable.prototype.filterValidate = function(e){
	if(navigator.appName == "Microsoft Internet Explorer"){
		
		if(window.event.keyCode == 13){
			this.model.filtreCourant[this.colNumber] = this.value;
			this.model.rebuild();
			//On remet le focus sur le filtre
			document.getElementById(this.id).focus();
		}else if(window.event.keyCode == 0) {
			this.model.filtreCourant[this.colNumber] = this.value;
			this.model.rebuild();
			//On met le focus sur le filtre suivant
			if(e.shiftKey){
				tabCol = (this.colNumber-1 < 0) ? this.model.columns.length-1: this.colNumber-1;
			}else{
				tabCol = (this.colNumber+2 > this.model.columns.length) ? 0: this.colNumber+1;
			}
			document.getElementById('Filter-'+this.model.columns[tabCol].name).focus();
		}
	
	}else{
		if(e.which == 13){
			this.model.filtreCourant[this.colNumber] = this.value;
			this.model.rebuild();
			//On remet le focus sur le filtre
			document.getElementById(this.id).focus();
		}else if(e.which == 0) {
			this.model.filtreCourant[this.colNumber] = this.value;
			this.model.rebuild();
			//On met le focus sur le filtre suivant
			if(e.shiftKey){
				tabCol = (this.colNumber-1 < 0) ? this.model.columns.length-1: this.colNumber-1;
			}else{
				tabCol = (this.colNumber+2 > this.model.columns.length) ? 0: this.colNumber+1;
			}
			document.getElementById('Filter-'+this.model.columns[tabCol].name).focus();
		}
	}
}

/**
 *
 */
TreeTable.prototype.filterAgain = function(e){
	begin  = new Date();
	//On stocke le filtre courant
	if(this.value != this.model.filtreCourant[this.colNumber]){
		this.model.filtreCourant[this.colNumber] = this.value;
		
		//On reconstruit le tableau
		this.model.rebuild();
		
		this.model.updateMessage('Tableau filtré en '+ (new Date()- begin)/1000 +' s' );
		
		//On remet le focus sur le filtre
		document.getElementById(this.id).focus();
	}
}

/**
 *
 */
TreeTable.prototype.isFiltreOK = function(row){
	
	//Pour chaque colonne
	for(var i = 0 ; i < this.columns.length ; i++  ){
		if(this.filtreCourant[i] == undefined){
			this.filtreCourant[i] = "";
		}
		if(this.columns[i].type == "String"){
			if( !( this.filtreCourant[i] == "" 
			   || row.cols[i].toLowerCase().indexOf(this.filtreCourant[i].toLowerCase())>-1  ) ){
				return false;
			}
		}else if(this.columns[i].type == "Number"){
			filtreEgal = (this.filtreCourant[i].substring(0,1) == "=" )? "="+this.filtreCourant[i] : this.filtreCourant[i] ;
			if( this.isSupInfEgalOK(this.filtreCourant[i]) 
			|| this.startWihtSupInfEgal(filtreEgal) && eval(row.cols[i]+filtreEgal)  ){
				//return true;
			}else{
				return false;
			}
		}
	}	
	return true;

}

/**
 * Gestion des tris spécifique au nombre
 * @return true si le filtre commencer par '=' , '>' ou'<'
 */ 
TreeTable.prototype.startWihtSupInfEgal = function(filter){

	if(filter.substring(0,1) == "=" 
	|| filter.substring(0,1) == "<" 
	|| filter.substring(0,1) == ">")
		return true;
	
	return false;
}

/**
 *
 */
TreeTable.prototype.isSupInfEgalOK = function(filter){

if(filter=="" || filter==">" || filter=="<" || filter==">=" || filter=="<=" || filter=="=")
	return true;
else
	return false;

}

//-----------------------------------------------------------------------------
//Gestion de la pagination
//-----------------------------------------------------------------------------

/**
 *
 */
TreeTable.prototype.pagineAgain= function(e){
	//Si le bouton est grisé on ne fait rien
	if(this.src.indexOf("_d") > 0 )
		return;	
		
	begin = new Date();
	switch(this.id){
		case "first_"+ this.mainModel.divName : this.mainModel.pageCourante = 1; break;
		case "prev_"+ this.mainModel.divName  : this.mainModel.pageCourante = this.mainModel.pageCourante-1; break;
		case "next_"+ this.mainModel.divName  : this.mainModel.pageCourante = this.mainModel.pageCourante+1; break;
		case "last_"+ this.mainModel.divName  : this.mainModel.pageCourante = this.mainModel.nbPages; break;
		case "goto_"+ this.mainModel.divName  : this.mainModel.pageCourante = (parseInt(this.value)>0 
					&& parseInt(this.value) <= this.mainModel.nbPages)?parseInt(this.value):1; break;
	}
	//On reconstruit le tableau
	this.mainModel.rebuild();
	
	if(this.id == "goto_"+ this.mainModel.divName){
		this.select();
	}
	
	this.mainModel.updateMessage('Page affiché en '+ (new Date()- begin)/1000 +' s' );
}

/**
 * Retourne le text permettant de chosir une page
 */
TreeTable.prototype.drawListPages = function(){
	
	this.listPages = document.createElement("div");
	//On recupere le plus petit entier supérieur au rapport nombre/maxParPage
	this.nbPages = Math.ceil( this.size / this.MAX_LINES );
		
	this.listPages.setAttribute("id","pages_"+this.divName);
	this.listPages.setAttribute("style","text-align:left;display:inline");
	this.listPages.appendChild(document.createTextNode("Page Courante "+this.pageCourante+ "/"+this.nbPages));
	
	return this.listPages;
}
/**
 * 
 */
TreeTable.prototype.refreshListPages = function(){
	//On recupere le plus petit entier supérieur au rapport nombre/maxParPage
	this.nbPages = Math.ceil( this.size / this.MAX_LINES );
	this.listPages.innerHTML = 'Page Courante '+this.pageCourante+ '/'+this.nbPages ;	

}

TreeTable.prototype.drawNavigateButtons = function(){
	var res = document.createElement("div");
	res.setAttribute("id", "navigateButtons");
	
	res.appendChild(this.drawOneNavigateButton("first"));
	res.appendChild(this.drawOneNavigateButton("prev"));
	
	this.gotoPage = document.createElement("input");
	this.gotoPage.addAttributes([["type","text"],["size",1],["maxlength",4],["class","gotoInput"],["id","goto_"+ this.divName],["value",this.pageCourante]]);
	//vis = (this.nbPages>1)? '': 'disabled';
	//res += '" value="'+this.pageCourante+'" '+vis+'>';
	
	this.gotoPage.mainModel = this;
	this.gotoPage.onchange = this.pagineAgain;
	this.gotoPage.onkeypress = function(){
		if(isIE){
			if(window.event.keyCode == 13)
				this.blur();
		}
	}
	this.gotoPage.onfocus  = function(){
		this.select();
	}
	
	res.appendChild(this.gotoPage);
	
	res.appendChild(this.drawOneNavigateButton("next"));
	res.appendChild(this.drawOneNavigateButton("last"));
	
	return res;
}

TreeTable.prototype.drawOneNavigateButton = function(name){		
	var b;
	switch(name){
		case "first":
			this.first = new PictureButton('first_'+ this.divName, this.repImg+'first', 'gif', "Ctrl + Haut", false, this, this.pagineAgain);
			b = this.first;
			break;
		case "prev":	
			this.prev = new PictureButton('prev_'+ this.divName, this.repImg+'prev', 'gif', "Ctrl + Gauche", false, this, this.pagineAgain );
			b = this.prev;
			break;
		case "next":
			this.next = new PictureButton('next_'+ this.divName, this.repImg+'next', 'gif', "Ctrl + Droite", false, this, this.pagineAgain);
			b = this.next;
			break;
		case "last":
			this.last = new PictureButton('last_'+ this.divName, this.repImg+'last', 'gif', "Ctrl + Bas", false, this, this.pagineAgain);
			b = this.last;
			break;
	}
	b.domBT.setAttribute("class", "navButton");
	
	return b.domBT;
}
/**
 *
 */
TreeTable.prototype.refreshNavigateButtons = function (){
	this.first.changeVisibility(this.pageCourante>2, this.displayDisabledIcon) ;
	this.prev.changeVisibility(this.pageCourante>1 , this.displayDisabledIcon) ; 
	this.next.changeVisibility(this.pageCourante<this.nbPages, this.displayDisabledIcon) ; 
	this.last.changeVisibility(this.pageCourante<this.nbPages-1, this.displayDisabledIcon) ; 
	
	this.gotoPage.value = this.pageCourante;
	this.gotoPage.disabled = !(this.nbPages>1);
}



TreeTable.prototype.getAfficheParComboBox = function(){
	
	var content = document.createElement("div");
	
	content.appendChild(document.createTextNode("Affiché par "));
	
	this.cbb = document.createElement("select");
	this.cbb.setAttribute("id", 'displayBy' + this.divName);
	this.cbb.addOption([["value",2]],2);
	this.cbb.addOption([["value",5]],5);
	this.cbb.addOption([["value",10]],10);
	this.cbb.addOption([["value",25]],25);
	this.cbb.addOption([["value",50]],50);
	this.cbb.addOption([["value",100]],100);
	this.cbb.addOption([["value",200]],200);
	this.cbb.addOption([["value",500]],500);
	this.cbb.addOption([["value",1000]],1000);
	
	this.cbb.model = this;
	this.cbb.onchange = this.displayBy;
	
	content.appendChild(this.cbb);
	
	return content; 
}

TreeTable.prototype.displayBy = function (){
	
	//var cbb = document.getElementById('displayBy'+ cbb.model.divName);
	//this == this.cbb
	this.model.MAX_LINES = this.options[this.selectedIndex].value;
	this.model.rebuild();

}

/**
 * This method will select the parameterized value in the parameterized combobox
 */
TreeTable.prototype.refreshDisplayBy = function (value){
	for(i = 0 ;i < this.cbb.options.length ; i++){	
		if(this.cbb.options[i].value == value ){
			this.cbb.selectedIndex =i;
			break;
		}
	}	
}

/**
 *
 */
TreeTable.prototype.getSortMethodByName = function(name){
	switch(name){
		case 'loweredString': return this.compareLoweredString;
		case 'caseSensitiveString': return this.compareCaseSensitiveString;
		case 'number': ;
		default: return this.compareNumber ;
	}
}
/**
 *
 */	
TreeTable.prototype.compareLoweredString  = function(a,b){
	if(typeof(a.getSortValue()) == "string" && typeof(b.getSortValue()) == "string" ){
		if(a.getSortValue().toLowerCase() < b.getSortValue().toLowerCase()) return -1;
		if(a.getSortValue().toLowerCase() > b.getSortValue().toLowerCase()) return 1;
		return 0;	
	}
}
/**
 *
 */	
TreeTable.prototype.compareCaseSensitiveString = function(a,b){
	if(typeof(a.getSortValue()) == "string" && typeof(b.getSortValue()) == "string" ){
		if(a.getSortValue() < b.getSortValue()) return -1;
		if(a.getSortValue() > b.getSortValue()) return 1;
		return 0;	
	}
}
/**
 *
 */
TreeTable.prototype.compareNumber = function(a,b){
	if(isFinite(a.getSortValue()) && isFinite(b.getSortValue())){
		return b.getSortValue() - a.getSortValue();
	}
}

/** 
 * CHARGEMENT DES DONNES
*/



/**
 * Get an external File
 */
TreeTable.prototype.loadXMLFile = function(url){
	/*var xmlDoc;
	// code for IE
	if (window.ActiveXObject){
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.load("data.xml");
		this.loadXML(xmlDoc);
	}else if (document.implementation && document.implementation.createDocument){
		// code for Mozilla, etc.
		xmlDoc= document.implementation.createDocument("","",null);
		xmlDoc.load(file);
		this.loadXML(xmlDoc);
	}else{
		alert('Your browser cannot handle this script');
	}	*/
	
	/*var oDomDoc = Sarissa.getDomDocument("","");
	oDomDoc.load(file);
	this.loadXML(oDomDoc);*/
	
	
  /*xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange= this.readyToLoad;*/

ajax[this.divName].open("GET", url, true);
ajax[this.divName].send(null);

	/*xmlhttp.open("GET", url, true);
  	xmlhttp.send(null);*/
   
}

TreeTable.prototype.readyToLoad = function() {
	var xmlhttp 

	for(var id in ajax){
		xmlhttp = ajax[id];
		if (xmlhttp.readyState==4) {
			if (xmlhttp.status==200) {
			//if(xmlhttp.responseXML != null && xmlhttp.responseXML != undefined){
				xmlhttp.model.loadXML(xmlhttp.responseXML);
			//}
			}
		}
	}//end for
}

TreeTable.prototype.loadXML = function(xml){
	var root = xml.getElementsByTagName("treetable")[0];		 
	var treetable = document.getElementById(root.getAttribute("id")).model;
	if(root.getAttribute("loadingMethod") == "xml" ){
		treetable.loadXMLData(root);
	}else if(root.getAttribute("loadingMethod") == "JSON" ){
		treetable.loadJSON(root.textContent);
	}else{
		alert('Error while retrieving AJAX data');
	}
}

/** 
 * Load an xml object
 *@param xml an XML Object
 */
TreeTable.prototype.loadXMLData = function(xml){
	begin = new Date();
	//Parse Options
	var opts = new Array();
	var optNode = xml.getElementsByTagName("options")[0];
	
	for(var i = 0 ; i < optNode.getElementsByTagName("option").length ; i++){
		opts[optNode.getElementsByTagName("option")[i].getAttribute("name")] = optNode.getElementsByTagName("option")[i].getAttribute("value");
	}
	this.loadOptions(opts);
	
	//Parse Columns
	var cols = new Array();
	var colNode = xml.getElementsByTagName("cols")[0];
	for(var i = 0 ; i < colNode.getElementsByTagName("col").length ; i++){
				
		var c = colNode.getElementsByTagName("col")[i];
		cols[i] = new column(c.getAttribute("name"),c.getAttribute("type"), true, "input","10%" ,this.getSortMethodByName('loweredString'));
	}
	this.columns = cols;
	
	//Parse Rows
	var rows = new Array();
	var rowNode = xml.getElementsByTagName("rows")[0];
	for(var i = 0 ; i < rowNode.getElementsByTagName("row").length ; i++){
				
		var r = rowNode.getElementsByTagName("row")[i];
		var values = new Array();
		for(var j = 0 ; j < cols.length ; j++){
			values[j] = r.getAttribute(cols[j].name.toLowerCase());
		}
		rows[i] = new row(values, new Array());
	}
	this.rows = rows;

	this.build();
	this.updateMessage('Tableau généré en '+ (new Date()- begin)/1000 +' s' );
}

/**
 * Parse and load a JSON text
 *@param jsonTxt JSON text
 */
TreeTable.prototype.loadJSON = function(jsonTxt){
	begin = new Date();
	//Call the string method parseJSON added in the json.js file
	this.loadJSONVar(eval('(' + jsonTxt + ')'));
	//this.loadJSONVar(jsonTxt.parseJSON());
	this.updateMessage('Tableau généré en '+ (new Date()- begin)/1000 +' s' );
}

/**
 * Load a JSON var
 *@param jsonVar JSON var
 */
TreeTable.prototype.loadJSONVar = function(jsonVar){
	if(jsonVar["options"] != null)
		this.loadOptions(jsonVar["options"]);	
	if(jsonVar["columns"] != null)
		this.loadColumns(jsonVar["columns"]);
	if(jsonVar["rows"] != null)
		this.loadRows(jsonVar["rows"]);
	this.build();
}

/**
 * Load options of the table
 *@param options associative array
 */
TreeTable.prototype.loadOptions = function(options){
	for (var key in options) {
      this[key] = options[key];
	}
}
/**
 * Load columns of the table 
 *@param columns associative array
 */
TreeTable.prototype.loadColumns = function(columns){
	this.columns = new Array();
	for(i = 0 ; i < columns.length ; i++){
		this.columns.push(this.objectToColumn(columns[i]));
	}
}
/**
 * Convert an object to a column
 */
TreeTable.prototype.objectToColumn = function(obj){
	return new column(obj.name, obj.type, obj.isSorted, obj.filter,obj.width, this.getSortMethodByName(obj.sort));
}
/**
 * Load rows of the table 
 *@param rows associative array
 */
TreeTable.prototype.loadRows = function(rows){
	this.rows = new Array();
	for(i = 0 ; i < rows.length ; i++){
		this.rows.push(this.objectToRow(rows[i]));
	}
}
/**
 * Convert an object to a row
 */
TreeTable.prototype.objectToRow = function(obj){
	return new row(obj.cols,this.childrenToRows(obj.children));
}
/**
 * Convert an array of children into an array of rows and call recursively the objectToRow method
 */
TreeTable.prototype.childrenToRows = function(children){
	var rows = new Array();
	for(var i = 0 ; i < children.length ; i ++){
		rows[i] = this.objectToRow(children[i]);
	}
	return rows;
}

/**
 * Load JSON var example to make a model of which text you may code
*/
TreeTable.prototype.loadJSONExample = function(){
	begin = new Date();
	
	jsonVar = {"columns":[{"name":"Colonne1","type":"String","isSorted":true,"filter":"input","width":"25%"},{"name":"Colonne2","type":"Number","isSorted":true,"filter":"select","width":"25%"},{"name":"Colonne3","type":"Number","isSorted":true,"filter":"number","width":"25%"},{"name":"Colonne4","type":"Number","isSorted":true,"filter":"","width":"25%"}],"rows":[{"cols":["POzzle Bubble",3,6,8],"expanded":false,"children":[{"cols":[" pbub",3,6,8],"expanded":false,"children":[],"sortIdx":0}],"sortIdx":0},{"cols":["Kid Bubble",356,20,1],"expanded":false,"children":[],"sortIdx":0},{"cols":["Daika Chi",36,20,1],"expanded":false,"children":[],"sortIdx":0},{"cols":["Super mario",6,2,41],"expanded":false,"children":[],"sortIdx":0},{"cols":["Pong",85,220,1],"expanded":false,"children":[],"sortIdx":0},{"cols":["Brexac",7,98,1],"expanded":false,"children":[],"sortIdx":0},{"cols":["Road rash",9,20,1],"expanded":false,"children":[],"sortIdx":0}]};
	this.loadJSONVar(jsonVar);

	this.updateMessage('Tableau généré en '+ (new Date()- begin)/1000 +' s' );
}

/**
 * Load example to test the render of the table
 */
TreeTable.prototype.loadExample = function(){
	begin = new Date();
	
	this.columns = new Array(
		new column("Nom", "String", true, 'input','100px',this.compareLoweredString),
		new column("Genre", "String", true, 'input','100px',this.compareCaseSensitiveString),
		new column("Taille", "Number", true, 'input','100px',this.compareNumber),
		new column("Note", "Number", true, 'input','100px',this.compareNumber)
		,new column("", "String", false, '', '100px',this.compareNumber)
	);
	
	this.rows = new Array(
		new row(["Blob","volley", 12 , 14 ,"<a>Get It</a>"],[new row(["|_lev2","volley1", 12 , 14 ],[]),new row(["|_lev2","volley2", 12 , 14 ],[new row([" |_lev3","", 12 , 14 ],[new row(["  |_lev4","", 12 , 14 ],[])])])]),
		new row(["MK4","baston 2D",54 , 19,"<a>Get It</a>"],[]),
		new row(["AVP2","shoot",650,17,"<a>Get It</a>"],[]),
		new row(["CS","shoot",1400,10,"<a>Get It</a>"],[]),
		new row(["Mario kart","course",100,18,"<a>Get It</a>"],[]),
		new row(["BF2","shoot",2500,19,"<a>Get It</a>"],[]),
		new row(["NFS","course",400,14,"<a>Get It</a>"],[]),
		new row(["Trackmania","course",500,16,"<a>Get It</a>"],[])
	);

	for(i=0 ;i<=1000 ;i++){
		this.rows.push(new row(["jeu"+i,"course",10*i,16,"<a>Get It</a>"],[]));
	}
	
	row.prototype.sortIdx = 0;
	this.rows.sort(this.columns[0].compare);
	
	this.build();
	
	this.updateMessage('Tableau généré en '+ (new Date()- begin)/1000 +' s' );
}

TreeTable.prototype.exportJSON = function(){

	var o = new Object();
	o["options"] = this.options;
	o["columns"] = this.columns;
	o["rows"] = this.rows;
	
	document.getElementById('debug').innerHTML = o.toJSONString();

}
TreeTable.prototype.exportXML = function(){
//todo FOR BENCHMARK
	var res = '';
	
	res +='<treetable id="table5" loadingMethod="xml">';

	res +="<options>";
		//<option name="displayBy" value="25" />
	res +="</options><cols>";
	for(var i = 0 ; i < this.columns.length ; i++){
		res +='<col name="'+this.columns[i].name+'" type="'+this.columns[i].type+'" />';
	}
	res +="</cols><rows>";
	for(var i = 0 ; i < this.rows.length ; i++){
		res +='<row ';
		for(var j =0 ; j < this.columns.length ; j++){
			res += this.columns[j].name.toLowerCase()+'="'+this.rows[i].cols[j]+'" ';
		}
		res += '/>';
	}
	res +='</rows></treetable>';

	document.getElementById('toto').innerHTML = escape(res);

}

TreeTable.prototype.getLogger = function (){
	if(!this.logger){
		this.logger = getLogger("TREETABLE");
		this.logger.setLevel(Logger.LEVEL_ALL);
	}
	this.logger.setCurrentID(this.divName);
	return this.logger;
}