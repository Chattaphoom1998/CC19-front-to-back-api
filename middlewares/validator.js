//npm i zod and import it
const { z } = require("zod");
//TEST validator
exports.registerSchema = z
	.object({
		email: z.string().email(),
		firstName: z.string().min(3, "First name should be more than 2 char"),
		lastName: z.string().min(3, "Last name should be more than 2 cha"),
		password: z.string().min(6, "Password should be more than 5 char"),
		confirmPassword: z.string().min(6, "Password should be more than 5 char"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Confirm password is not matched!!",
		path: ["confirmPassword"],
	});
exports.loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, "Password should be more than 5 char"),
});
exports.validateWithZod = (schema) => (req, res, next) => {
	try {
		console.log("Hello middleware Zod");
		schema.parse(req.body);
		next();
	} catch (error) {
		const errMsg = error.errors.map((el) => el.message);
		const errTxt = errMsg.join(",");
		const mergeError = new Error(errTxt);
		next(mergeError);
	}
};
