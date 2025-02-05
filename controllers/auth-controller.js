const createError = require("../utils/createError");

exports.register = (req, res, next) => {
	//code
	try {
		//Step 1 req.body
		const { email, firstName, lastName, password, confirmPassword } = req.body;
		console.log(email, firstName, lastName, password, confirmPassword);
		//Step 2 validate
		if (!email) {
			return createError(400, "Email is require");
		}
		if (!firstName) {
			return createError(400, "First name is require");
		}
		if (!lastName) {
			return createError(400, "Last name is require");
		}
		if (!password || !confirmPassword) {
			return createError(400, "password is require");
		}
		if (password !== confirmPassword) {
			return createError(400, "Please re-enter password");
		}
		//Step 3 check already
		// Step 4 Encrypt bcrypt
		// Step 5 Insert to DB
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
