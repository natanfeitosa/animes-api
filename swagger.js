const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./api/routes.js']

const doc = {
  info: {
    version: '1.0.0',
    title: 'API para pegar animes ',
    description: 'Documentação gerada automagicamente por <b>swagger-autogen</b>.'
  },
  host: 'animes.natanapps.repl.co',
  basePath: '/v1',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      'name': 'Home',
      'description': 'Endpoint que retorna alguns animes com base em três critérios: Mais assistidos, Animes recentes e Lançamentos do dia'
    },
    {
      'name': 'Animes',
      'description': 'Lista os animes disponíveis separados por paginação.'
    },
    {
      'name': 'Categoria',
      'description': 'Retorna todos os animes com base em uma categoria, separado por paginação'
    },
    {
      'name': 'Anime',
      'description': 'Retorna o anime no id passado por parametro.'
    },
    {
      'name': 'Episodio',
      'description': 'Retorna um determinado episodio no id passado',
    },
  ],
  definitions: {}
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index')           // Your project's root file
})
