import shoppingCartPopup from 'shopping-cart-popup';
import Sammy from 'sammy';

var sammyApp = Sammy('#content', function () {

    this.get('#/', function () {
        console.log('home');
    });

    this.get('#/details', function () {
        console.log('details');
    });

});

$(function () {
    sammyApp.run('#/');
});