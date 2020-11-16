import { Role } from './models'

export const AdminRole: Role = {
  roleName: 'Admin',
  permissions: [{ screenName: 'Profile' }, { screenName: 'Shipments' }],
}
