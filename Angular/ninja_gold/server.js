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

mongoose.connect('mongodb://localhost/ninja_gold');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
  gold: {type: Number, default: 0},
  log: [{type: String, default: ''}]
}, {timestamps: true})

mongoose.model('User', UserSchema);

let User = mongoose.model('User');

app.get('/users', (req, res) => {
  let users = User.find({}, (err, users) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: users});
    }
  })
})

app.get('/users/new', (req, res) => {
  let user = new User({});
  user.save( (err) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: user});
    }
  })
})

app.get('/users/:id', (req, res) => {
  let user = User.findOne({_id: req.params.id}, (err, user) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: user});
    }
  })
})

app.put('/users/:id', (req, res) => {
  console.log('In the server');
  let user = User.findOne({_id: req.params.id}, (err, user) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      user.gold += parseInt(req.body.gold);
      user.log.push(req.body.log);
      user.save( (error) => {
        if (error) {
          res.json({message: 'Error', error: error});
        } else {
          res.json({message: 'Success', data: user});
        }
      })
    }
  })
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
let io = require('socket.io').listen(server);
