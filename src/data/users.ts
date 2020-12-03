import { User } from './models'
import { AdminRole } from './roles'

export const AdminUser: User = {
  id: 1,
  username: 'Admin',
  merchants: [],
  roles: [AdminRole],
}
