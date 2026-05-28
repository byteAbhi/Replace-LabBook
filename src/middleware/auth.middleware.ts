import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";




export interface AuthRequest extends Request {
  users?: JwtPayload  ;
}

export const authMiddleware =(req :AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);
    if(!authHeader ){
        return res.status(401).json({message:"Unauthorized"});
    } 
    const token = authHeader; // Remove "Bearer " prefix

    console.log("Token:", token);
    try{
        const decoded   =  jwt.verify(token as string, process.env.JWT_SECRET as string);
        req.users = decoded  as JwtPayload; 
        console.log("Decoded user:", decoded);
        console.log("Request users:", req.users);
        next();
    }
    catch(error){
        return res.status(401).json({message:"Invalid token"});
    }
     
  
}