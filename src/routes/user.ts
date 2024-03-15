import express, { Router, Request, Response } from 'express';
import { signInSchema, signUpSchema } from '../zod/user';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userRouter = Router();

userRouter.post("/signin", async (req: Request, res: Response) => {
    //zod validation
    const result = signInSchema.safeParse(req.body);
    if (!(result.success)) {
        return res.status(411).json({ msg: "Input errors", error: result.error });
    }

    try {
        const existingUser = prisma.user.findUnique({
            where: {
                email: result.data.email
            }
        })
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(existingUser);
    } catch (error) {
        console.error("Error occurred while signing in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})


userRouter.post("/signup", async (req: Request, res: Response) => {
    //zod validation
    const result = signUpSchema.safeParse(req.body);
    if (!(result.success)) {
        return res.status(411).json({ msg: "Input errors", error: result.error });
    }

    try {

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                email: result.data.email,
                password: result.data.password,
                name: result.data.name,
            },
        })

        return res.status(200).json("new user created");
    } catch (error) {
        console.error("Error occurred while signing in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
})





export default userRouter;