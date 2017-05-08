import $ from 'jquery';
import CryptoJS from 'cryptojs';
import { CONSTANTS } from 'constants';
import { templates } from 'templates';

function encryptToBase64(string) {
    var toUtf8 = CryptoJS.enc.Utf8.parse(string);
    var base64 = CryptoJS.enc.Base64.stringify(toUtf8);
    return base64;
}

function encryptToSha1(string) {
    var toSha1 = CryptoJS.SHA1(string).toString();
    return toSha1;
}

function createGamesOnPage(array, pageNumber, gamesOnPageCount) {
    var newArray = array.slice((pageNumber - 1) * gamesOnPageCount, (pageNumber - 1) * gamesOnPageCount + gamesOnPageCount);
    return newArray;
}

// Calculates number of buttons for paging
function createPageIndeces(array, gamesOnPageCount) {
    var totalGames = array.length;
    var buttonsCount = Math.ceil(totalGames / gamesOnPageCount);
    var array = [];
    for (var i = 1; i <= buttonsCount; i++) {
        array.push(i);
    }
    return array;
}

function addGamesToCart(games) {
    let templateToParse,
        totalPrice = 0;

    games.forEach(function (game) {
        totalPrice += +game.price;
    });
    totalPrice = parseFloat(totalPrice.toString()).toFixed(2);

    templateToParse = {
        games,
        totalPrice
    };
    templates.getTemplate('shopping-cart').then((template) => {
        $('.shopping-cart-box').html(template(templateToParse));
    });
}

function setupOrderByLinks() {
    let orderByLinks = $('#orderby > ul.dropdown-menu > li > a');
    orderByLinks.each((i, link) => {
        var url = window.location
            .toString()
            .substr(0, window.location.toString().length - 1) + i;

        link.href = url;
    });
}

function fixPaginationForOrderBy(orderByCode) {
    $('.btn.btn-default.btn-page').each(function (i, btn) {
        btn.href += `&${orderByCode}`;
    });
}

function resetOrderByTypeOnChange() {
    $('#orderby > .dropdown-toggle').html('Default <span class="caret"></span>');
}

function isUserLoggedIn() {
    var username = localStorage.getItem(CONSTANTS.USER_NAME);

    if (!username) {
        return false;
    } else {
        return true;
    }
}

function showFilters() {
    $('#filters').removeClass('hidden');
}

function hideFilters() {
    $('#filters').addClass('hidden');
}

var utils = {
    encryptToBase64,
    encryptToSha1,
    createGamesOnPage,
    createPageIndeces,
    addGamesToCart,
    setupOrderByLinks,
    resetOrderByTypeOnChange,
    fixPaginationForOrderBy,
    isUserLoggedIn,
    showFilters,
    hideFilters
};

export { utils as UTILS };