const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const MFS = require('memory-fs')
const path = require("path")

//Extends the Express server so that we use hot reloading in Dev envo.
// Hot reloading means our dependency modules are not loading into /dist but in memory
// This allows us to make changes and "hot-reload" the code so we see chagnes immediately without having to restart the node server
module.exports = function setupDevServer (app, onUpdate) {
  clientConfig.entry.app = [ //extends the webpack.client.config file and adds a new entry point. Adds to the entry array
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]
  clientConfig.plugins.push( //Push the plugins to the new entry point needed for hot-reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  const clientCompiler = webpack(clientConfig)
  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        colors: true
      }
    })
  )
  app.use(require('webpack-hot-middleware')(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, () => {
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
