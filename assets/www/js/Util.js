Array.prototype.remove = function(elem) {
    var match = -1;

    while( (match = this.indexOf(elem)) > -1 ) {
        this.splice(match, 1);
    }
};

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}



  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  }

 
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };

function mainfunc (func) {
	try {		
		var args = new Array();
		for (var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		window[func].apply(this, args);		
	} catch (e) {
		console.debug(e);
		console.debug(func + " error");
	}	
}

function createNewClass(className) {
	return new window[className];
}

$.extend({
		alert : function(title, message) {
			$("<div></div>").dialog({
				buttons : {
					"Ok" : function() {
						$(this).dialog("close");
					}
				},
				close : function(event, ui) {
					$(this).remove();
				},
				resizable : false,
				title : title,
				modal : true
			}).text(message);
			$(".ui-dialog-titlebar").hide();
		}
	});

function showHTML(fromId, toId) {
	var htmlToCopy = $("#" + fromId).html();
	$("#" + toId).html(htmlToCopy);
}

function notify(options) {
		var layoutPosition = null;
		if (TURN == "red") {
			layoutPosition = "bottom";
		} else {
			layoutPosition = "top";
		}
		
		
		var allOptions = {
				type: TURN, 
				layout: layoutPosition,
				timeout: 1000,
		};
		$.extend(allOptions, options);
		noty(allOptions);
	}

function getImageLocation(imageName) {
		return ("img/" + imageName + ".png");
}
