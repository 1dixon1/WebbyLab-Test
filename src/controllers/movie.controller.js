const { Movie, Actor } = require('../models');
const fs = require('fs');

exports.addMovie = async (req, res) => {
  const { title, year, format, stars } = req.body;
  const movie = await Movie.create({ title, year, format });
  const actors = await Promise.all(stars.map(name => Actor.findOrCreate({ where: { fullName: name } })));
  await movie.setActors(actors.map(a => a[0]));
  res.json(movie);
};

exports.deleteMovie = async (req, res) => {
  const id = req.params.id;
  await Movie.destroy({ where: { id } });
  res.sendStatus(204);
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id, { include: Actor });
  res.json(movie);
};

exports.listMovies = async (req, res) => {
  const movies = await Movie.findAll({ include: Actor, order: [['title', 'ASC']] });
  res.json(movies);
};

exports.searchByTitle = async (req, res) => {
  const movies = await Movie.findAll({
    where: { title: req.query.title },
    include: Actor
  });
  res.json(movies);
};

exports.searchByActor = async (req, res) => {
  const actor = await Actor.findOne({ where: { fullName: req.query.actor }, include: Movie });
  res.json(actor ? actor.Movies : []);
};

exports.importMovies = async (req, res) => {
  const file = req.file;
  const content = fs.readFileSync(file.path, 'utf-8');
  const movies = content.split(/\n{2,}/);
  for (const block of movies) {
    const title = block.match(/Title: (.*)/)?.[1];
    const year = parseInt(block.match(/Release Year: (\d+)/)?.[1]);
    const format = block.match(/Format: (.*)/)?.[1];
    const stars = block.match(/Stars: (.*)/)?.[1]?.split(',').map(s => s.trim()) || [];
    if (title && year && format) {
      const movie = await Movie.create({ title, year, format });
      const actors = await Promise.all(stars.map(name => Actor.findOrCreate({ where: { fullName: name } })));
      await movie.setActors(actors.map(a => a[0]));
    }
  }
  res.json({ message: 'Import successful' });
};