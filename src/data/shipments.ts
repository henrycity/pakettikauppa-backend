import { Shipment } from './models'

export const Shipments: Shipment[] = [
  {
    id: 1,
    createdOn: new Date(2021, 0, 4),
    receiverName: 'Henry',
    receiverEmail: 'henry@posti.fi',
    postCode: '02150',
    postOffice: 'Espoo',
    countryCode: 'FI',
    price: 42,
    status: '',
    reference: '',
    latestEvent: '',
    invoiceNumber: '',
  },
  {
    id: 2,
    createdOn: new Date(2020, 11, 25),
    receiverName: 'Joose',
    receiverEmail: 'joose@posti.fi',
    postCode: '01530',
    postOffice: 'Vantaa',
    countryCode: 'FI',
    price: 25,
    status: '',
    reference: '',
    latestEvent: '',
    invoiceNumber: '',
  },
]
