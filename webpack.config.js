const path = require('path')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    options: './views/options/index.js',
    popup: './views/popup/index.js',
    background: './views/background/index.js',
    'contentScripts/index': './views/contentScripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '.',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'scss-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    root: path.resolve(__dirname, './src'),
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@api': './src',
      '@assets': './assets',
      '@components': './components',
      '@directive': './directive',
      '@filters': './filters',
      '@lang': './lang',
      '@store': './store',
      '@utils': './utils',
      '@views': './views',
    },
    extensions: ['.js'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['./dist/', './dist-zip/']),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
      { from: 'manifest.json', to: 'manifest.json', flatten: true },
    ]),
    new WebpackShellPlugin({
      onBuildEnd: ['node scripts/remove-evals.js'],
    }),
    new HtmlWebpackPlugin({
      title: 'Options',
      template: './index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'options'],
      filename: 'options.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Popup',
      template: './index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'popup'],
      filename: 'popup.html',
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        options: 'options',
        popup: 'popup',
        contentScripts: 'contentScripts/index',
      },
    }),
  ])
}
