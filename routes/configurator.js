const express = require('express');

const configuratorRouter = express.Router();

configuratorRouter.get('/select/base/:base', (req, res) => {
  const { base } = req.params;
  res
    .cookie('cookie-base', base)
    .render('configurator/base-selected', { base });
});

module.exports = {
  configuratorRouter,
};
