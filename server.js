var hbs = require('hbs');
var fs = require('fs'); // 读取文件
var express = require('express');
var config = require('./config');
var sconfig = require('config-lite');
var bodyParser = require('body-parser'); // 中间件 body-parser 和 multer 用于处理和解析post请求的数据
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connectMongo = require('connect-mongo');
var app = module.exports.app = exports.app = express();
var port = config.port || 2000;
var routers = require('./router/index');
var blocks = {};
var MongoStore = connectMongo(session);

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	next();
});
// 设置 session
app.use(cookieParser());
// app.use(session({
// 	name: sconfig.session.name,
// 	secret: sconfig.session.secret,
// 	resave: true,
// 	saveUninitialized: false,
// 	cookie: sconfig.session.cookie,
// 	store: new MongoStore({
// 		url: sconfig.url
// 	})
// }));
app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static('public'));  // 设定本地开发静态文件目录
app.use(routers);  // 配置路由
app.engine('html', hbs.__express);  // 运行hbs模块

hbs.registerHelper('extend', function(name, context) { // 设置模版引擎引用 js 和 css
	var block = blocks[name];
	if (!block) {
		block = blocks[name] = [];
	}
	block.push(context.fn(this));
});
hbs.registerHelper('block', function(name) {
	var val = (blocks[name] || []).join('\n');
	blocks[name] = [];
	return val;
});
hbs.registerPartials(__dirname + '/views/partials'); // 页面元素模块化

app.listen(port);
