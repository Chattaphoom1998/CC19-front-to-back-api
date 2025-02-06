const prisma = require("../configs/prisma");
const bcrypt = require("bcrypt");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
	//code
	try {
		//Step 1 req.body
		const { email, firstName, lastName, password, confirmPassword } = req.body;

		//Step 2 validate

		//Step 3 check already

		const checkEmail = await prisma.profile.findFirst({
			where: {
				email,
				firstName,
				lastName,
				password,
			},
		});
		console.log(checkEmail);
		if (checkEmail) {
			return createError(400, "Email is already exits!!!");
		}

		// Step 4 Encrypt bcrypt
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		console.log(hashedPassword);
		// Step 5 Insert to DB
		const profile = await prisma.profile.create({
			data: {
				email,
				firstName,
				lastName,
				password: hashedPassword,
			},
		});
		// Step 6 Response

		res.json({ message: "Hello register" });
	} catch (error) {
		console.log("Step 2 Catch");
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		// Step 1 req.body
		const { email, password } = req.body;
		console.log(email, password);
		// Step 2 Check email and password
		const profile = await prisma.profile.findFirst({
			where: {
				email: email,
			},
		});
		if (!profile) {
			return createError(400, "Email or Password is incorrect");
		}
		const isMatch = bcrypt.compareSync(password, profile.password);
		if (!isMatch) {
			return createError(400, "Email or Password is incorrect");
		}
		// console.log("here", isMatch, profile.password, "and", password);
		// Step 3 Generate token
		const payload = {
			id: profile.id,
			email: profile.email,
			firstName: profile.firstName,
			lastName: profile.lastName,
			role: profile.role,
		};
		const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: "1d",
		});
		// console.log(token);
		// Step 4 Response
		res.json({
			message: "Login Success",
			payload,
			token,
		});
	} catch (error) {
		next(error);
	}
};

exports.currentUser = async (req, res, next) => {
	try {
		res.json({ message: "Hello current user" });
	} catch (error) {
		next(error);
	}
};
