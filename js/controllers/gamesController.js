import $ from 'jquery';
import toastr from 'toastr';
import { UTILS } from 'utils';
import { CONSTANTS } from 'constants';
import { gamesData } from 'gamesData';
import { templates } from 'templates';

class GamesController {
    constructor(gamesData, templates) {
        this.gamesData = gamesData;
        this.temlpates = templates;
    }

    home(content, pageNumberParam, orderByCodeParam) {
        var $content = content;
        var _this = this;
        var pageNumber = pageNumberParam;
        var orderByCode = orderByCodeParam;
        var totalGames;
        var gamesOnPage;
        var pageIndeces;

        UTILS.setupOrderByLinks();

        _this.gamesData.getAllGames()
            .then(function (result) {
                result = _this.gamesData.orderGamesBy(result, orderByCode);
                gamesOnPage = UTILS.createGamesOnPage(result, pageNumber, CONSTANTS.PAGE_SIZE_BIG);
                pageIndeces = UTILS.createPageIndeces(result, CONSTANTS.PAGE_SIZE_BIG);
                totalGames = {
                    games: gamesOnPage,
                    indeces: pageIndeces
                };

                return templates.getTemplate('home');
            })
            .then(function (template) {
                $content.html(template(totalGames));
                UTILS.showFilters()
                UTILS.fixPaginationForOrderBy(orderByCode);
            });
    }

    platform(content, platform, pageNumber, orderByCode) {
        var $content = content;
        var _this = this;
        var category;
        var gamesOnPage;
        var pageIndeces;

        UTILS.setupOrderByLinks();

        _this.gamesData.getGamesByPlatform(platform)
            .then(function (result) {
                result = _this.gamesData.orderGamesBy(result, orderByCode);
                gamesOnPage = UTILS.createGamesOnPage(result, pageNumber, CONSTANTS.PAGE_SIZE_SMALL);
                pageIndeces = UTILS.createPageIndeces(result, CONSTANTS.PAGE_SIZE_SMALL);

                category = {
                    name: platform,
                    games: gamesOnPage,
                    indeces: pageIndeces
                };

                return templates.getTemplate('platform');
            })
            .then(function (template) {
                $content.html(template(category));
                UTILS.showFilters()
                UTILS.fixPaginationForOrderBy(orderByCode);
            });
    }

    search(content, query, pageNumber, orderByCode) {
        var $content = content;
        var _this = this;
        var seachResult;
        var gamesOnPage;
        var pageIndeces;

        UTILS.setupOrderByLinks();

        _this.gamesData.getAllGames()
            .then((results) => {
                let titleResults = [];

                results.forEach(function (item) {
                    if ((item.title.toLowerCase()).indexOf(query.toLowerCase()) != -1) {
                        titleResults.push(item);
                    }
                });

                let result = titleResults;

                result = _this.gamesData.orderGamesBy(result, orderByCode);
                gamesOnPage = UTILS.createGamesOnPage(result, pageNumber, CONSTANTS.PAGE_SIZE_SMALL);
                pageIndeces = UTILS.createPageIndeces(result, CONSTANTS.PAGE_SIZE_SMALL);

                seachResult = {
                    title: query,
                    games: gamesOnPage,
                    indeces: pageIndeces
                };

                return templates.getTemplate('search');
            })
            .then(function (template) {
                $content.html(template(seachResult));
                UTILS.showFilters()
                UTILS.fixPaginationForOrderBy(orderByCode);
            });
    }

    gameInfo(content, currentTitle) {
        var $content = content;
        var _this = this;
        var game;

        _this.gamesData.getGameByTitle(currentTitle)
            .then(function (result) {
                game = result[0];
                return templates.getTemplate('game-details');
            })
            .then(function (template) {
                $content.html(template(game));
                UTILS.hideFilters()

                if (UTILS.isUserLoggedIn()) {
                    $('#btn-add-to-cart').removeClass('hidden');
                } else {
                    $('#btn-add-to-cart').addClass('hidden');
                }

                $('#fb-share').html('<iframe src="https://www.facebook.com/plugins/share_button.php?href=' + location.href + '&layout=button_count&size=large&mobile_iframe=false&width=105&height=28&appId" width="105" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');

                $('#btn-add-to-cart').on('click', function () {
                    let canAdd = true;
                    let title = game.title;
                    let image = game.image;
                    let platform = game.platform;
                    let price = game.price;
                    let gameId = game._id;
                    let gameToPush = {};
                    let gamesInCart = [];

                    _this.gamesData.getUserGames()
                        .then(function (user) {
                            gamesInCart = user.gamesInCart;
                            (gamesInCart).forEach(function (game) {
                                if (game.gameId === gameId) {
                                    canAdd = false;
                                    toastr.warning(`${title} - is already in the cart!`);
                                    UTILS.addGamesToCart(gamesInCart);
                                    return;
                                }
                            });
                            console.log(canAdd);
                            if (canAdd) {
                                toastr.success(`${title} - successfully added to cart!`);
                                gameToPush = user.gamesInCart;
                                gameToPush.push({
                                    gameId,
                                    title,
                                    image,
                                    platform,
                                    price
                                });
                                UTILS.addGamesToCart(gamesInCart);
                                _this.gamesData.addGamesToUser(gameToPush);
                            }
                        });
                });
            });
    }

    checkout(content) {
        var $content = content;
        var _this = this;

        $('#shopping-cart-menu').addClass('hidden');
        $('.cart').toggleClass('activated');
        var games;

        _this.gamesData.getUserGames()
            .then(function (result) {
                let totalPrice = 0;

                (result.gamesInCart).forEach(function (game) {
                    totalPrice += +game.price;
                });
                totalPrice = parseFloat(totalPrice.toString()).toFixed(2);

                games = {
                    allGames: result.gamesInCart,
                    totalPrice: totalPrice
                };

                return templates.getTemplate('checkout');
            })
            .then(function (template) {
                $content.html(template(games));
                UTILS.hideFilters();
            });
    }
}

let gamesController = new GamesController(gamesData, templates);
export { gamesController as gamesController };