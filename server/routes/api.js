var express = require('express');
var router = express.Router();

/* GET /api page. */
router.get('/', function(req, res) {
  res.json({'version':'v1.0'});
});

module.exports = router;
