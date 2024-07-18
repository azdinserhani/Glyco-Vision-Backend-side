import express from "express";
import { addSugar, addTension, deletSugar, deletTension, getSugar, getTension } from "../controller/traking.js";
const router = express.Router();

router.post("/addSugar", addSugar);
router.get("/getSugar", getSugar);
router.post("/deleteSugar", deletSugar);
router.post("/addTension", addTension);
router.get("/getTension", getTension);
router.post("/deleteTension", deletTension);

export default router;