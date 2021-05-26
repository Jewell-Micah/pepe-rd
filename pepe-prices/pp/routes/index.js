const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Display Entry:
router.get('/', (req, res) => res.render('display'));

//Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);
// serve our static files from express:
//(public is the folder where your images and everything (assets) reside)
//ccall the express.static middleware function
//router.use('/static', express.static('/public'))
//app.use('/static', express.static(path.join(__dirname, 'public')))


module.exports = router;
