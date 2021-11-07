const express = require('express');

class ConfiguratorRouter {
  constructor(cmapp) {
    this.cmapp = cmapp;
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.get('/select/base/:base', this.selectBase);
    this.router.get('/select/addon/:addon', this.selectAddon);
    this.router.get('/remove/addon/:addon', this.removeAddon);
  }

  selectBase = (req, res) => {
    const { base } = req.params;

    if (!this.cmapp.data.COOKIE_BASES[base]) {
      return this.cmapp.renderError(res, `There is no such base as ${base}.`);
    }

    res
      .cookie('cookieBase', base)
      .render('configurator/base-selected', { base });
  };

  selectAddon = (req, res) => {
    const { addon } = req.params;

    if (!this.cmapp.data.COOKIE_ADDONS[addon]) {
      return this.cmapp.renderError(
        res,
        `there is no ${addon} addon available!`,
      );
    }

    const addons = this.cmapp.getAddonsFromReq(req);

    if (addons.includes(addon)) {
      return this.cmapp.renderError(
        res,
        `${addon} has already been added to your cookie. Please select different addon.`,
      );
    }

    addons.push(addon);
    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', { addon });
  };

  removeAddon = (req, res) => {
    const { addon } = req.params;

    const oldAddons = this.cmapp.getAddonsFromReq(req);

    if (!oldAddons.includes(addon)) {
      return this.cmapp.renderError(
        res,
        `Your cookie doesn't contains ${addon} addon.`,
      );
    }

    const newAddons = this.cmapp.getAddonsFromReq(req).filter((add) => add !== addon);

    res
      .cookie('cookieAddons', JSON.stringify(newAddons))
      .render('configurator/removed', { addon });
  };
}

module.exports = {
  ConfiguratorRouter,
};
