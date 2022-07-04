module.exports = {
    transpileDependencies: [
        'vuetify'
    ],

    css: {
        extract: {ignoreOrder: true},
        loaderOptions: {
            // pass options to sass-loader
            scss: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                additionalData: `@import "~@/styles/_include.scss";`,
            },
        },
    },

    devServer: {
        proxy: {
            "/.+\.php$/": {
                target: process.env.SERVER
                    ? process.env.SERVER
                    : "https://silavtebe.zarina.ru",
                //ws: true,
                changeOrigin: true,
            },
        },
    },
};
