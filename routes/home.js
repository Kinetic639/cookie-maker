/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const express = require('express');
const { getCookieSettings } = require('../utils/get-cookie-setting');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  const { addons, sum, base, allBases, allAddons } = getCookieSettings(req);

  res.render('home/index', {
    cookie: {
      base,
      addons,
    },
    allBases,
    allAddons,
    sum,
  });
});

module.exports = {
  homeRouter,
};
