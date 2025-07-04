import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password do not match",
      });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        message: "Username already exists try something different.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {}
};
