const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: () => true
        }
      }
    }
  },
  configureWebpack: config => {
    config.plugins = config.plugins.concat(
      new WebpackAssetsManifest({
        output: 'asset-manifest.json',
        transform(assets) {
          const regex = /\.(js|css)$/g;
          Object.keys(assets).forEach((key) => {
            if(!key.match(regex)) {
              delete assets[key];
            }
          });
          return assets
        }
      })
    )
  }
}
