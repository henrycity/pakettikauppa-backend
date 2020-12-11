import { Role } from './models'

export const AdminRole: Role = {
  roleName: 'Admin',
  permissions: [
    { screen: 'Profile' },
    { screen: 'Reports' },
    { screen: 'Shipments' },
    { screen: 'Settings' },
    { screen: 'Statistics' },
  ],
}
