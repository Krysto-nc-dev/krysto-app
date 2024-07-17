import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    lastname: 'Admin',
    email: 'admin@mail.com',
    role: 'User',
    password: bcrypt.hashSync('So123456!', 10),
    isAdmin: true,
  },
  {
    name: 'Jhon',
    lastname: 'Doe',
    email: 'jhon@mail.com',
    role: 'User',
    password: bcrypt.hashSync('So123456!', 10),
  },
  {
    name: 'Jean',
    lastname: 'Dupont',
    email: 'jean@mail.com',
    role: 'Partner',
    password: bcrypt.hashSync('So123456!', 10),
  },
]

export default users
