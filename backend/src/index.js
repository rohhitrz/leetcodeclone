import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import ProblemRoutes from "./routes/problem.route.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieparser());

app.get("/",(req,res)=>{
 res.send("welcome to leetlab");
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems",ProblemRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
