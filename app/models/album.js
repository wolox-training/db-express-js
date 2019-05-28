'use strict';

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, field: 'user_id' }
    },
    {
      underscored: true,
      tableName: 'albums'
    }
  );

  Album.associate = models => {
    Album.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Album;
};
