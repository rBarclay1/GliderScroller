// TO DO
// - switch directions with glide dosent bug
// - trail behind player maybe make it a circle
// - more movement tech
// - organize code get rid of stuff not doing anything
// - make more classes 
// - make it a visible window on screen
// - trial level


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let pressed;
let gliding;
let floorY = canvas.height - 60;
let glideTime = 0;

let startY = 100;
let deaths = 0;


const maxGlideTime = 120;
let lift = 2;
const maxLift = 3;
let glideFallSpeed = 1.5;

const minSpeed =.8;

const maxSpeed = 1;
let speed = .8;
const gravity = 1;
const jumpPower = 50;

const WORLD_WIDTH = 6000;
const WORLD_HEIGHT = 1000;

let grid = {};
const cellSize = 1000;

let collide = false;

let collided = false;

const spawnX = 200;
const spawnY = 200;

let paused = false;

let player = {
	x:200,
	y:200,
	width: 50,
	height: 50,
	vx:0,
	vy:0
};

function Block(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}
//                        x   y   w   h
const Block1 = new Block(0,600,600,200);

const Block2 = new Block(1800, 900, 300, 100);
//const Block3 = new Block(1500, 800, 1000, 500)
const Block4 = new Block(1200, 100, 100, 600);
const Block5 = new Block(2400, 700, 300, 100);
const Block6 = new Block(1800, 500, 300, 100);
const Block7 = new Block(3400, 300, 300, 100);
const Block8 = new Block(0, WORLD_HEIGHT - 10, WORLD_WIDTH, 100 );



let blocks = [];

blocks.push(Block1);
blocks.push(Block2);
//blocks.push(Block3);
blocks.push(Block4);
blocks.push(Block5);
blocks.push(Block6);
blocks.push(Block7);
blocks.push(Block8);




document.getElementById("startBtn").addEventListener("click", () => {
    restart();
});


function nearbyCollision(nearby){
	if (nearby){
		for (let i = 0; i < nearby.length; i++){
			//console.log(nearby[i]);
		}
	}
	
}


function addBlocks(){
	for (const block of blocks){

		//console.log(block);
		addBlock2Grid(block);
	}
}


function addBlock2Grid(block){
	const cellX = Math.floor(block.x / cellSize);
	const cellY = Math.floor(block.y / cellSize) ;
	const key = cellX + ',' + cellY;

	if (!grid[key]){
		grid[key] = []
	}

	grid[key].push(block);
}

function restart(){
	paused = false;
	document.getElementById("startBtn").style.display = "none";
	player.x = spawnX;
	player.y = spawnY;
	deaths++;
	document.getElementById("deaths").textContent = "Deaths - " + deaths; 
}

function checkNeigh(player){
	const cellX = Math.floor(player.x / cellSize);
	const cellY = Math.floor(player.y / cellSize);

	let nearby = [];

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const key = (cellX + dx) + "," + (cellY + dy);

            if (grid[key]) {
                nearby.push(...grid[key]);
				//console.log(grid[key]);
            }
        }
    }
	for (let i = 0; i < nearby.length; i++){
			//console.log(nearby[i]);
		}
	//console.log(nearby[0]);
	nearbyCollision(nearby);
    return nearby;
}


let cameraX = 0;

ctx.fillRect(
	player.x - cameraX,
	player.y,
	player.width,
	player.height
);
let jreleased = true;

let canJump = true;

let color = "red";

const keys = {};

document.addEventListener("keyup", e => {
	keys[e.key] = false
	jreleased = true;
	
	if (e.code === "ArrowRight" || e.code === "ArrowLeft"){
		holding = false;
		//speed = minSpeed;
		speedGain();
	}
});

document.addEventListener("keydown", e => {
	keys[e.key] = true
	if (e.code === "KeyR"){
		restart();
	}
	if (e.code === "ArrowDown" && !gliding) {
        gliding = true;
        t = 0;     
        startY = player.y;  
		//alert(player.y);
    }

	if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        holding = true;
		speedGain();
    }
});

function update() {

	if (paused) return;
	bottomPlayer = player.y + player.height;
	topPlayer = player.y;
	rightPlayer = player.x + player.width;
	leftPlayer = player.x;

	let nearby = checkNeigh(player);
	mover(nearby);

	player.x += player.vx;
	player.y += player.vy;

	player.vy *= .9;
	player.vx *= .9;

	if (player.y >= floorY && !collide){
		player.y = floorY;
		canJump = true;
		player.vy = 0;
		paused = true;
	}

	player.x = Math.max(0, Math.min(player.x, WORLD_WIDTH - player.width));

	cameraX = player.x - canvas.width / 2;
    cameraX = Math.max(0, Math.min(cameraX, WORLD_WIDTH - canvas.width));
	
}

function speedGain(){
	if (holding && speed < maxSpeed){
		speed *= 1.05;
	}
	else if (!holding) speed = minSpeed;
}

