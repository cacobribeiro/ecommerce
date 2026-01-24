import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { socketAuth } from "./services/auth.js";

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

io.use(socketAuth);

io.on("connection", (socket) => {
  socket.join(socket.user.id);
  socket.emit("welcome", { message: "Conectado ao canal em tempo real." });
});

app.set("io", io);

httpServer.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
