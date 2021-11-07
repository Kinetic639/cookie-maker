/* eslint-disable class-methods-use-this */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const express = require('express');
const { getCookieSettings } = require('../utils/get-cookie-setting');

class HomeRouter {
  constructor() {
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.get('/', this.home);
  }

  home(req, res) {
    const { addons, sum, base, allBases, allAddons } = getCookieSettings(req);

    res.render('home/index', {
      cookie: {
        base: base || 'light',
        addons,
      },
      allBases,
      allAddons,
      sum,
    });
  }
}

module.exports = {
  HomeRouter,
};
