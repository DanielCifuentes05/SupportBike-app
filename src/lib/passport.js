const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({

    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback : true
}, async(req, email , password , done ) => {
    
   const rows = await pool.query(' SELECT * FROM usuario WHERE email = ?', [email]);

   if(rows.length > 0){
       const user = rows[0];
       const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','bienvenido ' + user.nombre));
        }else {
            done(null, false, req.flash('message','Constraseña Incorrecta'));
        }
   }else{
       return done(null, false, req.flash('message','El correo no se encuentra registrado'));
   }

}));

passport.use('local.signup', new LocalStrategy({

    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true


}, async(req, username, password, done) => {
    
    const { email } = req.body;
    const nombre = username;
    const suscripcion = 0;
    const newUser = {
        nombre,
        password,
        email,
        suscripcion
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO usuario SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);

}));

passport.serializeUser((user, done) => {

    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE id = ?' , [id]);
    done(null , rows[0]);
});