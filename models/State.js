const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class State extends Model {}

State.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    state_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state_abbr: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'state',
  }
);

module.exports = State;