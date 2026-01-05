import { connectDB } from "../../../lib/mongodb";
import Admin from "../../../models/Admin";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { adminId, requesterRole } = req.body;

    
    if (requesterRole !== "supreme") {
      return res.status(403).json({
        message: "Only supreme admin can delete admins"
      });
    }

    
    const adminToDelete = await Admin.findById(adminId);

    if (!adminToDelete) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    if (adminToDelete.role === "supreme") {
      return res.status(403).json({
        message: "Supreme admin cannot be deleted"
      });
    }

    await Admin.findByIdAndDelete(adminId);

    return res.status(200).json({
      message: "Admin deleted successfully"
    });

  } catch (error) {
    console.error("DELETE ADMIN ERROR:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
