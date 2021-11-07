const express = require('express');
const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookies-data');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');
const { renderError } = require('../utils/render-error');

class ConfiguratorRouter {
  constructor() {
    this.router = express.Router();
    this.setUpRoutes();
  }

  setUpRoutes() {
    this.router.get('/select/base/:base', this.selectBase);
    this.router.get('/select/addon/:addon', this.selectAddon);
    this.router.get('/select/addon/:addon', this.removeAddon);
  }

  selectBase(req, res) {
    const { base } = req.params;

    if (!COOKIE_BASES[base]) {
      return renderError(res, `There is no such base as ${base}.`);
    }

    res
      .cookie('cookieBase', base)
      .render('configurator/base-selected', { base });
  }

  selectAddon(req, res) {
    const { addon } = req.params;

    if (!COOKIE_ADDONS[addon]) {
      return renderError(res, `there is no ${addon} addon available!`);
    }

    const addons = getAddonsFromReq(req);

    if (addons.includes(addon)) {
      return renderError(
        res,
        `${addon} has already been added to your cookie. Please select different addon.`,
      );
    }

    addons.push(addon);
    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', { addon });
  }

  removeAddon(req, res) {
    const { addon } = req.params;

    const oldAddons = getAddonsFromReq(req);

    if (!oldAddons.includes(addon)) {
      return renderError(res, `Your cookie doesn't contains ${addon} addon.`);
    }

    const newAddons = getAddonsFromReq(req).filter((add) => add !== addon);

    res
      .cookie('cookieAddons', JSON.stringify(newAddons))
      .render('configurator/removed', { addon });
  }
}

module.exports = {
  ConfiguratorRouter,
};
