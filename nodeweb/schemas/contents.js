var mongoose = require('mongoose');

// 博文的表结构
module.exports = new mongoose.Schema({
    // 关联字段，内容分类的 id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'Category'      
    },
    // 用户 id
    user: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'User'      
    },
    // 标题
    title: String,
    // 简介
    description: {
        type: String,
        default: ''
    },
    // 内容
    content: {
        type: String,
        default: ''
    },
    // 文章创建时间
    addTime: {
        type: Date,
        default: new Date()
    },
    // 阅读量
    views: {
        type: Number,
        default: 0
    },
    // 评论
    comments: {
        type: Array,
        default: []
    }
});