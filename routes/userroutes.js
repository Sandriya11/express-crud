const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontrollers');
const auth = require('../middleware/auth');

router.get('/protected-data', auth, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authorized!` });
});

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
