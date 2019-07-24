const mongoose = require('mongoose');

// 连接mongoose并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);