/*
function reviver(key, value) {
	var retval = null;
	
	try {
		var tempObj = JSON.parse(value);
		if (tempObj.__className != null) {		
			var newObj = new window[tempObj.__className]();
			newObj.fromData(tempObj.data);
			retval = newObj;
		} else {
			retval = value;
		}
		
	} catch (e) {
		retval = value;
	}
	
		
	return retval;
}
 */
/*
 Hashtable.prototype.toJSON = function() {
 var htKeys = this.keys();
 var retval = {};
 retval.__className = "Hashtable";
 retval.data = [];
 for ( var i = 0; i < htKeys.length; i++) {
 var htKey = htKeys[i];
 retval.data.push({
 "htKey" : htKey,
 "htValue" : this.get(htKey)
 });

 }
 var str = JSON.stringify(retval);
 return str;
 }
 */

/*
 Hashtable.prototype.fromData = function(data) {

 for ( var i = 0; i < data.length; i++) {
 var keyAndValue = data[i];
 var htKey = keyAndValue.htKey;
 var htValue = keyAndValue.htValue;

 var htValueStr = JSON.stringify(htValue);
 htValue = JSON.parse(htValueStr, reviver);		

 this.put(htKey, htValue);
 }
 }


 BoardPiece.prototype.toJSON = function() {
 var oldToJON = this.toJSON;
 this.toJSON = null;
 var retval = {};
 retval.__className = this.constructor.name;
 var copyOfThis = {};
 $.extend(copyOfThis, this);
 retval.data = copyOfThis;
 var str = JSON.stringify(retval);
 return str;
 }

 BoardPiece.prototype.fromData = function(data) {

 $.extend(this, data);
 }


 Tile.prototype.toJSON =  function() {
 var oldToJON = this.toJSON;
 this.toJSON = null;
 var retval = {};
 retval.__className = this.constructor.name;
 var copyOfThis = {};
 $.extend(copyOfThis, this);
 retval.data = copyOfThis;
 var str = JSON.stringify(retval);
 return str;
 }

 Tile.prototype.fromData = function(data) {
 this = new Tile();
 var boardPieceStr = data.boardPiece;



 var jsonObj = JSON.parse(boardPieceStr, reviver);		

 $.extend(this, data);
 console.debug(this);
 this.boardPiece = new BoardPiece();
 $.extend(this.boardPiece, jsonObj.data);
 }
 */

Hashtable.prototype.toJSON = function() {
	var oldToJON = this.toJSON;
	this.toJSON = undefined;
	this.dump = [];
	var htKeys = this.keys();
	for ( var i = 0; i < htKeys.length; i++) {
		var htKey = htKeys[i];
		var htValue = this.get(htKey);
		this.dump.push({
			"htKey" : htKey,
			"htValue" : htValue
		});
	}
	var str = JSON.stringify(this);
	return str;
}

function reviveTILES (hashtableDump) {
	var hashtableDumpObj = JSON.parse(hashtableDump);
	for (var i = 0; i < hashtableDumpObj.dump.length; i++) {		
		var tileRestored = hashtableDumpObj.dump[i].htValue;
		var newTile = new Tile();
		$.extend(newTile, tileRestored);
		if (tileRestored.boardPiece != null) {
			var boardPieceRestored = tileRestored.boardPiece;
			var newBoardPiece = new BoardPiece();
			var newBoardPieceImpl = createBoardPieceImpl(tileRestored.boardPiece.rank);
			$.extend(newBoardPiece, newBoardPieceImpl);
			$.extend(newBoardPiece, boardPieceRestored);
			newTile.boardPiece = newBoardPiece;
		}
		TILES.put(hashtableDumpObj.dump[i].htKey, newTile);
	}	
}




function revivePLAYER_HASH (hashtableDump) {
	var retval = new Hashtable();
	var hashtableDumpObj = JSON.parse(hashtableDump);
	for (var i = 0; i < hashtableDumpObj.dump.length; i++) {		
		var playerRestored = hashtableDumpObj.dump[i].htValue;
		var newPlayer = new Player();
		$.extend(newPlayer, playerRestored);
		newPlayer.resourceHash = new Hashtable();
		var resourceHashRestoredObj = JSON.parse(playerRestored.resourceHash);
		for (var j = 0; j < resourceHashRestoredObj.dump.length; j++) {
			newPlayer.resourceHash.put(resourceHashRestoredObj.dump[j].htKey, resourceHashRestoredObj.dump[j].htValue);
		}
		newPlayer.resourceGainedOnLastTurnHash = new Hashtable();
		newPlayer.initResourceGainedOnLastTurnHash();
		PLAYER_HASH.put(hashtableDumpObj.dump[i].htKey, newPlayer);
	}	
	return retval;
}