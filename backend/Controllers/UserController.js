import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
export const Register = async (req, res) => {
  const { email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashed,
    role,
  });

  await user.save();

  res.json("User Registered");
};
export const Login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email from frontend:", email);
  console.log("Password from frontend:", password);

  const user = await User.findOne({ email });

  console.log("User found:", user);

  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password, user.password);

  console.log("Password match:", match);

  if (!match) return res.status(400).json("Wrong Password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({ token, role: user.role, message: "Login successful" });
};
export const GetallUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
