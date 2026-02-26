import express from "express";
import { Register, Login, GetallUsers } from "../Controllers/UserController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to Dashboard",
    user: req.user,
  });
});
router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});
router.get("/all-users", verifyToken, checkRole("admin"), GetallUsers);

export default router;
