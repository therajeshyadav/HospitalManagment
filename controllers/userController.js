const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { username, role, password } = req.body;

  try {
    const exist = await User.findOne({ username });

    if (exist) {
      return res.status(400).json({ message: "Username already exist" });
    }

    const user = new User({ username, role, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
