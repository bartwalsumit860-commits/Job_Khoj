import Application from "../models/application_model.js";
import Job from "../models/job_model.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;


        if (!jobId) {
            return res.status(400).json({
                message: "Job id required",
                success: false
            })
        }

        //checking whether user is already applied or not
        let apply = await Application.findOne({ job: jobId, applicant: userId });

        if (apply) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const Newapply = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(Newapply._id);
        await job.save();

        return res.status(201).json({
            messege: "Job applied successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant:userId }).populate({
            path: "job",
            options: {
                sort: {createdAt: -1}
            },
            populate:{
                path:"company"
            }
        });

        if (!applications) {
            return res.status(404).json({
                message: "No Application",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });


    } catch (error) {
        console.log(error);
    }
}

//for admin
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: {
                sort: { createdAt: -1 }
            },
            populate: {
                path: "applicant"
            }
        });

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        //find the application by application id

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        //update status

        application.status = status.toLowerCase();
        await application.save();


        return res.status(200).json({
            message: "Status Updated Successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


