class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.inventory = ""; //if the player can only have one item should this be something else? object?
        this.increment = 3; // for movement speed  
        this.image = new Image();
        this.invenBubble = new Image();
        this.pickUpDist = 80;
        this.direction = "";
    }

    movement() {
        switch (this.direction) {
            case "up":
                this.y -= this.increment;
                break;
            case "down":
                this.y += this.increment;
                break;
            case "left":
                this.x -= this.increment;
                break;
            case "right":
                this.x += this.increment;
                break;
            default:
                break;
        }
    }

    itemInteract() {
        if (!this.inventory) {
            for (let i = 0; i < ingArr.length; i++) {
                let x = (this.x + 25) - (ingArr[i].spawnPointX + 25);
                let y = (this.y + 25) - (ingArr[i].spawnPointY + 25);
                let distance = Math.hypot(x, y);
                if (distance <= this.pickUpDist) {
                    playSound("pickup");
                    this.inventory = ingArr[i];
                }
            }
        }
        else {
            for (let i = 0; i < dropoffs.length; i++) {
                let x = (this.x + 25) - dropoffs[i].x;
                let y = (this.y + 25) - dropoffs[i].y;
                let distance = Math.hypot(x, y);
                if (distance <= this.pickUpDist) {
                    playSound("deposit");
                    dropoffs[i].content = this.inventory;
                    this.inventory = "";
                }
            }
        }
    }
}