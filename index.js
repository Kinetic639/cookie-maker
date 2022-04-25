/* eslint-disable no-underscore-dangle */
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const { HomeRouter } = require('./routes/home');
const { OrderRouter } = require('./routes/order');
const { ConfiguratorRouter } = require('./routes/configurator');
const { handlebarsHelpers } = require('./utils/handlebars-helpers');
const { COOKIE_BASES, COOKIE_ADDONS } = require('./data/cookies-data');

class CookieMakerApp {
  constructor() {
    this._loadData();
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
    this.app.use('/', new HomeRouter(this).router);
    this.app.use('/configurator', new ConfiguratorRouter(this).router);
    this.app.use('/order', new OrderRouter(this).router);
  }

  _run() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, '0.0.0.0', () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on http://localhost:${PORT}`);
    });
  }

  renderError(res, text) {
    res.render('error', {
      text,
    });
  }

  getAddonsFromReq(req) {
    const { cookieAddons } = req.cookies;
    return cookieAddons ? JSON.parse(cookieAddons) : [];
  }

  getCookieSettings(req) {
    const { cookieBase: base } = req.cookies;

    const addons = this.getAddonsFromReq(req);

    const allBases = Object.entries(this.data.COOKIE_BASES);
    const allAddons = Object.entries(this.data.COOKIE_ADDONS);

    const sum =
      handlebarsHelpers.findPrice(allBases, base || 'light') +
      addons.reduce(
        (prev, curr) => prev + handlebarsHelpers.findPrice(allAddons, curr),
        0,
      );
    return {
      addons,
      sum,
      base,
      allBases,
      allAddons,
    };
  }

  _loadData() {
    this.data = {
      COOKIE_ADDONS,
      COOKIE_BASES,
    };
  }
}

new CookieMakerApp();
