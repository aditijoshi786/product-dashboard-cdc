import { connectDB } from "../../../lib/mongodb";
import Admin from "../../../models/Admin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const role = req.headers["x-admin-role"];

    if (!role || (role !== "admin" && role !== "supreme")) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const admins = await Admin.find().select("-password");

    return res.status(200).json(admins);
  } catch (error) {
    console.error("LIST ADMINS ERROR:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
