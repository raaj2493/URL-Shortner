import express from "express";
import userRouter from "./Routes/user.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json()); // ✅ Important

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.use("/user", userRouter); // ✅ Mount router correctly

app.listen(port, () => {
  console.log("✅ Server is running on port " + port);
});

export default app;