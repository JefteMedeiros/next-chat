import { Server, Socket } from "socket.io"

export default (io: Server, socket: Socket) => {
  const createdMessage = (msg: string) => {
    socket.broadcast.emit("newIncomingMessage", msg)
  }

  socket.on("createdMessage", createdMessage)
}
