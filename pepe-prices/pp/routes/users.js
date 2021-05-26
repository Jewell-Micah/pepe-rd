const path = require('path');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Load User model
const User = require('../models/User');
const { ensureAutheticated, forwardAuthenticated } = require('../config/auth');

router.get('/welcome', forwardAuthenticated, (req, res) => res.render('welcome'));

// Profile Page
router.get('/profile', (req, res) => res.render('profile'));



// About Page
router.get('/about', (req, res) => res.render('about'));

// marketwatch Page
router.get('/marketwatch', (req, res) => res.render('marketwatch'));


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page Get
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register Page Post
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login - if successful will take you to the dashboard
// Login - if not successful will redirect to the users/login page
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout - will produce a message confirming user is logged out then redirect to login page
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

// Report page
router.get('/report', (req, res) => res.render('report', {
  user: req.user
}));

router.post('/report', (req, res) => res.render('report', {
  user: req.user,
  name: req.body.name,
  email: req.body.email,
  report: req.body.report
}));

// profile page
router.get('/profile', (req, res) => res.render('/profile', {
  user: req.user
}));

// Product page
router.get('/product',function(req,res){
  res.sendFile(path.join(__dirname+'/product.html'));
  user: req.user
});

//comment page
router.get('/comments', (req, res) => res.render('comments', {
  user: req.user
}));

/* 
router.get('/performance-review', (req, res) => res.render('performance-review', {
  user: req.user
}));

router.get('/performance-review', (req, res) => res.render('performance-review', {
  user: req.body.name, 
     shoe: req.body.shoe,
     comment: req.body.comment  
}));
*/

module.exports = router;