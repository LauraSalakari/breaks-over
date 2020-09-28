let canvas = document.querySelector("canvas");
// canvas.style.backgroundColor = "#626982";
let ctx = canvas.getContext("2d");

let intervalId = 0;
let gameState = 0; //0 for splash, 1 for game, 2 for gameover

let btnTop = document.querySelector(".btn-top");
let btnBottom = document.querySelector(".btn-bottom");

let bg = new Image();
bg.src = "./images/kitchen.png";

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

function startGame() {
    clearCanvas();
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // draw bg
    spawnIngredients(); // spawn ingredients first to ensure correct overlap!
    drawDropoff();
    drawPlayer();
}

let dropoff1 = new Dropoff(150, 20);
let dropoff2 = new Dropoff(300, 20);
let dropoff3 = new Dropoff(450, 20);
let dropoffs = [dropoff1, dropoff2, dropoff3];

function drawDropoff() {
    dropoffs.forEach((elem) => {
        ctx.beginPath();
        ctx.fillStyle = "#7ef2b6";
        ctx.arc(elem.x, elem.y, 70, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        if (elem.content) {
            ctx.drawImage(elem.content.image, elem.imageX, elem.imageY, 40, 40);
        }
    });
}

let popcorn = new Ingredient("popcorn", "images/popcorn.png", 20, 300);
let carrot = new Ingredient("carrot", "images/carrots.png", 580, 40);

let ingArr = [popcorn, carrot];
function spawnIngredients() {
    ctx.drawImage(popcorn.image, popcorn.spawnPointX, popcorn.spawnPointY, popcorn.width, popcorn.height);
    ctx.drawImage(carrot.image, carrot.spawnPointX, carrot.spawnPointY, carrot.width, carrot.height);
}

//temp player stuff

let player = new Player();
player.image.src = "images/chef.png";
player.invenBubble.src = "images/inven-bubble.png";

function drawPlayer() {
    player.movement();
    ctx.drawImage(player.image, player.x, player.y, 80, 80);
    ctx.drawImage(player.invenBubble, player.x + 20, player.y - 50, 50, 50);
    if (player.inventory) ctx.drawImage(player.inventory.image, player.x + 30, player.y - 46, 30, 30);
}

// temp movement logic
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 87 || e.key == 'w') {
        player.direction = "up";
    }
    else if (e.keyCode == 65 || e.key == 'a') {
        player.direction = "left";
    }
    else if (e.keyCode == 83 || e.key == 's') {
        player.direction = "down";
    }
    else if (e.keyCode == 68 || e.key == 'd') {
        player.direction = "right";
    }

    // pickup logic
    if (e.keyCode == 101 || e.key == "e") {
        checkInteract();
    }
});

document.addEventListener("keyup", (e) => {
    player.direction = "";
});


intervalId = setInterval(() => {
    requestAnimationFrame(startGame);
}, 10);


function checkInteract() {
    if (!player.inventory) {
        for (let i = 0; i < ingArr.length; i++) {
            let x = (player.x + 25) - (ingArr[i].spawnPointX + 25);
            let y = (player.y + 25) - (ingArr[i].spawnPointY + 25);
            let distance = Math.hypot(x, y);
            if (distance <= player.pickUpDist) {
                player.inventory = ingArr[i];
            }
        }
    }
    else {
        for (let i = 0; i < dropoffs.length; i++) {
            let x = (player.x + 25) - dropoffs[i].x;
            let y = (player.y + 25) - dropoffs[i].y;
            let distance = Math.hypot(x, y);
            if (distance <= player.pickUpDist) {
                dropoffs[i].content = player.inventory;
                player.inventory = "";
            }
        }
    }
    console.log(player.inventory);
    console.log(player.inventory.image);
    // ctx.drawImage(player.inventory.image, player.x + 25, player.y - 40, 30, 30);

}


// buildSplashScene();