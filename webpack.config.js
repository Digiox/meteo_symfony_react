var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    // .addEntry('js/app', './assets/js/app.js')
    .addStyleEntry('css/app', './assets/css/app.css')
    .addStyleEntry('css/icons', './assets/css/weather-icons.min.css')

    // uncomment if you use Sass/SCSS files
    // .enableSassLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    // .autoProvidejQuery()
      .addEntry('js/app', ['babel-polyfill', './assets/js/app.js'])

      .configureBabel(function(babelConfig) {
        // add additional presets
        babelConfig.presets.push('@babel/preset-flow');

        // no plugins are added by default, but you can add some
        babelConfig.plugins.push('styled-jsx/babel', "@babel/plugin-proposal-class-properties");
    }, {
        // node_modules is not processed through Babel by default
        // but you can whitelist specific modules to process
        includeNodeModules: ['foundation-sites'],

        // or completely control the exclude rule (note that you
        // can't use both "include_node_modules" and "exclude" at
        // the same time)
       
    })
    .enableReactPreset();

;

module.exports = Encore.getWebpackConfig();
