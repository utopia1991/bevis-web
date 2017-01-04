var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//申明一个 mongoons 对象
var UsersSchema = new Schema({
	title: String,
	description: String,
	by: String,
	url: String,
	tags: Array,
	likes: Number
});

//查询的静态方法
UsersSchema.statics = {
	fetch: function(cb) { //查询所有数据
		return this
			.find()
			.sort('likes') //排序
			.exec(cb) //回调
	},
	findById: function(id, cb) { //根据id查询单条数据
		return this
			.findOne({_id: id})
			.exec(cb)
	}
};

//暴露出去的方法
module.exports = UsersSchema;
