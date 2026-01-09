import { getBusinessPlansQuery } from "../Query/business.query.js";


export const listBusinessModals = async (req, res) => {
    try {
        const data = await getBusinessPlansQuery();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
