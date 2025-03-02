const express = require("express");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./socket");

const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoute");
const requestRoute = require("./routes/requestRoute");
const trackerRoute = require("./routes/trackerRoute");
const documentRoute = require("./routes/documentRoute");
const paymentRoute = require("./routes/paymentRoute");

const app = express();
const server = http.createServer(app);

//socket
initializeSocket(server);

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", authRoute);
app.use("/api", userRoute);
app.use("/request", requestRoute);
app.use("/tracker", trackerRoute);
app.use("/documents", documentRoute);
app.use("/payments", paymentRoute);
// app.use("/requests", paymentRoute);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
