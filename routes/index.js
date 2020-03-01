const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tktk Index' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));



router.get('/auth/google/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/tktks',
    failureRedirect : '/users/error'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users');
});


module.exports = router;
