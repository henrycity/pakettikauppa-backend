/*
  This file acts as the entrypoint of the application.
  It handles starting the server, optionally with HTTPS
*/
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
    // Use devcert to provide SSL certificates for development
    const ssl = await devcert.certificateFor('pakettikauppa-backend')
    https.createServer(ssl, app).listen(port, listenCallback)
  } else if (useHTTPS) {
    // Use key and certificate files from application root
    const privateKey = fs.readFileSync('backend.key')
    const certificate = fs.readFileSync('backend.crt')
    const credentials = { key: privateKey, cert: certificate }
    https.createServer(credentials, app).listen(port, listenCallback)
  } else {
    // Use HTTP only
    app.listen(port, listenCallback)
  }
}

runServer()
