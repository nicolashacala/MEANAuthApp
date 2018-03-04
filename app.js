const   express = require('express'),
        path = require('path'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        passport = require('passport');

const   mongoose = require('mongoose'),
        config = require('./config/database');

//Connect to db
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
})

//On error
mongoose.connection.on('error', (err) => {
    console.log('error :' + err)
})

const app = express();

const users = require('./routes/users');

//Port number
const PORT = process.env.PORT || 8080;

//CORS Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index route
app.get('/', function(req, res){
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//Start server
app.listen(PORT, function(){
    console.log('Running on ' + PORT);
})