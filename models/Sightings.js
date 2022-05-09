const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Sightings extends Model {}

Sightings.init(
  {
    Sightings_id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.TEXT
    },
    summary: {
      type: DataTypes.TEXT
    },
    shape: {
      type: DataTypes.TEXT
    },
    date_time: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Sightings'
  }
);

module.exports = Book;