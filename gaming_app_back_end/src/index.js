import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

//Routes
import authRoutes from "../src/routes/authRoutes.js";
import scoreRoutes from "../src/routes/scoreRoutes.js"

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";

const app = express();
const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/scores/", scoreRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function startServer() {
  try {
    const connectToDB = await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log("App listening on port", PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
