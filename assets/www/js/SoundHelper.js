function playAttackSound(tile) {
	playSound("sword");
}

function playMoveSound(tile) {
	playSound("march");
}

function playSkillSound(skillName) {
	playSound("skill");
}

function playSound(sound) {
	var snd = new Audio("aud/" + sound + ".wav");
	snd.play();
}

