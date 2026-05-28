import { Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { alloweRoles } from "../middleware/role.middleware";
import { addStep, getProblem } from "../controllers/steps.controller";

const router =  Router();

router.post("/",authMiddleware,alloweRoles('TEACHER'),addStep,(res:Response)=>{
    res.json({message:"Step added successfully"});
});

router.get("/problem/:id",getProblem,(res:Response)=>{
    res.json({message:"Problem fetched successfully"});
});

export default router;