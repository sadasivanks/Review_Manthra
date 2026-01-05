
// Example Employee Logic
export const getEmployeeDashboard = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome Employee! You have access.",
        user: req.user // Contains { id, company, role } from token
    });
};
