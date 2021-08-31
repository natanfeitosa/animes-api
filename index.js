const cors = require('cors')
const express = require('express')
const pkg = require('./package.json')
const routes = require('./api/routes')
const { createServer } = require('http')
const swagger_doc = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

const app = express(),
  server = createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1', cors, routes)

swagger_doc['info']['version'] = pkg['version']

if (process.env.NODE_ENV == 'development'){
    swagger_doc['host'] = 'https://animes-api.natanapps.repl.co'
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger_doc))

app.get('*', (req, res) => {
  res.redirect('/docs')
})

let PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log(`Running on port ${PORT}.`);
});
