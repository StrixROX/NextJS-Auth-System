'use server'

import { prisma } from '@/app/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function SignInHandler(formData) {
  const username = formData.get('username')
  const password = formData.get('password')

  let user = null
  let isCorrectPassword = false
  let accessToken = null
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

  if (user) {
    isCorrectPassword = await bcrypt.compare(password, user.password)

    if (isCorrectPassword) {
      const userData = {
        name: user.name,
        username: user.username
      }

      accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
    }
    else {
      msgs.push('Incorrect password')
    }
  } else {
    msgs.push('Invalid username')
  }

  return {
    success: accessToken !== null,
    accessToken,
    msgs
  }
}