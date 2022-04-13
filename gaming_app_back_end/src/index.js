import express from "express";

const app = express();
const PORT = 8000;

//makes it possible to fetch and post to and from localhost
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//basic variable to verify login
const user = {
  name: "test",
  password: "123",
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/login", (req, res) => {
  res.send([`${user.name}`,`${user.password}`]);
});

app.listen(PORT, () => {
  console.log("App listening on port", PORT);
});
