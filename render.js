var canvas

function render() {

	var dataset = JSON.parse(document.getElementById("JSONInput").value)
	console.log(dataset)

	//calculate width and height based on input polygons	
	var maxX = 0
	var maxY = 0

	for(i = 0; i<dataset.length; ++i) {
		for(j = 0; j<dataset[i].coords.length; ++j) {
			curX = dataset[i].coords[j][0]
			curY = dataset[i].coords[j][1]
			if(curX > maxX) {
				maxX = curX
			}
			if(curY > maxY) {
				maxY = curY
			}
		}	
	}
	
	canvas = d3.select("body").append("svg")
		.attr("width", maxX+20)
		.attr("height", maxY+20);

	canvas.selectAll("polygon")
		.data(dataset)
		.enter()
		.append("polygon")
		.attr("points",function(d) { 
			return d.coords.join(" ")
		})
		.attr("stroke","black")
		.attr("stroke-width",2)
		.attr("fill", "white")
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut);
}

function handleMouseOut(d, i) {
	window.speechSynthesis.cancel();
}

function handleMouseOver(d, i) {

	var msg = new SpeechSynthesisUtterance(d.text);
	window.speechSynthesis.speak(msg);
	/*
	d3.select(this).attr({
		fill: "orange"
	});
   */

	canvas.append("text").attr({
		id: "t" + d.x + "-" + d.y + "-" + i,
		x: function() { return d.coords[0][0]; },
		y: function() { return d.coords[0][1]; }
		})
		.text(function() {
		return d.text;  // Value of the text
		});

}


