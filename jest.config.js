const esModules = ['@ionic-native' , '@ionic'].join('|');

module.exports = {
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`]
};
