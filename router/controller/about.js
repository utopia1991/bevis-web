// index router
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.render(
    'about/about', {
      title: "About Bevis",
      head: "About Bevis"
    }
  )
});

app.get('/game', function(req, res) {
  res.render(
    'about/game', {
      title: "Bevis Game",
      head: "Bevis Game"
    }
  );
});

app.get('/wechat', function(req, res) {
  res.render(
    'about/wechat', {
      title: 'Bevis Wechat',
      head: "Bevis Wechat",
      name: "Bevis"
    }
  );
});

module.exports = app;
