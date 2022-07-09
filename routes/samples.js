const path = require('path');
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, `../views/samples.html`));
});

router.get('/:sample', (req, res) => {
  const url = `https://static.bandlab.com/soundbanks/previews/${req.params.sample}`;
  req.pipe(request(url)).pipe(res);
});

module.exports = router;
