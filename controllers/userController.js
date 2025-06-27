const { User } = require("./../models/userModel");

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    return res.json(users);
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    return res.json(user);
}

const addUser = async (req, res) => {
    if (!req.body.name ||
        !req.body.gender ||
        !req.body.age
    ) {
        return res.status(500).json({ message: "All fileds are required" });
    }
    const result = await User.create({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
    });
    return res.status(201).json({ message: "Success" });
};

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    if (user.length < 1) {
        return res.status(500).json({ message: "User not found" });
    }
    await User.findByIdAndUpdate(userId, {
        name: req.body.name ? req.body.name : user.name,
        gender: req.body.gender ? req.body.gender : user.gender,
        age: req.body.age ? req.body.age : user.age,
    })
    return res.json({ message: "Success" });
}

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    if (user.length < 1) {
        return res.status(500).json({ message: "User not found" });
    }
    await User.deleteOne({ _id: userId });
    return res.json({ message: "Success" });
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUserById,
    deleteUserById
};