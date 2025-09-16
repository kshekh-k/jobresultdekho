const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: env('POSTGRES_CLIENT', 'postgres'),
    connection: {
      host: env('POSTGRES_HOST', 'postgres'),
      port: env.int('POSTGRES_PORT', 5432),
      database: env('POSTGRES_DB', 'xyresults'),
      user: env('POSTGRES_USER', 'xyresults_user'),
      password: env('POSTGRES_PASSWORD', 'xyresults_pass'),
      ssl: env.bool('POSTGRES_SSL', false),
    },
    debug: false,
  },
});