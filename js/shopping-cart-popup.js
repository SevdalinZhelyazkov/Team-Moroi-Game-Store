import $ from 'jquery';

function shoppingCartPopup() {
    $(document).ready(function () {

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
}

export { shoppingCartPopup };