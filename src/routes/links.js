const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/home' , (req, res) => {
    res.render('Inicio');
});

module.exports = router;