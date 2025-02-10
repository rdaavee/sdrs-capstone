const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoute");
const requestRoute = require("./routes/requestRoute");

const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", authRoute);
app.use("/api", userRoute);

app.use("/request", requestRoute);

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
