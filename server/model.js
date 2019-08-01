const mongoose = require('mongoose');

// 连接mongoose并且使用imooc这个集合
// mongodb://  这是固定的格式，必须要指定
// portX 可选的指定端口，如果不填，默认为27017
// /database 如果指定username:password@，连接并验证登陆指定数据库。若不指定，默认打开 test 数据库
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL, { useNewUrlParser: true }, function(err) {
    if(err) {
        console.log('Connection Error:' + err)
    }else {
        console.log('Connection success')
    }
});
mongoose.set('useFindAndModify', false);

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        // 头像
        'avatar': { type: String },
        // 个人简介
        'desc': { type: String },
        // 职位名
        'title': { type: String },
        // boss 还有两个字段
        'company': { type: String },
        'money': { type: String },
    },
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'content': {type: String, require: true, default: ''},
        'createTime': {type: Number,  default: new Date().getTime()},

    }
}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}