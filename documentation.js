const SilkPaper = require('/Users/danielbenavidesvargas/WUtilities/silk-paper-node');

const app = require('./app');

exports.docs = new SilkPaper(app, { docsDir: 'docss/v1' });
