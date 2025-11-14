const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let pressed;
let x = 100;
let y = 300;
let vy = 0;
let vx = 0;
let gliding;
let floorY = canvas.height - 60
let glideTime = 0;

let startY = 600;


const maxGlideTime = 120;
let lift = 2;
const maxLift = 3;
let glideFallSpeed = 1.5;

const minSpeed =1;

const maxSpeed = 2;
let speed = 1;
const gravity = 2;
const jumpPower = 50;

const WORLD_WIDTH = 6000;
const WORLD_HEIGHT = 1000;

let player = {
	x:200,
	y:700,
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

let Block1 = new Block();


Block1.x = 2;

alert(Block1.x);

let cameraX = 0;

ctx.fillRect(
	player.x - cameraX,
	player.y,
	player.width,
	player.height
);

let canJump = true;

let color = "red";

const keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

document.addEventListener("keyup", e => {
	if (e.code === "ArrowRight" || e.code === "ArrowLeft"){
		holding = false;
		speedGain();
	}
});

document.addEventListener("keydown", e => {
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
	mover();
}



function speedGain(){
	if (holding && speed < maxSpeed){
		speed *= 1.05;
	}
	else if (!holding) speed = minSpeed;
}


function mover(){

	if (keys["ArrowRight"]) {
		player.vx += speed;
	}
	else if (keys["ArrowLeft"]) player.vx -= speed;
	else player.vx = 0;

	if (keys[" "] && player.y >= floorY){
		player.vy -= jumpPower;
	}

	gliding = (keys["ArrowDown"]) && player.y < floorY;

	
	player.vy += gravity;

	

	if (gliding){
		if (player.vx > 2 || player.vx < -2){
			t += 0.03;
        	player.y = startY + Math.sin(t * .7) * 200 - t * 18;
		}
	}
	else if(!gliding){
		t = 0;
	}
	
	player.x += player.vx;
	player.y += player.vy;

	player.vy *= .9;
	player.vx *= .9;

	if (player.y >= floorY){
		player.y = floorY;
		player.vy = 0;
	}
	player.x = Math.max(0, Math.min(player.x, WORLD_WIDTH - player.width));

	cameraX = player.x - canvas.width / 2;
    cameraX = Math.max(0, Math.min(cameraX, WORLD_WIDTH - canvas.width));
}


function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	

	ctx.fillStyle = "blue";

	ctx.fillRect(1000- cameraX,300,200,200);

	ctx.fillRect(1000- cameraX,300,200,200);
	ctx.fillRect(500- cameraX,200,200,100);
	ctx.fillRect(1500- cameraX,400,100,100);
	ctx.fillRect(2000- cameraX,600,100,100);
	ctx.fillRect(2500- cameraX,200,100,100);
	ctx.fillRect(3000- cameraX,100,100,100);
	ctx.fillRect(1500- cameraX,300,100,100);
	ctx.fillRect(1500- cameraX,400,100,100);

	ctx.fillRect(4000- cameraX,300,200,200);
	ctx.fillRect(4250- cameraX,200,200,100);
	ctx.fillRect(4500- cameraX,400,100,100);
	ctx.fillRect(5000- cameraX,600,100,100);
	ctx.fillRect(6000- cameraX,200,100,100);
	ctx.fillRect(5500- cameraX,100,100,100);
	ctx.fillRect(3500- cameraX,300,100,100);
	ctx.fillRect(3000- cameraX,400,100,100);

	ctx.fillStyle = color;
	ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);

	ctx.fillStyle = "green";
	ctx.fillRect(0 - cameraX, floorY + player.height, WORLD_WIDTH,40);

}


function gameLoop() {
	update();
	draw();
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);