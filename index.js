'use strict';

var GitHub = require('github-base');
var isObject = require('isobject');

module.exports = function(owner, repo, options) {
  var opts = normalize(owner, repo, options);
  var github = new GitHub(opts);
  var url = '/repos/:owner/:repo/commits';

  return new Promise(function(resolve, reject) {
    github.get(url, opts, function(err, commits) {
      if (err) {
        reject(err);
        return;
      }

      resolve(commits);
    });
  });
};

function normalize(owner, repo, options) {
  if (isObject(repo)) {
    options = Object.assign({}, repo, options);
    var segs = owner.split('/');
    owner = segs.shift();
    repo = segs.pop();
  } else if (isObject(owner)) {
    options = Object.assign({}, owner, repo, options);
    owner = null;
    repo = null;
  }
  var defaults = {owner: owner, repo: repo};
  return Object.assign({}, defaults, options);
}
