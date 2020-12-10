const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('Inicio');

});

router.get('/repuestos', (req,res) => {
    res.render('repuestos/repuestos');

});

module.exports = router;