function renderError(res, text) {
  res.render('error', {
    text,
  });
}

module.exports = {
  renderError,
};
