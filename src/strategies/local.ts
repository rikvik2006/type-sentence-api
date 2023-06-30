import passport from "passport";
import { Strategy } from "passport-local";
import UserSchema, { User } from "../database/schemas/Users";
import { CompareHash } from "../utils/helpers/hashCredentials";

passport.serializeUser((user: any, done) => {
    console.log("Serializing User")
    console.log(user);
    done(null, user.id);  //req.sessions.passport.user
})

passport.deserializeUser(async (id: string, done) => {
    console.log("Deserializing user");

    try {
        const userDB = await UserSchema.findById<User>(id);

        if (!userDB) throw Error("User not found");
        console.log(userDB);
        done(null, userDB);  //req.user
    } catch (err) {
        console.log(err);
        done(err, null);
    }
})

passport.use(
    new Strategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {

            try {
                if (!email || !password) throw Error("Missing credentials");

                const userDB = await UserSchema.findOne({ email })

                if (!userDB) throw Error("User not found!")

                const isValid = CompareHash(password, userDB.password)

                if (isValid) {
                    console.log("Auth sucessfull");
                    done(null, userDB);
                } else {
                    console.log("Invalid Auth");
                    done(null, null);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
        }
    )
)