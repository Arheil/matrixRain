let height = window.screen.availHeight, width = window.screen.availWidth;
	
let symbols = [];
	
let symbolSize = 15;
	
let timer = 0;
	
let streams = [];


class Symbol{
	constructor(x, y, speed){
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.switchInterval = round(random(5, 20));
		this.value;
		this.setRandomSymbol = function(){
			if(timer % this.switchInterval == 0){
				this.value = String.fromCharCode(
					0x10A0 + round(random(0, 96))
				);
			}
		}
	}
	
	rain(){
		this.y = (this.y >= height) ? 0: this.y += this.speed;
	}
}


class Stream{
	
	constructor(){
		this.stream = [];
		this.streamLength = round(random(2,25));
		this.speed = random(2, 6);
	}
	
	generateSymbols(x,y){
		for(let i = 0; i <= this.streamLength; i++){
			let symbol = new Symbol(x, y, this.speed);
			symbol.setRandomSymbol();
			this.stream.push(symbol);
			y -= symbolSize;
		}
	}
	
	render(){
		this.stream.forEach(symbol => {
			fill('#00b894');
			text(symbol.value, symbol.x, symbol.y)
			symbol.setRandomSymbol();
			symbol.rain();
		});
	}
}


function setup(){
	
	let height = window.screen.availHeight, width = window.screen.availWidth;
	let c = createCanvas(width, height);

	c.parent('wrapper')
	let x = 0;
	
	for(let i = 0; i <= width/symbolSize; i++){
		
		let y = random(-300, 0);
		let stream = new Stream();
	
		stream.generateSymbols(x, y);
		streams.push(stream);
		
		x += symbolSize;
	}
	
	textSize(symbolSize)
}

function draw(){
	background('#2d343680');
	
	streams.forEach(stream => {
		stream.render();
	})
	
	timer++;
}