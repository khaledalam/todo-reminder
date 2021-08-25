const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const flash = require('express-flash');
const passport = require('passport');
const http = require('http');
const mongoose = require("mongoose");
var cors = require('cors')


// docker exec -it mongo mongo todo --eval 'db.todos.find().pretty();'
// docker exec -it mongo mongo todo --eval 'db.todos.remove({});'

/**
 * Load environment variables from env file
 */
dotenv.config({path: '.env.nodejs'});


/**
 * Create Express server.
 */
const app = express();

app.use(cors())

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
    console.log('DB Error')
    console.error(err);
    process.exit();
});


/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.disable('x-powered-by');

// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });


app.use(require('./routes/routes'));

app.get('*', function (req, res) {
    res.json({"msg": "error"});
});

/**
 * Start Express server.
 */
// https.createServer(options, app).listen(443);


http.createServer({}, app).listen(app.get('port'));

module.exports = app;
