class Order {
    constructor(options, n) {
        this.options = options;
        this.n = n;
        this.ingredients = this.draftIngredients();
        this.score = this.ingredients.length * 50;
    }

    draftIngredients() {
        let orderArr = [];

        for (let i = 0; i < this.n; i++) {
            let index = Math.floor(Math.random()*this.options.length);
            orderArr.push(this.options[index]);
        }

        return orderArr;
    }
}