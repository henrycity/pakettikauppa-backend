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
  createdOn: string
  trackingCode?: string
  // sender
  businessID: string
  senderName: string
  senderAddress: string
  senderCountry: string
  senderPostCode: string
  senderCity: string
  senderPhoneNumber: string
  senderEmail: string
  // receiver
  receiverAddress: string
  receiverCity: string
  receiverCountry: string
  receiverEmail: string
  receiverName: string
  receiverPhoneNumber: string
  receiverPostCode: string
  // Other
  price: number
  description: string
  reference: string
  deliveryCompany: string
  shippingMethod: string
  weight: number
  status: string
  latestEvent: string
  invoiceNumber: string
}
