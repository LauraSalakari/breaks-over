class Ingredient {
    constructor(name, imageURL, spawnX, spawnY){
        this.name = name;
        this.image = new Image();
        this.image.src = imageURL;
        this.width = 50;
        this.height = 50;
        this.spawnPointX = spawnX;
        this.spawnPointY = spawnY;
    }

    drawIngredient(){
        // drawImage(this.image, this.spawnPointX, this.spawnPointY, this.width, this.height);
    }
}