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
  host: process.env.HOST || 'http://locahost',
  port: process.env.PORT || 8080,
  logs_path: 'logs',
  g_client_id: process.env.GOOGLE_CLIENT_ID,
  g_client_secret: process.env.GOOGLE_CLIENT_SECRET,
});
