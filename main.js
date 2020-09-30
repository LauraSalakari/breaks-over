let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let splash = document.querySelector("#splash");
let gameover = document.querySelector("#gameover");

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
}

function buildGameScene() {
    // bg.src = "./images/kitchen.png";
    splash.style.display = "none";
    gameover.style.display = "none";
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // draw bg
    setTimer();

    intervalId = setInterval(() => {
        requestAnimationFrame(startGame);
        if (timer === 0) {
            gameState = 2;
            clearInterval(intervalId);
        }
    }, 10);
}

function buildGameOverScene() {
    clearCanvas();
    splash.style.display = "none";
    gameover.style.display = "block";
    timer = 0;
    updateTimer();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

btnTop.addEventListener("click", () => {
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
    console.log("World");
});

window.addEventListener("load", () => {
    if (gameState === 0) buildSplashScene();
    else if (gameState === 1) buildGameScene();
    else buildGameOverScene();
})
