function setActiveSelectedUnit() {
	$("#SELECTEDUNITHEADER").addClass("current");
	$("#SELECTEDUNIT").show();
	$("#GAMEINFOHEADER").removeClass("current");
	$("#GAMEINFO").hide();	
}

function setActiveSelectedUnitAccordion(accordionName) {
	var accordionIndex = null;
	$("#SELECTEDUNITACCORDION > h3").each(function (index, h3) {
		if (h3.id == (accordionName + "_HEADER")) {
			accordionIndex = index;
		}
	});
	$("#SELECTEDUNITACCORDION").accordion('option', 'active', accordionIndex);
}


function setActiveGameInfo() {
	$("#SELECTEDUNITHEADER").removeClass("current");
	$("#SELECTEDUNIT").hide();
	$("#GAMEINFOHEADER").addClass("current");
	$("#GAMEINFO").show();		
}

function setActiveGameInfoAccordion(accordionName) {
	var accordionIndex = null;
	$("#GAMEINFOACCORDION > h3").each(function (index, h3) {
		if (h3.id == (accordionName + "_HEADER")) {
			accordionIndex = index;
		}
	});
	$("#GAMEINFOACCORDION").accordion('option', 'active', accordionIndex);
}


function ControlPanel() {
	this.populate = function (tile) {
		var imageLocation = tile.getImageLocation();
		if (!(IMAGES.get(imageLocation) instanceof Image)) {
			imageLocation = "img/" + "rankSprites.png"; // used in css
		}
		setActiveSelectedUnit();
		//$("#GAMELOG").height(($("#CONTROLPANEL").height() - $("#tabs").height() - 5) + "px");
		var accordionHeight = $("#CONTROLPANEL").height() - $("#tabs").height() - 2;

	
		var str = "<div id='SELECTEDUNITACCORDION' style='height: " + accordionHeight + "px; margin-right: 2px; margin-left: -4px'>";
		str += "<h3 id='STATS_HEADER' class='myAccordionHeader'>Stats</h3>";
		str += "<div id='STATS'>";
				// "<TABLE WIDTH='100%'><TR><TD></TD><TD ALIGN='middle'>" +
		str += "<DIV ID='boardPieceImage' align='middle' CLASS='controlPanelBoardPiece' WIDTH='" + this.getSelectedUnitSize(); 
		str += "' HEIGHT='" + this.getSelectedUnitSize() + "'/>";
				// "</TD><TD></TD></TR></TABLE>" +
		str += "<DIV >";
		str += "<BR/>Rank: " + tile.boardPiece.rank.capitalize();
		str += "<BR/>Health: " + tile.boardPiece.health + "/" + tile.boardPiece.maxHealth;
		str += "<BR/>Damage: " + tile.boardPiece.damage + "+/- " + DMG_RAND_PERCENT + "%";
		if (tile.boardPiece.heal != null) {
			str += "<BR/>Heal: " + tile.boardPiece.heal + "+/- " + HEAL_RAND_PERCENT + "%";
		}
		str += "</DIV>";         			
		str += "</div>";
		str += "<h3 id='SKILLS_HEADER' class='myAccordionHeader'>Skills</h3>"; 
		str += "<div id='SKILLS'>";
				
		str += "</div>";
		str += "</div>";
		$("#SELECTEDUNIT").html(str);
		$("#boardPieceImage").css("background", "url('img/" + "rankSprites.png')");
		
		
		var offsetBGX = IMAGES.get(tile.getImageLocation()).frame.x;
		var offsetBGY = IMAGES.get(tile.getImageLocation()).frame.y;
		var offsetBGW = IMAGES.get(tile.getImageLocation()).frame.w;
		var offsetBGH = IMAGES.get(tile.getImageLocation()).frame.h;
		var bgPositionX = this.getSelectedUnitSize() / offsetBGW * offsetBGX;
		var bgPositionY = this.getSelectedUnitSize() / offsetBGH * offsetBGY;
		
		
		$("#boardPieceImage").css("background-position", "-" + bgPositionX + "px -" + bgPositionY + "px");
		$("#boardPieceImage").css("width", this.getSelectedUnitSize() + "px");
		$("#boardPieceImage").css("height", this.getSelectedUnitSize() + "px");
		$("#boardPieceImage").css("background-size", "600% 600%"); // 6 x 6 sprite atlas
		
		 $(document).ready(function() {
			    $("#SELECTEDUNITACCORDION").accordion(
			    		{ 
			    		  heightStyle: "fill"
			    			}		
			    );
			  });
		 $("#SELECTEDUNITACCORDION").accordion({
			 activate: function( event, ui ) {					 
				 if ($(ui.newPanel).attr("id") == "SKILLS") {		
					 printSkillsToControlPanel(tile.boardPiece.getSkillNames());
					
					 if (SELECTEDTILE.boardPiece.color == TURN) {						 
						 selectFirstUsableRadioSkill();
					 } else {
						 $("#SKILLS").find(':input:not(:disabled)').prop('disabled',true);
					 }
				 } else if ($(ui.newPanel).attr("id") == "STATS") {
					 SELECTEDTILE.showMoves();					 
				 }
			 }
			 });	
		
		
		
		
	}

	this.populateEmptyTile = function() {
		setActiveSelectedUnit();
		if (SELECTEDTILE.resource != null) {
			var imageLocation = 'img/' + SELECTEDTILE.resource + ".png";
			$("#SELECTEDUNIT").html("<IMG align='middle' CLASS='controlPanelBoardPiece' SRC='" + imageLocation + 
					"' WIDTH='" + this.getSelectedUnitSize() + 
					"' HEIGHT='" + this.getSelectedUnitSize() + "'/>" +
					"<BR/>Resource: " + SELECTEDTILE.resource + "<BR/>"
			);
		} else {
			var backgroundColor = null;
			if (SELECTEDTILE.isGray()) {
				backgroundColor = BOARDCANVASGRAY;
			} else {
				backgroundColor = BOARDCANVASWHITE;
			}
			$("#SELECTEDUNIT").html("<DIV style='margin-top: 5px; border:1px solid black; background-color: " + 
					backgroundColor + "; width: " + this.getSelectedUnitSize() + 
					"px; height: " + this.getSelectedUnitSize() +
					"px'/>"
			);

		}
		$("#SELECTEDUNIT").append("Position: " + SELECTEDTILE.getBoardPosition());
	}

	this.getSelectedUnitSize = function() {
		return $("#CONTROLPANEL").height()/3;
	}

	this.clearSelectedUnit = function() {
		$("#SELECTEDUNIT").html("");
	}
	
	this.clearLog = function() {
		$("#GAMELOG").html("");
	}
	
	this.log = function(str) {
		setActiveGameInfo()
		setActiveGameInfoAccordion("GAMELOG");
		$("#GAMELOG").append("<DIV class='" + TURN + "Message'>" +
		"<DIV class='turnCount'>" + TURNCOUNT + ": </DIV>" + 
		str +
		"</DIV>" +
		"</DIV>");
		$("#GAMELOG").scrollTop($("#GAMELOG")[0].scrollHeight);
	}
	
	this.logRaw = function(str) {
		setActiveGameInfo();
		setActiveGameInfoAccordion("GAMELOG");
		$("#GAMELOG").append(str);		
		$("#GAMELOG").scrollTop($("#GAMELOG")[0].scrollHeight);
	}
	
	this.logResourceGathering = function () {	
		var colors = ["red", "blue"];
		for (var i = 0; i < colors.length; i++) {
			var str = "";
			var color = colors[i]
			var player = PLAYER_HASH.get(color);
			str += color + " gains: ";
			str += player.resourceGainedOnLastTurnHash.get("fire") + getResourceImageHtml("fire") + ", ";
			str += player.resourceGainedOnLastTurnHash.get("earth") + getResourceImageHtml("earth") + ", ";
			str += player.resourceGainedOnLastTurnHash.get("wind") + getResourceImageHtml("wind") + ", ";
			str += player.resourceGainedOnLastTurnHash.get("water") + getResourceImageHtml("water");
			this.log(str);
		}
		
	}

	this.logMove = function() {
		var str = TURN + " moves " + SELECTEDTILE.boardPiece.rank + 
				" from " + PREV_SELECTEDTILE.getBoardPosition() + " to " + SELECTEDTILE.getBoardPosition();
		this.log(str);
	}

	this.logAttack = function(tileAttacker, tileAttackee) {
		var str = "<DIV class='attack'>" + tileAttacker.boardPiece.rank + 
				" at " + tileAttacker.getBoardPosition() +
				" attacks " + tileAttackee.boardPiece.rank + 
				" at " + tileAttackee.getBoardPosition() +
				".  DMG: " + DMG_AMOUNT +
				"</DIV>";
		this.log(str);
	}
	
	this.logHeal = function(healer, healee) {	
		var str = "<DIV class='heal'>" + healer.boardPiece.rank + 
				" at " + healer.getBoardPosition() +
				" heals " + healee.boardPiece.rank + 
				" at " + healee.getBoardPosition() +
				".  Heal Amount: " + HEAL_AMOUNT +
				"</DIV>";
		this.log(str);
	}

	this.logDeath = function(tile) {
		var str = tile.boardPiece.rank + " has been killed.";
		this.log(str);
	}
	
	this.logSacrifice = function(tile) {
		var str = tile.boardPiece.rank + "'s body dissapears after his sacrifice.";
		this.log(str);
	}
	
	this.logWinner = function(tile) {
		var str = "<DIV class='winner'>The game has ended.<BR/>";
		if (GAME_WINNER == "draw") {
			str += "Draw";
		} else {
			str += GAME_WINNER + " is victorious.";
		}
		str += "</DIV>"
		this.logRaw(str);
	}
}