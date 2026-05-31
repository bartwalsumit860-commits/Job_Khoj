import Job from "../models/job_model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirement, salary, experienceLevel, location, job_type, position, company } = req.body;

        const userId = req.id;


        if (!title || !description || !requirement || !salary || !experienceLevel || !location || !job_type || !position || !company) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirement: requirement.split(",").map((item) => item.trim()).filter(Boolean),
            salary: Number(salary),
            experienceLevel: Number(experienceLevel),
            location,
            job_type,
            position: Number(position),
            company,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to create job",
            success: false
        });
    }
}

export const getAlljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { job_type: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to fetch jobs",
            success: false
        });
    }
}

//get job for students 
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate("company")
            .populate({
                path: "applications"
            });

        //validate
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
        return res.status(500).json({
            message: "Unable to fetch job",
            success: false
        });
    }
}

//get jobs for recruiter
export const getJobByAdmin = async (req, res) => {
    try {
        const userId = req.id;

        const jobs = await Job.find({ created_by: userId })
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs: jobs || [],
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to fetch admin jobs",
            success: false
        });
    }
}

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        const {
            title,
            description,
            requirement,
            salary,
            experienceLevel,
            location,
            job_type,
            position,
            company,
        } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        if (job.created_by.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this job",
                success: false
            });
        }

        if (title) job.title = title;
        if (description) job.description = description;
        if (typeof requirement === "string" && requirement.trim()) {
            job.requirement = requirement.split(",").map((item) => item.trim()).filter(Boolean);
        }
        if (salary !== undefined && salary !== "") job.salary = Number(salary);
        if (experienceLevel !== undefined && experienceLevel !== "") job.experienceLevel = Number(experienceLevel);
        if (location) job.location = location;
        if (job_type) job.job_type = job_type;
        if (position !== undefined && position !== "") job.position = Number(position);
        if (company) job.company = company;

        await job.save();

        const updatedJob = await Job.findById(jobId).populate("company");

        return res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to update job",
            success: false
        });
    }
};
