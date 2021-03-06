var express = require('express'),
    routes = require('./server/routes'),
    bodyParser = require('body-parser'),
    connect = require('connect'),
    app = express();

var passport = require('passport')
    , authentication = require('./server/authentication.js');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'funions!'}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(authentication.localStrategy)
passport.serializeUser(authentication.serializeUser);
passport.deserializeUser(authentication.deserializeUser);

routes.init(app, authentication);

app.listen(process.env.PORT || 3000);
