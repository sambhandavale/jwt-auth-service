import { Response, Express } from "express";
import authRouter from "./User/authRoute";

export const routes = (app: Express) =>{
    app.use("/api/auth", authRouter)
}