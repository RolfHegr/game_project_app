import User from "../models/user.js";

const register = async (req, res, next) => {

    try {
        console.log('req.body', req.body)
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        next(error)
    }
};

const login = async (req, res) => {
  res.send("user login");
};

const updateUser = async (req, res) => {
  res.send("update user");
};


export {register, login, updateUser}