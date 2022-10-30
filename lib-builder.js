// https://www.npmjs.com/package/buildify
var buildify = require('buildify');
// https://www.npmjs.com/package/ncp
var ncp = require('ncp').ncp;

var assets = require('./dist/asset-manifest.json');
var pjson = require('./package.json');
var mapping = require('./libsrc/mapping.json');

// Collect entry points by type.
var combine = {
  js: [
    `dist/${assets['chunk-vendors.js']}`,
    `dist/${assets['app.js']}`,
  ], css: [
    `dist/${assets['app.css']}`,
  ]
}

// Combine React sources add license and write to library folder.
for (var src in combine) {
  var path = './lib/%name.min.%src'
    .replace('%name',pjson.name)
    .replace('%src',src);
  buildify()
    .concat(combine[src])
    .wrap('./libsrc/license.tpl', {
      version: pjson.version,
      file_name: pjson.name +'.min.' + src
    })
    .save(path);
}

// Create library/package.json from template with vars from ./package.json.
buildify()
  .wrap('./libsrc/package.json.tpl', {
    name: pjson.name,
    version: pjson.version,
    author: pjson.author,
    description: pjson.description
  })
  .save('./lib/package.json');

// Copy sources to library folder.
for (var item of mapping.maps.copy) {
  ncp(item.src, item.dest, function (err) {
    if (err) { return console.error(err); }
  });
  console.log('Copied: ', item);
}
