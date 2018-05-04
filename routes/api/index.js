const path = require("path");
const router = require("express").Router();
const postRoutes = require("./posts");
const profileRoutes = require("./profile");
const studentRoutes = require("./students");
const userRoutes = require("./users");
const buyRoutes = require("./buy");

// API Routes
router.use("/posts", postRoutes);
router.use("/profile", profileRoutes);
router.use("/students", studentRoutes);
router.use("/users", userRoutes);
router.use("/buy", buyRoutes);
module.exports = router;