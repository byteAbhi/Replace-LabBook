import { Request, Response } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import { loginSchema } from "../validators/auth.validator"
import jwt from "jsonwebtoken";

export const login = async(req:Request,res:Response)=>{
    const parsed = loginSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({errors:parsed.error})
    }
    const user = await prisma.user.findUnique({where:{email:parsed.data.email}});
    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(parsed.data.password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );

    res.json({ token });

}