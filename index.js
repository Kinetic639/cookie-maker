/* eslint-disable no-underscore-dangle */
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const { HomeRouter } = require('./routes/home');
const { orderRouter } = require('./routes/order');
const { ConfiguratorRouter } = require('./routes/configurator');
const { handlebarsHelpers } = require('./utils/handlebars-helpers');

class CookieMakerApp {
  constructor() {
    this._configureApp();
    this._setRoutes();
    this._run();
  }

  _configureApp() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(cookieParser());

    this.app.engine(
      '.hbs',
      hbs({ extname: '.hbs', helpers: handlebarsHelpers }),
    );
    this.app.set('view engine', '.hbs');
  }

  _setRoutes() {
    this.app.use('/', new HomeRouter().router);
    this.app.use('/configurator', new ConfiguratorRouter().router);
    this.app.use('/order', orderRouter);
  }

  _run() {
    this.app.listen(3000, 'localhost', () => {
      // eslint-disable-next-line no-console
      console.log('Listening on http://localhost:3000');
    });
  }
}

// eslint-disable-next-line no-new
new CookieMakerApp();
