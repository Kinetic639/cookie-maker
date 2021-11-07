const express = require('express');

class HomeRouter {
  constructor(cmapp) {
    this.cmapp = cmapp;
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.get('/', this.home);
  }

  home = (req, res) => {
    const { addons, sum, base, allBases, allAddons } =
      this.cmapp.getCookieSettings(req);

    res.render('home/index', {
      cookie: {
        base: base || 'light',
        addons,
      },
      allBases,
      allAddons,
      sum,
    });
  };
}

module.exports = {
  HomeRouter,
};
