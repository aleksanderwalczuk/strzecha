module.exports = ({ env }) => ({
  // https://docs.strapi.io/developer-docs/latest/update-migration-guides/migration-guides/v4/migration-guide-4.0.6-to-4.1.8.html
  'users-permissions': {
    config: {
    jwtSecret: env('JWT_SECRET')
  },
  },
});
