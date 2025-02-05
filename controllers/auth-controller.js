exports.register = (req, res, next) => {
	//code
	try {
		//Step 1 req.body
		console.log(req.body);
		//Step 2 validate
		//Step 3 check already
		//Step 4

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
