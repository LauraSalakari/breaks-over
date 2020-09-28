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

function startGame(){
    clearCanvas();
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // draw bg
    spawnIngredients(); // spawn ingredients first to ensure correct overlap!
    drawPlayer();
}

let popcorn = new Ingredient("popcorn", "images/popcorn.png", 20, 300);
let carrot = new Ingredient("carrot", "images/carrots.png", 580, 40);

let ingArr = [popcorn, carrot];
function spawnIngredients(){
    ctx.drawImage(popcorn.image, popcorn.spawnPointX, popcorn.spawnPointY, popcorn.width, popcorn.height);
    ctx.drawImage(carrot.image, carrot.spawnPointX, carrot.spawnPointY, carrot.width, carrot.height);
}

//temp player stuff

let player = new Player();
player.image.src = "images/chef.png";
player.invenBubble.src = "images/inven-bubble.png";

function drawPlayer() {
    ctx.drawImage(player.image, player.x, player.y, 80, 80);
    ctx.drawImage(player.invenBubble, player.x+20, player.y-50, 50, 50);
    if(player.inventory) ctx.drawImage(player.inventory.image, player.x + 30, player.y - 46, 30, 30);
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

    // pickup logic
    if(e.key == "e"){
        checkInteract();

        // if(player.inventory){
        //     ctx.drawImage(player.inventory.image, player.x+25, player.y-40, 30, 30);
        // }
    }
});

// document.addEventListener("keyup", (e) => {
//     player.movement("");
// });


intervalId = setInterval(() => {
    requestAnimationFrame(startGame);
}, 10);


function checkInteract() {
    for (let i = 0; i < ingArr.length; i++) {
        let x = (player.x + 25) - (ingArr[i].spawnPointX + 25);
        let y = (player.y + 25) - (ingArr[i].spawnPointY + 25);
        let distance = Math.hypot(x, y);
        if (distance < player.pickUpDist) {
            player.inventory = ingArr[i];
        }
    }
    console.log(player.inventory);
    console.log(player.inventory.image);
    // ctx.drawImage(player.inventory.image, player.x + 25, player.y - 40, 30, 30);

}


// buildSplashScene();