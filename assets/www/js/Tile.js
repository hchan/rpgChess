

function Tile() {
	this.displayX = 0;
	this.displayY = 0;
	this.resource = null;

	this.getBoardPosition = function() {
		return this.displayX + this.displayY;
	}

	this.getXBegin = function() {
		for ( var i = 0; i < ALPHA.length; i++) {
			if (this.displayX == ALPHA[i]) {
				return i * SQUARESIZE + OFFSET + AXISSIZE;
			}
		}
	}
	this.getXEnd = function() {
		return this.getXBegin() + SQUARESIZE;
	}
	this.getYBegin = function() {
		return (BOARDSIZE - this.displayY) * SQUARESIZE + OFFSET;
	}
	this.getYEnd = function() {
		return this.getYBegin() + SQUARESIZE;
	}

	this.boardPiece = null;

	this.isGray = function() {
		return ((ALPHATONUMBER.get(this.displayX) + ((BOARDSIZE - this.displayY) % 2)) % 2 == 1);
	}

	this.getImageLocation = function() {

		var bgColor = null;
		if (this.isGray()) {
			bgColor = "gray";
		} else {
			bgColor = "white";
		}
		return 'img/' + this.boardPiece.rank
				+ this.boardPiece.color.capitalize() + bgColor.capitalize()
				+ ".png";
	}
	this.paint = function() {
		var x = this.getXBegin();
		var y = this.getYBegin();
		BOARDCANVASCTX.globalAlpha = 1.0;
		if (this.boardPiece != null) {
			var imageLocation = this.getImageLocation();
			var opacity = 1;
			if (this.resource != null) {
				opacity = 0.85;
			}

			this.drawImage(imageLocation, x, y, opacity);

		} else {
			BOARDCANVASCTX.beginPath();
			if (this.isGray()) {
				BOARDCANVASCTX.fillStyle = BOARDCANVASGRAY;
			} else {
				BOARDCANVASCTX.fillStyle = BOARDCANVASWHITE;
			}

			BOARDCANVASCTX.fillRect(x, y, SQUARESIZE, SQUARESIZE);
			BOARDCANVASCTX.stroke();
		}

		if (this.resource != null) {
			var imageLocation = "img/" + this.resource + ".png";
			var opacity = 1;
			if (this.boardPiece != null) {
				opacity = 0.5;
			}

			this.drawImage(imageLocation, x, y, opacity);
		}

	}

	this.drawImage = function(imageLocation, x, y, opacity) {		
		var imageObj = IMAGES.get(imageLocation);
	
		// if (IMAGES.get(imageLocation) == null) {
		// imageObj = new Image();
		// imageObj.src = imageLocation;
		// imageObj.onload = function() {
		// BOARDCANVASCTX.globalAlpha = opacity;
		// BOARDCANVASCTX.drawImage(imageObj, x, y, SQUARESIZE, SQUARESIZE);
		// };
		// IMAGES.put(imageLocation, imageObj);
		// } else {
		// imageObj = IMAGES.get(imageLocation);
		// BOARDCANVASCTX.drawImage(imageObj, x, y, SQUARESIZE, SQUARESIZE);
		// }

		 
		BOARDCANVASCTX.globalAlpha = opacity;
		
		if (!(imageObj instanceof Image)) {
			imageObj = IMAGES.get("img/rankSprites.png");
			var frame = IMAGES.get(imageLocation);
			var sx = frame.frame.x;
			var sy = frame.frame.y;
			var swidth = frame.frame.w;
			var sheight = frame.frame.h;
			BOARDCANVASCTX.drawImage(imageObj, sx,sy,swidth,sheight, x,y, SQUARESIZE, SQUARESIZE);
		} else {
			BOARDCANVASCTX.drawImage(imageObj, x,y, SQUARESIZE, SQUARESIZE);
		}
		
		
	
	}
	

	this.fadeOut = function() {
		if (this.boardPiece != null) {
			var alpha = 1.0;
			var x = this.getXBegin();
			var y = this.getYBegin();
			var imageLocation = this.getImageLocation();
			var tile = this;
			var interval = setInterval(function() {
				alpha = alpha - 0.05; // decrease opacity (fade out)
				BOARDCANVASCTX.clearRect(x, y, SQUARESIZE, SQUARESIZE);
				tile.drawImage(imageLocation, x, y, alpha);
				if (alpha < 0) {
					clearInterval(interval);
					tile.paint();
				}
			}, 50);
		} else {
			this.paint();
		}
	}
	
	this.fadeIn = function () {
		if (this.boardPiece != null) {
		    var alpha = 0;
		    var x = this.getXBegin();
			var y = this.getYBegin();
			var imageLocation = this.getImageLocation();
			var tile = this;	
		    var interval = setInterval(function () {
		            alpha = alpha + 0.05; // decrease opacity (fade out)
		            BOARDCANVASCTX.clearRect (x, y, SQUARESIZE, SQUARESIZE);
		            tile.drawImage(imageLocation, x, y, alpha);	           
		            if (alpha > 1) {	              
		                clearInterval(interval);
		                tile.paint();
		            }
		        }, 50); 	    
		} else {
			 this.paint();
		}		
	}

	this.showMoves = function() {
		paintAll();
		SELECTEDTILE_POSSIBLE_TILES = [];
		this.boardPiece.unitMode = "move";
		if (this.isFriend()) {

			BOARDCANVASCTX.beginPath();
			BOARDCANVASCTX.rect(this.getXBegin(), this.getYBegin(), SQUARESIZE,
					SQUARESIZE);
			BOARDCANVASCTX.lineWidth = 3;
			BOARDCANVASCTX.strokeStyle = POSSIBLE_MOVE_STYLE;
			BOARDCANVASCTX.stroke();

			this.boardPiece.updateMoves();
			SELECTEDTILE.drawPossibleMoves();
			this.boardPiece.updateAttacks();
			SELECTEDTILE.drawPossibleAttacks();
		}
		
	}
	
		
	

	this.drawPossibleMoves = function() {
		for ( var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var tile = SELECTEDTILE_POSSIBLE_TILES[i];
			if (tile.boardPiece == null) {
				this.drawPossibleMove(tile);
			}
		}
	}
	
	this.drawPossibleMove = function(tile) {
		BOARDCANVASCTX.beginPath();
		BOARDCANVASCTX.strokeStyle = POSSIBLE_MOVE_STYLE;
		BOARDCANVASCTX.arc(tile.getXBegin() + SQUARESIZE / 2, tile.getYBegin()
				+ SQUARESIZE / 2, SQUARESIZE / 10, 0, 2 * Math.PI, false);
		BOARDCANVASCTX.stroke();
		BOARDCANVASCTX.closePath();
	}

	
	
	this.drawPossibleAttacks = function() {
		for ( var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var tile = SELECTEDTILE_POSSIBLE_TILES[i];
			if (tile.boardPiece != null) {
				this.drawPossibleAttack(tile);
			}
		}
	}
	
	
	this.drawPossibleAttack = function(tile) {
		BOARDCANVASCTX.beginPath();
		BOARDCANVASCTX.strokeStyle = POSSIBLE_ATTACK_STYLE;
		BOARDCANVASCTX.arc(tile.getXBegin() + SQUARESIZE / 2, tile.getYBegin()
				+ SQUARESIZE / 2, SQUARESIZE / 10, 0, 2 * Math.PI, false);
		BOARDCANVASCTX.stroke();
		BOARDCANVASCTX.closePath();
	}
	
	this.drawPossibleSkills = function() {
		for ( var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var tile = SELECTEDTILE_POSSIBLE_TILES[i];
			if (tile.boardPiece != null) {
				this.drawPossibleSkill(tile);
			}
		}
	}
	
	this.drawPossibleSkill = function(tile) {
		BOARDCANVASCTX.beginPath();
		BOARDCANVASCTX.strokeStyle = POSSIBLE_SKILL_STYLE;
		BOARDCANVASCTX.arc(tile.getXBegin() + SQUARESIZE / 2, tile.getYBegin()
				+ SQUARESIZE / 2, SQUARESIZE / 10, 0, 2 * Math.PI, false);
		BOARDCANVASCTX.stroke();
		BOARDCANVASCTX.fill();
		BOARDCANVASCTX.closePath();
	}
	
	this.drawSkills = function() {
		for ( var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var tile = SELECTEDTILE_POSSIBLE_TILES[i];
			if (tile.boardPiece != null) {
				this.drawSkill(tile);
			}
		}
	}
	
	this.drawSkill = function(tile) {
		BOARDCANVASCTX.beginPath();
		BOARDCANVASCTX.strokeStyle = "#000000";
		BOARDCANVASCTX.fillStyle = SKILL_STYLE;
		BOARDCANVASCTX.arc(tile.getXBegin() + SQUARESIZE / 2, tile.getYBegin()
				+ SQUARESIZE / 2, SQUARESIZE / 10, 0, 2 * Math.PI, false);
		BOARDCANVASCTX.stroke();
		BOARDCANVASCTX.fill();
		BOARDCANVASCTX.closePath();
	}
	
	this.drawSkillsSelectionRequired = function() {
		for ( var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var tile = SELECTEDTILE_POSSIBLE_TILES[i];
			//if (tile.boardPiece != null) {
				this.drawSkillSelectionRequired(tile);
			//}
		}
	}
	
	this.drawSkillSelectionRequired = function(tile) {
		BOARDCANVASCTX.beginPath();
		BOARDCANVASCTX.strokeStyle = SKILL_STYLE;
		BOARDCANVASCTX.arc(tile.getXBegin() + SQUARESIZE / 2, tile.getYBegin()
				+ SQUARESIZE / 2, SQUARESIZE / 10, 0, 2 * Math.PI, false);
		BOARDCANVASCTX.stroke();
		//BOARDCANVASCTX.fill();
		BOARDCANVASCTX.closePath();
	}
	
	
	this.getDisplayX = function(offset) {
		var num = ALPHATONUMBER.get(this.displayX) + offset;
		return ALPHA[num];
	}
	
	this.isEnemy = function() {
		var retval = false;
		if (this.boardPiece != null) {
			var boardPiece = this.boardPiece;
			if (boardPiece.color != TURN) {
				retval = true;
			}			
		}		
		return retval;
	}
	
	this.isResourceTile = function () {
		var retval = false;
		for (var i = 0; i < RESOURCE_TILES.length; i++) {
			var resourceTile = RESOURCE_TILES[i];
			
			if (resourceTile.getBoardPosition() == this.getBoardPosition()) {	
				retval = true;
				break;
			}			
		}		
		return retval;
	}
	
	this.isFriend = function() {
		var retval = false;
		if (this.boardPiece != null) {
			var boardPiece = this.boardPiece;
			if (boardPiece.color == TURN) {
				retval = true;
			}			
		}		
		return retval;
	}
	
	this.isEmpty = function() {
		var retval = false;
		if (this.boardPiece == null) {			
			retval = true;			
		}		
		return retval;
	}
}