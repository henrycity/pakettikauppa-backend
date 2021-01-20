import * as devcert from 'devcert'
import https from 'https'
import app from './app'

const port = process.env.PORT || 3000
const useHTTPS = process.env.HTTPS === 'true'

const listenCallback = () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`)
}

const runServer = async () => {
  if (useHTTPS) {
    const ssl = await devcert.certificateFor('pakettikauppa-backend')
    https.createServer(ssl, app).listen(port, listenCallback)
  } else {
    app.listen(port, listenCallback)
  }
}

runServer()
