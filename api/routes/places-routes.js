const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('get places');
  res.json({ message: 'udalo się!' });
});

module.exports = router;
