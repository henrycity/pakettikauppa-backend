import request from 'supertest'
import app from '../app'
import { Screen } from '../types'
import { Permission } from '../data/models'

describe('App endpoints', () => {
  const agent = request.agent(app)

  it('should save cookies', function (done) {
    agent
      .post('/login')
      .send({ idToken: 'abc1234' })
      .set('Accept', 'application/json')
      .expect('set-cookie', new RegExp('jwt=abc1234; Max-Age=3600; Path=/;'))
      .expect(
        200,
        {
          success: true,
        },
        done
      )
  })

  it('should return correct permissions', async function (done) {
    agent
      .get('/permissions')
      .expect((res) => {
        const profile = res.body.find(
          (permission: Permission) => permission.screen == Screen.Profile
        )
        if (!profile) throw new Error('Profile not in permissions')

        const shipments = res.body.find(
          (permission: Permission) => permission.screen == Screen.Shipments
        )
        if (!shipments) throw new Error('Shipments not in permissions')
      })
      .then(() => done())
  })

  it('should return correct username', async function (done) {
    agent
      .get('/user')
      .expect((res) => {
        const { username } = res.body
        if (!username) throw new Error('No username found on user')
        if (username !== 'Admin')
          throw new Error('Expexted username to be Admin')
      })
      .then(() => done())
  })

  it('should return 403 if not logged in (permissions)', function (done) {
    request(app).get('/permissions').expect(403, done)
  })

  it('should return 403 if not logged in (user)', function (done) {
    request(app).get('/user').expect(403, done)
  })

  it('/register should return 400 with wrong data', function (done) {
    request(app)
      .post('/register')
      .send({ email: 'testemail@email.com' })
      .expect(400, done)
  })

  it('/register should return 200 with correct data', function (done) {
    request(app)
      .post('/register')
      .send({ email: 'testemail@email.com', vat_id: '22842235-2' })
      .expect(200, done)
  })
})
