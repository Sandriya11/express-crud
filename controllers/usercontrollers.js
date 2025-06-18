const fs=require('fs');
const path = require('path');
const { User } = require('../models');
//const cors = require('cors');

let user=[];
let id =1;

const filePath = path.join(__dirname, '../data/data.json');


// Create user
exports.createUser = async (req, res) => {
  try {
    const { fname, lname, age, gender } = req.body;
    const newUser = await User.create({ fname, lname, age, gender });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { fname } = req.body;
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.fname = fname;
    await user.save();

    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
