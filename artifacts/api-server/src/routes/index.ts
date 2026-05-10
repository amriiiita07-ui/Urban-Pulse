import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import zonesRouter from "./zones";
import mobilityRouter from "./mobility";
import cohortsRouter from "./cohorts";
import experienceRouter from "./experience";
import infrastructureRouter from "./infrastructure";
import cityeventsRouter from "./cityevents";
import weatherRouter from "./weather";
import anomaliesRouter from "./anomalies";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(zonesRouter);
router.use(mobilityRouter);
router.use(cohortsRouter);
router.use(experienceRouter);
router.use(infrastructureRouter);
router.use(cityeventsRouter);
router.use(weatherRouter);
router.use(anomaliesRouter);

export default router;
