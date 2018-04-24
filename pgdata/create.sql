CREATE TABLE trades
(account VARCHAR, trader VARCHAR, strategy VARCHAR, counterparty VARCHAR,
 cid VARCHAR, ticker VARCHAR, ric VARCHAR, bbg VARCHAR, type VARCHAR,
 orderId VARCHAR, quantity VARCHAR, price VARCHAR, filled VARCHAR,
 open VARCHAR, limitPrice VARCHAR, filledPrice VARCHAR, venue VARCHAR,
 gateway VARCHAR, currency VARCHAR, side VARCHAR, originalOrderId VARCHAR,
 rejected VARCHAR, rejectedReason VARCHAR, state VARCHAR, entryMethod VARCHAR,
 transactTime VARCHAR, placementTime VARCHAR, emsTime VARCHAR, id VARCHAR);

 COPY trades FROM '/tmp/trades.csv' WITH (FORMAT csv);