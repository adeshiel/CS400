var express = require('express');
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
  const ret = await basicLocationSearch(req.body.location, req.body.job, 50);
  console.log('readyyyyyyyyyy')
  console.log(ret)
  res.render('location', {data: JSON.stringify(ret) });
} catch(e) {
  res.render('location', {data: e})
}

});



const basicLocationSearch = async (
  location,
  keyword,
  distance
) => {
  try {
      const client = new talent.CompletionClient({keyFilename:"C:/Users/Ash/Documents/BU/CS400/CS400/PS4/private.json", key: oauth.api_key});

      // const client = new OAuth2Client(
      //   secret.web.client_id,
      //   secret.web.client_secret,
      //   secret.web.redirect_uris[3]
      // );

      // client.credentials = {
	    //             key: oauth.api_key
	    //  }

      const scopes = ['https://www.googleapis.com/auth/cloud-platform','https://www.googleapis.com/auth/jobs' ]

      // const authUrl = client.generateAuthUrl({
      //     access_type: 'offline',
      //     scope: scopes
      // });



      const locationFilter = {
        address: location,
        distanceInMiles: distance,
      };

      const jobQuery = {
        locationFilters: [locationFilter],
        query: keyword,
      };
      const metadata = {
        // domain: "UNKNOWN",
        // sessionId: "UNKNOWN",
        // userId: "UNKNOWN",
        allowMissingIds: true,
      }

      // const requ = {
      //     parent: 'projects/' + oauth.project_id ,
      //     jobQuery: jobQuery,
      //     requestMetadata: metadata,
      //   };

      const request = {
    parent: 'projects/' + oauth.project_id ,
    query: keyword,
    pageSize: 5,
  }
        // var result = ''
      // const result = await client.request({url:'https://jobs.googleapis.com/v4beta1/projects/' + oauth.project_id + '/jobs:search', requestBody: requ}, function(err,httpResponse,body){
      //   console.log("Split");
      //   console.log(err) } );
      const result = await client.completeQuery(request).then(responses => {
        const resources = responses[0];
        console.log(resources)
        for (const result of resources.completionResults) {
        console.log(`Suggested title: ${result.suggestion}`);
        // Suggestion type is JOB_TITLE or COMPANY_TITLE
        console.log(`Suggestion type: ${result.type}`);
      }

        return resources;
      })
      .catch(err => {
        console.error(err);
        throw err;
      });

      console.log(result)
      return result;

  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = router;
