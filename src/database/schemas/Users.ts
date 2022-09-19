import mongoose from "mongoose";

export interface User {
    id: string,
    email: string,
    username: string,
    password: string,
    strixDay: number,
    createdAt: Date,
}

const Users = new mongoose.Schema<User>({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    strixDay: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date,
    }
})

export default mongoose.model("Users", Users);
