const express = require('express')
const routes = require('./api/routes')
const { createServer } = require('http')
const swaggerFile = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

const app = express(),
  server = createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1', routes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('*', (req, res) => {
  res.redirect('/docs')
})

let PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log(`Running on port ${PORT}.`);
});
