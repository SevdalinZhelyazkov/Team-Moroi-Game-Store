  (function ($) {
    var app = Sammy('#app', function () {
        this.use('Template');

        this.get('#/', function(){
            console.log('HOME');
        });

        this.get('#/games', function(){
            console.log('routed to GAMES');
        });
    });

    $(function () {
        app.run('#/');
    });
  })(jQuery);