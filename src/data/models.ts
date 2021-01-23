import { Screen } from '../types'

export interface Merchant {
  users: User[]
  roles: Role[]
}

export interface User {
  id: number
  username: string
  merchants: Merchant[]
  roles: Role[]
}

export interface Role {
  roleName: string
  permissions: Permission[]
}

export interface Permission {
  screen: Screen
}

export interface Shipment {
  // Metadata
  id: number
  createdOn: Date
  // Shipping Address
  receiverName: string
  receiverEmail: string
  postCode: string // This could be a number but this seems more consistent
  postOffice: string
  countryCode: string
  // Other
  price: number
  deliveryCompany: string
  status: string
  reference: string
  latestEvent: string
  invoiceNumber: string
}
