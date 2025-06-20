const fs=require('fs');
const path = require('path');
const { User } = require('../models');
//const cors = require('cors');

let user=[];
let id =1;

const filePath = path.join(__dirname, '../data/data.json');
const formatResponse = (message, data, status, code) => ({
  message,
  data,
  status,
  code
});

// Create user
exports.createUser = async (req, res) => {
  try {
    const { fname, lname, age, gender } = req.body;
    const newUser = await User.create({ fname, lname, age, gender });
    res.status(201).json(formatResponse("user created",newUser,"success",201));
  } catch (error) {
    res.status(500).json(formatResponse( "Error creating user",null, "error",500 ));
  }
};

// Get users
exports.getUsers = async (req, res) => {
  const page=parseInt(req.query.page)||1;
  const limit=parseInt(req.query.limit)||5;
  const offset = (page-1)*limit;
  try {
    const {count,rows:users} = await User.findAndCountAll({
      where:{status:1},
      limit,
      offset
    });
    res.status(200).json({
      message: "User list (paginated)",
      data: {
        users,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalUsers: count
      },
      status: "success",
      code: 200
    });
  } catch (error) {
    res.status(500).json(formatResponse( "Error fetching users", null ,"error",500));
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { fname } = req.body;
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json(formatResponse( "User not found" ,null,"error",404));

    user.fname = fname;
    await user.save();

    res.json(formatResponse( "User updated", user,"success",200 ));
  } catch (error) {
    res.status(500).json(formatResponse("Error updating user", null,"error",500 ));
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json(formatResponse( "User not found",null,"error",404 ));

    await user.destroy();
    res.json(formatResponse("User deleted",user,"success",200 ));
  } catch (error) {
    res.status(500).json(formatResponse("Error deleting user",null, "error",500 ));
  }
};
