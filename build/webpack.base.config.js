const path = require('path')

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js'),
    vendor: ['vue', 'vue-router', 'vuex', 'axios']
  },
  module: {
    rules: [
      {
        enforce: 'pre', //subjects specified files to lint rules BEFORE they are handled by other loaders
        test: /(\.js$)|(\.vue$)/, //What we want to test
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: 'css-loader',
          'scss': 'css-loader|sass-loader'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'), //Put our webpack build result in the /dist folder
    publicPath: '/',
    filename: 'assets/js/[name].js' //This means our client-entry.js file will be called /assests/js/app.js post build (app because of the entry property above)
  }
}

module.exports = config
