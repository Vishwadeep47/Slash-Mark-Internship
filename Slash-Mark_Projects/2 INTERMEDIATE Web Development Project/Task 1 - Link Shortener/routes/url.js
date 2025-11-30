const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validUrl = require('valid-url');
const config = require('config');
const db = require('../utils/db');

// POST /api/url/shorten
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base URL');
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = db.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = {
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        };

        db.save(url);
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(401).json('Invalid long URL');
  }
});

// GET /:code
// GET /:code
router.get('/:code', async (req, res) => {
  try {
    const url = db.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
