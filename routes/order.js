const express = require('express');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');
const { handlebarsHelpers } = require('../utils/handlebars-helpers');

const orderRouter = express.Router();

orderRouter.get('/summary', (req, res) => {
  const { cookieBase } = req.cookies;

  const addons = getAddonsFromReq(req);

  const sum =
    handlebarsHelpers.findPrice(
      Object.entries(COOKIE_BASES),
      cookieBase || 'light',
    ) +
    addons.reduce(
      (prev, curr) =>
        prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr),
      0,
    );

  res.render('order/summary', {
    cookie: {
      base: cookieBase || 'light',
      addons,
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
  });
});

module.exports = {
  orderRouter,
};
