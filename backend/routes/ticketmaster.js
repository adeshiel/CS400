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

const searchSchema = new Schema({
  datetime: Date,
  query: String,
  location: String,
  result: String,
});

const searchModel = mongoose.model('Search2', searchSchema)

router.get('/searched', async (req, res, next)=>{
  let recents = await searchModel.find().sort({datetime:-1}).limit(5);
  // res.render('location', {data: recents.result, new_recents:recents});
  console.log(JSON.parse(recents[0].result))
  res.send(recents[0].result)

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
const findEvents = async (body, response) => {

  try {

    // console.log(typeof body.country)
      let url_option = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + oauth.ticket_key + "&keyword=" + body.event
      if(body.city){ url_option =  url_option+"&city="+body.city}
      if(body.country){ url_option =  url_option+"&countryCode="+body.country}
      if(body.state){ url_option =  url_option+"&stateCode="+body.state}

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

          let newSearch = new searchModel({
            datetime: moment().format(),
            query: body.event,
            location: body.city + ", " + body.state + ", " + body.country,
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
