module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', `http://localhost:${env.int('PORT', 1337)}`), // Strapi 5 base URL
  proxy: {
    koa: true,
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
