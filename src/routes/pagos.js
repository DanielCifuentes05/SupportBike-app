const express = require('express');
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const router = express.Router();

const PaymentController = require("../controllers/PaymentController");
 //importamos el controller

const PaymentService = require("../services/PaymentService"); 
//importamos el service

const PaymentInstance = new PaymentController(new PaymentService());


router.get('/suscripciones', (req, res) => {
   
    res.render('pagos/suscripciones');
    
});

router.post('/payment/new', (req, res) => 
    PaymentInstance.getMercadoPagoLink(req, res));

router.post('/webhook', (req, res) => 
    PaymentInstance.webhook(req, res));


router.get('/success', (req, res) => {
   
    res.send('Pago Exitoso');
    
});

router.get('/failure', (req, res) => {
   
    res.send('Pago Fallido');
    
});

router.get('/pending', (req, res) => {
   
    res.send('Pago en proceso');
    
});

module.exports = router;