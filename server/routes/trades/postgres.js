const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const connectionString = 'postgresql://postgres:postgres@localhost:5432/jscatalyst';
const client = new Client({
    connectionString: connectionString
});

client.connect();

router.get('/paginate', (req, res) => {
    let query = req.query;
    query.startRow = parseInt(query.startRow, 10);
    query.endRow = parseInt(query.endRow, 10);
    let pagination = {
        offset: query.startRow || 0,
        limit: (query.endRow - query.startRow) || 100
    };
    client.query('SELECT * FROM trades LIMIT $1 OFFSET $2', [pagination.limit, pagination.offset], (err, response) => {
        // console.log(response);
        res.json({
            docs: response.rows,
            total: 1000000
        });
    })
});

router.get('/all', (req, res) => {
    client.query('SELECT account, trader, strategy, id FROM trades', (err, response) => {
        // console.log(response);
        res.json({
            docs: response.rows,
            total: 1000000
        });
    })
});

module.exports = router;