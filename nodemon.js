const { server } = require('./src/index')
const port = process.env.PORT || 6767

const runServer = () => {
  server.listen(port, () => console.log(`App listening on port ${port}!`))
}
runServer()
