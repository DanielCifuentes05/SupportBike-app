const express = require('express');
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const router = express.Router();


// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-9e7fdb3c-690f-4244-9803-b3b9cb3b2f9d'
});

router.get('/suscripciones', (req, res) => {
    let preference = {
        items: [
            {
                id: '1234',
                title: 'Suscripcion 1 mes',
                description: 'Suscripcion 1 mes',
                category_id: 'home',
                quantity: 1,
                currency_id: 'COP',
                unit_price: 20
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(function (res) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            global.id = res.body.id;
        }).catch(function (error) {
            console.log(error);
        });
    res.render('pagos/suscripciones');
    
});

router.post('/recibepago', (req, res) => {
    
    let preference = {
        items: [
            {
                id: '1234',
                title: 'Suscripcion 1 mes',
                description: 'Suscripcion 1 mes',
                category_id: 'home',
                quantity: 1,
                currency_id: 'COP',
                unit_price: 20
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(function (res) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            global.id = res.body.id;
        }).catch(function (error) {
            console.log(error);
        });

});

module.exports = router;