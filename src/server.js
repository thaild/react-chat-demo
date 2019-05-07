// import express from 'express';
const socket = require('socket.io');
const express = require('express');

const app = express();
const multer = require('multer');
const cors = require('cors');

app.use(cors());

// express
let PORT = 8080;
let server = app.listen(PORT, function () {
    console.log('server is running on port ' + PORT)
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});
var upload = multer({ storage: storage }).array('file');

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.files)
    })
});


// socket.io handle client connect
const io = socket(server);
io.on('connection', (client) => {
    console.log(client.id + ' is connected');
    handleConnection();
    client.broadcast.emit('hi everyone!');

    client.on('SEND_MESSAGE', function (data) {
        io.emit('RECEIVE_MESSAGE', data)
    });

    // client.on('leave', handleLeave);

    // client.on('message', handleMessage);

    client.on('disconnect', function () {
        console.log('client disconnect...', client.id);
        handleConnection();
    });

    client.on('error', function (err) {
        console.log('received error from client:', client.id);
        console.log(err)
    });


});

function handleConnection(){
    io.clients((error, clients) => {
        if (error) throw error;
        console.log(clients);
        io.emit('HANDLE_CLIENT_CONNECT', clients)
    });
}
