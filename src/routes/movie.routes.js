const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const movie = require('../controllers/movie.controller');
const auth = require('../middlewares/auth.middleware');
const path = require('path');

router.use(auth);
router.post('/', movie.addMovie);
router.delete('/:id', movie.deleteMovie);
router.get('/:id', movie.getMovie);
router.get('/', movie.listMovies);
router.get('/search/title', movie.searchByTitle);
router.get('/search/actor', movie.searchByActor);
router.get('/import', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/import.html'));
});
router.post('/import', upload.single('file'), movie.importMovies);

module.exports = router;