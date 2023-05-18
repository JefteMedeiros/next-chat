import { NextResponse } from "next/server"

import { prisma } from "@/app/utils/prisma"

export async function GET() {
  const resData = await prisma.todo.findMany({
    orderBy: {
      createdAt: "asc",
    },
  })

  return NextResponse.json(resData)
}

export async function POST(req: Request) {
  const data = await req.json()

  const newTodo = await prisma.todo.create({
    data,
  })

  return NextResponse.json(newTodo)
}
