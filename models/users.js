// Mongoose是MongoDB的一个对象模型工具，是基于node-mongodb-native开发的MongoDB nodejs驱动
// 可以在异步的环境下执行
// 同时它也是针对MongoDB操作的一个对象模型库，封装了MongoDB对文档的的一些增删改查等常用方法
// 让NodeJS操作Mongodb数据库变得更加灵活简单
// 通过Mongoose去创建一个“集合”并对其进行增删改查
// 就要用到它的三个属性：Schema(数据属性模型)、Model、Entity
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//schema: 文件形式存储的数据库模型骨架
var UsersSchema = new Schema({
  userId: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  }
});

// model: 由Schema构造生成的model，除了Schema定义的数据库骨架以外
// 还具有数据库操作的行为，类似于管理数据库属性、行为的类。
var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
