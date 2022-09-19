import { Router } from "express";
import testRoute from "./test";
import authRoute from "./auth";
const router = Router();

router.use("/test", testRoute);
router.use("/auth", authRoute);

export default router;