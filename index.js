import express from "express";
import authRoute from "./routes/authRoute.js";
import trakingRoute from "./routes/trackingRoute.js"
import cors from "cors";
import cookieParser from "cookie-parser";
const port = 3000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRoute);
app.use("/api", trakingRoute);

app.listen(port, () => {
  console.log("server workin port : " + port);
});
