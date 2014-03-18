var rectSize = 10;
var refreshIntervalId;
var counter = 0;
var frameRate = 1000/30;
var snakeParts = [];
var vl = rectSize;
var score = 0;
var gameRunning = true;
var isLengthTwo=false;
var highScore = 0;
//Head of snake
head = {
	x:rectSize,
	y:rectSize,
	px:0,
	py:0,
	vx:rectSize,
	vy:0,
	color:"red",
};
//Initialises variables to default value whenever user presses the start button
function defineVars(){
	isLengthTwo = false;
	rectSize = 10;
	refreshIntervalId;
	counter = 0;
	frameRate = 1000/30;
	snakeParts = [];
	vl = rectSize;
	score = 0;
	head.x = rectSize;
	head.y = rectSize;
	head.px = 0;
	head.py = 0;
	head.vx = rectSize;
	head.vy = 0;
	gameRunning = true;
}
//Food generated on random places on the canvas carrying different amount of points
//and is colored accordingly
function food(){
	this.x = rectSize;
	this.y = rectSize;
	this.colors = ["yellow","brown","blue","black"];
	this.px = 0;
	this.py = 0;
	this.type = 0;
	this.spawn = function(){
		this.px = Math.floor(Math.random() * 350);
		this.py = Math.floor(Math.random() * 350);
		this.type = Math.floor(Math.random()*5 + 1);
		console.log("TYPE OF FOOD = " + this.type);
	}
	this.draw= function(){
		context.fillStyle = "black";
		context.strokeRect(this.px,this.py,this.x,this.y);
		context.fillStyle = this.colors[this.type-1];
		context.fillRect(this.px,this.py,this.x,this.y);	
	}
}
//initialising food object and spawning it(but not yet displaying)
var foodObj = new food();
foodObj.spawn();
//otherBlocks + head makes up the snake
//otherBlocks is the part of snake other than the head
function otherBlocks(px,py){
	this.x = rectSize;
	this.y = rectSize;
	this.color = "green";
	this.px = px;
	this.py = py;
	this.draw = function(){
		context.fillStyle = "black";
		context.strokeRect(this.px,this.py,this.x,this.y);
		context.fillStyle = this.color;
		context.fillRect(this.px,this.py,this.x,this.y);	
	}
}
//initialises the canvas (and runs whenver user clicks the start button)
function init()
{
	defineVars();
	canvas = document.getElementById("canvas");
	canvas.width = 500;
	canvas.height = 500;
	context = canvas.getContext('2d');
	refreshIntervalId = setInterval(tick, 60);
}
//To draw the whole scene on the canvas
function draw(){
	context.clearRect(0,0,canvas.width,canvas.height);
	foodObj.draw();
	context.fillStyle = "black";
	context.strokeRect(head.px,head.py,head.x,head.y);
	context.fillStyle = head.color;
	context.fillRect(head.px,head.py,head.x,head.y);
	for(i=0;i<snakeParts.length;i++)
		snakeParts[i].draw();	

	context.font = "10px Arial";
	context.fillText("Score : " + score,0,495);
	context.font = "10px Arial";
	context.fillText("HS : " + highScore,450,495);
}
//If game ends(due to collisions or eating ones' self, highscore is displayed 
function gameEnd(message){
	clearInterval(refreshIntervalId);	//stop calling the game loop (consisting of draw/update/clear)
	context.clearRect(0,0,canvas.width,canvas.height);
	if(score>highScore)
		highScore = score;

	context.font = "55px Arial";
	context.strokeText("GAME OVER!",75,250);
	context.font = "30px Arial";
	context.strokeText("High Score = " + highScore,130,300);	
	score = 0;
	console.log(message);
}
//update the game loop (i.e. locations of snake, detecting collisions, detecting food eaten etc)
function update(){
	for(i=snakeParts.length-1; i>0;i--){
		snakeParts[i].px=snakeParts[i-1].px;
		snakeParts[i].py=snakeParts[i-1].py;
	}
	if(isLengthTwo){
		snakeParts[0].px = head.px;
		snakeParts[0].py = head.py;
	}
	head.px+=head.vx;
	head.py+=head.vy;
	//collisions (board and snake)
	if(head.px>=canvas.width+10 || head.px<=-1 || head.py>=canvas.height+10 || head.py<=-1){		
		gameEnd("GAME HAS ENDED AS WE COLLIDE LZULZYZ");
	}
	for(i=0; i<snakeParts.length;i++){
		if(head.px===snakeParts[i].px && head.py === snakeParts[i].py){
			gameEnd("YOU MADE A BOO BOO EEHEHHEHE LUZLZULZUZLUZ");
		}		
	}

	//food eating collision
	if(Math.abs(head.px - foodObj.px)<=rectSize && Math.abs(head.py - foodObj.py)<=rectSize ){
		console.log("OMG WE HAS A COLLISION");
		addBlock();
		score += (counter * foodObj.type);
		counter = 0;
		foodObj.spawn();
		
	}
	//spawn new food after some time
	if(counter > 300){
		counter=0;
		foodObj.spawn();
	}
	counter+=5;
}
//game loop
function tick(){
	draw();
	update();
}
//adds a block whenever food is eaten
function addBlock(){
	if(!isLengthTwo){
		x = new otherBlocks(head.px-rectSize,head.py);		
		isLengthTwo=true;
	}
	else{
		x = new otherBlocks(snakeParts[snakeParts.length - 1].px, snakeParts[snakeParts.length - 1].py);
	}
	snakeParts.push(x);
	console.log(snakeParts);
}