const express = require('express');
const app = express();

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

const session = require('express-session');
const auth = require('./auth/auth');
const passport = require('passport');

app.use(session({ secret: 'its a secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
auth.init(app);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const router = require('./routes/healthifyRoutes');
app.use('/', router);

app.listen(3000, () => {
console.log('Server started on port 3000. Ctrl^c to quit.');
})