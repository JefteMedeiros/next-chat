import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

interface Props {
  friends: User[]
}

export function SidebarChatList({ friends }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([])

  useEffect(() => {
    // if (pathname?.includes("chat")) {
    //   setUnseenMessages((prev) => {
    //     prev.filter((msg) => !pathname.includes(msg.senderId))
    //   })
    // }
    if (pathname.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId))
      })
    }
  }, [pathname])

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
          return unseenMessage.senderId === friend.id
        }).length

        return <li key={friend.id}></li>
      })}
    </ul>
  )
}
