module.exports = {
    transpileDependencies: [
        'vuetify'
    ],

    devServer: {
        proxy: {
            "^/(api|upload)/": {
                target: process.env.SERVER
                    ? process.env.SERVER
                    : "http://lebonheur.db.dev.playnext.net/",
                //ws: true,
                changeOrigin: true,
            },
        },
    },
};
