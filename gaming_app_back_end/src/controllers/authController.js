const register = async (req, res) => {
  res.send("registrer user");
};

const login = async (req, res) => {
  res.send("user login");
};

const updateUser = async (req, res) => {
  res.send("update user");
};


export {register, login, updateUser}