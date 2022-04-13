import express from "express";

const router = express.Router();

router.post("/signup", (req,res) => {
    console.log('recieved Post Req')
    console.log('req.body', req.body)
    res.send("postReq recieved")
})

export default router;
