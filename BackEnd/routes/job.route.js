import express from "express";
import { getAlljobs, getJobByAdmin, getJobById, postJob, updateJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewere/isAuthenticated.js";


const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/update/:id").post(isAuthenticated,updateJob);
router.route("/get").get(getAlljobs);
router.route("/get/:id").get(getJobById);
router.route("/getAdminJob").get(isAuthenticated,getJobByAdmin);

export default router;
