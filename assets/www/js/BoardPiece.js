
function BoardPiece() {
	this.image = null;
	this.rank = null;
	this.color = null;
	this.unitMode = 'move'; // "move", "skill"
	
	this.doHeal = function(healAmount) {
		this.health += healAmount;
		if (this.health > this.maxHealth) {
			this.health = this.maxHealth;
		}
		this.health = Math.floor(this.health);
	}
	
	this.doDamage = function(dmgAmount) {
		this.health -= dmgAmount;
		this.health = Math.floor(this.health);
	}
}