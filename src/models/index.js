const Movie = require('./Movie');
const Actor = require('./Actor');

Movie.belongsToMany(Actor, { through: 'MovieActor' });
Actor.belongsToMany(Movie, { through: 'MovieActor' });

module.exports = { Movie, Actor };