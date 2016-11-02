/*
 * 处理返回动态页面的写法是： render
 * 找不到页面的话用404处理,返回静态页面的写法是： sendfile
 */

var express = require('express');
var router = express();
var blogEngine = require('../model/blog');  // 加载数据模块

router.get('/', function (req, res) {
    res.render(
        'index',
        {
            title: "Bevis Index",
            head: "Bevis Home"
        }
    )
});

router.get('/index', function (req, res) {
    res.render(
        'index',
        {
            title: "Bevis Index",
            head: "Bevis Home"
        }
    )
});

router.get('/login', function (req, res) {
    res.render(
        'login'
    )
});

router.get('/register', function (req, res) {
    res.render(
        'register'
    )
});

router.get('/landpage', function (req, res) {
    res.render(
        'landpage',
        {
            title: "LandingPage",
            head: "LandingPage"
        }
    )
});

router.get('/information', function (req, res) {
    res.render(
        'information',
        {
            title: "Bevis Information",
            head: "Bevis Table"
        }
    )
});

router.get('/about', function (req, res) {
    res.render(
        'about',
        {
            title: "About Bevis",
            head: "About Bevis"
        }
    )
});

router.get('/wing', function (req, res) {
    res.render(
        'Anime',
        {
            title: "Bevis Anime"
        }
    )
});

router.get('/article', function (req, res) {
    res.render(
        'article',
        {
            title: "Bevis Article",
            head: "Bevis Article",
            entries: blogEngine.getBlogEntries()
        }
    )
});

router.get('/article/:essay', function (req, res) {
    var entry = blogEngine.getBlogEntry(req.params.essay);
    res.render(
        'content',
        {
            title: entry.title,
            head: "Bevis Article",
            blog: entry
        }
    )
});

router.get('/logo', function (req, res) {
    res.render(
        'logo',
        {
            title: "Bevis Logo",
            head: "Bevis Logo"
        }
    )
});

router.get('/aboutArticle', function (req, res) {
    res.render(
        'aboutArticle',
        {
            title: "aboutArticle",
            head: "aboutArticle"
        }
    );
});

router.get('/map', function (req, res) {
    res.render(
        'map',
        {
            title: "Bevis Travel",
            head: "Bevis Travel"
        }
    );
});

router.get('/game', function (req, res) {
    res.render(
        'game',
        {
            title: "Bevis Game",
            head: "Bevis Game"
        }
    );
});

router.get('/wechat', function (req, res) {
    res.render(
        'wechat',
        {
            title: "Bevis Wechat",
            head: "Bevis Wechat"
        }
    );
});

router.get('/blowup', function (req, res) {
    res.render(
        'blowup',
        {
            title: "Bevis Blowup",
            head: "Bevis Blowup"
        }
    );
});

router.get('/lottery', function (req, res) {
    res.render(
        'lottery',
        {
            title: "Bevis Lottery",
            head: "Bevis Lottery"
        }
    );
});

router.get('/typetype', function (req, res) {
    res.render(
        'typetype',
        {
            title: "Bevis Typetype",
            head: "Bevis Typetype"
        }
    );
});

router.get('/rain', function (req, res) {
    res.sendfile('./views/rain.html');
});

router.get('/fiveElement', function (req, res) {
    res.sendfile('./views/fiveElement.html');
});

router.get('/404', function (req, res) {
    res.sendfile('./views/404.html');
});

router.use(function (req, res) {
    res.status(404).sendfile('./views/404.html');
});

// api login
router.post("/api/login", function (req, res) {
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

// api register
router.post("/api/register", function (req, res) {
    if (req.body.email != '' && req.body.name != '' && req.body.password == req.body.repassword) {
        res.send(200);
    } else {
        res.send(404);
    }
});

module.exports = router;