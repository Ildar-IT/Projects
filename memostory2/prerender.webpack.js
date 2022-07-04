const Config = require("./prerender.config.js");
const path = require('path');
const webpack = require('webpack');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = (routes) => {
    console.log("Страницы для пререндеринга: ", routes);
    console.log("Рендеринг...");

    return {
        entry: {
            'prerender': './src/utils/prerender.js' // minimal dummy app
        },

        // эта секция не важна, так как мы уже стартуем с build
        output: {
            publicPath: '/build/',
            path: path.resolve(__dirname, './htdocs/build/'),
            filename: 'js/[name].js'
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: 'prerender'
                }
            }),
            new PrerenderSPAPlugin({
                // Index.html is in the root directory.
                staticDir: path.join(__dirname, "htdocs/"), // куда рендерить
                indexPath: path.join(__dirname, "index.html"), // шаблон
                routes,
                /**
                 * Вставляем виджеты - после пререндера и оптимизации:
                 */
                postProcess: function (context) {
                    // Ignore any redirects.
                    context.route = context.originalRoute;

                    // Remove /index.html from the output path if the dir name ends with a .html file extension.
                    // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
                    if (context.route.endsWith('.html')) {
                        context.outputPath = path.join(__dirname, 'htdocs', context.route)
                    }

                    // delete inline styles and scripts
                    //context.html = removeNodes(['style', 'script'], context.html);

                    // добавить виджеты:
                    if (process.env.WITH_WIDGETS === "true") {
                        Config.COUNTERS_HEADER.forEach(el => context.html = context.html.replace(/<!-- counters-header -->/i, el));
                        Config.COUNTERS_BODY_START.forEach(el => context.html = context.html.replace(/<!-- counters-body-start -->/i, el));
                        Config.COUNTERS_FOOTER.forEach(el => context.html = context.html.replace(/<!-- counters-footer -->/i, el));
                    }

                    // append assets
                    //context.html = appendScripts(newHTML);

                    return context;
                },

                // Use this to limit the number of routes rendered in parallel.
                maxConcurrentRoutes: 10,

                server: {
                    // Normally a free port is autodetected, but feel free to set this if needed.
                    proxy: {
                        "/api/": {
                            target: Config.SERVER_URI,
                            changeOrigin: true,
                        },
                        "/upload/": {
                            target: Config.SERVER_URI,
                            changeOrigin: true,
                        },
                    },
                },

                // Optional minification.
                minify: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    decodeEntities: true,
                    keepClosingSlash: true,
                    sortAttributes: true
                },
                renderer: new Renderer({
                    headless: !Config.WITH_RENDERER_DEBUG,
                    defaultViewport: {
                        width: 1680,
                        height: 1024
                    },
                    renderAfterDocumentEvent: 'render-event',
                    // renderAfterTime: 300000,
                    injectProperty: '__PRERENDER_INJECTED',
                    inject: {
                        SERVER_URI: Config.SERVER_URI,
                        //API_SERVER_AUTH:API_SERVER_AUTH
                    }
                })
            })
        ]
    }
};
