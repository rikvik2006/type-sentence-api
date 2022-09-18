import { Request, Response, Router } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).send({ msg: "Ok funziona" })
})

export default router;