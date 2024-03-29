import { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { FriendRequestSidebarOption } from "@/components/friend-request-sidebar-option"
import { Icon, Icons } from "@/components/icons"
import { SidebarChatList } from "@/components/sidebar-chat-list"
import { SignOutButton } from "@/components/sign-out-button"
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id"
import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"

interface Props {
  children: ReactNode
}

interface SidebarOption {
  id: number
  name: string
  href: string
  Icon: Icon
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
]

export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) notFound()

  const friends = await getFriendsByUserId(session.user.id)

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`,
    )) as User[]
  ).length

  return (
    <div className="w-full flex h-screen">
      <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Link className="flex h-16 shrink-0 items-center" href="/dashboard">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>
        {friends.length > 0 ? (
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your chats
          </div>
        ) : null}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChatList sessionId={session.user.id} friends={friends} />
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>

              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon]

                  return (
                    <li key={option.id}>
                      <Link
                        className="transition-all text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        href={option.href}
                      >
                        <span className="transition-all text-gray-400 border-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  )
                })}
                <li>
                  <FriendRequestSidebarOption
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            <li className="flex items-center justify-between mt-auto min-h-16 -mx-6">
              <div className="ml-6 flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <SignOutButton />
            </li>
          </ul>
        </nav>
      </div>
      <aside className="max-h-screen w-full">{children}</aside>
    </div>
  )
}
