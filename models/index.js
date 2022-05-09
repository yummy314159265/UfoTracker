const Sightings = require('./Sightings');
const State = require('./State');
const Users = require('./Users');
const Comments = require('./Comments');

Users.hasMany(Comments, {
  foreignKey: 'Users_id',
  onDelete: 'CASCADE'
})
Comments.hasOne(Users, {
  foreignKey: 'Comments_id',
  onDelete: 'CASCADE'
});

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




module.exports = {Sightings, State, Users, Comments};