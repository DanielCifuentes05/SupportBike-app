const express = require('express');
const router = express.Router();



router.get('/videocall' , (req, res) => {
    res.render('videocall/videocall');
});

module.exports = router;