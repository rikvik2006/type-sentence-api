import { NextFunction, Request, Response, Router } from "express";
const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.user) next();
    else res.status(403).send({ msg: "Unathorized" })
})

router.get("/", (req: Request, res: Response) => {
    res.status(200).send({ msg: "Ok funziona" })
})

export default router;