import Sammy from 'sammy';
import $ from 'jquery';
import * as toastr from 'toastr';
import { CONSTANTS } from 'constants';
import { UTILS } from 'utils';
import { usersController } from 'usersController';
import { gamesController } from 'gamesController';



var router = Sammy('#content', function () {
    var $content = $('#content');
    var $orderByChoice = $('#orderby > .dropdown-toggle');
    var gamesInCart = [];
    toastr.options.preventDuplicates = true;
    toastr.options.timeOut = 50;

    if (UTILS.isUserLoggedIn()) {
        $('#nav-btn-login, #nav-btn-register').addClass('hidden');
        $('#shopping-cart-button').removeClass('hidden');
        $('#nav-btn-logout').removeClass('hidden');
        $('#shopping-cart-button').removeClass('hidden');
    } else {
        $('#nav-btn-login, #nav-btn-register').removeClass('hidden');
        $('#shopping-cart-button').addClass('hidden');
        $('#nav-btn-logout').addClass('hidden');
        $('#shopping-cart-button').addClass('hidden');
    }

    this.get('#/', function (context) {
        context.redirect('#/home/1&0');
    });

    this.get('#/home/?:pageNumber&:orderByCode', function (context) {
        var pageNumber = this.params['pageNumber'];
        var orderByCode = this.params['orderByCode'] | 0;

        gamesController.home($content, pageNumber, orderByCode);
    });

    this.get('#/login', function (context) {
        usersController.loadLoginForm($content, context);
    });

    this.get('#/register', function (context) {
        usersController.loadRegisterForm($content, context);
    });

    this.get('#/platform/?:platform&:pageNumber&:orderByCode', function (context) {
        var platform = this.params['platform'];
        var pageNumber = this.params['pageNumber'];
        var orderByCode = this.params['orderByCode'] | 0;

        gamesController.platform($content, platform, pageNumber, orderByCode);
    });

    this.get('#/platform/?:platform&:pageNumber', function (context) {
        var pageNum = this.params['pageNumber'];
        var platform = this.params['platform'];
        context.redirect(`#/platform/${platform}&${pageNum}&${CONSTANTS.ORDERBY.DEFAULT}`);
    });

    this.get('#/search/?:query&:pageNumber&:orderByCode', function (context) {
        var query = this.params['query'];
        var pageNumber = this.params['pageNumber'];
        var orderByCode = this.params['orderByCode'] | 0;


        gamesController.search($content, query, pageNumber, orderByCode);
    });

    this.get('#/game-details/:title', function () {
        var currentTitle = this.params['title'];

        gamesController.gameInfo($content, currentTitle);
    });

    this.get('#/checkout', function () {
        gamesController.checkout($content);
    });

    $('#nav-btn-logout').on('click', function () {
        $('#shopping-cart-button').addClass('hidden');
        $('#nav-btn-logout').addClass('hidden');
        $('#nav-btn-logout').addClass('hidden');
        $('.shopping-cart-box').addClass('hidden');
        $('#nav-btn-login').removeClass('hidden');
        $('#nav-btn-register').removeClass('hidden');
        $('.cart').toggleClass('activated');

        usersController.logoutUser();
    });

    // Close shopping cart
    $('body').on('click', function (ev) {
        var $shoppingCartBox = $('.shopping-cart-box');
        if (!$shoppingCartBox.is(ev.target) && $shoppingCartBox.has(ev.target).length === 0) {
            $shoppingCartBox.fadeOut();
        }
    });

    // Open shopping cart & populate items
    $('.shopping-cart-btn').on('click', function (ev) {
        ev.stopPropagation();
        $('.shopping-cart-box').fadeToggle();

        gamesController.gamesData.getUserGames()
            .then(function (result) {
                UTILS.addGamesToCart(result.gamesInCart);
            });
    });

    // Remove item from shopping cart
    $('.shopping-cart-box').on('click', '.shopping-cart-item-delete', function () {
        let gameToRemoveTitle = $(this).parent()
            .find($('.caption'))
            .find('.game-title').text();
        let updatedGamesAfterRemoval;
        let idToRemove;

        $(this).parents('li').eq(0).fadeOut('slow');

        gamesController.gamesData.getGameByTitle(gameToRemoveTitle)
            .then(function (result) {
                idToRemove = result[0]._id;
            })
            .then(function () {
                return gamesController.gamesData.getUserGames();
            })
            .then(function (userGames) {
                updatedGamesAfterRemoval = JSON.parse(JSON.stringify(userGames.gamesInCart));
                for (var i = 0; i < userGames.gamesInCart.length; i += 1) {
                    var currentGame = userGames.gamesInCart[i];
                    if (currentGame.gameId === idToRemove) {
                        updatedGamesAfterRemoval.splice(i, 1);
                        break;
                    }
                }

                return updatedGamesAfterRemoval;
            })
            .then(function (games) {
                UTILS.addGamesToCart(games);
                gamesController.gamesData.addGamesToUser(games);
            });
    });

    $('.dropdown-menu a').on('click', function () {
        $orderByChoice.html($(this).html());
    });

    $('.navbar-nav a').on('click', () => UTILS.resetOrderByTypeOnChange());

    $('#search-btn').on('click', function () {
        var searchQuery = $('#search-input').val();
        $('#search-input').val("");
        UTILS.resetOrderByTypeOnChange();

        window.location.replace(`#/search/${searchQuery}&1&0`);
    });

    $('#search-input').keyup(function (e) {
        if (e.keyCode === 13) {
            $('#search-btn').trigger('click');
        }
    });

});

router.run('#/');
let sammyApp = {};
export { sammyApp as sammyApp };