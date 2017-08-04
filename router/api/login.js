const express = require('express');
const app = express();
const Users = require('../../models/users'); //导入模型数据模块
const async = require("async");

// login
app.post("/login", function(req, res) {
	var userId = req.body.username;
	var password = req.body.password;

	Users.findOne({
		"userId": userId
	}, function(err, result) {
		if (result === null || result.password === null) {
			req.session.error = '用户名不存在';
			res.send({
				code: -1,
				err: "用户不存在，请注册"
			});
		} else if (password !== result.password) {
			req.session.error = "密码错误";
			res.send({
				code: -1,
				err: "密码错误"
			});
		} else if (password === result.password) {
			// req.session.user = result;
			res.send(200);
		} else {
			res.send(500);
		}
	})
});

// register
app.post("/register", function(req, res) {
	var users = new Users({
		userId: req.body.name,
		password: req.body.password
	});
	Users.findOne({
		"userId": userId
	}, function(err, result) {
		if (err) {
			res.send(500);
			req.session.error = '网络异常错误';
			console.log(err);
		} else if (doc) {
			req.session.error = '用户名已存在';
			res.send(500);
		} else {
			if (req.body.name !== '' && req.body.password !== '' && req.body.password === req.body.repassword) {
				users.save(function(err) {
					if (err) {
						console.log(err);
						res.send(500);
					} else {
						res.send(200);
					}
				});
				// req.session.user = users;
			} else {
				res.send(500);
			}
		}
	});
});

// send message
app.post("/sendMessage", function(req, res) {
	let users = new Users({
		name: req.body.sendName,
		address: req.body.sendAddress,
		email: req.body.sendEmail,
		telephone: req.body.sendTelephone,
		question: req.body.sendQuestion
	});
	users.save(function(err) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.send(200);
		}
	});
});

module.exports = app;
