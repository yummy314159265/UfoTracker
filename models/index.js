const Sightings = require('./Sightings');
const State = require('./State');
const Users = require('./Users');

Sightings.hasOne(State, {
  foreignKey: 'State_id',
  onDelete: 'CASCADE'
});

State.hasMany(Sightings, {
  foreignKey: 'Sightings_id',
onDelete: 'CASCADE'
});

Sightings.belongsTo(State, {
  foreignKey: 'Sightings_id'
});


State.belongsTomany(Sightings, { 
  through
})




module.exports = {Sightings, State, Users};