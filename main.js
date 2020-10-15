let canvas, ctx;
let mouseIsDown = false;
let drawingShape = false;
let startPos, mousePos;
let currentShape;
let layer;


window.onload = function() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.addEventListener( "mousedown", mouseDown, false );
	canvas.addEventListener( "mouseup", mouseUp, false );
	canvas.addEventListener( "mousemove", mouseMove, false );

	document.getElementById( "front" ).addEventListener( "click", front );
	document.getElementById( "back" ).addEventListener( "click", back );
	document.getElementById( "forward" ).addEventListener( "click", forward );
	document.getElementById( "backward" ).addEventListener( "click", backward );
	document.getElementById( "delete" ).addEventListener( "click", deleteObj );

	layer = new Layer();

	window.setInterval( update, 100 );
}

function front() {
	layer.sendToFront(layer.selected());
}
function back() {
	layer.sendToBack(layer.selected());
}
function forward() {
	layer.sendForwards(layer.selected());
}
function backward() {
	layer.sendBackwards(layer.selected());
}
function deleteObj() {
	layer.delete(layer.selected());
}

function update() {
	draw();

	if( getRadioValue("tool") == "draw" ) {
		drawShape();
		layer.deselectAll();
		activateButtons( false );
		layer.selectedId = -1;
	} else if( getRadioValue("tool") == "select" && mouseIsDown) {
		layer.selectShape();
	}

}

function draw() {
	ctx.fillStyle = "#c5c5c5";
	ctx.fillRect( 0, 0, canvas.width, canvas.height );

	if( layer.numObjects() != 0 ) {
		layer.draw();
	}
}

function drawShape() {
	if( mouseIsDown && !drawingShape ) {
		drawingShape = true;
		startPos = mousePos;
		drawNewShape( getRadioValue("shape"), startPos, layer.numObjects() );
	} else if( !mouseIsDown && drawingShape ) {
		layer.addObject( currentShape )
		drawingShape = false;
	} else if( drawingShape ) {
		// console.log("DRAWING");
		currentShape.w = mousePos.x - startPos.x;
		currentShape.h = mousePos.y - startPos.y;
		currentShape.update();
		currentShape.draw();
	}
}


function selectShape() {

	let selected = layer.selectShape()

	if( selected == false ) {
		selectedId = -1;
		activateButtons( false );
	}

	console.log(selectedId)
}

function activateButtons( b ) {
	let buttons = document.getElementsByName( "option" );
	for( let i = 0; i < buttons.length; i++ ) {
		buttons[i].disabled = !b;
	}
}

function drawNewShape( type, pos, id ) {
	if( type == "rectangle" ) {
		// console.log("RECTANGLE");
		currentShape = new Rectangle( pos.x, pos.y, 1, 1, getRadioValue("color"), id );
	} else if( type = "circle" ) {
		// console.log("CIRCLE");
		currentShape = new Circle( pos.x, pos.y, 1, getRadioValue("color"), id );
	}
}

function getRadioValue( name ) {
	let radios = document.getElementsByName( name );
	let val;

	for( let i = 0; i < radios.length; i++ ) {
		if( radios[i].checked ) {
			val = radios[i].value;
		}
	}

	return val;
}
