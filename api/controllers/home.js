const { parseAnimes } = require('../parses')
const options = require('../../req-options')
const request = require('request')
const cheerio = require('cheerio')

const { base_url } = require('../constants')

exports.home = (_, res) => {
  request(base_url, options, (_err, _res, body) => {
    const $ = cheerio.load(body), objs = {}

    $('body > .aniContainer').each((_, el) => {
      let sectionTitle = $(el).clone().children('.aniContainerTitulo').text().split('●')[0].trim()

      sectionTitle = sectionTitle.startsWith('ANITUBE') ? 'Mais Vistos' : sectionTitle

      Object.assign(objs, {[sectionTitle.toUpperCase().replace(' ', '_')]: parseAnimes($(el))})
    })

    res.json(objs)
  })
}