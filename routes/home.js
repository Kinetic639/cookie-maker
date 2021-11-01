/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const express = require('express');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');
const { handlebarsHelpers } = require('../handlebars-helpers');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  const sum =
    handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), 'light') +
    ['coconut', 'honey'].reduce(
      (prev, curr) =>
        prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), curr),
      0,
    );

  res.render('home/index', {
    cookie: {
      base: 'light',
      addons: ['coconut', 'honey'],
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
    // TODO: we need something to know what are the prices of selected items
  });
});

module.exports = {
  homeRouter,
};
