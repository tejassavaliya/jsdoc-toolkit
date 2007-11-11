ek.require("gui.button.Button");

ek.register("gui.button.ToggleButtonManager");

/**
 * Construit une ToggleButtonManager
 */
function ToggleButtonManager(divName){
	this.id = divName;
	this.toggleButtons = new Array();
}
/**
 *
 */
ToggleButtonManager.prototype.addButton = function(b){
	if(b instanceof Button && b.toggle){
		b.domBT.tbMgr = this;
		b.domBT.onclick = function(){
			this.tbMgr.select(this.buttonModel);
		}
		this.toggleButtons.push(b);
	}
}
/**
 *
 */
ToggleButtonManager.prototype.select = function(button){
	for(var i = 0 ; i < this.toggleButtons.length ; i++){
		if(this.toggleButtons[i] == button){
			this.toggleButtons[i].select();
		}else{
			this.toggleButtons[i].unselect();
		}
	}
}

ToggleButtonManager.prototype.selectByUrl = function(buttonUrl){
	for(var i = 0 ; i < this.toggleButtons.length ; i++){
		if(this.toggleButtons[i].domBT.href.indexOf(buttonUrl)>-1){
			this.select(this.toggleButtons[i]);
			break;
		}
	}
}
