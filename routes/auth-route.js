const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const {
	validateWithZod,
	registerSchema,
	loginSchema,
} = require("../middlewares/validator");

//@ENDPOINT http://localhost:8000/api/register
router.post(
	"/register",
	validateWithZod(registerSchema),
	authController.register
);
router.post("/login", validateWithZod(loginSchema), authController.login);

//export
module.exports = router;
