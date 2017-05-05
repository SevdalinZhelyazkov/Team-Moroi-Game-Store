SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './bower_components/jquery/dist/jquery.min.js',
        'sammy': './bower_components/sammy/lib/sammy.js',
        'handlebars': './bower_components/handlebars/handlebars.min.js',
        
        'template-loader': './js/helpers/template-loader.js',

        'requester': './js/requesters/json-requester.js',

        'shopping-cart-popup': './js/shopping-cart-popup.js',
        'app': './js/app.js'
    }
});

SystemJS.import('app');