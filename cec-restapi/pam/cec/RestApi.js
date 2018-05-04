'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger();

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var CECConnector = require('./Connector');

const context = {
  /*host: "https://emea-gse00009991.sites.us2.oraclecloud.com",
  domain: "gse00009991",
  user: "wedo",
  password: "Oc4j1014"*/
  host: process.env.CEC_URL,
  domain: process.env.CEC_DOMAIN,
  user: process.env.CEC_USER,
  password: process.env.CEC_PW
}

const config = {
  /*contentType: "process.env.CEC_CONTENT_TYPE",
  collectionId: "process.env.CEC_COLLECTION_ID"*/
  contentType: process.env.CEC_CONTENT_TYPE,
  collectionId: process.env.CEC_COLLECTION_ID
}

router.use(bodyParser.urlencoded({ extended: true }));

//router.get('/wp/:id', function (req, res) {
router.get('/get-respuesta/:name', function (req, res) {
  //logger.info("WEDOPAM::getById");
  var rc = require('./RC');
  let data = {
    name: req.params.name
  }
  rc(context)
    .then(client => client.getContentItem(data, res))

});

/*lookup: contentId => {
  logger.log('command: lookup - params [contentId: ' + contentId + ']');
  console.log("lookup!");

  return restClient(context)
    .then(client => service(client, config.contentType, null))
    .then(s => {
      var item = s.lookup(contentId);
      console.log('lookup=' + JSON.stringify(item))
      return 1;
    })
}*/

/*router.post('/wp', function (req, res) {
  logger.info("WEDOPAM::create");
  var rc = require('./RC');
  let data = req.body;
  let data2 = {
    type: "WEDOPAM",
    name: "FerrisBueller",
    description: "Ferrir Bueller's Day Off",
    data: {
      "wedopam_uuid" : "FerrisBueller",
      "wedopam_demozone" : "MADRID",
      "wedopam_fullname" : "Ferris Bueller",
      "wedopam_destination1" : "Cordoba",
      "wedopam_destination2" : "Sevilla",
      "wedopam_destination3" : "Cadiz",
      "wedopam_email" : "Ferris.Bueller@everis.com"
    }
  }
  //data.data.wedopam_timestamp = Date.now().getMilliseconds();
  rc(context)
    .then(client => client.createContentItem(data, res))

});*/

/*router.post('/wp/:id', function (req, res) {
  logger.info("WEDOPAM::update");
  var rc = require('./RC');
  let data = req.body;
  if( !data.id ) {
    data.id = req.params.id;
  }
  let data2 = {
    "id": req.params.id,
    "type": "WEDOPAM",
    "name": "FerrisBueller",
    "description": "Ferrir Bueller's Day Off",
    "data": {
      "wedopam_uuid" : "FerrisBueller",
      "wedopam_demozone" : "MADRID",
      "wedopam_fullname" : "Ferris Bueller",
      "wedopam_destination1" : "Cordoba",
      "wedopam_destination2" : "Sevilla",
      "wedopam_destination3" : "Cadiz",
      "wedopam_email" : "Ferris.Bueller@everis.com"
    }
  }
  logger.info("WEDOPAM::update.Data="+JSON.stringify(data));

  //data.data.wedopam_timestamp = Date.now().getMilliseconds();
  rc(context)
    .then(client => client.updateContentItem(data, res))

});


router.put('/wp/:id', function (req, res) {
  logger.info("WEDOPAM::updateFields");
  var rc = require('./RC');
  let data = req.body;
  if( !data.id ) {
    data.id = req.params.id;
  }
  rc(context)
    .then(client => client.updateContentItemFields(data, res))

});


router.post('/search', function (req, res) {
  logger.info("WEDOPAM::search");
  var rc = require('./RC');
  let data = req.body;

  rc(context)
    .then(client => client.searchByType(data, res))

});*/



module.exports = router;
