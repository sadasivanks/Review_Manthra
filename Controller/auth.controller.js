import {addReviewUsersQuery, createUserQuery, createCompanyEmployeeQuery, findUserByEmailSafe, getUserTypeByNameQuery } from "../Query/auth.query.js";
import { getCompanyByIdQuery } from "../Query/company.query.js";
import { createReviewRecordQuery } from "../Query/review.query.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const addEmployee = async (req, res) => {
    try {
      var user_role = req.user.role;
        if (user_role === 'Admin') {

        
        console.log(req.user.role, 'vmdkljgidkhellooo')
        const { name, email, password, phone_number, company_id } = req.body;
        console.log(req.body, 'glkdfjgjhfdgjkfjdkgh')
        // In a real app, company_id might come from the logged-in Admin's token
        // For now, we accept it in the body

        if (!name || !email || !password || !company_id) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get Employee Role ID
        const roleData = await getUserTypeByNameQuery('Employee');
        const user_type_id = roleData.id;

        // 1. Create User in tb_users
        const user = await createUserQuery({
            name,
            email,
            password: hashedPassword,
            phone_number,
            user_type_id,
            company_id
        });

        // 2. Map to Company in tb_company_employees
        await createCompanyEmployeeQuery(company_id, user.id);

        return res.status(201).json({ success: true, message: "Employee added successfully", data: user });
    }
    else{
         return res.status(400).json({ success: false, message: "Employee added failed" });
    }
    } catch (error) {
        console.log(error, 'sdgklsndkjghjfkdhgd')
        if (error.message === "Email already exists") {
            return res.status(409).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const user = await findUserByEmailSafe(email);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.tb_user_types?.type, company_id: user.company_id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.tb_user_types?.type,
                company_id: user.company_id
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const shareReviewLink = async (req, res) => {
    try {
        const { cust_name, email, phone ,company_id} = req.body;
        const employee_id = req.user.id;
        // const company_id = req.user.company_id;
console.log(req.user,'sdjbghdhfgdhfghdshgf')
        if (!company_id) {
            return res.status(400).json({ success: false, message: "User is not associated with a company" });
        }

        // 1. Fetch Company Review Link
        const company = await getCompanyByIdQuery(company_id);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        // 2. Track the share action in tb_review
        const reviewRecord = await createReviewRecordQuery({
            company_id,
            cust_name,
            email,
            phone,
            employee_id
        });

        // 3. Log the share action (simulating sending)
        console.log(`[SHARE] Link: ${company.review_link} shared by Employee ID: ${employee_id} to Customer: ${cust_name}`);

        return res.status(200).json({
            success: true,
            message: "Review link shared successfully",
            data: {
                review_link: company.review_link,
                share_details: reviewRecord
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// export const CustomerDetailsCollect = async (req,rtes)=>{
   export const CustomerDetailsCollect = async (req, res) => {
    try {
      var user_role = req.user.role;
        if (user_role === 'Admin' || user_role === 'Employee') {
        console.log(req.user.role, 'vmdkljgidkhellooo')
        const { name, email, phone_number } = req.body;
        console.log(req.body, 'glkdfjgjhfdgjkfjdkgh')

    
        // Hash Password


        // Get Employee Role ID
        const roleData = await getUserTypeByNameQuery('User');
        const user_type_id = roleData.id;
        console.log(user_type_id,'user_type_iduser_type_idfdtr')

        // 1. Create User in tb_users
        const user = await addReviewUsersQuery({
            name,
            email,
            phone_number,
            user_type_id,
            
        });

        // 2. Map to Company in tb_company_employees
 

        return res.status(201).json({ success: true, message: "Customer added successfully", data: user });
    }
    else{
         return res.status(400).json({ success: false, message: "Customer added failed" });
    }
    } catch (error) {
        console.log(error, 'sdgklsndkjghjfkdhgd')
        if (error.message === "Email already exists") {
            return res.status(409).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};


