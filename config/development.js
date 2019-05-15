exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    session: {
      secret: 'spiral-out-keep-going'
    }
  },
  isDevelopment: true
};
