'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'standard'
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'role')
};
