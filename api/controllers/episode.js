const _ = require('lodash')
const cheerio = require('cheerio')
const request = require('request')
const options = require('../../req-options')
const requestProxy = require("express-request-proxy")
const { returnError, parseJSON } = require('../../utils')

const { base_url } = require('../constants')

exports.episode = (req, res, next) => {
  
  const url = base_url + req.params.id

  // console.log({url, local: 'episode'})

  request(url, options, (_err, _res, body) => {
    if (_res.statusCode == 404) {
      return returnError(_res, 'Página não encontrada.')
    }

    if( _res.statusCode !== 200 || _err ){
      return returnError(_res, 'Erro no servidor.', 500)
    }
    
    let $ = cheerio.load(body)

    const redirectUrl = $('.playeranu a').attr('href')

    // return res.json({ redirectUrl })

    request(redirectUrl, options, (_err, _res, body) => {
      if (_res.statusCode == 404) {
        return returnError(_res, 'Página não encontrada.')
      }

      if( _res.statusCode !== 200 || _err ){
        return returnError(_res, 'Erro no servidor.', 500)
      }
      
      const $$ = cheerio.load(body)
      let video = $$('body > script').html().replace(/(\n|\s|\t)+/mig, ' ').match(/(playlist: \[\{.*\}\])/mig)[0]

      video = parseJSON(video)['playlist'][0]['sources'].filter(s => !_.isEmpty(s))

      // return res.json({video})

      // console.log({video})

      const proxyVideo = requestProxy({
        url: video[0]['file'],
        headers: {
          'Referer': 'https://www.anitube.site/',
          'Range': req.headers['range'],
        }
      })

      proxyVideo(req, res, next)
    })
  })
}
