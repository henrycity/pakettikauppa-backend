import { Role } from './models'

export const AdminRole: Role = {
  roleName: 'Admin',
  permissions: [
    { screen: 'Profile' },
    { screen: 'Shipments' },
    { screen: 'Settings' },
  ],
}
