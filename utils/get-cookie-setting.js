const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');
const { getAddonsFromReq } = require('./get-addons-from-req');
const { handlebarsHelpers } = require('./handlebars-helpers');

function getCookieSettings(req) {
  const { cookieBase: base } = req.cookies;

  const addons = getAddonsFromReq(req);

  const allBases = Object.entries(COOKIE_BASES);
  const allAddons = Object.entries(COOKIE_ADDONS);

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

module.exports = {
  getCookieSettings,
};
