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
