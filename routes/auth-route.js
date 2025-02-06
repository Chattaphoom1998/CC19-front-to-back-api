const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const {
	validateWithZod,
	registerSchema,
	loginSchema,
} = require("../middlewares/validator");
const { authCheck } = require("../middlewares/auth-middleware");

//@ENDPOINT http://localhost:8000/api/register
router.post(
	"/register",
	validateWithZod(registerSchema),
	authController.register
);
router.post("/login", validateWithZod(loginSchema), authController.login);

router.get("/current-user", authCheck, authController.currentUser);
//export
module.exports = router;
