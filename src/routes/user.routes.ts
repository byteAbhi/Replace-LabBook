import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { alloweRoles } from "../middleware/role.middleware";
 
const router = Router();

router.get("/" ,authMiddleware, alloweRoles('TEACHER'), getUsers);

export default router; 