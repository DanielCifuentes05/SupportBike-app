const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const sqlSession = require('express-mysql-session');
const passport = require('passport');
const Pusher = require('pusher');

const { database } = require('./keys');

//Initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port',process.env.PORT || 4000);
app.set('views' , path.join(__dirname,'views'));
app.engine('.hbs' , exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'usersession',
    resave: false,
    saveUninitialized: false,
    store: new sqlSession(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user =req.user;
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentications'));
app.use(require('./routes/videocall'));

// Create an instance of Pusher
const pusher = new Pusher({
    appId: '1087407',
    key: 'd2acbc8e3f3662aad2d0',
    secret: '4167cd3d65345550892e',
    cluster: 'us2',
    useTLS: true
});

//Public
app.use(express.static(path.join(__dirname, 'public')));

// get authentictation for the channel;
app.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    var presenceData = {
        user_id: Math.random().toString(36).slice(2) + Date.now()
    }
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

//Starting Server
app.listen(app.get('port'),() => {
    console.log('Server on port ', app.get('port'));

});