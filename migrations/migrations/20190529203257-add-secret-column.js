'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'secret', {
      type: Sequelize.STRING,
      allowNull: false
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'secret')
};
