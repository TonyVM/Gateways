import routerG from "./gateways.router.js";
import routerD from "./devices.router.js";
import { Router } from "express";

const router = Router()

router.use('/d', routerD)
router.use('/g', routerG)

export default router