// basic variables

let timer = 90;
let timerId = 0;
let score = 0;
let currentOrders = [];

// create player

let player = new Player();
player.image.src = "images/chef.png";
player.invenBubble.src = "images/inven-bubble.png";

// create player 2

let player2 = new Player();
player2.image.src = "images/player2.png";
player2.invenBubble.src = "images/inven-bubble.png";
player2.x = 440;
player2.y = 220;

// create dropoffs

let dropoff1 = new Dropoff(150, 20);
let dropoff2 = new Dropoff(300, 20);
let dropoff3 = new Dropoff(450, 20);
let dropoffs = [dropoff1, dropoff2, dropoff3];

// create ingredients

let popcorn = new Ingredient("popcorn", "images/popcorn.png", 15, 314);
let carrot = new Ingredient("carrot", "images/carrots.png", 570, 84);
let dogbones = new Ingredient("dogbones", "images/dogbones.png", 12, 84);
let cake = new Ingredient("cake", "images/cake.png", 350, 320);
let soda = new Ingredient("soda", "images/soda.png", 210, 185);
let icecream = new Ingredient("icecream", "images/icecream.png", 570, 320);

let ingArr = [popcorn, carrot, dogbones, cake, soda, icecream];

// create DOM variables for order cards
let ing00 = document.querySelector("#ing00");
let ing01 = document.querySelector("#ing01");
let ing02 = document.querySelector("#ing02");
let ing10 = document.querySelector("#ing10");
let ing11 = document.querySelector("#ing11");
let ing12 = document.querySelector("#ing12");

let orderCardImg = [ing00, ing01, ing02, ing10, ing11, ing12];

// create other DOM elements
let scoreUI = document.querySelector(".score span");
let timerUI = document.querySelector(".timer span");

// create sound variables

let submitCorrect = new Audio("audio/submit-correct-sound.mp3");
let submitWrong = new Audio("audio/submit-wrong-sound.mp3");
let pickupSound = new Audio("audio/pickup-sound.mp3");
let depositSound = new Audio("audio/deposit-sound.mp3");
let clickSound = new Audio("audio/click-sound.mp3");
let tickingSound = new Audio("audio/ticking-sound.mp3");

submitCorrect.volume = 0.4;
submitWrong.volume = 0.4;
tickingSound.volume = 0.6;

// movement & interact logic
document.addEventListener("keydown", (e) => {
    // player 1
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
        player.itemInteract();
    }

    // check order submission
    if (e.keyCode == 113 || e.key == "q") {
        console.log(fulfilOrder());
    }


    // player 2
    if (twoPlayers) {
        // movement
        if (e.keyCode == 105 || e.key == 'i') {
            player2.direction = "up";
        }
        else if (e.keyCode == 106 || e.key == 'j') {
            player2.direction = "left";
        }
        else if (e.keyCode == 107 || e.key == 'k') {
            player2.direction = "down";
        }
        else if (e.keyCode == 108 || e.key == 'l') {
            player2.direction = "right";
        }

        // pickup logic
        if (e.keyCode == 111 || e.key == "o") {
            player2.itemInteract();
        }

        // check order submission
        if (e.keyCode == 13 || e.key == "u") {
            console.log(fulfilOrder());
        }
    }
});

document.addEventListener("keyup", (e) => {
    if ((e.keyCode == 87 || e.key == 'w') || (e.keyCode == 65 || e.key == 'a') || (e.keyCode == 83 || e.key == 's') || (e.keyCode == 68 || e.key == 'd')) {
        player.direction = "";
    }
    else if ((e.keyCode == 105 || e.key == 'i') || (e.keyCode == 106 || e.key == 'j') || (e.keyCode == 107 || e.key == 'k') || (e.keyCode == 108 || e.key == 'l')) {
        player2.direction = "";
    }
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

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    player.movement();
    ctx.drawImage(player.image, player.x, player.y, 80, 80);
    ctx.drawImage(player.invenBubble, player.x + 20, player.y - 50, 50, 50);
    if (player.inventory) ctx.drawImage(player.inventory.image, player.x + 30, player.y - 46, 30, 30);

    if (twoPlayers) {
        player2.movement();
        ctx.drawImage(player2.image, player2.x, player2.y, 80, 80);
        ctx.drawImage(player2.invenBubble, player2.x + 20, player2.y - 50, 50, 50);
        if (player2.inventory) ctx.drawImage(player2.inventory.image, player2.x + 30, player2.y - 46, 30, 30);
    }
}

function spawnIngredients() {
    ingArr.forEach((elem) => {
        ctx.drawImage(elem.image, elem.spawnPointX, elem.spawnPointY, elem.width, elem.height);
    });
}

function createOrder() {
    return new Order(ingArr, 3);
}

function fulfilOrder() {
    console.log("Score: ", score);
    for (let i = 0; i < 2; i++) {
        let dropoffNames = dropoffs.map((elem) => {
            return elem.content.name;
        });

        let orderNames = currentOrders[i].ingredients.map((elem) => {
            return elem.name;
        });

        let filtered = dropoffNames.filter((elem) => {
            return orderNames.includes(elem);
        });

        if (filtered.length === 3 && (filtered[0] != filtered[1] && filtered[1] != filtered[2])) {
            score += currentOrders[i].score;
            playSound("correct");
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
    playSound("wrong");
    updateScore();
    return false;
}

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

function drawCards() {
    if (currentOrders.length === 2) {
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

function updateScore() {
    scoreUI.innerText = String(score);
    finalScore.innerText = String(score);
}

function updateTimer() {
    timerUI.innerText = String(timer);
}

function setTimer() {
    tickingSound.play();
    tickingSound.loop = true;
    if (!playSounds) tickingSound.muted = true;
    timerId = setInterval(() => {
        timer--;
        updateTimer();
        if (timer <= 0) {
            tickingSound.pause();
            tickingSound.currentTime = 0;
            clearInterval(timerId);
            timer = 0;
        }
    }, 1000)
}

function playSound(action) {
    if (playSounds) {
        switch (action) {
            case "correct":
                if (gameState === 1) submitCorrect.play();
                break;
            case "wrong":
                if (gameState === 1) submitWrong.play();
                break;
            case "pickup":
                pickupSound.play();
                break;
            case "deposit":
                depositSound.play();
                break;
            case "click":
                clickSound.play();
                break;
            default:
                break;
        }
    }
}