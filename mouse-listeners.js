function mouseDown( e ) {
	// console.log("DOWN");
	// console.log(getMousePosition( e ));
	mousePos = getMousePosition( e );
	mouseIsDown = true;
}

function mouseUp( e ) {
	// console.log("UP");
	// console.log(getMousePosition( e ));
	mousePos = getMousePosition( e );
	mouseIsDown = false;
}

function mouseMove( e ) {
	// console.log("MOVE");
	// console.log(getMousePosition( e ));
	mousePos = getMousePosition( e );
}

function getMousePosition( e ) {
	let boundry = canvas.getBoundingClientRect();
	return {
		x: e.clientX - boundry.left,
		y: e.clientY - boundry.top
	};
}