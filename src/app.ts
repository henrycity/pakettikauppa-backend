import express, { Request, Response } from 'express'
import { AdminUser } from './data/users'
import { Shipments } from './data/shipments'
import cookieParser from 'cookie-parser'
import { tokenVerifier } from './authentication'
import { RegisterForm } from './types'
import { body, validationResult } from 'express-validator'
import cors from 'cors'

const app = express()

// http://expressjs.com/en/guide/behind-proxies.html
// https://stackoverflow.com/questions/23413401/what-does-trust-proxy-actually-do-in-express-js-and-do-i-need-to-use-it
app.set('trust proxy', true)

const corsOptions = {
  credentials: true,
  origin: true,
}
app.use(cors(corsOptions))
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

app.get('/permissions', tokenVerifier, (_req, res) => {
  const permissions = AdminUser.roles.flatMap((role) => {
    return role.permissions
  })
  res.json(permissions)
})

app.get('/shipments', tokenVerifier, (req, res) => {
  const search = req.query.search?.toString().toLowerCase()
  if (search) {
    res.json(
      Shipments.filter((shipment) => {
        return JSON.stringify(shipment).toLowerCase().includes(search)
      })
    )
  } else {
    res.json(Shipments)
  }
})

app.get('/shipment', tokenVerifier, (req, res) => {
  const id = req.query.id
  const shipment = Shipments.find((s) => s.id === Number(id))
  shipment ? res.json(shipment) : res.status(400).send('Shipment not found')
})

app.post(
  '/shipments',
  tokenVerifier,
  // Validate shipment fields
  body('receiverName').isString(),
  body('receiverEmail').isEmail().normalizeEmail(),
  body('receiverPostCode').isPostalCode('FI'),
  body('receiverCity').isString(),
  body('receiverCountry').equals('Finland'),
  (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const postData = req.body
    // Create a new shipment based on the given values. Will not include any extra fields from the post for security and such
    const newShipment = {
      id: Shipments[Shipments.length - 1].id + 1, // Increment last shipment's ID by 1
      createdOn: new Date().toString(),
      businessID: postData.businessID,
      senderName: postData.senderName,
      senderAddress: postData.senderAddress,
      senderCountry: postData.senderCountry,
      senderPostCode: postData.senderPostCode,
      senderCity: postData.senderCity,
      senderPhoneNumber: postData.senderPhoneNumber,
      senderEmail: postData.senderEmail,
      receiverName: postData.receiverName,
      receiverEmail: postData.receiverEmail,
      receiverPostCode: postData.receiverPostCode,
      receiverCity: postData.receiverCity,
      receiverCountry: postData.receiverCountry,
      receiverPhoneNumber: postData.receiverPhoneNumber,
      receiverAddress: postData.receiverAddress,
      deliveryCompany: postData.deliveryCompany,
      shippingMethod: postData.shippingMethod,
      weight: postData.weight,
      price: 0, // Ideally this should be queried from the Posti API in the backend (Don't trust the user)
      // The following should be changed when we have implementation for it
      status: '',
      reference: postData.reference,
      latestEvent: '',
      invoiceNumber: postData.invoiceNumber,
      description: postData.description,
    }

    Shipments.push(newShipment) // Add the new shipment to our shipments
    res.json({ success: true, shipment: newShipment })
  }
)

export default app
