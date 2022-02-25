export type Session = {
  listKey: string
  identityField: string
  secretField: string
  data: {
    name: string
    email: string
    isAdmin: boolean
  }
}
