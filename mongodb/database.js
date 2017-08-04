var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/bevisdb');

db.on('error', function(error) {
	console.log('--- 数据库连接失败：' + error + ' ---');
});

db.on('open', function() {
	console.log('--- mongodb 数据库连接成功 ---')
});
