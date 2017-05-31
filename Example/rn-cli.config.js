/**
 * React Native CLI configuration file.
 * Make it possible to run example by starting the packager.
 */

const blacklist = require('react-native/packager/blacklist');
const config = require('react-native/packager/rn-cli.config');

config.getBlacklistRE = () => blacklist([
  new RegExp('node_modules/react-native-barcode-builder/Example/node_modules/(.*)'),
]);

module.exports = config;
