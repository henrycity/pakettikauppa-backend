import express from 'express'
import { AdminUser } from './data/users'
const app = express()
const port = 3000

app.get('/permissions', (req, res) => {
  const permissions = AdminUser.roles.flatMap((role) => {
    return role.permissions
  })
  res.json(permissions)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
