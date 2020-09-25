class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.inventory = []; //if the player can only have one item should this be something else? object?
        this.increment = 5; // for movement speed  
    }

    movement(dir) {
        switch (dir) {
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
}