var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/bevisdb');  // 连接数据库
var db = mongoose.connection;

db.on('error', function (error) {
	console.log('数据库连接失败：' + error);
});
db.on('open', function(){
	console.log('---- mongodb 数据库连接成功 ----')
});

//schema: 创建一个 schema（数据库模型骨架）
var UsersSchema = new Schema({
	name: String,
	userId: String,
	address: String,
	email: String,
	telephone: String,
	question: String
});

// model: 由 schema 创建一个 model
var Users = mongoose.model('users', UsersSchema);

module.exports = Users;
