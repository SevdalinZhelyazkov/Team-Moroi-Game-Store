SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './bower_components/jquery/dist/jquery.min.js',
        'handlebars': './bower_components/handlebars/handlebars.min.js',
        
        'main': './js/main.js',
        'shopping-cart-popup.js': './js/shopping-cart-popup.js'
    }
});