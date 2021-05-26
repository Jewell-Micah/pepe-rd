const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const server = require('http').createServer(app);
const mongo = require('mongodb').MongoClient;
const io = require('socket.io').listen(server);


//logic for users to add their reviews
app.post('/commentadded', function (req,res) {

  var MongoClient = require('mongodb').MongoClient;

  var url = 'mongodb://localhost';

  MongoClient.connect(url, function(err, client) {


   if (err) throw err;

   var db = client.db ('csdb');


   db.collection('reviews').insertOne({
     user: req.body.name, 
     shoe: req.body.shoe,
     comment: req.body.comment  
   });
   client.close();  
   res.send('NICE'+ req.session.userId + 'you have posted what you think! Click back to navigate back to the dashboard!')
  });

});

app.post('/performance-review', (req, res) => res.render('performance-review', {
  user: req.user
}));


app.get('/performance-review', function(req, res) {  //lists all reviews

  var MongoClient = require('mongodb').MongoClient;

  var url = 'mongodb://localhost';

  MongoClient.connect(url, function (err, client) {

  if (err) throw err;

  var db = client.db('csdb');                                                                                                                                

  db.collection('reviews').find().toArray((findErr, results) => {                                                                                                                  

  if (findErr) throw findErr;

  else

     res.render('performance-review.ejs', {availablereviews:results});

  client.close();     
  });
});

});


/*
//code for working on the comment section
const dbname = ('comment-section')
// Connect to mongo
mongo.connect('mongodb://127.0.0.1/comment-section', function(err, client){
    useNewUrlParser: true

    if(err){
        throw err;
    }
    var db = client.db('comment-section');

    console.log('CDB connected...');

app.get("/do-post", (req, res) => {
  blog.collection("posts").insertOne(req.body, function (err, documenr){
    res.send("gg")
  });
});

app.post('/comments', (req, res) => {
  let cs = db.collection('commentsec');

  blog.collection("posts").update({"_id": ObjectId(req.body.post_id) }, {
    $push: {
      "comments": {username: req.usename, comment: req.body.comment}
    }
  }, function (err, post) {
    res.send("comment successful");
     });  
    });
  });

/* 
//API Code used to scrape the variants and basic product information using the fetchProductDetails method.

const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();

stockX.fetchProductDetails('https://stockx.com/air-jordan-3-retro-a-ma-maniere-w')
.then(product => console.log(product))
.catch(err => console.log(`Error scraping product details: ${err.message}`));*/

/* 
//attempt at applying a search function
app.post('/search-result', function(req, res) {

  var MongoClient = require('mongodb').MongoClient;

  var url = 'mongodb://localhost';

  MongoClient.connect(url, function (err, client) {

  if (err) throw err;

  var db = client.db('pepe');                                                                                                                                
  db.collection('product').find({recipe: req.body.keyword}).toArray((findErr, results) => {                                                                                                                  

  if (findErr) throw findErr;

  else

  client.close();      
res.render('search-result.ejs', {availableproducts:results});                                                                                                                            

    });
  });
});


*/


const PORT = process.env.PORT || 5000;


server.listen(PORT, console.log(`Server started on port ${PORT}`));