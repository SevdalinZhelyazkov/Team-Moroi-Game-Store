class Game {
    constructor(title, description, shortDescription, price, imgURL) {
        this.title = title;
        this.description = description;
        this.shortDescription = shortDescription;
        this.price = price;
        this.imgURL = imgURL;
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

    get shortDescription() {
        return this._shortDescription;
    }
    set shortDescription(value) {
        this._shortDescription = value;
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
}
