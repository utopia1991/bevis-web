var express = require('express');
var router = express();

router.get("/api/login", function (req, res) {
	var dataUser = {
		username: 'bevis',
		password: 'sh1991sh0619'
	};
	if (req.body.username == dataUser.username && req.body.password == dataUser.password) {
		res.send(200);
	} else {
		res.send(404);
	}
});

module.exports = router;
