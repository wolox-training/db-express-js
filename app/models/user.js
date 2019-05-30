'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'standard' },
      secret: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '-secret-of-a-new-user-' }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );

  User.associate = models => {
    User.hasMany(models.Album);
  };

  return User;
};
