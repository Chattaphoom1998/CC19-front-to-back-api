const prisma = require("../configs/prisma");
const bcrypt = require("bcrypt");
const createError = require("../utils/createError");

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

exports.login = (req, res, next) => {
	try {
		res.json({ message: "hello login" });
	} catch (error) {
		next(error);
	}
};
