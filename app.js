(function ($) {
    var app = Sammy('#app', function () {
        // this.get('#/', function () {
        //     $('#app').html('HOME');
        // });

        this.around(function (callback) {
            var context = this;
            this.load('data.json')
                .then(function (items) {
                    context.items = items;
                })
                .then(callback);
        });

        this.get('#/', function (context) {
            context.app.swap('');
            $.each(this.items, function (i, item) {
                console.log(item);
                context.render('templates/productList.handlebars', [item.title, item.price, item.imgURL ])
                    .appendTo(context.$element());
            });
        });

        this.get('#/game', function (context) {
            var str = location.href.toLowerCase();
            context.app.swap('');
            context.render('templates/productPage.handlebars', {})
                .appendTo(context.$element());
        });


        // this.get('#/games', function () {
        //     $.ajax({
        //         url: 'data.json',
        //         dataType: 'json',
        //         success: function (items) {
        //             $.each(items, function (i, item) {
        //                 console.log(item);
        //                 //$('#app').append('<h4>'+item.title +' - '+ item.price +'</h4>')

        //             });
        //         }
        //     });

        // });
    });

    $(function () {
        app.run('#/');
    });
})(jQuery);