ek.register("gui.form.TextField");

/**
 * Affiche un Champs text
 */
function TextField(domId){
	
	this.textDOM = document.getElementById(domId);
	this.textDOM.model = this;
	this.textDOM.onkeyup = this.onKeyUp ;
	
	this.currentPattern = /([a-zA-Z]+)/;
} 


/**
   onKeydown (en appuyant sur une touche)
 onKeypress (en maintenant une touche appuyée)
 onKeyup (en relâchant la touche)
  */
TextField.prototype.onKeyUp = function (e){
	if (this.value.substring(this.value.length-1, this.value.length) == 1)
		releaseEvents(Event.KEYUP);

	while(this.value.length >0 && !this.value.match(this.model.currentPattern)){
		this.value = this.value.substring(0, this.value.length-2);
	}

}



