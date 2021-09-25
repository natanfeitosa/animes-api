const { getQuery, paginate, returnError, setPagination } = require('../../utils')
const { parseAnimes } = require('../parses')
const options = require('../../req-options')
const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')

const { base_url } = require('../constants')

exports.category = (req, res) => {
  const url = base_url + paginate(req) + `?s=${_.deburr(req.params.cat)}`

  // console.log({url, local: 'category'})

  request(url, options, (_err, _res, body) => {
    if (_res.statusCode == 404) {
      return returnError(res, 'Página não encontrada.')
    }

    if( _res.statusCode !== 200 || _err ){
      return returnError(res, 'Erro no servidor.', 500)
    }

    const $ = cheerio.load(body)
    let data = { animes: parseAnimes($('.searchPagContainer')) }

    Object.assign(data, setPagination(req, $))
    res.json(data)
  })
}