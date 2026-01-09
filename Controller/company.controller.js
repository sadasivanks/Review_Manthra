import { createCompanyQuery } from "../Query/company.query.js";
import { getUserTypeByNameQuery } from "../Query/auth.query.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
export const createCompany = async (req, res) => {
    try {
        if (req.user) {
            console.log("User Role:", req.user.role);
        }
        var user_role = req.user.role;
        if (user_role === 'SuperAdmin') {
            const { name, email, phone_number, business_plan, review_link,password } = req.body;
            console.log("Request Body:", req.body);
            // Log user type from token (added as per request)


            if (!name || !email || !phone_number, !password || !business_plan) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }


        const roleData = await getUserTypeByNameQuery('Admin');
        const user_type_id = roleData.id;
        console.log(user_type_id,'user_type_iduser_type_iduser_type_id')

              const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const data = await createCompanyQuery({
                name,
                email,
                phone_number,
                review_link,
                business_plan,
                password: hashedPassword,
                user_type_id
            });

            return res.status(201).json({ success: true, message: "Company created successfully", data });
        }
        else {
            return res.status(403).json({ success: false, message: "Access Denied: Only SuperAdmin can create companies" });
        }

    } catch (error) {
        if (error.message === "Email already exists") {
            return res.status(409).json({ success: false, message: error.message });
        }
        if (error.message === "Review link already exists") {
            console.log('Review link collision detected');
            return res.status(409).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};
