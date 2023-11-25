import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Nickname() {
  return (
    <div>
      <h1 className="text-white text-[4rem] mt-4 text-center">Next Chat</h1>
      <div className="m-auto w-fit mt-8 bg-white rounded-lg flex flex-col gap-4 items-end p-5">
        <h2 className="text-lg font-medium">
          To enter the chat, choose your nickname
        </h2>
        <Input placeholder="Eg: vvshawty" />
        <Button>Next</Button>
      </div>
    </div>
  )
}
