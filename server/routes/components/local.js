const express = require('express');
const router = express.Router();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const pass = require('../../../passport.config.js')(passport, JwtStrategy)

router.get('/:comp', pass.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req, res);
    let dataModels = {
      barchart: [
        {"x": "5/15 - 6/14", "y": 13.3},
        {"x": "6/14 - 7/14", "y": 12.08},
        {"x": "7/14 - 8/13", "y": 14.62},
        {"x": "8/13 - 9/12", "y": 17.57},
        {"x": "9/12 - 10/12", "y": 14.35}
      ],
      linechart: [{"date": "2017-1-1", "value": 2}, {"date": "2017-4-1", "value": 5}, {"date": "2017-2-1", "value": 1}, {"date": "2017-3-1", "value": 6}, {"date": "2017-1-10", "value": 1}, {"date": "2017-1-15", "value": 5}, {"date": "2017-1-20", "value": 2}, {"date": "2017-1-25", "value": 3}, {"date": "2017-1-30", "value": 1}, {"date": "2017-2-10", "value": 6}, {"date": "2017-2-15", "value": 1}, {"date": "2017-2-20", "value": 5}, {"date": "2017-2-25", "value": 3}, {"date": "2017-2-28", "value": 2}, {"date": "2017-3-10", "value": 1}, {"date": "2017-3-15", "value": 5}, {"date": "2017-3-20", "value": 0}, {"date": "2017-3-25", "value": 3}, {"date": "2017-3-30", "value": 2}]
    }

    res.send({ dataModel: dataModels[req.params.comp] });
});


router.get('/linechartdata', (req, res) =>{
  res.send({
    dataModel: [{"date": "2017-1-1", "value": 2}, {"date": "2017-4-1", "value": 5}, {"date": "2017-2-1", "value": 1}, {"date": "2017-3-1", "value": 6}, {"date": "2017-1-10", "value": 1}, {"date": "2017-1-15", "value": 5}, {"date": "2017-1-20", "value": 2}, {"date": "2017-1-25", "value": 3}, {"date": "2017-1-30", "value": 1}, {"date": "2017-2-10", "value": 6}, {"date": "2017-2-15", "value": 1}, {"date": "2017-2-20", "value": 5}, {"date": "2017-2-25", "value": 3}, {"date": "2017-2-28", "value": 2}, {"date": "2017-3-10", "value": 1}, {"date": "2017-3-15", "value": 5}, {"date": "2017-3-20", "value": 0}, {"date": "2017-3-25", "value": 3}, {"date": "2017-3-30", "value": 2}],
    propID: "not-PJson-LineChart"
  });
});


module.exports = router;
