exports.register = (req, res, next) => {
	//code
	try {
		res.json({ message: "Hello register" });
	} catch (error) {
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
