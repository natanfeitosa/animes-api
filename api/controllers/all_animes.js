const { paginate, setPagination, getQuery } = require('../../utils')
const { parseAnimes } = require('../parses')
const options = require('../../req-options')
const request = require('request')
const cheerio = require('cheerio')

const { base_url } = require('../constants')

exports.all_animes = (req, res) => {
  // #swagger.tags = ['Animes']

  const query = getQuery(req)
  const path = `lista-de-animes-${query('filter') == 'dub' ? 'dublados-' : query('filter') == 'leg' ? 'legendados-' : ''}online/`;

  const url = base_url + path + paginate(req)

  // console.log({url, local: 'list_animes'})

  request(url, options, (_err, _res, body) => {
    if (_res.statusCode == 404) {
      return returnError(_res, 'Página não encontrada.')
    }

    if( _res.statusCode !== 200 || _err ){
      return returnError(_res, 'Erro não tratado no servidor.', 500)
    }

    const $ = cheerio.load(body)
    let data = { animes: parseAnimes($('.listaPagAnimes')) };
    
    Object.assign(data, setPagination(req, $))
    res.json(data)
  })
}
