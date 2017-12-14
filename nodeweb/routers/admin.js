var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');

router.use(function (req, res, next) {
   if (!req.userInfo.isAdmin) {
    //    如果当前页面是非管理员用户
    res.send('对不起！只有管理员用户才能进入后台管理页面');
    return;
   } 
   next();
});

/**
 * 后台管理首页
 */
router.get('/', function (req, res, next) {
    // res.send('后台管理首页');
    res.render('admin/index', {
        userInfo: req.userInfo
    });  
});

/**
 * 用户管理
 */
router.get('/user', function (req, res) {
    /**
     * 从数据库中读取数据，将数据分配给模板，然后由页面显示出来
     * 
     * 数据的分页：
     *      limit(Number): 限制获取的数据条数
     *      skip(): 忽略数据的条数
     * 
     * 每页显示两条：
     * 1:1-2    skip:0  -> (当前页-1)*limit
     * 2:3-4    skip:2
     */
    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;
    
    User.count().then(function (count) {
        // console.log(count);
        // 范围限制
        // 计算总页数
        pages = Math.ceil(count / limit);
        // 取值不能超过 pages
        page = Math.min(page, pages);
        // 取值不能小于 1
        page = Math.max(page, 1);
        
        var skip = (page - 1) * limit;
        
        User.find().limit(limit).skip(skip).then(function (users) {
            console.log(users);
            
            res.render('admin/user_index', {
                api: 'user',
                userInfo: req.userInfo,
                users: users,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            }); 
        });
    });
});

/**
 * 分类首页
 */
router.get('/category', function (req, res) {
    var pages = 0;
    var page = Number(req.query.page || 1);
    var limit = 2;
    
    Category.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        // 取值不能超过 pages
        page = Math.min(page, pages);
        // 取值不能小于 1
        page = Math.max(page, 1);
        
        var skip = (page - 1) * limit;
        
        /**
         * sort():
         * 1： 升序
         * -1： 降序
         */
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then(function (categories) {
            res.render('admin/category_index', {
                api: 'category',
                userInfo: req.userInfo,
                categories: categories,
                count: count,
                pages: pages,
                limit: limit,
                page: page
            }); 
        });
    });
});

/**
 * 添加分类
 */
router.get('/category/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    });
});

/**
 * 分类数据的保存
 */
router.post('/category/add', function (req, res) {
    // console.log(req.body);
    var name = req.body.name || '';
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空！'
        });
        return;
    }

    // 判断数据库中是否存在同名分类名称
    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            // 数据库中已经存在该分类
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '该分类已存在'
            });
            return Promise.reject();
        } else {
            // 保存数据到数据库中
            return new Category({
                name: name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        });
    });
    
});

/**
 * 分类数据的编辑
 */
router.get('/category/edit', function (req, res) {
    // 获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    // 获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        console.log(category);
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在！'
            });
            return Promise.reject();
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            });
        }
    });
});
/**
 * 编辑保存
 */
router.post('/category/edit', function (req, res) {
    // 获取要修改的分类信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    
    // 获取post提交过来的名称
    var name = req.body.name || '';
    console.log('*name* ' + name);
    console.log(typeof name);
    
    // 获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        console.log('*category* ' + category);
        console.log(typeof category);
        
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在！'
            });
            return Promise.reject();
        } else {
            console.log(category.name);
            console.log(name == category.name);

            // 当用户没有任何修改提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: res.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            } else {
                // 查询要修改的分类名称是否在数据库中存在
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                });
            }
        }
    }).then(function (sameCategory) {
        console.log('*sameCategory* ' + sameCategory);
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已经存在该分类，请重新编辑新名称！'
            });
            return Promise.reject();
        } else {
            return Category.update({
                _id: id
            }, {
                name: name
            });
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    });
});

/**
 * 分类数据的删除
 */
router.get('/category/delete', function (req, res) {
    // 获取要删除的分类的 id
    var id = req.query.id || '';

    Category.remove({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功！',
            url: '/admin/category'
        });
    });

});

/**
 * 博文管理：
 * 1、博文列表
 * 2、添加博文
 * 3、删除博文
 * 4、编辑博文
 */
router.get('/content', function (req, res) {

});

router.get('/content/add', function (req, res) {
    
});

router.get('/content/edit', function (req, res) {
    
});

router.get('/content/delete', function (req, res) {
    
});

module.exports = router;