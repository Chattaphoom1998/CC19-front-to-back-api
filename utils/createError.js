const createError = (code, message) => {
	//Step 1
	console.log("Step 1 Create Error");

	const error = new Error(message);
	error.statusCode = code;
	throw error;
};

module.exports = createError;
