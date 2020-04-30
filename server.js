const { server } = require('./src/index')
const port = process.env.PORT || 6767

const runServer = async () => {
  await server.listen(port, () => console.log(`App listening on port ${port}!`))
}
runServer()
