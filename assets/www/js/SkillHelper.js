function clearAllRadioSkill() {
	jQuery("input[name='skillName']").each(function(index, value) {
		// if (index == 0) {
		// jQuery(this).attr('checked', true);
		// console.debug(value);
		// } else {
		jQuery(this).attr('checked', false);
		// }
	});
	$("#PERFORM_SKILL").attr("disabled", true);
}

function selectFirstUsableRadioSkill() {
	$("#PERFORM_SKILL").attr("disabled", true);
	var foundUsableSkill = false;
	jQuery("input[name='skillName']").each(function(index, value) {		
		var skillName = $(value).val();
		if (getCurrentPlayer().hasEnoughResourceToPerformSkill(skillName)) {
			if (!foundUsableSkill) {
				foundUsableSkill = true;
				jQuery(this).attr('checked', true);
				jQuery(this).click();
			}
		} else {
			jQuery(this).attr('checked', false);
			jQuery(this).attr('disabled', true);		
			jQuery(this).parent().attr("bgcolor", "#EEEEEE");
			jQuery(this).parent().attr("title", "You do not have enough resources to perform this skill");
			jQuery(this).parent().find(".skillNameClass").addClass("disabled");
		}
	});
}


function printSkillsToControlPanel(skillNames) {
	$("#SKILLS").html("<DIV align='center'>");
	var str = "";
	var availableResourcesHtml = getResourcesHtml(SELECTEDTILE.boardPiece.color);
	
	str += availableResourcesHtml;
	str += "<TABLE border='1' width='100%'><TR><TH>Name</TH><TH>Cost</TH></TR>";
	for (var i = 0; i < skillNames.length; i++) {
		str += "<TR><TD valign='middle'>";
	
		var skillName = skillNames[i];
		str += "<input type='radio' name='skillName' value='" + skillName;
		str += "' onclick='" + "selectSkill(\"" + skillName + "\")'/>";
		str += "<SPAN class='skillNameClass'>";
		str += getSkillFullname(skillName);
		str += "</SPAN>";
		str += "<A HREF='#' onclick='showHelpSkill(this)'>";
		str += "<IMG SRC='" + getImageLocation("info") + "' HEIGHT='18' WIDTH='18'/>"; 
		str += "</A>";
		str += "</TD>";
		str += "<TD>";
		str += getResourceCost(skillName);
		str += "</TD>";
		str += "</TR>";
	}
	str += "</TABLE>";
	str += "<div style='text-align:center'>";		
	str += "<INPUT TYPE='button' ID='PERFORM_SKILL' VALUE='Perform selected skill'/>";
	str += "</div>";
	
	$("#SKILLS").append(str);
	$("#SKILLS").append("</DIV>");	
}
	
function addToPossibleTiles(boardPosition, possibleTiles) {
	var possibleTile = TILES.get(boardPosition);
	if (possibleTile != null) {
		possibleTiles.push(possibleTile);
	}
}

function showHelpSkill(anchor) {

	var skillName = $(anchor).siblings().filter("input").attr("value");
	$("#" + skillName + "Help").dialog({
		dialogClass : "no-close",
		buttons : [ {
			text : "OK",
			click : function() {
				$(this).dialog("close");
			}
		} ]
	});
	$(".ui-dialog-titlebar").hide()
}


function getResourceCost(skillName) {
	var retval = "";
	var skill = createSkillFromSkillName(skillName);
	var resourceCost = skill.resourceHash;
	if (resourceCost != null) {
		retval += resourceCost.get("fire") + getResourceImageHtml("fire") + ", ";
		retval += resourceCost.get("earth") + getResourceImageHtml("earth") + "<BR/>";
		retval += resourceCost.get("wind") + getResourceImageHtml("wind") + ", ";
		retval += resourceCost.get("water") + getResourceImageHtml("water") + "<BR/>";
	} else {
		console.debug(skillName + " has no associated cost");
	}	
	return retval;
}

function createSkillFromSkillName(skillName) {
	return createNewClass(skillName.capitalize());
}


function getEnemyTiles() {
	var tileKeys = TILES.keys();
	var retval = [];
	for ( var i = 0; i < tileKeys.length; i++) {
		var tileKey = tileKeys[i];
		var tile = TILES.get(tileKey);
		if (tile.isEnemy()) {
			retval.push(tile);
		}
	}	
	return retval;
}

function getFriendTiles() {
	var tileKeys = TILES.keys();
	var retval = [];
	for ( var i = 0; i < tileKeys.length; i++) {
		var tileKey = tileKeys[i];
		var tile = TILES.get(tileKey);
		if (tile.isFriend()) {
			retval.push(tile);
		}
	}	
	return retval;
}

function getEmptyTiles() {
	var tileKeys = TILES.keys();
	var retval = [];
	for ( var i = 0; i < tileKeys.length; i++) {
		var tileKey = tileKeys[i];
		var tile = TILES.get(tileKey);
		if (tile.isEmpty()) {
			retval.push(tile);
		}
	}	
	return retval;
}

function getSkillFullname(skillName) {
	return $("#" + skillName + "Help div").text() + " ";
}

function highlightSelectedUnitForSkills() {
	if (SELECTEDTILE.isFriend()) {
		BOARDCANVASCTX.beginPath();
		BOARDCANVASCTX.rect(SELECTEDTILE.getXBegin(), SELECTEDTILE.getYBegin(), SQUARESIZE,
				SQUARESIZE);
		BOARDCANVASCTX.lineWidth = 3;
		BOARDCANVASCTX.strokeStyle = SKILL_STYLE;
		BOARDCANVASCTX.stroke();
	}
}

function selectSkill(skillName) {
	var skill = createSkillFromSkillName(skillName);	
	skill.select();
}

function performSkill(skillName) {
	var skill = createSkillFromSkillName(skillName);
	skill.perform();
	playSkillSound(skillName);	
}

function getSkillMultiplier(skillName) {
	var skill = createSkillFromSkillName(skillName);	
	return skill.multiplier;
}
