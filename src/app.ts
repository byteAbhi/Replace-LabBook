import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/api/test",(req,res)=>{
  res.json({message:"this is test runnuing"});
})

export default app;