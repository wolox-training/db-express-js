exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    session: {
      secret: process.env.SESSION_SECRET
    }
  },
  isDevelopment: true
};
