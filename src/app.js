import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";   // all are the middleware so we use app.use
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials :true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extendend:true, limit:"16kb"}))
app.use(express.static("Public"))
app.use(cookieParser())

// router import

import userrouter from "./routes/user.routes.js"

app.use("/api/v1/users",userrouter)   //https:// localhost:8000/api/v1/users/register
  // for login       //https:// localhost:8000/api/v1/users/login


export { app}    // export default app