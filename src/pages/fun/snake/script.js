var canvas, ctx;
var sliSpeed, sliColorRate;
var speed = 10;
var posX = 50;
var posY = 50;
var dirX = (dirY = speed / 2);
var deg = 0;
var colorRate = 1;
var r = (g = b = 0);

window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	document.addEventListener("mousemove", mouseMoveEvent);
	document.addEventListener("keydown", keyPressEvent);
	window.addEventListener("resize", resizeEvent);
	resizeEvent();

	sliSpeed = document.getElementById("speed");
	sliColorRate = document.getElementById("colorRate");

	sliSpeed.value = 25;
	sliColorRate.value = 10;

	sliSpeed.oninput = function() {
		speed = (this.value * 2);
	}
	sliColorRate.oninput = function() {
		colorRate = (this.value / 5);
	}

	posx = Math.floor(Math.random() * canvas.width);
	posY = Math.floor(Math.random() * canvas.height);
	dirX = Math.floor(Math.random() * speed);
	dirY = Math.floor(Math.random() * speed);

	// render X times per second
	var x = 60;
	setInterval(draw, 1000 / x);
};

// draw
function draw() {
	//paint snek
	r = Math.sin(deg * (Math.PI / 180)) * 127 + 128;
	g = Math.sin(deg * (Math.PI / 180) + 2) * 127 + 128;
	b = Math.sin(deg * (Math.PI / 180) + 4) * 127 + 128;
	// console.log("hex: " + RGB2Color(r, g, b));
	ctx.beginPath();
	ctx.fillStyle = RGB2Color(r, g, b);
	ctx.arc(posX, posY, 22, 0, 2 * Math.PI);
	ctx.fill();
	deg < 360 ? deg+=colorRate : (deg = 0);

	posX += dirX;
	posY += dirY;

	posX > canvas.width ? (posX = 0) : posX < 0 ? (posX = canvas.width) : null;
	posY > canvas.height ? (posY = 0) : posY < 0 ? (posY = canvas.height) : null;
}
//calculate colors
function RGB2Color(r, g, b) {
	return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}
function byte2Hex(n) {
	var nybHexString = "0123456789ABCDEF";
	return (
		String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
		nybHexString.substr(n & 0x0f, 1)
	);
}
// input
function mouseMoveEvent(e) {
	dirX = speed * (e.x / canvas.width - 0.5);
	dirY = speed * (e.y / canvas.height - 0.5);
}
function keyPressEvent(e) {
	if(e.code == "Enter"){
		posX = canvas.width / 2;
		posY = canvas.height / 2;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}
//window resize
function resizeEvent() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
