import { Request, Response, Router } from "express";
import passport from "passport";
import UserSchema from "../../database/schemas/Users";
import { User } from "../../database/schemas/Users";
import { HashCredentials } from "../../utils/helpers/hashCredentials";
const router = Router();

router.post("/login", passport.authenticate('local'), (req: Request, res: Response) => {
    console.log("Logged in");
    res.status(200).send({ msg: "Logged in" })
})

router.post("/register", async (req: Request, res: Response) => {

    try {
        const { email, username }: { email: string, username: string } = req.body;
        let { password: rawPassowrd }: { password: string } = req.body;
        if (!email || !rawPassowrd || !username) res.status(400).send({ msg: "Missing credentials" })

        const userDB = await UserSchema.findOne<User>({ email });

        if (userDB) {
            return res.status(403).send({ msg: "User arlady exist" })
        } else {
            const password = HashCredentials(rawPassowrd)

            const newUser = await UserSchema.create({ email, password, username })
            console.log(newUser);
            return res.status(201).send(newUser);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: "The sended credential doesn't respect the requested type!" })
    }

})

export default router;