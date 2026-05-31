import Company from "../models/company_model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { company_name } = req.body;
        const trimmedCompanyName = company_name?.trim();

        if (!trimmedCompanyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ company_name: trimmedCompanyName });

        if (company) {
            return res.status(400).json({
                message: "you can't register same company",
                success: false
            });
        }

        company = await Company.create({
            company_name: trimmedCompanyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to register company",
            success: false
        });
    }
}
//get all companies
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;//logged in user id
        const companies = await Company.find({ userId });
        return res.status(200).json({
            companies: companies || [],
            success: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to fetch companies",
            success: false
        });
    }
}

//get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;//route(/Company:id) to get :id we use params
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        if (company.userId.toString() !== req.id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to access this company",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to fetch company",
            success: false
        });
    }
}

//update company
export const updateCompany = async (req, res) => {
    try {
        const { company_name, description, website, location } = req.body;
        let company = await Company.findById(req.params.id);



        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        if (company.userId.toString() !== req.id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this company",
                success: false
            });
        }

        let logo;

        if (req.file) {
            const fileUri = getDataUri(req.file);

            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "image"
                }
            );

            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(500).json({
                    message: "Logo photo upload failed",
                    success: false
                });
            }

            logo = cloudResponse.secure_url;
        }

        if (company_name) company.company_name = company_name;
        if (description) company.description = description;
        if (website) company.website = website;
        if (location) company.location = location;
        if (logo) company.logo = logo;

        await company.save();

        return res.status(200).json({
            message: "Company information updated",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to update company",
            success: false
        });
    }
}


