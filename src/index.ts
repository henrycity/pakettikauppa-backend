import * as devcert from 'devcert'
import https from 'https'
import fs from 'fs'
import app from './app'

const port = process.env.PORT || 3000
const useHTTPS = process.env.HTTPS === 'true'
const useDevcert = process.env.HTTPS === 'devcert'

const listenCallback = () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`)
}

const runServer = async () => {
  if (useDevcert) {
    const ssl = await devcert.certificateFor('pakettikauppa-backend')
    https.createServer(ssl, app).listen(port, listenCallback)
  } else if (useHTTPS) {
    const privateKey = fs.readFileSync('backend.key')
    const certificate = fs.readFileSync('backend.crt')
    const credentials = { key: privateKey, cert: certificate }
    https.createServer(credentials, app).listen(port, listenCallback)
  } else {
    app.listen(port, listenCallback)
  }
}

runServer()
