/*
 * 处理返回动态页面的写法是： render
 * 找不到页面的话用404处理,返回静态页面的写法是： sendfile
 */
var express = require('express');
var app = express();
var api = require('./api/login');
var about = require('./controller/about');
var article = require('./controller/article');
var landpage = require('./controller/landpage');

app.use(function(req, res, next) {
  // 设置每次请求时间戳
  let date = Date.now();
  let time = new Date(date).toString();
  console.log('时间戳: ', time);
  // if (!req.session.views) {
  //   req.session.views = {}
  // }
  // // get the url pathname
  // var pathname = parseurl(req).pathname;
  // // count the views
  // req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

app.get('/', function(req, res) {
  res.render(
    'index', {
      title: "Bevis Index",
      head: "Bevis Home"
    }
  );
});

app.get('/login', function(req, res) {
  res.render(
    'partials/login'
  )
});

app.get('/register', function(req, res) {
  res.render(
    'partials/register'
  )
});

app.get('/information', function(req, res) {
  res.render(
    'information', {
      title: "Bevis Information",
      head: "Bevis Table"
    }
  )
});

app.get('/travel', function(req, res) {
  res.render(
    'travel', {
      title: "Bevis Travel",
      head: "Bevis Travel"
    }
  );
});

app.get('/404', function(req, res) {
  res.sendfile('./views/partials/404.html');
});

app.use('/api', api);
app.use('/about', about);
app.use('/article', article);
app.use('/landpage', landpage);

// 这个需要放在最尾部
app.use(function(req, res) {
  res.status(404).redirect("/404");
});

module.exports = app;
