import express from "express";
import cors from "cors";
import { config } from "dotenv";
import router from "./router";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import "./database";
import "./strategies/local";
config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({
    extended: false,
}
));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 60 * 24 * 30,  //30 giorni
        },
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        })
    })
)

app.use(
    cors({
        credentials: true,
        origin: ["localhost:3000", "localhost:3001"],
    })
)

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(PORT, () => console.log("App listen on http://localhost:3001"))


