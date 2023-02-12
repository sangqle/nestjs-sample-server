import MySqlDatabaseConfig from './database/mysql.config';

export default () => ({
  environment: process.env.NODE_ENVIRONMENT
    ? process.env.NODE_ENVIRONMENT
    : 'development',
  database: {
    ...MySqlDatabaseConfig(),
  },
});
