var express = require('express');
var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const oauth = require('../KEY');

const googleMapsClient = require('@google/maps').createClient({
  key: oauth.api_key
});
const talent = require('@google-cloud/talent').v4beta1;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
