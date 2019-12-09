const express = require('express');
const request = require('request')
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const cors = require('cors');
router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const oauth = require('../KEY.js');
const private = require('../private.json')
const secret = require('../secret.json')
const loadGoogleMapsApi = require('load-google-maps-api')
const mongoose = require('mongoose');
const moment = require('moment');
const googleMapsClient = require('@google/maps').createClient({
  key: oauth.api_key
});

const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/searches', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database.")
});

var last_search;
const searchSchema = new Schema({
  datetime: Date,
  query: String,
  location: String,
  result: String,
});

const searchModel = mongoose.model('Search2', searchSchema)

router.get('/searched', async (req, res, next)=>{
  let recents = await searchModel.find().sort({datetime:-1}).limit(5);
  setTimeout(function () {
    if(last_search){
      res.send(last_search)
    } else {
      res.send(recents[0].result)
    }
  }, 5000);


});


router.post('/search', async (req, res, next) => {
  console.log(req.body)
  try {
    const ret = await findEvents(req.body, res);

  } catch(e) {
    res.render('location', {data: e})
  }

});

const parseDocs = (docs) => {
  docs.exec(function(err, results){
    if(err) return console.error(err)
    return results;
  })
}

// const find_recents = async () => { return await searchModel.find().sort({datetime:-1}).limit(5).exec()
const findEvents = async (og_body, response) => {

  try {

    // console.log(typeof body.country)
      let url_option = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + oauth.ticket_key + "&keyword=" + og_body.event
      if(og_body.city){ url_option =  url_option+"&city="+og_body.city}
      if(og_body.country){ url_option =  url_option+"&countryCode="+og_body.country}
      if(og_body.state){ url_option =  url_option+"&stateCode="+og_body.state}

      console.log(url_option)

      let result = await request({
        method:'GET',
        url: url_option ,
        headers: {
          'Content-Type': 'application/json',
        }}, function(err, res, body){
          const parsed_body = JSON.parse(body);
          let goodies;
          try {
            const emb = parsed_body._embedded.events
            goodies = JSON.stringify(emb)
          } catch {
            goodies = "None found."
          }
          last_search = goodies;

          let newSearch = new searchModel({
            datetime: moment().format(),
            query: og_body.event,
            location: og_body.city + ", " + og_body.state + ", " + og_body.country,
            result: goodies
          });
          newSearch.save().then(function (err, search) {
            if (err) return console.error(err);
            console.log("Search logged.")
          });

          response.redirect("/ps7/searched")
          // response.render('location', {data: goodies, new_recents:recents});
        })

    } catch (e) {
      console.error("Error:\n" + e);
    throw e;
  }


};

module.exports = router;
