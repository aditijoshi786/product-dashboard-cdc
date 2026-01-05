import { connectDB } from "../../../lib/mongodb";
import Admin from "../../../models/Admin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  await connectDB();

  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({
    username: admin.username,
    role: admin.role
  });
}
