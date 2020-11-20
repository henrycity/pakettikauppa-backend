import { Role } from './models'
import { Screen } from '../types'

export const AdminRole: Role = {
  roleName: 'Admin',
  permissions: [{ screen: Screen.Profile }, { screen: Screen.Shipments }],
}
