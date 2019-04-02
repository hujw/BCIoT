module.exports = {
  'dev': {
    'dialect': 'sqlite',
    'storage': './db.development.sqlite',
    logging: false
  },
  'test': {
    'dialect': 'sqlite',
    'storage': ':memory:'
  },
  'prod': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': 'database_production',
    'host': process.env.DB_HOST,
    'dialect': 'mysql'
  }
}
