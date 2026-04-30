import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";


export  const alloweRoles = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const userRole = req.users?.role; // Assuming the user's role is stored in req.users.role
        console.log("User Role:", userRole);
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};