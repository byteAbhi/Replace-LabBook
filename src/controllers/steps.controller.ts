import { Request, Response } from "express";
import prisma from "../db";
import { AuthRequest } from "../middleware/auth.middleware";
 

export const addStep = async (req:AuthRequest,res:Response) => {
    const { problemId, title, description, order } = req.body;


    const step = await prisma.step.create({
        data: {
            problemId,
            title,
            description,
            order,
            
        },
    });

    res.json({ message: "Step added successfully", step })
}


export const getProblem = async (req:Request<{id:string}>, res: Response)=>{
    const {id} = req.params;
    const problem = await prisma.problem.findUnique({
        where:{id},
        include: {
            steps: {
                orderBy: { order: 'asc' },
                include: { hints: true },
            }
        }
    })
    res.json({ problem })
}