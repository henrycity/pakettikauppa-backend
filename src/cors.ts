import cors from 'cors'

const allowlist = ['http://localhost:19006']

export function corsOptionsDelegate(req: any, callback: any) {
  let corsOptions
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { credentials: true, origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

export default cors(corsOptionsDelegate)
