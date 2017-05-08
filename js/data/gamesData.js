import $ from 'jquery';
import { CONSTANTS } from 'constants';
import { KINVEY } from 'kinvey';
import { requester } from 'requester';

class GamesData {
    constructor(urls, options, requester) {
        this.urls = urls;
        this.options = options;
        this.requester = requester;
    }

    getAllGames() {
        var url = this.urls.getAllGamesUrl();
        return this.requester.getJSON(url, this.options);
    }

    getGamesByPlatform(platform) {
        var filter = JSON.stringify({
            "platform": platform
        });
        var url = this.urls.getGamesByPlatformUrl(filter);

        return this.requester.getJSON(url, this.options);
    }

    getGameByTitle(titleName) {
        var filter = JSON.stringify({
            "title": titleName
        });
        var url = this.urls.getGameByTitleUrl(filter);

        return this.requester.getJSON(url, this.options);
    }

    searchGameByTitle(titleName) {
        var filter = JSON.stringify({
            "title": { "$regex": `^(?i)${titleName}` }
        });
        var url = this.urls.searchGameByTitleUrl(filter);

        return this.requester.getJSON(url, this.options);
    }

    addGamesToUser(game) {
        var userId = localStorage.getItem(CONSTANTS.USER_ID);
        var data = {
            gamesInCart: game
        };
        var url = this.urls.addGamesToUserUrl(userId);

        return this.requester.putJSON(url, data, this.options);
    }

    getUserGames() {
        var userId = localStorage.getItem(CONSTANTS.USER_ID);
        var url = this.urls.getUserGamesUrl(userId);

        return this.requester.getJSON(url, this.options);
    }

    orderGamesBy(gamesCollection, code) {
        switch (code) {
            case CONSTANTS.ORDERBY.DEFAULT:
                return gamesCollection;
            case CONSTANTS.ORDERBY.TITLE_ASC:
                return sortby(gamesCollection, "title");
            case CONSTANTS.ORDERBY.TITLE_DESC:
                return sortby(gamesCollection, "title").reverse();
            case CONSTANTS.ORDERBY.PRICE_ASC:
                return sortby(gamesCollection, "price");
            case CONSTANTS.ORDERBY.PRICE_DESC:
                return sortby(gamesCollection, "price").reverse();
            default:
                return gamesCollection;
        }

        function sortby(gamesCollection, sortBy) {
            var newArr = gamesCollection.sort((a, b) => {
                var paramA = a[sortBy];
                var paramB = b[sortBy];

                if (typeof paramA === "string" &&
                    typeof paramB === "string") {
                    paramA = paramA.toUpperCase();
                    paramB = paramB.toUpperCase();
                }
                else {
                    paramA = parseFloat(paramA);
                    paramB = parseFloat(paramB);
                }
                if (paramA < paramB) {
                    return -1;
                }
                if (paramA > paramB) {
                    return 1;
                }

                return 0;
            });
            return newArr;
        }
    }
}

let gamesData = new GamesData(KINVEY.URLS, KINVEY.GAMES_OPTIONS, requester);

export { gamesData as gamesData };