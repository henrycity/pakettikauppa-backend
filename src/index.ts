import express from 'express'
import { AdminUser } from './data/users'
const app = express()
const port = 3000
import cookieParser from 'cookie-parser'
import { tokenVerifier } from './authentication'
import cors from './cors'

app.use(cors)
app.use(express.json())
app.use(cookieParser())

app.get('/', tokenVerifier, (req, res) => {
  res.json({ success: true })
})

app.post('/login', (req, res) => {
  const { idToken } = req.body
  res.cookie('jwt', idToken, { httpOnly: true, maxAge: 3600000 })
  res.json({ success: true })
})

app.get('/permissions', (req, res) => {
  const permissions = AdminUser.roles.flatMap((role) => {
    return role.permissions
  })
  res.json(permissions)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`)
})
