'use strict';

var express = require('express');
var path = require('path');
var yahooFinance = require('yahoo-finance');
var minimist = require('minimist');

// Express App
var app = express();
var args = minimist(process.argv.slice(2), {default: {port: '8080'}});

var PORT = args.port;
var DIST_DIR = path.join(__dirname, '..', 'dist');

// Send static files from these directories
app.use('/lib', express.static(DIST_DIR + '/lib'));
app.use('/client', express.static(DIST_DIR + '/client'));

var router = express.Router();

// Endpoint to load snapshot data from yahoo finance
router.get('/api/snapshot', function(req, res) {
  if (req.query.symbols) {
    var symbols = req.query.symbols.split(',');
    symbols.map(function(symbol) {
      return symbol.toUpperCase();
    });

    yahooFinance.snapshot({
      symbols: symbols
    }, function(err, snapshot) {
      if (err) {
        res.status(401).send(err);
      }

      setTimeout(function() {
        res.status(200).send(snapshot);
      }, 5000);
    });
  } else {
    res.status(400).send({message: 'The request requires at least one symbol. Try adding "?symbols=appl" to the request.'});
  }
});

// Endpoint to load historical data from yahoo finance.
router.get('/api/historical/:symbol', function(req, res) {
  var today = new Date();
  var yearAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 365);
  yahooFinance.historical({
    symbol: req.params.symbol,
    from: yearAgo.toString(),
    to: today.toString()
  }, function(err, quotes) {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send(quotes);
  });
});

// Send any other urls to the client app to load.
router.get('*', function(req, res) {
  res.sendFile(DIST_DIR + '/client/index.html');
});

app.use('/', router);

app.listen(PORT, function() {
  console.log('Server started at http://localhost:' + PORT);
});
