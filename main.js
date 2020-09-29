// jshint esversion: 10

let canvas = document.querySelector("canvas");
// canvas.style.backgroundColor = "#626982";
let ctx = canvas.getContext("2d");

let intervalId = 0;
let gameState = 0; //0 for splash, 1 for game, 2 for gameover

let btnTop = document.querySelector(".btn-top");
let btnBottom = document.querySelector(".btn-bottom");

let bg = new Image();

let timer = 30;
let timerId = 0;
let score = 0;
let currentOrders = [];

function buildSplashScene() {
    bg.src = "./images/splashscreen-green.png.png";
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function buildGameScene() {
    bg.src = "./images/kitchen.png";
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // draw bg
    setTimer();
}

function buildGameOverScene() {
    clearCanvas();
    bg.src = "./images/gameover-temp.png";
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // draw bg
    ctx.font = "20px Verdana"
    ctx.fillText(`YOUR SCORE: ${String(score)}`, 250, 240);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

btnTop.addEventListener("click", () => {
    if(gameState === 0 || gameState === 2){
        gameState = 1;
        clearCanvas();
        buildGameScene();
    }
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

    if (currentOrders.length < 2) {
        let newOrder = createOrder();
        currentOrders.push(newOrder);
        console.log(currentOrders[0]?.ingredients);
        console.log(currentOrders[1]?.ingredients);
        drawCards();
    }
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
let dogbones = new Ingredient("dogbones", "images/dogbones.png", 20, 120);
let cake = new Ingredient("cake", "images/cake.png", 220, 300);
let soda = new Ingredient("soda", "images/soda.png", 400, 200);
let icecream = new Ingredient("icecream", "images/icecream.png", 580, 300);

let ingArr = [popcorn, carrot, dogbones, cake, soda, icecream];

function spawnIngredients() {
    ingArr.forEach((elem) => {
        ctx.drawImage(elem.image, elem.spawnPointX, elem.spawnPointY, elem.width, elem.height);
    });

    // ctx.drawImage(popcorn.image, popcorn.spawnPointX, popcorn.spawnPointY, popcorn.width, popcorn.height);
    // ctx.drawImage(carrot.image, carrot.spawnPointX, carrot.spawnPointY, carrot.width, carrot.height);
}

function createOrder() {
    return new Order(ingArr, 3);
}

function fulfilOrder() {
    console.log("Score: ", score);
    for (let i = 0; i < 2; i++) {
        let match = false;

        let dropoffNames = dropoffs.map((elem) => {
            return elem.content.name;
        });

        let orderNames = currentOrders[i].ingredients.map((elem) => {
            return elem.name;
        });

        let filtered = dropoffNames.filter((elem) => {
            return orderNames.includes(elem);
        });

        if (filtered.length === 3) {
            score += currentOrders[i].score;
            updateScore();
            currentOrders.splice(i, 1);
            dropoffs.forEach((elem) => {
                elem.clearDropoff();
            });
            return true;
        }
    }
    if (score >= 100) score -= 100;
    else score = 0;
    updateScore();
    return false;
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

// movement & interact logic
document.addEventListener("keydown", (e) => {
    // movement
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
        itemInteract();
    }

    // check order submission
    if (e.keyCode == 113 || e.key == "q") {
        console.log(fulfilOrder());
    }
});


document.addEventListener("keyup", (e) => {
    player.direction = "";
});


intervalId = setInterval(() => {
    if(gameState===0){
        buildSplashScene();
    }
    else if(gameState===1){
        requestAnimationFrame(startGame);
        if(timer===0) gameState=2;
    }
    else{
        buildGameOverScene();
    }
}, 10);


function itemInteract() {
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
}

let ing00 = document.querySelector("#ing00");
let ing01 = document.querySelector("#ing01");
let ing02 = document.querySelector("#ing02");
let ing10 = document.querySelector("#ing10");
let ing11 = document.querySelector("#ing11");
let ing12 = document.querySelector("#ing12");

let orderCardImg = [ing00, ing01, ing02, ing10, ing11, ing12];

function drawCards() {
    if(currentOrders.length === 2){
        orderCardImg.forEach((elem) => {
            elem.innerHTML = ""; 
        });

        ing00.appendChild(currentOrders[0].ingredients[0].image);
        ing01.appendChild(currentOrders[0].ingredients[1].image);
        ing02.appendChild(currentOrders[0].ingredients[2].image);
        ing10.appendChild(currentOrders[1].ingredients[0].image.cloneNode(true));
        ing11.appendChild(currentOrders[1].ingredients[1].image.cloneNode(true));
        ing12.appendChild(currentOrders[1].ingredients[2].image.cloneNode(true));
    }
}

function updateScore(){
    scoreUI = document.querySelector(".score span");
    scoreUI.innerText = String(score);
}

function updateTimer(){
    timerUI = document.querySelector(".timer span");
    timerUI.innerText = String(timer);
}

function setTimer(){
    timerId = setInterval(()=>{
        timer--;
        updateTimer();
        if(timer === 0){
            clearInterval(timerId);
        }
    }, 1000)
}
