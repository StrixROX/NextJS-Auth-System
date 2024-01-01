'use server'

import { prisma } from '@/app/prisma'
import bcrypt from 'bcrypt'

export default async function SignInHandler(formData) {
  const username = formData.get('username')
  const password = formData.get('password')

  let user = null
  let isCorrectPassword = false
  let msgs = []
  try {
    user = await prisma.users.findUnique({
      where: {
        username
      }
    })
  } catch (err) {
    msgs.push('An error occured')
  }

  if (user === null) {
    msgs.push('Invalid username')
  }
  else {
    isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword) {
      msgs.push('Incorrect password')
    }
  }

  return {
    success: isCorrectPassword,
    user: {
      name: user?.name,
      username: user?.username
    },
    msgs
  }
}