const express = require('express');
const utils = require('utility');   // 加密
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

Router.get('/list', function(req, res) {
    // User.remove({}, function(e,d){ })   // 清除所有用户名和密码
    User.find({}, function(err, doc) {
        return res.json(doc)
    })
})

Router.post('/login', function(req, res) {
    const { user, pwd } = req.body;
    // findOne第一个参数是查询条件 第二个参数是显示条件
    User.findOne({user, pwd: md5Pwd(pwd)}, {'pwd': 0}, function(err, doc) {
        if(!doc) {
           return res.json({code: 1, msg: '用户名或者密码错误'}) 
        }
        return res.json({code: 0, data: doc})
    })
})

Router.post('/register', function(req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({user}, function(err, doc) {
        console.log(doc)
        if(doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        User.create({user, type, pwd: md5Pwd(pwd) }, function(e, d) {
            console.log(e)
            if(e) {
                return res.json({code: 1, msg: '服务出错了'})
            }
            return res.json({code: 0})
        })
    })
})

Router.get('/info', function(req, res) {
    return res.json({
        code: 1
    })
})

// 目的：增加密码复杂性这样即使去www.cmd5.com这个网站也破解不了
function md5Pwd(pwd) {
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~';    // 够复杂了吧
    return utils.md5(utils.md5(pwd + salt))   // 以防万一在做一层md5
}

module.exports = Router;
