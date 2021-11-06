const express = require('express');
const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookies-data');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');
const { renderError, showErrorPage } = require('../utils/render-error');

const configuratorRouter = express.Router();

configuratorRouter
  .get('/select/base/:base', (req, res) => {
    const { base } = req.params;

    if (!COOKIE_BASES[base]) {
      return renderError(res, `There is no such base as ${base}.`);
    }

    res
      .cookie('cookieBase', base)
      .render('configurator/base-selected', { base });
  })
  .get('/select/addon/:addon', (req, res) => {
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
  })
  .get('/remove/addon/:addon', (req, res) => {
    const { addon } = req.params;

    const addons = getAddonsFromReq(req).filter((add) => add !== addon);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/removed', { addon });
  });

module.exports = {
  configuratorRouter,
};
