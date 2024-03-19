import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"

interface Props {
  params: { chatId: string }
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1,
    )

    const dbMessages = results.map((message) => JSON.parse(message) as Message)

    const reversedDbMessages = dbMessages.reverse()

    // const messages =
  } catch (error) {
    notFound()
  }
}

export default async function Chat({ params }: Props) {
  const { chatId } = params
  const session = await getServerSession(authOptions)

  if (!session) notFound()

  const { user } = session

  const [userId1, userId2] = chatId.split("--")

  if (user.id !== userId1 && user.id !== userId2) {
    notFound()
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1
  const chatPartner = (await fetchRedis("get", `user:${chatPartnerId}`)) as User
  const initialMessages = await getChatMessages(chatId)

  return <div>{chatId}</div>
}
