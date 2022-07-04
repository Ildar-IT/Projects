module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  plugins: process.env.NODE_ENV==='production' ? ["transform-remove-console"] : []
  // "presets": [
  //   [
  //     "@babel/env",
  //     {
  //       "useBuiltIns": "usage",
  //       "targets": {
  //         "browsers": "last 2 versions, safari >= 7, ios_saf >= 9, chrome >= 52"
  //       },
  //       "loose": true
  //     }
  //   ]
  // ],


};
