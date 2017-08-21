'use strict';

var auth = require('./tmp/auth');
var commits = require('./');

commits('breakdance/breakdance', auth)
  .then(function(res) {
    console.log(res);
  })
  .catch(console.error)
