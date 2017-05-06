import jQuery from 'jquery';
import Sammy from 'sammy';

var sammyApp = Sammy('#content', function () {

    this.get('#/', function () {
        console.log('home');
    });

    this.get('#/details', function () {
        console.log('details');
    });

    // Shopping Cart Popup
    $('body').on('click', function (ev) {
        var $shoppingCartBox = $('.shopping-cart-box');
        if (!$shoppingCartBox.is(ev.target) && $shoppingCartBox.has(ev.target).length === 0) {
            $shoppingCartBox.fadeOut();
        }
    });

    $('.shopping-cart-btn').on('click', function (ev) {
        ev.stopPropagation();
        $('.shopping-cart-box').fadeToggle();
    });

});

sammyApp.run('#/');