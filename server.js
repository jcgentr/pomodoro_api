const express = require("express")
const socketIO = require("socket.io")
const index = require("./routes/index")
const app = express()
app.use(index)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT)
const io = socketIO(server)

let interval

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`)
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000)
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`)
    clearInterval(interval)
  })
})

const getApiAndEmit = socket => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response)
}


console.log(`My socket server is running on http://localhost:${PORT}/`)
console.log("CMD + Double-click to take you there")
