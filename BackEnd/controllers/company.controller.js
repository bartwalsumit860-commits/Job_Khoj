import Company from "../models/company_model.js";

export const registerCompany = async (req, res) => {
    try {
        const { company_name } = req.body;

        if (!company_name) {
            return res.status(400).json({
                messege: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ company_name });

        if (company) {
            return res.status(400).json({
                messege: "you can't register same company",
                success: false
            });
        }

        company = await Company.create({
            company_name,
            userId: req.id
        });

        return res.status(201).json({
            messege: "Company registered successfully",
            company,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}
//get all companies
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;//logged in user id
        const companies = await Company.find({userId});

        if (!companies) {
            return res.status(404).json({
                messege: "Companies not found",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}

//get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;//route(/Company:id) to get :id we use params
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                messege: "Company not found",
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
    }
}

//update company
export const updateCompany = async (req, res) => {
    try {
        const { company_name, description, website, location } = req.body;
        //cloudenary of logo image
        let company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        if (company_name) company.company_name = company_name;
        if (description) company.description = description;
        if (website) company.website = website;
        if (location) company.location = location;

        await company.save();
        
        return res.status(200).json({
            message:"Company information updated",
            company,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}


