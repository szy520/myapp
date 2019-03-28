var express = require('express');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/*token */
router.get('/token', function (req, res, next) {
  request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx447dfdb670e250d9&secret=feed94b179a5dd64037c958cd3ee6701', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log(data)
      var access_token = data.access_token;
      request("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi", function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.json({
		access_token:access_token,
		ticketdata:body	
	  })
        }
      })
    }
  });
});

module.exports = router;
