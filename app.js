var hbs = require('hbs');                               // 加载hbs模块
var fs = require('fs');                                 // 读取文件
var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');                // 中间件 body-parser 和 multer 用于处理和解析post请求的数据
var multer = require('multer');
var app = module.exports.app = exports.app = express(); // 将 express 开发出去
var port = config.port || 8000;                         // 设定port变量，意为访问端口
var mongoose = require('mongoose');                     // 引入数据库
var router = require('./controller/router');
var api = require('./controller/api');
var blocks = {};

mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost:27017/bevisdb');  // 连接数据库

db.connection.on('error', function (error) {
	console.log('数据库连接失败：' + error);
});
db.connection.on('open', function(){
	console.log('---- mongodb 数据库连接成功 ----')
});

app.set('view engine', 'hbs');                          // 指定模板文件的后缀名为hbs
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(express.static('client'));                      // 设定本地开发静态文件目录
app.engine('html', hbs.__express);                      // 运行hbs模块
app.listen(port);                                       // 设置端口
app.use(router);

hbs.registerHelper('extend', function (name, context) { // 设置模版引擎引用 js 和 css
	var block = blocks[name];
	if (!block) {
		block = blocks[name] = [];
	}
	block.push(context.fn(this));
});
hbs.registerHelper('block', function (name) {
	var val = (blocks[name] || []).join('\n');
	blocks[name] = [];
	return val;
});
hbs.registerPartials(__dirname + '/views/partials');    // 页面元素模块化
