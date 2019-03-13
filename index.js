'use strict';

var url = require('url');

exports.handler = function(event, context, callback) {
  var urlObject = url.parse( process.env.PING_URL  );
  var mod = require(
    urlObject.protocol.substring(0, urlObject.protocol.length - 1)
  );
  console.log('[INFO] - Checking ' + process.env.PING_URL );
  var req = mod.request(urlObject, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('[INFO] - Read body chunk');
    });
    res.on('end', function() {
      console.log('[INFO] - Response end');
      callback();
    });
  });

  req.on('error', function(e) {
    console.log('[ERROR] - ' + e.message);
    callback(e);
  });
  req.end();
};
