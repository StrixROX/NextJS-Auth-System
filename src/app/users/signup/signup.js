'use server'

import { prisma } from '@/app/prisma'
import bcrypt from 'bcrypt'

export default async function SignUpHandler(formData) {
  const name = formData.get('name')
  const username = formData.get('username')
  const password = formData.get('password')

  const hashedPassword = await bcrypt.hash(password, 10)

  let user = null
  let msgs = []
  try {
    user = await prisma.users.create({
      data: {
        name,
        username,
        password: hashedPassword
      }
    })
  } catch (err) {
    if (err.meta?.target === 'Users_username_key') {
      msgs.push("Username already exists")
    } else {
      msgs.push("Error creating user")
    }
  }

  return {
    success: user !== null,
    msgs
  }

}