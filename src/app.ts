import express from 'express'
import { AdminUser } from './data/users'
import cookieParser from 'cookie-parser'
import { tokenVerifier } from './authentication'
import cors from './cors'

const app = express()

app.use(cors)
app.use(express.json())
app.use(cookieParser())

app.post('/login', (req, res) => {
  const { idToken } = req.body
  res.cookie('jwt', idToken, { httpOnly: true, maxAge: 3600000 })
  res.json({ success: true })
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
