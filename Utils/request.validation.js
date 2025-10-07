import {z} from "zod";

export const SignUpPostSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

export const SignInPostSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});