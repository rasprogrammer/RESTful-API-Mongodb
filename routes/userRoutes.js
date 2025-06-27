const express = require("express");
const router = express.Router();

const userController = require("./../controllers/userController");

router.get("/", (req, res) => {
    return res.send("Hello");
});

router.get('/user', userController.getAllUsers);

router
    .route('/user/:id')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);

router.post('/user', userController.addUser);

module.exports = router;