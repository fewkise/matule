const { getDefaultConfig } = require("expo/metro-config");
const path = require('path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot,'..')
const config = getDefaultConfig(projectRoot)

config.watchFolders = [projectRoot, workspaceRoot]
config.resolver.extraNodeModules = {
  'uikit':path.resolve(workspaceRoot, 'packages/uikit'),
  'api-service':path.resolve(workspaceRoot, 'api-service')
}
config.resolver.nodeModulesPaths= [
  path.resolve(workspaceRoot, 'node_modules'),
  path.resolve(projectRoot, 'api-service')
]
module.exports = config