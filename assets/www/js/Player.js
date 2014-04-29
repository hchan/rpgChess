function Player() {
	this.resourceHash = new Hashtable();
	

	this.resourceGainedOnLastTurnHash = new Hashtable();
	
	this.addResource = function(resource) {
		var curResourceAmt = this.resourceHash.get(resource);
		this.resourceHash.put(resource, curResourceAmt+1);
		
		curResourceAmt = this.resourceGainedOnLastTurnHash.get(resource);
		this.resourceGainedOnLastTurnHash.put(resource, curResourceAmt+1);
	}

	this.initResourceHash = function() {
		this.resourceHash.put("fire", 0);
		this.resourceHash.put("earth", 0);
		this.resourceHash.put("wind", 0);
		this.resourceHash.put("water", 0);
	}
	
	this.initResourceGainedOnLastTurnHash = function() {
		this.resourceGainedOnLastTurnHash.put("fire", 0);
		this.resourceGainedOnLastTurnHash.put("earth", 0);
		this.resourceGainedOnLastTurnHash.put("wind", 0);
		this.resourceGainedOnLastTurnHash.put("water", 0);
	}
	
	this.hasEnoughResourceToPerformSkill = function(skillName) {
		var retval = false;
		var skill = createSkillFromSkillName(skillName);
		var resourceCost = skill.resourceHash;
		
		if (this.resourceHash.get("fire") >= resourceCost.get("fire")
				&& this.resourceHash.get("earth") >= resourceCost.get("earth")
				&& this.resourceHash.get("wind") >= resourceCost.get("wind")
				&& this.resourceHash.get("water") >= resourceCost.get("water")) {
			retval = true;
		}		
		return retval;
	}
	
	
	this.deductResourceToPerformSkill = function(skillName) {
		var retval = false;
		var skill = createSkillFromSkillName(skillName);
		var resourceCost = skill.resourceHash;
		this.resourceHash.put("fire", this.resourceHash.get("fire") - resourceCost.get("fire"));
		this.resourceHash.put("earth", this.resourceHash.get("earth") - resourceCost.get("earth"));
		this.resourceHash.put("wind", this.resourceHash.get("wind") - resourceCost.get("wind"));
		this.resourceHash.put("water", this.resourceHash.get("water") - resourceCost.get("water"));
		return retval;
	}

	this.initResourceHash();
	this.initResourceGainedOnLastTurnHash();
	
	
	
}
