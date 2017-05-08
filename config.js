SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'sammy': './bower_components/sammy/lib/sammy.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'toastr':'./bower_components/toastr/toastr.js',
        'cryptojs': './bower_components/crypto-js/crypto-js.js',

        'templates': './js/helpers/templates.js',
        'constants': './js//helpers/constants.js',
        'utils': './js/helpers/utils.js',
        'kinvey': './js/helpers/kinvey.js',

        'usersController': './js/controllers/usersController.js',
        'gamesController': './js/controllers/gamesController.js',

        'usersData': './js/data/usersData.js',
        'gamesData': './js/data/gamesData.js',

        'requester': './js/requests/requester.js',

        'sammyApp': './js/sammyApp.js',

    }
});

System.import('sammyApp');
