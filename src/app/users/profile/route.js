import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export function GET() {
  const authHeader = headers().get('authorization')
  const accessToken = authHeader && authHeader.split(' ')[1]

  if (!accessToken) return NextResponse.json(null, {
    status: 401,
    statusText: "Missing access token"
  })

  let userData = null
  try {
    userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  } catch {
    return NextResponse.json(null, {
      status: 402,
      statusText: "Invalid access token"
    })
  }

  if (userData) {
    const userProfile = {
      name: userData.name,
      username: userData.username
    }

    return NextResponse.json(userProfile)
  } else {
    return NextResponse.json(null, {
      status: 403,
      statusText: "Access token corrupt"
    })
  }
}