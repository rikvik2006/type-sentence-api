import bcrypt from "bcrypt";

export const HashCredentials = (password: string) => {
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);

    return bcrypt.hashSync(password, salt);
}

export const CompareHash = (raw: string, hashedPassword: string) => {
    return bcrypt.compareSync(raw, hashedPassword);
}