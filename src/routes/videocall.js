const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const {isLoggedIn} = require('../lib/auth');

router.get('/videocall' , isLoggedIn, (req, res) => {
    res.render('videocall/videocall');
});

router.post('/videocall/auth', (req, res) => {

    const pusher = new Pusher({
        appId: '1089719',
        key: 'aa627cb1dc3099475e48',
        secret: 'a2d65af256706949f73b',
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