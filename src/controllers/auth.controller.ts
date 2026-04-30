import { Request,Response } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/auth.validator";

export const register = async (req: Request, res: Response) => {
     const parsed = registerSchema.safeParse(req.body);
     if(!parsed.success){
         return res.status(400).json({ errors: parsed.error});
     }
     const {name , email,password} = parsed.data;
     const existingUser = await prisma.user.findUnique({where: {email}});
     if(existingUser){
        return res.status(400).json({message:"user already exists"});
     }
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "STUDENT",
        },
     
     })

     res.status(201).json({message:"User registered successfully", user:{id:user.id,name:user.name,email:user.email}}); 
};