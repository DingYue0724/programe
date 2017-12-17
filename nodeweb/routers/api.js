var express = require('express');
var router = express.Router();
var User = require('../models/User');

var Content = require('../models/Content');

// 统一返回格式
var responseData;

router.use(function (req, res, next) {
    responseData = {
        code: 0,    // 返回的错误码
        message: '' // 返回的错误信息
    }
    next();
});

/**
 * 用户注册：
 * 1、用户名不能为空
 * 2、密码不能为空
 * 3、两次输入的密码必须一致
 * 
 * 1、用户是否已经被注册
 *      数据库查询
 */
router.post('/user/register', function (req, res, next) {
    // console.log(req.body);
    var username = req.body.user;
    var password = req.body.pwd;
    var repassword = req.body.repwd;

    // 判断用户名是否为空
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空！';
        res.json(responseData);
        return;
    }
    // 判断密码是否为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空！';
        res.json(responseData);
        return;
    }
    // 判断两次输入的密码是否一致
    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致！';
        res.json(responseData);
        return;
    }

    // 用户是否已经被注册，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户名已经被注册
    User.findOne({
        username: username
    }, function (err, userInfo) {
        if (err) {
            console.log(err);
        }
        // console.log(userInfo);   
        if (userInfo) {
            // 表示数据库中有该记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册！';
            res.json(responseData);
            return;
        }
        // 保存数据信息到数据库中(通过操作对象来操作数据库)
        var user = new User({
            username: username,
            password: password
        });
        responseData.code = 0;
        responseData.message = '注册成功!(2秒后跳转…)';
        res.json(responseData);

        return user.save();
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
    });

});

router.post('/user/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == '' || password == '') {
        responseData.code = 1;
        responseData.message = '用户名和密码不能为空';
        res.json(responseData);
        return;
    }
    // 查询数据库中相同用户名和密码是否存在，如果存在则登录成功
    User.findOne({
        username: username,
        password: password
    }, function (err, userInfo) {
        if (err) throw err;
        if (!userInfo) {
            responseData.message = '用户名或密码错误';
            return;
        }
        // 用户名和密码正确
        responseData.code = 5;
        responseData.message = '登录成功!(2秒后跳转…)';
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        };
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseData);
        return;
    });
});

router.get('/user/logout', function (req, res) {
    req.cookies.set('userInfo', null);
    res.json(responseData);
});

/**
 * 评论的提交
 */
router.post('/comment/post', function (req, res) {
    // 内容的id
    var contentId = req.body.contentid || '';
    
    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content
    };

    // 查询这篇内容的信息
    Content.findOne({
        _id: contentId
    }).then(function (content) {
        content.comments.push(postData);
        return content.save();
    }).then(function (newContent) {
        responseData.message = '评论成功！';
        responseData.data = newContent;
        res.json(responseData);
    });
});

/**
 * 获取指定文章的评论
 */
router.get('/comment', function (req, res) {
    var contentId = req.query.contentid || '';
    Content.findOne({
        _id: contentId
    }).then(function (content) {
        responseData.data = content.comments;
        res.json(responseData);
    });
});

module.exports = router;