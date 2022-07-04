module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    filenameHashing: true,
    transpileDependencies: process.env.NODE_ENV === "production" ? ["vuetify"] : [],

    publicPath: process.env.NODE_ENV === "production" ? "/build/" : "/",
    assetsDir: "./",
    // outputDir: "./htdocs/build/",
    outputDir: "../htdocs/build/",

    css: {
        extract: {ignoreOrder: true},
        loaderOptions: {
            // pass options to sass-loader
            scss: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                additionalData: `@import "~@/scss/_include.scss";`,
            },
        },
    },

    chainWebpack: config => {
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    },

    devServer: {
      allowedHosts: [
        'vcard.test',
      ],
      disableHostCheck: true,
        proxy: {
            "^/(api|upload)/": {
                target: process.env.SERVER
                    ? process.env.SERVER
                    : "https://my.qritic.ru",
                //ws: true,
                changeOrigin: true,
            },
        },
    },
};
