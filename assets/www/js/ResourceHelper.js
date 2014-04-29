function getResourcesHtml(color) {
	var retval = "";
	retval += "<TABLE><TR><TD>";
	retval += "Available resources: "
	retval += "</TD><TD>";
	retval += getResourceAmountHtml("fire", color) + ", ";
	retval += getResourceAmountHtml("earth", color) + "<BR/>";
	retval += getResourceAmountHtml("wind", color) + ", ";
	retval += getResourceAmountHtml("water", color);
	retval += "</TD></TR></TABLE>";
	return retval;
}

function getResourceAmountHtml(resource, color) {
	var retval = "";	
	var player = PLAYER_HASH.get(color);
	retval += player.resourceHash.get(resource);
	retval += getResourceImageHtml(resource);
	return retval;
}

function getResourceImageHtml(resource) {
	return "<IMG SRC='" + getImageLocation(resource) + "' HEIGHT='8px' WIDTH='8px'/>";
}
