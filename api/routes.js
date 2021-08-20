const express = require('express')
const router = express.Router();
const cacheService = require("express-api-cache");
const cache = cacheService.cache('2 day');

const { home, all_animes, category, search, anime, episode } = require('./controllers')

// Pega três listas de animes, sendo elas: Mais Vistos, Animes Recentes e Lançamentos dos dia
router.get('/', home)

// Pega um anime individual
router.get('/a/:id', cache, anime)

// Retorna uma lista de animes
router.get('/animes', cache, all_animes)

// Retorna uma lista de animes da categoria desejada
router.get('/categoria/:cat', cache, category)

// Pesquisa animes
router.get('/pesquisar/:text', cache, search)

// Retorna o episódio do anime
router.get('/episodio/:id', cache, episode)

module.exports = router;
