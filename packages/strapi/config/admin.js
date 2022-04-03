module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c3866854958a926c99f0590a050453cf'),
  },
});
