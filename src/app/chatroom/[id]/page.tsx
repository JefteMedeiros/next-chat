import { SendHorizonal } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ChatRoom({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div>
      <h1 className="text-white text-[4rem] mt-4 text-center">Next Chat</h1>
      <div className="m-auto mt-8 max-w-[624px] w-full">
        <span className="text-white">
          Room id: <b>{id}</b>
        </span>
        <div className="bg-white rounded-lg flex flex-col gap-4 items-end p-5 mt-2">
          <div className="flex items-end gap-2 w-full h-fit">
            <div
              contentEditable={true}
              className="py-2 px-3 max-w-[calc(100%-50px)] w-full border-input border rounded-md min-h-full break-words whitespace-pre-wrap"
              placeholder="Enter a message"
            />
            <Button variant="outline">
              <SendHorizonal size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
