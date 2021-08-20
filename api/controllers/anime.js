const { parseEpisodes } = require('../parses')
const options = require('../../req-options')
const request = require('request')
const cheerio = require('cheerio')

const { base_url } = require('../constants')

exports.anime = (req, res) => {

  const url = base_url + req.params.id
  // console.log({url, local: 'anime'})

  request(url, options, (_err, _res, body) => {
    if (_res.statusCode == 404) {
      return returnError(_res, 'Página não encontrada.') // #swagger.responses[404] = { description: 'Página não encontrada.' }
    }

    if( _res.statusCode !== 200 || _err ){
      return returnError(_res, 'Erro no servidor.', 500) // #swagger.responses[404] = { description: 'Erro não tratado no servidor.' }
    }

    const $ = cheerio.load(body)

    const boxsInfs = $('.boxAnimeSobreLinha'),
          countInfs = boxsInfs.length,
          clear = obj => obj.text().split(':')[1].trim()

    let data = {
      status: 'Em andamento',
      name: $('.pagAniTitulo > .mwidth > h1').text(),
      cover: $('#capaAnime > img').attr('src'),
      generos: clear(boxsInfs.eq(1)).split(',').map(i => i.trim()),
      autor: clear(boxsInfs.eq(2)),
      diretor: clear(boxsInfs.eq(3)),
      estudio: clear(boxsInfs.eq(4)),
      total_episodios: clear(boxsInfs.eq(6)),
      total_ovas: clear(boxsInfs.eq(7)),
      total_filmes: clear(boxsInfs.eq(8)),
      lancamentos: '',
      ano: '',
      sinopse: $('#sinopse2').text().trim(),
      episodios: parseEpisodes($('.pagAniListaContainer'))
    }

    Object.assign(data, {
      total_episodios: data.episodios.length,
      lancamentos: `${countInfs == 12 ? clear(boxsInfs.eq(1)) : ''}`,
      ano: clear(boxsInfs.eq(countInfs - 1))
    })

    Object.assign(data, { status: `${data.total_episodios == '??' || data.lancamentos != '' ? 'Em lançamento' : 'Completo'}` })

    res.json({ ...data })
  })
}