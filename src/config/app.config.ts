import MySqlDatabaseConfig from './database/mysql.config';

export default () => ({
  environment: process.env.NODE_ENVIRONMENT
    ? process.env.NODE_ENVIRONMENT
    : 'development',
  jwt_ttl: parseInt(process.env.JWT_TTL) || 86400,
  jwt_secret: process.env.JWT_SECRET,
  database: {
    ...MySqlDatabaseConfig(),
  },
});
