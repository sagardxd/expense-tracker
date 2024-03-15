import express, { Router, Request, Response } from 'express';
import { signInSchema } from '../zod/user';

const userRouter = Router();

userRouter.post("/signin", async (req: Request, res: Response) => {
    //zod validation
    const result = signInSchema.safeParse(req.body);
    if (!(result.success)) {
        return res.status(411).json({ msg: "Input errors", error: result.error });
    }
    

    try {
        const 
    } catch (error) {
        
    }

})

export default userRouter;