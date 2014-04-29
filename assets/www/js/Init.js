function init() {
	animateLoading();
	BOARDCANVAS = document.getElementById("BOARDCANVAS");
	
	BOARDCANVASCTX = BOARDCANVAS.getContext("2d");
	
	SCREENSIZE = $(window).height() - BOTTOMMARGIN;
	BOARDCANVAS.width = SCREENSIZE;
	BOARDCANVAS.height = SCREENSIZE;
	SQUARESIZE = (SCREENSIZE - AXISSIZE - 2 * OFFSET) / BOARDSIZE;
	BOARDCANVASCTX.beginPath();
	BOARDCANVASCTX.rect(0, 0, SCREENSIZE, SCREENSIZE);
	BOARDCANVASCTX.strokeStyle = '#000000';
	BOARDCANVASCTX.stroke();

	ALPHATONUMBER.put("a", 0);
	ALPHATONUMBER.put("b", 1);
	ALPHATONUMBER.put("c", 2);
	ALPHATONUMBER.put("d", 3);
	ALPHATONUMBER.put("e", 4);
	ALPHATONUMBER.put("f", 5);
	ALPHATONUMBER.put("g", 6);
	ALPHATONUMBER.put("h", 7);

	PLAYER_HASH.put("red", new Player());
	PLAYER_HASH.put("blue", new Player());

	preloadImages();

}

function animateLoading() {
	PLEASEWAITTEXT = $("#PLEASEWAIT").html();
	ANIMATELOADINGLOOPCOUNT = 0;
	ANIMATELOADINGINTERVAL = self.setInterval(function() {
		var animatedPleaseWaitText = PLEASEWAITTEXT;
		var indexOfAnimation = ANIMATELOADINGLOOPCOUNT % PLEASEWAITTEXT.length;
		var preText = PLEASEWAITTEXT.substring(0, indexOfAnimation);
		var postText = PLEASEWAITTEXT.substring(indexOfAnimation+1);
		$("#PLEASEWAIT").html(preText + "." + postText);
		ANIMATELOADINGLOOPCOUNT++;
	}, 1000);
}


function preloadImages() {
	var imageHelper = new ImageHelper();
	imageHelper.populate();
	storeImageAndLoadNext(0);
}

function storeImageAndLoadNext(imageLocationIndex) {
	var imageObj = new Image();
	var imageLocation = IMAGELOCATIONS[imageLocationIndex];
	imageObj.src = imageLocation;
	imageObj.onload = function() {
		IMAGES.put(imageLocation, imageObj);
		var nextIndex = imageLocationIndex + 1;
		if (nextIndex < IMAGELOCATIONS.length) {
			storeImageAndLoadNext(imageLocationIndex + 1);
		} else {			
			buildSprites();
		}
	};
}


function buildSprites() {
	  $.getJSON("js/rankSprites.json",function(result){
		  	var frames = result["frames"];
		  	for (var i = 0; i < frames.length; i++) {
		  		var frame = frames[i];
		  		var filename = frame.filename;
		  		var x = frame.frame.x;
		  		var y = frame.frame.y;
		  		if (IMAGES.get("img/" + filename) == null) {
		  			IMAGES.put("img/" + filename, frame);
		  		}
		  	}
	     	main();
			$("#LOADING").hide();
			self.clearInterval(ANIMATELOADINGINTERVAL);
			$("#FINISHEDLOADING").show();			
	    });
}

	

function main() {
	if ($(window).height() > $(window).width()) {
		alert("This game can only be played at landscape unitMode for this version");
		exit();
	}
	$(function() {
		$("#tabs").tabs();
	});
	$(document).ready(function() {
		var accordionHeight = SCREENSIZE - $("#tabs").height() * 2;

		$("#GAMEINFO").height(accordionHeight);
		$("#GAMEINFOACCORDION").accordion({
			heightStyle : "fill"
		});

	});
	showHTML("MENU", "INFO");

	initBoard();
	paintAll();
	initControlPanel();
	BOARDCANVAS.addEventListener('click', mouseDownBOARDCANVAS, false);
	
	


}

function initBoard() {
	for ( var y = 0; y < BOARDSIZE; y++) {

		for ( var x = 0; x < BOARDSIZE; x++) {
			var tile = new Tile();
			tile.displayX = ALPHA[x];
			tile.displayY = BOARDSIZE - y;
			TILES.put(tile.displayX + tile.displayY, tile);
		}
	}
	initBoardPieces();
	initResources();

}

function paintAll() {
	paintBoardOutline();
	for ( var y = 0; y < BOARDSIZE; y++) {
		for ( var x = 0; x < BOARDSIZE; x++) {
			var tile = TILES.get(ALPHA[x] + (BOARDSIZE - y));
			tile.paint();
		}
	}

	printAxis();
}

