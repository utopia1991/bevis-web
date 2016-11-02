/*
 * 这个脚本的功能是爬虫抓包一个页面,将页面的链接全部抓取出来,逐一访问并且返回状态码
 */

var http = require('http');
var superagent = require('superagent');                                                // superagent 抓取页面数据
var cheerio = require('cheerio');
var async = require('async');
var crawlerPage = "http://pengujian.healthpocket.com/dental-insurance/sitemap.xml";    // 配置爬虫要抓取的页面
var defaultLink = "pengujian.healthpocket.com";                                        // 配置的 http host
var defaultUrl = "http://"+defaultLink;                                                // 正则去除的的前缀

// 数组批量去除前缀
function regURL(s) {
    var pattern = new RegExp(defaultUrl);
    var rs = [];
    for (var i = 0; i < s.length; i++) {
        rs[i] = s[i].replace(pattern, '');
    }
    return rs;
}

// create 需要的访问的 http 协议
function createOptions(s) {
    var options = [];
    for (var i = 0; i < s.length; i++) {
        options[i] = {
            host : defaultLink,
            port : 80,
            path : s[i]
        };
    }
    return options;
}

superagent.get(crawlerPage).end(function (err, sres) {
    if (err) {
        return next(err);
    }
    var $ = cheerio.load(sres.text);
    var items = [];
    $('loc').each(function (idx, element){
        var $element = $(element);
        items.push(
            $element.html()
        );
    });
    items = regURL(items);
    options = createOptions(items);

    // 每次限制 1 个链接去访问,并且打印出 uri
    async.eachLimit(options, 1, function(option,next) {
        console.log(option.path);
        http.get(option, function (res) {
            console.log(res.statusCode);
            next();
        }).on('error', function (e) {
            console.log("Error: " + e.message);
            next();
        });
    }, function(err){
        if(err) {
            console.log('Fail!');
        } else {
            console.log('Success');
        }
    });
});