class User {
    constructor(name, password, shoppingCart) {
        this.name = name;
        this.password = password;
        this.shoppingCart = shoppingCart;
    }

    get name() {
        return this._name;
    }
    set name(value) {
      VALIDATOR.validateName(value);
        this._name = value;
    }

    get shoppingCart() {
        return this._shoppingCart;
    }
    set shoppingCart(value) {
        this._shoppingCart = value;
    }
}
