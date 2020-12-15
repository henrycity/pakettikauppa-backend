import express from 'express'
import { AdminUser } from './data/users'
import cookieParser from 'cookie-parser'
import { tokenVerifier } from './authentication'
import corsSetup from './corsSetup'
import { RegisterForm } from './types'

const app = express()

app.use(corsSetup)
app.use(express.json())
app.use(cookieParser())

app.post('/login', (req, res) => {
  const { idToken } = req.body
  res.cookie('jwt', idToken, {
    httpOnly: true,
    maxAge: 3600000,
    secure: process.env.NODE_ENV == 'test' ? false : true,
    sameSite: 'none',
  })
  res.json({ success: true })
})

app.post('/register', (req, res) => {
  const { email, vat_id }: RegisterForm = req.body
  if (email && vat_id) res.json({ success: true })
  else res.status(400).json({ success: false })
})

app.get('/user', tokenVerifier, (_req, res) => {
  const { username, merchants } = AdminUser
  res.json({ username, merchants })
})

app.get('/permissions', tokenVerifier, (_req, res) => {
  const permissions = AdminUser.roles.flatMap((role) => {
    return role.permissions
  })
  res.json(permissions)
})

export default app
