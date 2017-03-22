var polys = [];
var annotations = []
var curPoly = [];
var pointArrays = [];
var firstPoint = true;
var threshold = 40;
var offset = 100

var aSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
aSvg.style.position = "absolute"
aSvg.style.top = offset + "px"
aSvg.style.left = "0px" 
aSvg.style.width = "100%"
aSvg.style.height = "90%"
aSvg.setAttribute('width', 1000);
aSvg.setAttribute('height', 1000);
aSvg.style.zIndex = "20"
document.body.appendChild(aSvg)

function getMouseXY(event) {
	var dot, eventDoc, doc, body, pageX, pageY;

	event = event || window.event; // IE-ism

	// If pageX/Y aren't available and clientX/Y
	// are, calculate pageX/Y - logic taken from jQuery
	// Calculate pageX/Y if missing and clientX/Y available
	if (event.pageX == null && event.clientX != null) {
		eventDoc = (event.target && event.target.ownerDocument) || document;
		doc = eventDoc.documentElement;
		body = eventDoc.body;

		event.pageX = event.clientX +
			(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
			(doc && doc.clientLeft || body && body.clientLeft || 0);
		event.pageY = event.clientY +
			(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
			(doc && doc.clientTop  || body && body.clientTop  || 0 );
	}

	return([event.pageX, event.pageY-offset]);
}

function Annotation() {
	this.coords = []
	this.text = ""
}

function drawLastLine(poly) {
	if(poly.length >= 2) {
		var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		aLine.setAttribute('x1', poly[poly.length-2][0]);
		aLine.setAttribute('y1', poly[poly.length-2][1]);
		aLine.setAttribute('x2', poly[poly.length-1][0]);
		aLine.setAttribute('y2', poly[poly.length-1][1]);
		aLine.setAttribute('stroke','black')
		aLine.setAttribute('stroke-width',3)
		aSvg.appendChild(aLine);
	}
}

function isCloseToStart(poly, pos) {
	var xDiff = Math.abs(poly[0][0] - pos[0])
	var yDiff = Math.abs(poly[0][1] - pos[1])
	if(Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2)) < threshold) {
		return true
	}
	return false
}

function handleAnnotated() {
	var textBox = document.getElementById("annotateText")
	textBox.style.display = "none"

	var annotation = new Annotation()
	annotation.coords = polys[polys.length - 1]
	annotation.text = textBox.value
	annotations.push(annotation)

	textBox.value = ""

	console.log(JSON.stringify(annotations))
}

function completePoly(pos) {

	curPoly.push(curPoly[0]) //push starting point at end of polygon
	polys.push(curPoly)
	drawLastLine(curPoly)

	var textBox = document.getElementById("annotateText")
	textBox.style.display = "block"
	textBox.style.position = "absolute"
	textBox.style.zIndex = "40"
	textBox.style.top = curPoly[0][1] + offset + 20 + "px"
	textBox.style.left = curPoly[0][0] + "px"
	window.setTimeout(function ()
		{textBox.focus();}, 0);
	textBox.select();

	curPoly = null
}

function handleMouseDown(event) {

	if(curPoly == null) {
		curPoly = []
	}

	var pos = getMouseXY(event)

	if(curPoly.length > 2 && isCloseToStart(curPoly, pos)) {
		completePoly(pos)
	}

	else {
		curPoly.push(pos);
		drawLastLine(curPoly)
	}
}

(function() {
	aSvg.onmousedown = handleMouseDown;
})();
