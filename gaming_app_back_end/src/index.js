import express from "express";
import loginRoute from "./routes/loginRoute.js"
import signupRoute from "./routes/signupRoute.js"

const app = express();
const PORT = 8000;

app.use(express.json());

//makes it possible to fetch and post to and from localhost
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/login", loginRoute);

app.post("/signup", signupRoute)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("App listening on port", PORT);
});
