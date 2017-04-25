class ShoppingCart {
    constructor() {
        this.games = [];
    }

    get games() {
        return this._games;
    }

    addGame(game) {
        if (this._games.indexOf(game) >= 0) {
            //TO DO SET POPUP GAME ALREADY ON LIST
        }
        this._games.push(game);
    }
    removeGame(game) {
        let index = this._games.findIndex(game);
        if (index >= = 0) {
            this._games.splice(index, 1);
        }
    }

    totalSum(){
      let sum = 0;
      for (product of this.games) {
        sum = sum + product.price;
      }
      return sum;
    }
}
