// article router
const express = require('express');
const app = express();
const blogEngine = require('../../models/blog');  // 加载数据模块

app.get('/', function (req, res) {
	res.render(
		'article/article',
		{
			title: "Bevis Article",
			head: "Bevis Article",
			entries: blogEngine.getBlogEntries()
		}
	)
});

app.get('/aboutArticle', function (req, res) {
	res.render(
		'article/aboutArticle',
		{
			title: "aboutArticle",
			head: "aboutArticle"
		}
	);
});

app.get('/:essay', function (req, res) {
	var entry = blogEngine.getBlogEntry(req.params.essay);
	res.render(
		'article/content',
		{
			title: entry.title,
			head: "Bevis Article",
			blog: entry
		}
	)
});

module.exports = app;
