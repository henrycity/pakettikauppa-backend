import cors, { CorsOptions } from 'cors'
import { Request } from 'express'

const allowlist = [
  'http://localhost:19006',
  'http://localhost:5000',
  'https://pakettikauppa-expo.netlify.app',
  'https://expo:19006',
]

export function corsOptionsDelegate(
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void
): void {
  let corsOptions
  if (allowlist.indexOf(req.header('Origin') as string) !== -1) {
    corsOptions = { credentials: true, origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

export default cors(corsOptionsDelegate)
