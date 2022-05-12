const Sightings = require('./Sightings');
const State = require('./State');
const Users = require('./Users');
const Comments = require('./Comments');

Sightings.belongsTo(State, {
  foreignKey: 'state_id',
  onDelete: 'CASCADE'
});

State.hasMany(Sightings, {
  foreignKey: 'state_id',
});

Users.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Sightings.hasMany(Comments, {
  foreignKey: 'sighting_id',
  onDelete: 'CASCADE'
})

module.exports = { Sightings, State, Users, Comments };