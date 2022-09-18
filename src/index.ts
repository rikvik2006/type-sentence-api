import express, { application, urlencoded } from "express";
import cors from "cors";
const app = express();

app.use(express.urlencoded());
app.use(express.json());



app.use(cors({
    credentials: true,
    origin: ["localhost:3000", "localhost:3001"],

}))

