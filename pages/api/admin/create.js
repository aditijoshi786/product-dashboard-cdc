import { connectDB } from "../../../lib/mongodb";
import Admin from "../../../models/Admin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const requesterRole = req.headers["x-admin-role"];

  if (!requesterRole || !["admin", "supreme"].includes(requesterRole)) {
    return res.status(403).json({
      message: "Not authorized"
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password required"
    });
  }

  await connectDB();

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return res.status(400).json({
      message: "Admin already exists"
    });
  }

  await Admin.create({
    username,
    password,
    role: "admin"
  });

  return res.status(201).json({
    message: "Admin created successfully"
  });
}
