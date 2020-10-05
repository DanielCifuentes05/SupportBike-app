const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup' , (req, res) => {
    res.render('login/signup');
});

router.post('/signup' , passport.authenticate('local.signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/signin' , (req, res) => {
    res.render('login/signin');
});

router.post('/signin', (req, res, next) =>{

    passport.authenticate('local.signin' , {
        successRedirect : '/home',
        failureRedirect : '/signin',
        failureFlash : true

    })(req , res , next);

});

router.get('/home' , (req, res) => {
    res.render('Inicio');
});


module.exports = router;