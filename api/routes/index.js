const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const themeRoute = require("./theme");
const contentRoute = require("./content");
const categoryRoute = require("./category");

/* GET home page. */
router.use("/auth", authRoute);
router.use("/theme", themeRoute);
router.use("/content", contentRoute);
router.use("/category", categoryRoute);

module.exports = router;
