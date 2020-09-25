let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#626982";
let ctx = canvas.getContext("2d");

let intervalId = 0;
let gameState = 0; //0 for splash, 1 for game, 2 for gameover

let btnTop = document.querySelector(".btn-top");
let btnBottom = document.querySelector(".btn-bottom");

function buildSplashScene() {
    gameState = 0;
    //ctx.fillText("Break's Over!", 100, 100); // TB replaced by art
}

function buildGameScene() {
    gameState = 1;
}

function buildGameOverScene() {
    gameState = 2;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

btnTop.addEventListener("click", () => {
    console.log("Hello");
});

btnBottom.addEventListener("click", () => {
    console.log("World");
});

//temp player stuff

let player = new Player();

function drawPlayer() {
    clearCanvas();
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

// temp movement logic
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 87 || e.key == 'w') {
        player.y -= player.increment;
    }
    else if (e.keyCode == 65 || e.key == 'a') {
        player.x -= player.increment;
    }
    else if (e.keyCode == 83 || e.key == 's') {
        player.y += player.increment;
    }
    else if (e.keyCode == 68 || e.key == 'd') {
        player.x += player.increment;
    }
});

// document.addEventListener("keyup", (e) => {
//     player.movement("");
// });




intervalId = setInterval(() => {
    requestAnimationFrame(drawPlayer);
}, 10);

// buildSplashScene();