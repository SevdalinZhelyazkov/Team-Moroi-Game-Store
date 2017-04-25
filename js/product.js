class Product {
    constructor(title, description, price, imgURL, type) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imgURL = imgURL;
        this.type = type;
    }

    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }

    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }

    get imgURL() {
        return this._imgURL;
    }
    set imgURL(value) {
        this._imgURL = value;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
