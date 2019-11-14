var express = require('express');
var hal = require('hal');
var fs = require('fs');
const request = require('request')
var router = express.Router();
const {OAuth2Client} = require('google-auth-library');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const oauth = require('../KEY.js');
const private = require('../private.json')
const secret = require('../secret.json')

const googleMapsClient = require('@google/maps').createClient({
  key: oauth.api_key
});
const talent = require('@google-cloud/talent').v4beta1;


router.post('/search', async (req, res, next) => {
  try {
    const ret = await basicLocationSearch(req.body, res);

  } catch(e) {
    res.render('location', {data: e})
  }

});


const basicLocationSearch = async (body, response) => {
  try {

      let url_option = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + oauth.ticket_key + "&keyword=" + body.event
      if(body.city) { url_option =  url_option+"&city="+body.city}
      if(body.country){ url_option =  url_option+"&countryCode="+body.country}
      if(body.state){ url_option =  url_option+"&stateCode="+body.state}
      let result = await request({
        method:'GET',
        url: url_option ,
        headers: {
          'Content-Type': 'application/json',
        }}, function(err, res, body){
          const parsed_body = JSON.parse(body);
          const emb = parsed_body._embedded.events
          let goodies = JSON.stringify(emb)
          response.render('location', {data: goodies});
        })

    } catch (e) {
      console.error(e);
    throw e;
  }


};

module.exports = router;
