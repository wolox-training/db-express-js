'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        name: 'Arquimedes',
        last_name: 'Alighieri',
        email: 'arquimedes.ali@wolox.co',
        password: '$2b$10$QyCTfl29yXujZPG8HbVxVeeW2dgmE6nwqW2GtQHqydN7E55uMjCkC',
        role: 'admin',
        secret: 'dpbmeucldryjobxsvxbwmnejvfpmmc',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete('users')
};
