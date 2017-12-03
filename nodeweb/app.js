/**
 * 应用程序的启动入口文件
 * 用户发送请求 -> url -> 解析路由 -> 找到匹配的规则 -> 执行绑定的函数，返回对应的内容给客户
 * /public: 静态文件，直接读取指定的目录下的文件，返回给用户
 * 动态：处理业务逻辑，加载模板，解析模板，返回数据给用户
 */
// 加载 express 模块
var express = require('express');
// 加载模板处理模块
var swig = require('swig');
// 加载数据库模块
// var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
// 创建 APP 应用 <==> NODEJS 中 http.createServer
var app = express();

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀；
// 第二个参数：用于解析模板内容的方法
app.engine('html', swig.renderFile);
// 设置模板文件的存放目录，第一个参数必须是 views，第二个参数是目录
app.set('views', './views');
// 注册所使用的模板引擎，第一个参必须是 view engine，第二个参数和 app.engine 这个方法中定义的模板引擎的名称(第一个参数)是一致的
app.set('view engine', 'html');
// 在开发过程中，需要取消缓存
swig.setDefaults({cache: false});
// 设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));
/**
 * 根据不同的功能划分不同的模块
 */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

var url = "mongodb://localhost:27017/nodeweb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  
  app.listen(8081);
//   db.close();
});