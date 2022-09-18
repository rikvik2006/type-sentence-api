import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
    new Strategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            if (!email || password) throw Error("Missing credentials");

            const userDB = await 
        }
    )
)