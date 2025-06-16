const fs=require('fs');
const path = require('path');
//const cors = require('cors');

let user=[];
let id =1;

const filePath = path.join(__dirname, '../data/data.json');

// POST 
exports.createUser = (req, res) => {
  const { fname, lname, age, gender } = req.body;
  if (!fname) return res.status(400).json({ message: "invalid" });

  const newUser = { new_id: id++, fname, lname, age, gender };
  user.push(newUser);

  fs.writeFile(filePath, JSON.stringify(user, null, 2), err => {
    if (err) console.error("error", err);
  });

  //console.log("user", user);
  res.status(201).json(newUser);
  //console.log("Student profile:", req.body);
};

// GET
exports.getUsers = (req, res) => {
  res.json(user);
};

// PUT 
exports.updateUser = (req, res) => {
  const { fname } = req.body;
  const userId = parseInt(req.params.id);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: "error" });

    let fileUsers = JSON.parse(data);
    const index = fileUsers.findIndex(u => u.new_id === userId);
    if (index === -1) return res.status(404).json({ message: "User not found" });

    fileUsers[index].fname = fname;

    fs.writeFile(filePath, JSON.stringify(fileUsers, null, 2), err => {
      if (err) return res.status(500).json({ message: "error" });

      console.log("first name updated-", fileUsers);
      res.status(200).json({ message: "updated", data: fileUsers });
    });
  });
};

// DELETE
exports.deleteUser = (req, res) => {
  user = user.filter(u => u.new_id != req.params.id);
  res.json({ message: "Student deleted" });
};
