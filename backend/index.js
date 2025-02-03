const express = require("express");
const cors = require("cors");

const authRoute = require("../backend/routes/auth/authRoutes");
const userRoute = require("../backend/routes/user/userRoute");

const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", authRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
