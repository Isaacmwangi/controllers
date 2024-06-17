import { Router } from "express";
import eventsRouter from './eventsRouter.mjs'; 

const router = Router();
router.use(eventsRouter); 

export default router;
