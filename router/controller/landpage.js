// landpage router
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.render(
    'landpage/landpage',
    {
      title: "LandingPage",
      head: "LandingPage"
    }
  );
});

app.get('/blowup', function (req, res) {
  res.render(
    'landpage/blowup',
    {
      title: "Bevis Blowup",
      head: "Bevis Blowup"
    }
  );
});

app.get('/lottery', function (req, res) {
  res.render(
    'landpage/lottery',
    {
      title: "Bevis Lottery",
      head: "Bevis Lottery"
    }
  );
});

app.get('/logo', function (req, res) {
	res.render(
		'landpage/logo',
		{
			title: "Bevis Logo",
			head: "Bevis Logo"
		}
	)
});

app.get('/nature', function (req, res) {
  res.sendfile('./views/landpage/nature.html');
});

module.exports = app;
