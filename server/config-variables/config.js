let config = {};

const env = process.env.NODE_ENV || 'development';

switch (env) {
  case 'production':
    config = require('./env/production');
    break;

  case 'development':
  default:
    config = require('./env/development');
    break;
}

export default config;