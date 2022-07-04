// const withPrerender = process.env.VUE_APP_WITH_PRERENDER === 'false';

const webpack = require("webpack");
// const prerenderConfig = require("./prerender.config");

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  filenameHashing: true,
  transpileDependencies: process.env.NODE_ENV === "production" ? ["vuetify"] : [],

  publicPath: process.env.NODE_ENV === "production" ? "/build/" : "/",
  assetsDir: "./",
  outputDir: "../htdocs/build/",

  css: {
    extract: {ignoreOrder: true},
    loaderOptions: {
      // pass options to sass-loader
      scss: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `@import "~@/scss/_include.scss";`,
      },
    },
  },

  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },

  configureWebpack: {
    plugins: [
      //new BundleAnalyzerPlugin(),
      // new webpack.ProvidePlugin({
      //     mapboxgl: "mapbox-gl",
      // }),
      // ...(withPrerender ? [prerenderConfig()] : []),
    ],
  },

  devServer: {
    proxy: {
      "^/(api|upload)/": {
        target: process.env.SERVER
            ? process.env.SERVER
            : "https://qritic.ru",
        //ws: true,
        changeOrigin: true,
      },
    },
  },
};
