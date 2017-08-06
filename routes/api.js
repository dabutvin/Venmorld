
var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

	request({ url: "https://venmo.com/api/v5/public?limit=1" }, function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
        } else {
        	try {
	            var result = JSON.parse(body);
	            var payment = result.data[0];
	            res.send(
	            {
	            	id: payment.payment_id,
	            	message: payment.message,
	            	picture: payment.actor.picture,
	            	handle: payment.actor.username
	            });
	        } catch (ex) {
	        	res.send(ex);
	        }
        }
    });
});

module.exports = router;
