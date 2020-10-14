class Layer {
	constructor() {
		this.selectedId = -1;
		this.objects = [];
	}

	addObject( obj ) {
		this.objects.push( obj );
	}

	sortObjects() {
		this.objects.sort( ( a, b ) => a.id < b.id );
	}

	draw() {
		for( let i = this.objects.length-1; i >= 0; i-- ) {
			this.objects[i].draw( true );
		}
		//this.objects.forEach( elm => { elm.draw( true ); })
	}

	numObjects() {
		return this.objects.length;
	}

	selected() {
		return this.selectedId;
	}

	select( id ) {
		this.selectedId = id;
	}

	selectShape() {
		let selected = false;
		// for ( let i = this.objects.length-1; i >= 0; i-- ) {
		for( let i = 0; i < this.objects.length; i ++ )  {
			this.objects[i].select( false );
			if( this.objects[i].containsCoords( mousePos.x, mousePos.y ) && !selected ) {
				if( this.objects[i].id == this.selectedId ) {
					this.objects[i].select( false );
					this.selectedId = -1;
					activateButtons( false );
				} else {
					this.objects[i].select( true );
					selected = true;
					this.selectedId = i;
					activateButtons( true );
				}
			}
		}

		return selected;
	}

	deselectAll() {
		this.objects.forEach( elm => elm.select(false) );
	}

	deleteObject( id ) {
		this.objects.splice( id, 1 )
	}

	sendToFront( id ) {
		if( id <= 0 ) {
			return;
		}
		let obj = this.objects.splice( id, 1 )[0];
		obj.id = 0;
		this.objects.forEach( elm => { if( elm.id < id ) { elm.id+=1 } } );
		this.objects.unshift( obj );
		console.log( this.objects )
		this.select( obj.id )
	}

	sendToBack( id ) {
		if( id >= this.objects.length ) {
			return;
		}
		let obj = this.objects.splice( id, 1 )[0];
		obj.id = this.objects.length;
		this.objects.forEach( elm => { if( elm.id > id ) { elm.id-=1 } } );
		this.objects.push( obj );
		this.select( obj.id )
	}

	sendForwrads( id ) {

	}

	sendBack( id ) {

	}

}