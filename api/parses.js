const cheerio = require('cheerio')
const { getNumbers } = require('../utils')
const { pathResolve } = require('./resolvers')

module.exports = {
  parseAnimes: el => {
    const $ = cheerio.load(typeof el == 'string' ? el : el.clone().html())

    return $('.aniItem a').map((_, anime) => {
      const imgCont = $(anime).children('.aniItemImg')
      const id = getNumbers($(anime).attr('href'))
      return {
        id,
        'link': pathResolve(`anime:${id}`),
        'name': $(anime).children('.aniItemNome').text().trim(),
        'cover': imgCont.children('img').attr('src'),
        'is_subtitled': imgCont.children('.aniCC').text().trim().toUpperCase() == 'LEGENDADO'
      }
    }).toArray()
  },
  parseEpisodes: el => {
    const $ = cheerio.load(typeof el == 'string' ? el : el.clone().html())

    return el.children('a').toArray().map(e => {
      const id = getNumbers($(e).attr('href'))
      return {
        id,
        'titulo': $(e).text(),
        'link': pathResolve(`episode:${id}`)
      }
    })
  },
}

// aniCC