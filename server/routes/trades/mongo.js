const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trade = require('../../models/Trade');

mongoose.connect(`mongodb://${process.env.DATA_SOURCE}/jscatalyst`);

router.get('/paginate', (req, res) => {
    let query = req.query;
    query.startRow = parseInt(query.startRow, 10);
    query.endRow = parseInt(query.endRow, 10);
    let pagination = {
        offset: query.startRow || 0,
        limit: (query.endRow - query.startRow) || 100
    };
    console.log('Trades', query, pagination);
    console.time('Get trades');
    Trade.paginate({}, pagination).then(response => {
        console.time('Get trades');
        res.json(response);
    });
});

router.get('/paginate2', (req, res) => {
    let query = req.query;
    let pagination = {
        limit: (query.endRow - query.startRow) || 100
    };
    console.log('Trades', query, pagination);
    console.time('Get trades');
    Trade.find({id: {$gt: query.startRow}}).limit(pagination.limit).then((response) => {
        console.timeEnd('Get trades');
        res.json({
            docs: response,
            total: 1000000
        });
    })
});

router.get('/count', (req, res) => {
    const condition = req.query;
    console.log('Trades Conditions', req.query);
    Trade.count(condition, (err, count) => {
        res.json({count});
    })
});

module.exports = router;
