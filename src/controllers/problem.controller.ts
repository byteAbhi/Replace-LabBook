import { Request, Response } from "express";
import prisma from "../db";
import { AuthRequest } from "../middleware/auth.middleware";
 
 


export const createProblem = async (req:AuthRequest , res: Response) => {

 const { title, description } = req.body;

 const problem = await prisma.problem.create({
    data: {
      title,
      description,
     createdBy: req.users!.id, // Assuming the user's ID is stored in req.users.id
       createdAt: new Date(),
    },
  }); 


res.json(problem);
}