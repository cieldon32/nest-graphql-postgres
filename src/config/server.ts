export default {
  endpoint: process.env.SERVER_URL || 'https://api.localhost.com',
  port: Number(process.env.PORT || 3000),
  isProd: process.env.NODE_ENV && process.env.NODE_ENV.startsWith('prod'),
  jwt: {
    secret: process.env.JWT_APP_SECRET || 'localhost',
    signOptions: {
      expiresIn: process.env.JWT_TOKEN_EXPIRES_IN || '14d',
    },
  },
};
