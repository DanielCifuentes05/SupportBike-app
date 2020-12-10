const express = require('express');
// SDK de Mercado Pago

var paypal = require('paypal-rest-sdk');
const router = express.Router();



paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': 'AQb9w_UWmzOl-6WO-Js0kpItn7NBoytmBoSIyoiCIbVuHNsLN3x2BgIDlvS2D5aW38cqGaHT8vkzkkrc', // please provide your client id here 
    'client_secret': 'ELtzVYjOPyYpFHsp-1Mf0K11dqp32k7mugexI4NOwNMFqQ1DQu5BrVNCFcs0uOGgJo2NarlANdlzMkyK' // provide your client secret here 
  });


router.get('/suscripciones', (req, res) => {
   
    res.render('pagos/suscripciones');
    
});

router.post('/payment/new', (req, res) => {
    
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://supportbike.herokuapp.com/success",
            "cancel_url": "https://supportbike.herokuapp.com/failure"
        },
        "transactions": [{
            "amount": {
                "total": 5.85,
                "currency": "USD"
            },
            "description": "Suscripcion"
        }]
        };


    // call the create Pay method 
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
                    // redirect to paypal where user approves the transaction 
                    return res.redirect( links[counter].href )
                }
            }
        })
        .catch( ( err ) => { 
            console.log( err ); 
            res.redirect('/err');
        });
    });

router.post('/webhook', (req, res) => 
    PaymentInstance.webhook(req, res));


router.get('/success', (req, res) => {
   
    res.render('pagos/exito');
    
});

router.get('/failure', (req, res) => {
   
    res.send('Pago Fallido');
    
});

router.get('/pending', (req, res) => {
   
    res.send('Pago en proceso');
    
});

var createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
         if ( err ) {
             reject(err); 
         }
        else {
            resolve(payment); 
        }
        }); 
    });
}

module.exports = router;