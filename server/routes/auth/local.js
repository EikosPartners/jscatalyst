const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken')
const fs = require('fs')

var userdb = JSON.parse(fs.readFileSync('./mock_backend/users.json', 'UTF-8'))

function isAuthenticated({username, password}){
  return userdb.users.filter(user => user.username === username && user.password === password)
}

router.post('/login', (req, res) => {
  const {username, password} = req.body
  var user = isAuthenticated({username, password})
  if (user === []) {
    res.send({ success: false, message})
    return
  }
  var claims = {
    username: user[0].username,
    id: user[0].id
  }
  var token = jwt.sign(claims, 'secret', {expiresIn: '1h'})
  res.cookie('jwt', token, {httpOnly: true})
  res.json({success: true, message: 'Successfully logged in!', expiresSoon: false});
})

router.post('/signup', (req, res) => {
  const {username, password} = req.body
  if (userdb.users.filter(user => user.username === username).length) {
    res.send({ success: false, message: 'Username is already taken.' })
    return
  }
  var lastId = userdb.users[userdb.users.length-1].id
  userdb.users.push({id: lastId+1, username, password})

  fs.writeFileSync('./mock_backend/users.json', JSON.stringify(userdb))
  userdb = JSON.parse(fs.readFileSync('./mock_backend/users.json', 'UTF-8'))
  var claims = {
    username: username,
    id: lastId+1
  }
  var token = jwt.sign(claims, 'secret', {expiresIn: '1h'})
  res.cookie('jwt', token, {httpOnly: true})
  res.json({success: true, message: 'Succesfully signed up!', expiresSoon: false});

});

router.post('/logout', (req, res) => {
  res.clearCookie("jwt");
  res.send({authenticated: false})
})


module.exports = router;
