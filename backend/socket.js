const { Server } = require("socket.io");
const Request = require("./models/requestModel");

let io; // declaring io globally

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("newRequest", async () => {
            try {
                const requests = await Request.find().sort({ createdAt: -1 }); // Fetch latest requests
                const requestCount = requests.length; // Get updated count

                io.emit("updateRequests", requests);
                io.emit("updateRequestCount", requestCount);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        });
    });
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { initializeSocket, getIO };
