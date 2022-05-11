const Sightings = require('./sightings');
const State = require('./state');
const Users = require('./users');
const Comments = require('./comments');

Sightings.belongsTo(State, {
  foreignKey: 'state_id',
  onDelete: 'CASCADE'
});

State.hasMany(Sightings, {
  foreignKey: 'state_id',
});

module.exports = { Sightings, State, Users, Comments };