function paintBoardOutline() {
	BOARDCANVASCTX.beginPath();
	BOARDCANVASCTX.lineWidth = 3;
	if (TURN == "red" || GAME_WINNER == "red") {
		BOARDCANVASCTX.strokeStyle = '#ff0000';
	} else {
		BOARDCANVASCTX.strokeStyle = '#0000ff';
	}
	BOARDCANVASCTX.fillStyle = '#ffffff';
	BOARDCANVASCTX.rect(0, 0, SCREENSIZE, SCREENSIZE);
	BOARDCANVASCTX.fill();
	BOARDCANVASCTX.stroke();
}

function initControlPanel() {

	$("#CONTROLPANEL").width($(window).width() - SCREENSIZE - RIGHTMARGIN);
	$("#CONTROLPANEL").height(SCREENSIZE - OFFSET);

}

function initBoardPieces() {
	for ( var x = 0; x < BOARDSIZE; x++) {
		position = ALPHA[x] + "2";
		initBoardPieceByTile(position, "pawn", "red");
	}

	initBoardPieceByTile("a1", "rook", "red");
	initBoardPieceByTile("b1", "knight", "red");
	initBoardPieceByTile("c1", "bishop", "red");
	initBoardPieceByTile("d1", "queen", "red");
	initBoardPieceByTile("e1", "king", "red");
	initBoardPieceByTile("f1", "bishop", "red");
	initBoardPieceByTile("g1", "knight", "red");
	initBoardPieceByTile("h1", "rook", "red");

	// blue
	for ( var x = 0; x < BOARDSIZE; x++) {
		position = ALPHA[x] + "7";
		initBoardPieceByTile(position, "pawn", "blue");
	}

	initBoardPieceByTile("a8", "rook", "blue");
	initBoardPieceByTile("b8", "knight", "blue");
	initBoardPieceByTile("c8", "bishop", "blue");
	initBoardPieceByTile("d8", "queen", "blue");
	initBoardPieceByTile("e8", "king", "blue");
	initBoardPieceByTile("f8", "bishop", "blue");
	initBoardPieceByTile("g8", "knight", "blue");
	initBoardPieceByTile("h8", "rook", "blue");

	// TEST pieces
	//initBoardPieceByTile("e4", "king", "red");
	//initBoardPieceByTile("e7", "queen", "red");
}

function initBoardPieceByTile(position, rank, color) {
	var tile = TILES.get(position);
	var boardPiece = new BoardPiece();
	boardPiece.rank = rank;
	boardPiece.color = color;
	var boardPieceImpl = createBoardPieceImpl(rank);
	jQuery.extend(boardPiece, boardPieceImpl)
	//boardPiece.initByRank(rank);
	tile.boardPiece = boardPiece;
}

function createBoardPieceImpl(rank) {
	var retval = null;
	if (rank == "pawn") {
		retval = new Pawn();
	} else if (rank == "rook") {
		retval = new Rook();
	} else if (rank == "knight") {
		retval = new Knight();
	} else if (rank == "bishop") {
		retval = new Bishop();
	} else if (rank == "queen") {
		retval = new Queen();
	} else if (rank == "king") {
		retval = new King();
	} else {
		console.debug("unable to createBoardPieceImpl " + this.rank);
	}
	return retval;
}

function initResources() {
	RESOURCE_TILES = [];
	initResource("d5", "fire");
	initResource("e5", "earth");
	initResource("d4", "wind");
	initResource("e4", "water");

	initResource("a4", "fire");
	initResource("h4", "earth");
	initResource("a5", "wind");
	initResource("h5", "water");
}

function initResource(boardPosition, resource) {
	var tile = TILES.get(boardPosition);
	tile.resource = resource;
	RESOURCE_TILES.push(tile);
}

function printAxis() {
	BOARDCANVASCTX.beginPath();
	BOARDCANVASCTX.fillStyle = "#000000";
	// x-axis
	for ( var i = 0; i < BOARDSIZE; i++) {
		BOARDCANVASCTX.fillText(ALPHA[i], SQUARESIZE / 2 + (i * SQUARESIZE)
				+ AXISSIZE, BOARDSIZE * SQUARESIZE + OFFSET + AXISSIZE);
	}
	// y-axis
	var num = BOARDSIZE;
	for ( var i = 0; i < BOARDSIZE; i++) {
		BOARDCANVASCTX.fillText(num--, BOARDSIZE - AXISSIZE / 2, SQUARESIZE / 2
				+ (i * SQUARESIZE) + OFFSET);
	}
	BOARDCANVASCTX.stroke();
}
