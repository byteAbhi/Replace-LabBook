import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { alloweRoles } from "../middleware/role.middleware";
import { createProblem } from "../controllers/problem.controller";
 

 const  router =Router();

 router.post("/",authMiddleware,alloweRoles('TEACHER'), createProblem);

export default router;
 