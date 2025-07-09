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
  try {
    const file = req.file;
    const content = fs.readFileSync(file.path, 'utf-8');

    const blocks = content.trim().split(/\n\s*\n/);
    let imported = 0;

    for (const block of blocks) {
      const title = block.match(/Title:\s*(.*)/)?.[1]?.trim();
      const year = parseInt(block.match(/Release Year:\s*(\d{4})/)?.[1]);
      const format = block.match(/Format:\s*(.*)/)?.[1]?.trim();
      const starsLine = block.match(/Stars:\s*(.*)/)?.[1];
      const stars = starsLine ? starsLine.split(',').map(s => s.trim()) : [];

      if (!title || !year || !format) {
        console.warn('❗ Пропущено некоректний блок:\n', block);
        continue;
      }

      try {
        const movie = await Movie.create({ title, year, format });

        for (const star of stars) {
          const [actor] = await Actor.findOrCreate({ where: { fullName: star } });
          await movie.addActor(actor);
        }

        imported++;
      } catch (innerErr) {
        console.error(`❌ Помилка при додаванні фільму "${title}":`, innerErr.message);
      }
    }

    res.json({ message: `✅ Імпортовано ${imported} фільм(ів)` });
  } catch (err) {
    console.error('❌ Помилка при імпорті:', err);
    res.status(500).json({ error: 'Помилка імпорту' });
  }
};