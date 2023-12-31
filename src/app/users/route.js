import { NextResponse } from "next/server";
import { prisma } from "../prisma";

export async function GET() {
  const users = await prisma.users.findMany()
  return NextResponse.json(users)
}