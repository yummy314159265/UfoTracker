const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class State extends Model {}

State.init(
  {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    State_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'State',
  }
);

module.exports = State;