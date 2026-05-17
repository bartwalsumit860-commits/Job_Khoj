import express from "express";
import { getAlljobs, getJobByAdmin, getJobById, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewere/isAuthenticated.js";


const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAlljobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getAdminJob").get(isAuthenticated,getJobByAdmin);

export default router;
