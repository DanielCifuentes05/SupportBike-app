const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const {isLoggedIn} = require('../lib/auth');

router.get('/videocall' , isLoggedIn, (req, res) => {
    res.render('videocall/videocall');
});



module.exports = router;