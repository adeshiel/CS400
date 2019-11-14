var express = require('express');
var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const oauth = require('../KEY');
const countries = require('../country_names.json')
const states = require('../states.json')

const googleMapsClient = require('@google/maps').createClient({
  key: oauth.api_key
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {country_list:countries, state_list:states});
});


module.exports = router;
