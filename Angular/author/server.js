let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');
    bcrypt      = require('bcryptjs');

app.use(body_parser.json());
app.use(express.static( __dirname + '/client/dist' ));
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

let Schema = mongoose.Schema;

let AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    minlength: 3,
    trim: true
  }
}, {timestamps: true})

mongoose.model('Author', AuthorSchema);

let Author = mongoose.model('Author');

app.get('/authors', (req, res) => {
  let authors = Author.find({}, (err, authors) => {
    if (err) {
      res.status(401).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: authors})
    }
  })
})

app.get('/authors/:id', (req, res) => {
  let author = Author.findOne({_id: req.params.id}, (err, author) => {
    if (err) {
      res.status(401).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: author});
    }
  })
})

app.post('/authors', (req, res) => {
  let author = new Author({ name: req.body.name });

  author.save((err) => {
    if (err) {
      res.status(401).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: author})
    }
  })
})

app.put('/authors/:id', (req, res) => {
  let author = Author.findOne({_id: req.params.id}, (err, author) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      author.name = req.body.name;
      author.save( (error) => {
        if (error) {
          res.status(401).json({messsage: 'Error', error: error});
        } else {
          res.json({message: 'Success', data: author});
        }
      })
    }
  })
})

app.delete('/authors/:id', (req, res) => {
  Author.remove({_id: req.params.id}, (err) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Successfully deleted'})
    }
  })
})

app.all('*', (req, res, next) => {
  res.sendFile(path.resolve('./client/dist/index.html'));
})

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});
