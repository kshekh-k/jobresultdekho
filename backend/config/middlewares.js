module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        env('CLIENT_URL', 'http://localhost:3000'),
        env('ADMIN_URL', 'http://localhost:1337'),
        'http://localhost:3000',
        'https://jobresultdekho.com',
        'https://www.jobresultdekho.com',
        'https://api.jobresultdekho.com',
      ],
      headers: '*',
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb',
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
