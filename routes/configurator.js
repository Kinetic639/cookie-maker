const express = require('express');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');

const configuratorRouter = express.Router();

configuratorRouter.get('/select/base/:base', (req, res) => {
  const { base } = req.params;
  res.cookie('cookieBase', base).render('configurator/base-selected', { base });
});

configuratorRouter.get('/select/addon/:addon', (req, res) => {
  const { addon } = req.params;

  const addons = getAddonsFromReq(req);
  addons.push(addon);
  res
    .cookie('cookieAddons', JSON.stringify(addons))
    .render('configurator/added', { addon });
});

module.exports = {
  configuratorRouter,
};
