const express = require('express');
const utils = require('utility');   // 加密
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = { 'pwd': 0, '__v': 0};

Router.get('/list', function(req, res) {
    // post参数从body中获取,get参数从query中获取
    const { type } = req.query;
    // User.remove({}, function(e,d){ })   // 清除所有用户名和密码
    User.find({type}, function(err, doc) {
        return res.json({code: 0, data: doc})
    })
})

Router.post('/login', function(req, res) {
    const { user, pwd } = req.body;
    // findOne第一个参数是查询条件 第二个参数是显示条件
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
        if(!doc) {
           return res.json({code: 1, msg: '用户名或者密码错误'}) 
        }
        // 设置cookie
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

Router.post('/register', function(req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({user}, function(err, doc) {
        if(doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        // const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        // userModel.save(function(e, d) {
        //     console.log(d)
        //     if(e) {
        //         return res.json({code: 1, msg: '服务出错了'})
        //     }
        //     const { user, type, _id} = d;
        //     res.cookie('userid', _id)
        //     return res.json({code: 0, data: {user, type, _id}})
        // })
        // 用create也可以获取id
        User.create({user, type, pwd: md5Pwd(pwd) }, function(e, d) {
            console.log(d)
            if(e) {
                return res.json({code: 1, msg: '服务出错了'})
            }
            const { user, type, _id} = d;
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
})

Router.get('/info', function(req, res) {
    const { userid } = req.cookies;
    if(!userid) {
        return res.json({
            code: 1
        })
    }
    User.findOne({_id: userid}, _filter, function(err, doc) {
        if(err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if(doc) {
            return res.json({code: 0, data: doc})
        }
    })
})

Router.post('/update',function(req, res) {
    const { userid } = req.cookies;
    if(!userid) {
        return res.json({
            code: 1
        })
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data })
    })
})

Router.get('/getmsglist', function(req, res) {
    // console.log(req.cookies)
    const { userid } = req.cookies;
    // 查询所有用户信息
    User.find({}, function(e, userdoc) {
        console.log(userdoc)
        let users = {}
        // 查到之后遍历,把id当做key
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        // Chat.remove({}, function(e,d){ })   // 清除所有聊天信息
        // 然后再去查询消息列表
        Chat.find({'$or': [{from: userid}, {to: userid}]}, function(err, doc) {
            if(!err) {
                res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
})

Router.post('/readmsg', function(req, res) {
    const { userid } = req.cookies;
    const { from } = req.body;
    console.log(userid, from)
    Chat.update(
        {from, to: userid}, 
        {'$set': {read: true}}, 
        {'multi': true}, 
        function(err, doc) {
        console.log(doc)
        if(!err) {
            return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: '修改失败'})
    })
})

// 目的：增加密码复杂性这样即使去www.cmd5.com这个网站也破解不了
function md5Pwd(pwd) {
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~';    // 够复杂了吧
    return utils.md5(utils.md5(pwd + salt))   // 以防万一在做一层md5
}

module.exports = Router;
