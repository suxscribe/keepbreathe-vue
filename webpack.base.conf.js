const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

var webpack = require('webpack');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.pug'));

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
    // module: `${PATHS.src}/your-module.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.dist,
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to <template lang="pug"> in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['pug-loader'],
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader',
          },
        },
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
              importLoaders: 1,
              modules: {
                mode: 'icss',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                sourceMap: true,
                plugins: () => [
                  autoprefixer({ grid: true }),
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        calc: false,
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': PATHS.src,
      vue$: 'vue/dist/vue.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        {
          from: `${PATHS.src}/${PATHS.assets}fonts`,
          to: `${PATHS.assets}fonts`,
        },
        {
          from: `${PATHS.src}/${PATHS.assets}sounds`,
          to: `${PATHS.assets}sounds`,
        },
        { from: `${PATHS.src}/static`, to: '' },
      ],
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new webpack.DefinePlugin({
      'process.env': {
        PACKAGE_VERSION: '"' + version + '"',
      },
    }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
  ],
};

// removed. was preventing svg sprites from working
// {
//   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//   loader: 'file-loader',
//   options: {
//     name: '[name].[ext]',
//   },
// },
// {
//   test: /\.(png|jpg|gif|svg)$/,
//   loader: 'file-loader',
//   options: {
//     name: '[name].[ext]',
//   },
// },
