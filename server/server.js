import express from 'express';
import "dotenv/config.js";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRouted.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// Create Express App
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
    cors: {
        origin: " * ",
    }
});

//Stores online users
export const userSocketMap = {}; //userId: socketId

//Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    //Emit online users to all connection clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})


// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Basic API routes
app.use("/api/status", (req, res) => res.send("Server is live....."));
app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);

// Connect to Database
await connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log("Server is running on port: " + PORT)
);