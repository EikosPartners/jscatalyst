const path = require('path')
const webpack = require('webpack')
// var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader')
const npmCfg = require('../package.json')
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')
const config = require('../config')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var banner = [
  npmCfg.name + ' v' + npmCfg.version,
  '(c) ' + (new Date().getFullYear()) + ' ' + npmCfg.author,
  npmCfg.homepage
].join('\n')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig =  {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'jscatalyst.min.js',
    library: 'jscatalyst',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@@': resolve('node_modules'),
      'docs': resolve('docs')
    }
  },
  externals: {
    vue: {
				root: "Vue",
        commonjs: 'vue',
				commonjs2: "vue",
				amd: "vue"
		},
    // 'plotly.js/dist/plotly': {
    //   root: 'Plotly',
    //   commonjs: 'plotly.js/dist/plotly',
    //   commonjs2: 'plotly.js/dist/plotly',
    //   amd: 'plotly.js/dist/plotly'
    // },
    d3: {
      root: 'd3',
      commonjs: 'd3',
      commonjs2: 'd3',
      amd: 'd3'
    },
    // chartist: {
    //   root: 'Chartist',
    //   commonjs: 'chartist',
    //   commonjs2: 'chartist',
    //   amd: 'chartist'
    // },
    moment: {
      root: 'moment',
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment'
    },
    'moment-duration-format': {
      root: 'moment-duration-format',
      commonjs: 'moment-duration-format',
      commonjs2: 'moment-duration-format',
      amd: 'moment-duration-format'
    },
    jquery: {
      root: 'jquery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery'
    },
    // 'chart.js': {
    //   root: 'Chart',
    //   commonjs: 'chart.js',
    //   commonjs2: 'chart.js',
    //   amd: 'chart.js'
    // },
    axios: {
      root: 'Axios',
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios'
    },
    'd3-horizon-chart': {
      root: 'd3horizonchart',
      commonjs: 'd3-horizon-chart',
      commonjs2: 'd3-horizon-chart',
      amd: 'd3-horizon-chart'
    },
    'topojson-client': {
      root: 'Topojson',
      commonjs: 'topojson-client',
      commonjs2: 'topojson-client',
      amd: 'topojson-client'
    },
    vuetify: {
      root: 'Vuetify',
      commonjs: 'vuetify',
      commonjs2: 'vuetify',
      amd: 'vuetify'
    },
    'vue-socket.io': {
      root: 'VueSocketio',
      commonjs: 'vue-socket.io',
      commonjs2: 'vue-socket.io',
      amd: 'vue-socket.io'
    },
    'ag-grid': {
      root: 'AgGrid',
      commonjs: 'ag-grid',
      commonjs2: 'ag-grid',
      amd: 'ag-grid'
    },
    'ag-grid-vue': {
      root: 'Aggridvue',
      commonjs: 'ag-grid-vue',
      commonjs2: 'ag-grid-vue',
      amd: 'ag-grid-vue'
    }
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    }).concat(
      [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        include: [resolve('src')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        exclude: /(windowmanager|node_modules)/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.js$/,
      //   loader: 'ify-loader'
      // },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }]
    )
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/SankeyDiagram/),
    new webpack.IgnorePlugin(/PlotlyAnimatedLineGraph/),
    new webpack.IgnorePlugin(/PlotlyStreamingGraphic/),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: 'jscatalyst.min.css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
}

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
