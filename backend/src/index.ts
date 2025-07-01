import express from "express";
import { Request,Response } from "express";

const PORT = process.env.PORT  || 5000;

const app = express()


app.all("/",async(req : Request,res : Response) => {
    res.send("BACKEND IS RUNNING")
})


app.listen(PORT,() => {
    console.log(`BACKEND STARTED AT PORT NO ${PORT}`)
})
