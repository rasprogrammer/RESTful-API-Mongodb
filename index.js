const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// DB Connection
const dbURL = "mongodb://127.0.0.1:27017/profile";
mongoose.connect(dbURL)
    .then(() => console.log('mongoDB Connected!'))
    .catch((err) => console.log('Error', err));

// Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }, 
        gender: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
    },
    {
        timestamp: true
    }
);

const User = mongoose.model("user", userSchema);

// API 
app.get('/', (req, res) => {
    return res.send("Hello");
});

app.get('/api/user', async (req, res) => {
    const users = await User.find({});
    return res.json(users);
});

app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    return res.json(user);
});

app.post('/api/user', async (req, res) => {
    if (!req.body.name || 
        !req.body.gender || 
        !req.body.age
    ) {
        return res.status(500).json({message: "All fileds are required"});
    }
    const result = await User.create({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
    });
    return res.status(201).json({ message: "Success" });
});

app.put('/api/user/:id', async (req, res) => {
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
    return res.json({ message : "Success"});
});

app.delete('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    if (user.length < 1) {
        return res.status(500).json({ message: "User not found" });
    }
    await User.deleteOne({_id: userId});
    return res.json({ message : "Success"});
});


app.listen(port, () => console.log('Server started!'));