import Job from "../models/job_model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirement, salary, experienceLevel, location, job_type, position, company } = req.body;

        const userId = req.id;


        if (!title || !description || !requirement || !salary || !experienceLevel || !location || !job_type || !position || !company) {
            return res.status(400).json({
                messege: "Some fields are missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirement: requirement.split(","),
            salary: Number(salary),
            experienceLevel,
            location,
            job_type,
            position,
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
    }
}

export const getAlljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(400).json({
                messege: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

//get job for students 
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

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
    }
}

//get jobs for recruiter
export const getJobByAdmin = async (req, res) => {
    try {
        const userId = req.id;

        const jobs = await Job.find({ created_by: userId });

        if (!jobs) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}