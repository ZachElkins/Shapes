class Object {
	constructor( x1, y1, type, color, id ) {
		this.pos = { x: x1, y: y1 }
		this.type = type;
		this.origColor = color;
		this.currColor = color;
		this.selected = false;
		this.id = id;
		this.strokeColor = "#a5a5a5";
		this.selectedColor = "rgba(150, 250, 150, 0.8)";
	}

	move( dx, dy ) {
		console.log( this.type, this.pos )
	}

	select( s ) {
		if( s ) {
			this.selected = true;
			this.currColor = this.selectedColor;
		} else {
			this.selected = false;
			this.currColor = this.origColor;
		}
	}

	update() {
		return;
	}

	showId() {
		ctx.textAlign = "center";
		ctx.fillStyle = "#FFFFFF";
		ctx.font = 'bold 20px sans-serif';
		ctx.fillText(this.id, this.pos.x+this.w/2, this.pos.y+this.h/2);
	}
}

class Rectangle extends Object {
	constructor( x1, y1, w, h, color, id ) {
		super( x1, y1,  "Rectangle", color, id );
		this.w = w;
		this.h = h;
	}


	draw( showId = false ) {
		ctx.fillStyle = this.currColor;
		ctx.strokeStyle = this.strokeColor;
		ctx.fillRect( this.pos.x, this.pos.y, this.w, this.h );
		ctx.beginPath();
		ctx.rect( this.pos.x, this.pos.y, this.w, this.h );
		ctx.stroke();
		if( showId ) {
			super.showId();
		}
	}

	update() {
		if( this.w < 0 ) {
			this.pos.x += this.w;
			this.w *= -1;
		}
		if( this.h < 0 ) {
			this.pos.y += this.h;
			this.h *= -1;
		}
		// console.log( "pos" + "("+this.pos.x+","+this.pos.y+")" );
		// console.log( "dim" + "("+this.w+","+this.h+")" );
	}

	containsCoords( x, y ) {
		if( this.pos.x <= x && x <= (this.pos.x+this.w) &&
			this.pos.y <= y && y <= (this.pos.y+this.h) ) {
			return true;
		}
		return false;
	}
}

class Circle extends Object {
	constructor( x1, y1, r, color, id ) {
		super( x1, y1, "Cirlce", color, id );
		this.w = 1;
		this.h = 1;
		this.r = r;
		this.center = (x1, y1);
	}

	update() {
		this.w = this.w > this.h ? this.w : this.h;
		this.h = this.w > this.h ? this.w : this.h;

		this.center = { 
			x: this.pos.x + (this.h/2),
			y: this.pos.y + (this.w/2)
		};

		this.r = this.w/2;
	}

	draw( showId ) {
		ctx.beginPath();
		ctx.fillStyle = this.currColor;
		ctx.strokeStyle = this.strokeColor;
		ctx.arc( this.center.x, this.center.y, this.r, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		if( showId ) {
			super.showId();
		}
	}

	containsCoords( x, y ) {
		let dist = Math.sqrt( 
			Math.pow( (x - this.center.x), 2 ) +
			Math.pow( (y - this.center.y), 2 ) );
		if( dist <= this.r ) {
			return true;
		}
		return false;
	}
}