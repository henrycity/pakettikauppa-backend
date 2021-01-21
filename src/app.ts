import express from 'express'
import { AdminUser } from './data/users'
import { Shipments } from './data/shipments'
import cookieParser from 'cookie-parser'
import { tokenVerifier } from './authentication'
import corsSetup from './corsSetup'
import { RegisterForm } from './types'

const app = express()

// http://expressjs.com/en/guide/behind-proxies.html
// https://stackoverflow.com/questions/23413401/what-does-trust-proxy-actually-do-in-express-js-and-do-i-need-to-use-it
app.set('trust proxy', true)

app.use(corsSetup)
app.use(express.json())
app.use(cookieParser())

const cookieSettings = {
  httpOnly: true,
  maxAge: 3600000,
  sameSite:
    process.env.NODE_ENV === 'production'
      ? ('none' as const)
      : ('lax' as const),
  secure: process.env.NODE_ENV === 'production' ? true : false,
}

app.post('/login', (req, res) => {
  const { idToken } = req.body
  res.cookie('jwt', idToken, cookieSettings)
  res.json({ success: true })
})

app.post('/register', (req, res) => {
  const { email, vat_id }: RegisterForm = req.body
  if (email && vat_id) res.json({ success: true })
  else res.status(400).json({ success: false })
})

app.post('/logout', (_, res) => {
  res.clearCookie('jwt', cookieSettings)
  res.json({ success: true })
})

app.get('/user', tokenVerifier, (_req, res) => {
  const { username, merchants } = AdminUser
  const permissions = AdminUser.roles.flatMap((role) => {
    return role.permissions
  })
  res.json({ username, merchants, permissions })
})

app.get('/shipments', tokenVerifier, (_req, res) => {
  res.json(Shipments)
})

export default app
