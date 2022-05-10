const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Sightings extends Model {}

Sightings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_time: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT
    },
    state_id: {
      type: DataTypes.TEXT
    },
    shape: {
      type: DataTypes.TEXT
    },
    duration: {
      type: DataTypes.TEXT
    },
    summary: {
      type: DataTypes.TEXT
    },
    date_posted: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'sightings'
  }
);

module.exports = Sightings;