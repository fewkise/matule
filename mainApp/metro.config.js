const path = require ('path')
const {getDefaultConfig} = require('expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)
config.watchFolders = [projectRoot, workspaceRoot]

config.resolver.extraNodeModules = {
    "uikit":path.resolve(workspaceRoot, 'packages/uikit'),
    "api-service":path.resolve(workspaceRoot, 'packages/api-service')
}
config.resolver.nodeModulesPaths = [
    path.resolve(workspaceRoot, 'node_modules'),
    path.resolve(projectRoot, 'node_modules')
]

module.exports = config