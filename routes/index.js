const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send("Welcome to Learning English Project Staging");
});
module.exports = router;
