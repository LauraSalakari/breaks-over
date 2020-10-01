class Dropoff {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.content = "";
        this.imageX = this.x - 20;
        this.imageY = this.y;
    }

    clearDropoff() {
        this.content = "";
    }
}