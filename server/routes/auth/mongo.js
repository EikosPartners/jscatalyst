const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');
var jwt = require('jsonwebtoken')

mongoose.connect(`mongodb://${process.env.DATA_SOURCE}/jscatalyst`);

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, function (err, user) {
    if (!user) {
      res.send({ success: false, message: 'There is no user with that username' });
      return
    }
    user.validPassword(req.body.password).then(same => {
      if (!same) {
        res.send({ success: false, message: 'Authentication failed. Passwords did not match.' })
      } else {
        var claims = {
          username: user.username,
          id: user._id
        }
        var token = jwt.sign(claims, 'secret', {expiresIn: '1h'})
        res.cookie('jwt', token, {httpOnly: true})
        res.json({success: true, message: 'Successfully logged in!', expiresSoon: false});
      }
    })

  })
});

router.post('/signup', (req, res) => {
  User.findOne({username: req.body.username}, function (err, user) {
    if (user) {
      res.send({ success: false, message: 'Username is already taken.' })
    } else {
      var newUser = new User({username: req.body.username})
      var hashPassword = newUser.generateHash(req.body.password).then(hash => {
        newUser.password = hash
        newUser.save(function(err, product, numAffected) {
          var claims = {
            username: product.username,
            id: product._id
          }
          var token = jwt.sign(claims, 'secret', {expiresIn: '1h'})
          res.cookie('jwt', token, {httpOnly: true})
          res.json({success: true, message: 'Succesfully signed up!', expiresSoon: false});
        })
      })
    }
  })
});

router.post('/logout', (req, res) => {
  res.clearCookie("jwt");
  res.send({authenticated: false})
})


module.exports = router;
