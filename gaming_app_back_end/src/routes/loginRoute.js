import express from "express";

const router = express.Router();

//basic variable to verify login
const user = {
  name: "test",
  password: "123",
};

router.get("/login", (req, res) => {
  console.log('got to loginRoute')
  res.send([`${user.name}`, `${user.password}`]);
});

export default router;
