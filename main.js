let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let splash = document.querySelector("#splash");
let gameover = document.querySelector("#gameover");
// let gameoverDiv = document.querySelector(".gameover-div");
let finalScore = document.querySelector("#score-div");
let playSounds = true;

let intervalId = 0;
let gameState = 0; //0 for splash, 1 for game, 2 for gameover

let btnTop = document.querySelector(".btn-top");
let btnBottom = document.querySelector(".btn-bottom");

let bg = new Image();
bg.src = "./images/kitchen.png";

function buildSplashScene() {
    // bg.src = "./images/splashscreen-green.png.png";
    // ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    splash.style.display = "block";
    gameover.style.display = "none";
    finalScore.style.display = "none"
    // gameoverDiv.style.display = "none";
}

function buildGameScene() {
    // bg.src = "./images/kitchen.png";
    splash.style.display = "none";
    gameover.style.display = "none";
    finalScore.style.display = "none"
    // gameoverDiv.style.display = "none";
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // draw bg
    setTimer();

    intervalId = setInterval(() => {
        requestAnimationFrame(startGame);
        if (timer === 0) {
            gameState = 2;
            buildGameOverScene();
            clearInterval(intervalId);
        }
    }, 10);
}

function buildGameOverScene() {
    clearCanvas();
    splash.style.display = "none";
    gameover.style.display = "block";
    finalScore.style.display = "block"
    // gameoverDiv.style.display = "block";
    timer = 0;
    updateTimer();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

btnTop.addEventListener("click", () => {
    playSound("click");
    if (gameState === 0 || gameState === 2) {
        gameState = 1;
        clearCanvas();
        timer = 90;
        score = 0;
        currentOrders = [];
        buildGameScene();
    }
    else {
        gameState = 2;
        buildGameOverScene();
        timer = 1;
    }
});

btnBottom.addEventListener("click", () => {
    playSound("click");
    playSounds = !playSounds;
    tickingSound.muted = !tickingSound.muted;
    playSound("click");
});

window.addEventListener("load", () => {
    if (gameState === 0) buildSplashScene();
    else if (gameState === 1) buildGameScene();
    else buildGameOverScene();
})