import { application, Request, Response, Router } from "express";
import passport from "passport";
const router = Router();

router.post("/login", passport.authenticate("local"), (req: Request, res: Response) => {
    console.log("Logged in");
    res.status(200).send({ msg: "Logged in" })
})