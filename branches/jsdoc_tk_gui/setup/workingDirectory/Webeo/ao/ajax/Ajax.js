/**
 * @fileoverview
 * The Ajax Object class allow you to create simple Ajax Requests and to manage their response easily
 *
 *@author Sébastien Bordes => Sebastien dot Bordes at emukina dot fr
 *@version 1.0
 */
 
ek.register("ao.ajax.Ajax");

/** STATICS PROPERTY */

/**
 * Static field used to determine the state of the AjaxRequest : uninitialized
 * @type int
 */
Ajax.READY_STATE_UNINITIALIZED = 0 ;
/**
 * Static field used to determine the state of the AjaxRequest : loading
 * @type int
 */
Ajax.READY_STATE_LOADING = 1 ;
/**
 * Static field used to determine the state of the AjaxRequest : loaded
 * @type int
 */
Ajax.READY_STATE_LOADED = 2 ;
/**
 * Static field used to determine the state of the AjaxRequest : interactive
 * @type int
 */
Ajax.READY_STATE_INTERACTIVE = 3 ;
/**
 * Static field used to determine the state of the AjaxRequest : complete
 * @type int
 */
Ajax.READY_STATE_COMPLETE = 4 ;

/** PRIVATE PROPERTY */

/**
 * This object is the link with the main manager
 * @private
 * @type Object (AjaxManager or another component)
 */
Ajax.prototype.manager = null;
	
/**
 * The XMLHttpRequest object
 * @private
 * @type XMLHttpRequest
 */
Ajax.prototype.query = null;

/**
 * The load method to call when XMLHttpRequest is ready
 * @private
 * @type Function
 */
Ajax.prototype.onload = null;

/**
 * The method to call when XMLHttpRequest has failed
 * @private
 * @type Function
 */
Ajax.prototype.onerror = Ajax.prototype.defaultError ;

/**
 * The url to call
 * @private
 * @type String
 */
Ajax.prototype.url = null ;

/**
 * The method of the transport, GET or POST
 * @private
 * @type String
 */
Ajax.prototype.method = "GET" ;

/**
 * Parameters concatenate into  a single string
 * @private
 * @type String
 */
Ajax.prototype.params = null;

/**
 * The content-type of the transaction, 
 * @private
 * @type String
 */
Ajax.prototype.contentType = null ;

/**
 * Construct an Ajax object
 * @class
 * This class is used to create an Ajax object
 * @constructor
 *@env Client
 *@param Method:onload
 *@param Method:onerror
 *@param String:url
 *@param String:method
 *@param String:params
 *@param String:contentType
 * @return a new Ajax object
 */
function Ajax (manager, onload, onerror, url, method, contentType, params){


	this.manager = manager;
	
	if (window.XMLHttpRequest){
		this.query=new XMLHttpRequest();
	} else if (window.ActiveXObject){
		this.query=new ActiveXObject("Microsoft.XMLHTTP");
	}

	this.onload = (onload != undefined ) ? onload : null;

	this.onerror = (onerror != undefined ) ? onerror : defaultError ;

	this.url = (url != undefined ) ? url : null ;

	this.method = (method != undefined ) ? method : null ;

	this.params = (params != undefined ) ? params :  null;

	this.contentType = (contentType != undefined ) ? contentType : null ;
	
	if (!contentType && method=="POST"){
		this.contentType='application/x-www-form-urlencoded';
	}

}

/**
 * Set the params to send with the Ajax request 
 * @public
 * @params params: Pameters to send
 */
Ajax.prototype.setParams = function (params){
	this.params = params;
}

/**
 * Send the Ajax Request whit hte XMLHttpRequest object
 *@public
 *@param params Al parameters concatenate into a single String
 */
Ajax.prototype.sendRequest = function (params){
	
	if (params){
		this.params = params;
	}

	
	if (this.query){
		try{
			var loader=this;
			this.query.onreadystatechange=function(){
				Ajax.onReadyState.call(loader);
			}
			this.query.open(this.method,this.url,true);
			if (this.contentType){
				this.query.setRequestHeader('Content-Type', this.contentType);
			}
			this.query.send(this.params);
		}catch (err){
			this.onerror.call(this);
		}
	}

}

/**
 * Call the load method when the response was received
 *@env Client
 *@isExpertDefault no 
 */
Ajax.onReadyState = function (){

	var req = this.query;
	var ready = req.readyState;
	//TODO Manage ALL STATE TO MANAGE A PROGRESSION BAR
	if (ready == Ajax.READY_STATE_COMPLETE){
		var httpStatus = req.status;
		if (httpStatus == 200 || httpStatus == 0){
		  this.onload.call(this);
		}else{
		  this.onerror.call(this);
		}
	}

}

/**
 * Display an error message if the request has failed
 * @private
 * @env Client
 * @isExpertDefault no 
 */
Ajax.prototype.defaultError = function (){

	alert("La requête n'a pas pu aboutir ! "
    +"ReadyState:"+this.req.readyState
    +"Status: "+this.req.status
    +"Headers: "+this.req.getAllResponseHeaders());

}