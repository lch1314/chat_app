// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const React = require('react');

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';

const app = express();
const userRouter = require('./user');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model');
const Chat = model.getModel('chat');


function Ap() {
    return <h2>server render</h2>
}

console.log(Ap())

// var ReactDOMServer = require('react-dom/server');
// var renderToString = ReactDOMServer.renderToString
// var renderToStaticMarkup = ReactDOMServer.renderToStaticMarkup

io.on('connection', function(socket) {
    // console.log(socket)
    // 监听从前端发送过来的消息
    socket.on('sendmsg', function(data) {
        console.log(data)
        const { from, to, msg } = data;
        // 设置唯一id
        const chatid = [from,to].sort().join('_');
        // 把当前这条聊天信息插入到数据库中
        Chat.create({chatid, from, to, content: msg}, function(err, doc) {
            // console.log('222',doc)
            // 入库之后并把消息发送给前端（全局）,前端在chat.redux中监听这个事件
            io.emit('recvmsg', Object.assign({}, doc))
        })
    })
})


app.use(cookieParser());
// 解析post数据
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use(function(req, res, next) {
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    }
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
server.listen(9093,function() {
    console.log('Node app start at port 9093')
})