function gravityFunc(nearby){
	if (collideTop(nearby)){
		player.vy += gravity;
	}
		
}

function offMap(){
	if (player.y > floorY){
		player.y = spawnY;
		player.x = spawnX;
	}
}

function collideTop(nearby){
	if (nearby){
		for (let i = 0; i < nearby.length; i++){
			if (!wontCollideTop(nearby[i])) {
				return false;
			}
		}
		return true;
	}
}

function wontCollideTop(block){
	if ((player.y + player.height) + 5 > block.y && 
		(player.x + player.width) > block.x && 
		player.x < (block.x + block.w) &&
		player.y < (block.y + block.h) - 10) {
		canJump = true;
		player.vy = 0;
		player.y = block.y - player.height;
		return false;
	}
	else return true;
}

function collideRight(nearby){
	if (nearby){
		for (let i = 0; i < nearby.length; i++){
			if (!wontCollideRight(nearby[i])) {
				return false;
			}
		}
		return true;
	}

}

function collideLeft(nearby){
	if (nearby){
		for (let i = 0; i < nearby.length; i++){
			if (!wontCollideLeft(nearby[i])) {
				//console.log('even here');
				return false;
			}
		}
		return true;
	}
}

function wontCollideRight(block){
	//console.log(block.x);
	if ((player.x + player.width) + 1 > block.x && 
		(player.y + player.height) > block.y + 10 && 
		player.x < (block.x + block.w - 10) &&
		player.y < (block.y + block.h) - 20) {

		player.vx = 0;
		player.x = block.x - player.width;
		//console.log('false');
		return false;
	}
	else {
		//console.log('true;');
		return true;
	}
}

function wontCollideLeft(block){
	if (player.x - 1 < (block.x + block.w) && 
		(player.y + player.height) > block.y + 10 && 
		(player.x + player.width) > block.x + 10 &&
		player.y < (block.y + block.h)  - 20){
		//console.log('thing');
		player.vx = 0;
		player.x = block.x + block.w;
		return false;
	}
	else return true;
}

function collideBottom(nearby){
	if (nearby){
		for (let i = 0; i < nearby.length; i++){
			if (!wontCollideBottom(nearby[i])) return false;
		}
	}
	return true;
}

function wontCollideBottom(block){
	if (player.y - 1< (block.y + block.h) && 
		(player.x + player.width) > block.x && 
		player.x < (block.x + block.w) &&
		(player.y + player.height) > block.y + 20){
		//console.log('ok');
		player.vy = 0;
		player.y = block.y + block.h;
		return false;
	}
	else return true;
}

function jumper(nearby){
	//console.log(neary);
	for (let ner of nearby){
		//console.log((player.y + player.height) > (ner.y - 5));
		if (keys[" "] && (player.y + player.height) > (ner.y - 5) && canJump && jreleased) {
			player.vy -= jumpPower;
			canJump = false;
			jreleased = false;
			//console.log('what');
		}
	}
	
}
let thing;

function colliding(nearby){
	if (!collideRight(nearby) || !collideLeft(nearby)){
		collided = true;
	}
}


function mover(nearby){

	colliding(nearby);
	
	//console.log(nearby);
	//console.log(collideRight(nearby));
	if (keys["ArrowRight"] && collideRight(nearby)) {
		//console.log('madeit');
		player.vx += speed;
		//console.log('ok');
	}
	else if (keys["ArrowLeft"] && collideLeft(nearby)) {
		player.vx -= speed;
		//console.log('other');
	}
	else {
		if (player.vx > .1 || player.vx < -.1) player.vx *= .99;
		else (player.vx = 0);
	}

	gliding = (keys["ArrowDown"]) && (keys["ArrowLeft"] || keys["ArrowRight"]) && player.y < floorY && (player.vx > 2 || player.vx < -2);
	
	//console.log(colliding(nearby));
	console.log(gliding);
	console.log(player.vx);
	if (gliding && !collided){
		if (player.vx > 2 || player.vx < -2){
			//console.log(t);
			t += 0.03;
        	player.y = startY + Math.sin(t * .7) * 200 - t * (-20);
			//console.log(t);
		} else t = 1;
	}

	else if(!gliding && player.vy == 0) {
		t = 0;
		collided = false;
	}
	

	
	collideBottom(nearby);

	gravityFunc(nearby);

	jumper(nearby);
	
	
	
	
}

function drawBlocks(blocks){
	for (let block of blocks){

		if (block  == Block7){
			ctx.fillStyle = "green";
		}
		else if (block == Block8){
			ctx.fillStyle = "red";
		}
		else ctx.fillStyle = "black";

		ctx.fillRect(block.x - cameraX, block.y, block.w, block.h);
	}
}


function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);

	if (paused) document.getElementById("startBtn").style.display = "inline";;
	

	ctx.fillStyle = "black";

	drawBlocks(blocks)


	ctx.fillStyle = color;
	ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);

}


function gameLoop() {
	update();
	draw();
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
addBlocks();