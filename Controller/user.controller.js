import { createUserQuery, updateUserQuery, checkUserRole, createCompanyQuery, findUserByIdAndCompany, findUserByEmail, logoutUserQuery } from "../Query/user.query.js";
import { sendOtpEmail } from "../Services/email.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// functionality for login use email and password
export const loginWithEmailPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required"
      });
    }

    // 1. Find User
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 2. Verify Password
    // Note: Ensure your DB has hashed passwords. If plain text for now, this will fail comparison.
    // If user pass is null, fail immediately
    if (!user.password) {
      return res.status(401).json({ success: false, message: "User has no password set" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 3. Generate Token (RBAC format: id, roleId)
    const token = jwt.sign(
      {
        id: user.id,
        roleId: user.user_type_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    console.log(user, 'useruseruseruser')
    return res.status(200).json({
      success: true,
      message: "Login Success",
      data: {
        userId: user.id,
        roleId: user.user_type_id,
        name: user.name,
        email: user.email,
        token
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// functionality for logout
export const logoutUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const result = await logoutUserQuery(user_id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//functionality for  addReviewUsers
export const addReviewUsers = async (req, res) => {
  try {
    const { name, phone_no, email } = req.body;

    // ✅ basic validation
    if (!name || !phone_no) {
      return res.status(400).json({
        success: false,
        message: "name, phone number are required"
      });
    }

    // ✅ create payload ONLY with received fields
    const payload = {
      name,
      phone_no,
      email
    };

    const result = await createUserQuery(payload);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result
    });

  } catch (error) {
    console.error("Add User Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

//-----------------------------------------------------------------------------------------------//

export const createUserDetails = async (req, res) => {
  try {
    const { role, ...payload } = req.body; // 👈 remove role

    console.log(role, "role received");

    // 1️⃣ Check role
    if (role !== "SuperAdmin") {
      return res.status(403).json({
        success: false,
        message: "Only SuperAdmin can create users"
      });
    }

    // 2️⃣ Insert WITHOUT role
    const result = await createUserQuery(payload);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const result = await updateUserQuery(req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found or no changes made"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const login_info = async (req, res) => {
  try {
    const { login_id } = req.body;

    if (!login_id) {
      return res.status(400).json({
        success: false,
        message: "Login ID is required"
      });
    }

    const match = login_id.match(/^(.*?)(\d+)$/);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Login ID format"
      });
    }

    const companyName = match[1];
    const userId = match[2];

    const user = await findUserByIdAndCompany(userId, companyName);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const roleName = user.tb_user_types?.user_type; // 🔥 Admin / Employee

    const token = jwt.sign(
      {
        id: user.id,
        role: user.user_type_id // Passing 'role' directly
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    console.log(user, 'useruseruseruser')
    return res.status(200).json({
      success: true,
      message: "Login Success",
      data: {
        userId: user.id,
        role: roleName,
        token
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


