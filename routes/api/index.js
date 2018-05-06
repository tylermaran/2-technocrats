const path = require("path");
const router = require("express").Router();
const postRoutes = require("./posts");
const profileRoutes = require("./profile");
const studentRoutes = require("./students");
const userRoutes = require("./users");
const transactionRoutes = require("./transactions");
const watchRoutes = require("./watch");
const stockPortfolio = require("./stockPortfolio")

// API Routes
router.use("/posts", postRoutes);
router.use("/profile", profileRoutes);
router.use("/students", studentRoutes);
router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);
router.use("/watch", watchRoutes);
router.use("/stockPortfolio", stockPortfolio);
module.exports = router;