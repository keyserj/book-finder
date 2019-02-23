const env = process.env.NODE_ENV || 'development';
const config = (env === 'production' ? require('./env/production') : require('./env/development'));

export default config;
