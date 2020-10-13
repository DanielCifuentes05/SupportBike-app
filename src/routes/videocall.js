const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const {isLoggedIn} = require('../lib/auth');

router.get('/videocall' , isLoggedIn, (req, res) => {
    res.render('videocall/videocall');
});

router.post('/videocall/auth', (req, res) => {

    const pusher = new Pusher({
        appId: '1087407',
        key: 'd2acbc8e3f3662aad2d0',
        secret: '4167cd3d65345550892e',
        cluster: 'us2',
        useTLS: true
    });

    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    var presenceData = {
        user_id: req.user.nombre + "-" + Math.random().toString(14).slice(2) + Date.now()
    }
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);

});

module.exports = router;