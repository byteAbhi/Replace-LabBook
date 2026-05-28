import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
 
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
 
import problemRoutes from "./routes/problem.routes";
import stepsRoutes from "./routes/steps.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/steps",  stepsRoutes);


// Health check 
app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/api/test",(req,res)=>{
  res.json({message:"this is test runnuing"});
})

 


 

export default app;