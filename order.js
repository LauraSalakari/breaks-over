class Order {
    constructor(options, n) {
        this.options = options;
        this.n = n;
        this.ingredients = this.draftIngredients();
        this.score = this.ingredients.length * 50;
    }

    draftIngredients() {
        let orderArr = [];

        let copy = [...this.options];
        for (let i = 0; i < this.n; i++) {
            let index = Math.floor(Math.random() * copy.length);
            orderArr.push(copy[index]);
            copy.splice(index, 1);
        }
        return orderArr;
    }
}