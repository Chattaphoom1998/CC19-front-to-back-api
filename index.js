const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
//import routing
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");
//import middlewares
const handleError = require("./middlewares/error");

const app = express();

//middleware
app.use(cors()); // Allows cross domain
app.use(morgan("dev")); // show log terminal
app.use(express.json()); // for read json

//Routing
app.use("/api", authRouter);
app.use("/api", userRouter);
//handelError
app.use(handleError);

//start server
const PORT = 8000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
