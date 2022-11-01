// https://www.npmjs.com/package/buildify
const buildify = require('buildify');
// https://www.npmjs.com/package/ncp
const ncp = require('ncp').ncp;

const assets = require('./dist/asset-manifest.json');
const pjson = require('./package.json');
const mapping = require('./libsrc/mapping.json');

const tokens = {
  ...pjson,
  version: pjson.version,
  year: new Date().getFullYear(),
  keywords: `"${pjson.keywords.join('", "')}"`,
}

// Collect entry points by type.
const combine = {
  js: [
    `dist/${assets['chunk-vendors.js']}`,
    `dist/${assets['app.js']}`,
  ], css: [
    `dist/${assets['app.css']}`,
  ]
}

// Combine React sources add license and write to library folder.
for (let src in combine) {
  let path = './dist/cookiesjsr.min.%src'
    .replace('%src',src);
  buildify()
    .concat(combine[src])
    .perform(function(content) {
      return content.replace(/\/\/# sourceMappingURL=([0-9a-z\-]*\.){1,9}map/g, '')
    })
    .wrap('./libsrc/license-wrap.tpl', {
      ...tokens,
      file_name: 'cookiesjsr.min.' + src,
    })
    .save(path);
}

// Create composer.json from template with settings from ./package.json.
buildify()
  .wrap('./libsrc/composer.json.tpl', tokens)
  .save('./composer.json');

// Create LICENSE.txt file with current information.
buildify()
  .load('./libsrc/LICENSE.txt')
  .wrap('./libsrc/license-wrap.tpl', {
    ...tokens,
    file_name: 'LICENSE.txt',
  })
  .save('./LICENSE.txt');

// Copy sources to library folder.
for (let item of mapping.maps.copy) {
  ncp(item.src, item.dest, function (err) {
    if (err) { return console.error(err); }
  });
  console.log('Copied: ', item);
}
