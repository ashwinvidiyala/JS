let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');
    bcrypt      = require('bcryptjs');

app.use(express.static( __dirname + '/client/dist' ));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: '^P%mUWCwF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/author');
mongoose.Promise = global.Promise;

// Example User Schema
let Schema = mongoose.Schema;

let AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    minlength: 3,
    trim: true
  },
}, {timestamps: true})

mongoose.model('Author', AuthorSchema);

let Author = mongoose.model('Author');

// Example get route
app.get('/', (req, res) => {
  res.render('index');
})

app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/dist/index.html'));
})

// Other routes

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
