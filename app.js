const fs = require('fs');
const express = require('express');
const spdy = require('spdy');
const path = require('path');
const compress = require('compression');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const history = require('connect-history-api-fallback');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('./build/webpack.dev.conf');

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const pass = require('./passport.config')(passport, JwtStrategy)
const unless = require('express-unless');

const app = express();

const options = {
    key: fs.readFileSync(__dirname + '/keys/server.key'),
    cert:  fs.readFileSync(__dirname + '/keys/server.crt')
}

require('./server/websocket.js')

app.use(compress());
app.use(history({
    verbose: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.AUTH) {
  app.use(pass.initialize())
  const passportAuth = function(req,res,next) {
    pass.authenticate('jwt', function(err, user, info) {
      if (err && err.expiresSoon === true) {
        res.locals.expiresSoon = true
      } else {
        res.locals.expiresSoon = false
      }
      if (info && info.name === 'TokenExpiredError') {
        res.clearCookie("jwt");
      }
      next()
    }, {session: false, failureRedirect:'/'})(req,res,next)
  }
  passportAuth.unless = unless
  app.use(passportAuth.unless({
    path: [
      '/',
      '/auth/login',
      '/auth/logout',
      '/auth/signup',
      '/__webpack_hmr',
      /.*\.(js|html|jpg|jpeg|css)$/i
    ]
  }))

  if (process.env.DATA_SOURCE === 'mongo') {
    app.use('/trades/mongo', require('./server/routes/trades/mongo'));
    app.use('/trades/postgres', require('./server/routes/trades/postgres'));
    app.use('/auth', require('./server/routes/auth/mongo'));
  } else {
    app.use('/auth', require('./server/routes/auth/local'));
  }

  app.get('/checkAuth', (req, res) => {
    if (req.cookies['jwt']) {
      res.locals.expiresSoon ? res.send({authenticated: true, expiresSoon: res.locals.expiresSoon}) : res.send({authenticated: true})
    } else {
      res.send({authenticated: false})
    }
  })
}
app.use('/trades/local', require('./server/routes/trades/local'));
app.use('/api', require('./server/routes/components/local'));



module.exports = webpackConfig.then((webpackConfig) => {
    let compiler = webpack(webpackConfig);

    compiler.apply(new webpack.ProgressPlugin());

    app.use(middleware(compiler, {
        // webpack-dev-middleware options
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500).end();
        // res.render('error');
    });

    app.listen(webpackConfig.devServer.port, () => console.log('Listening on port 8080'));
    // spdy
    //     .createServer(options, app)
    //     .listen(webpackConfig.devServer.port, (error) => {
    //         if (error) {
    //             console.error(error)
    //             return process.exit(1)
    //         } else {
    //             console.log('Listening on port: ' + webpackConfig.devServer.port + '.')
    //         }
    //     })
})
