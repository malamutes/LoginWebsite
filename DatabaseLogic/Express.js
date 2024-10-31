import express from 'express';
import cors from 'cors';
import { UserModel } from './User.js';
import ConnectDatabase from './ConnectDatabase.js';
import path from 'path';
import { fileURLToPath } from 'url';
await ConnectDatabase();
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("App listen at port 5000");
app.get("/", (_req, resp) => {
    resp.send("App is working");
});
app.use(express.static(path.join(__dirname, '../../../dist')));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/index.html'));
});
app.post("/CreateUser", async (req, resp) => {
    try {
        const newUser = new UserModel(req.body);
        console.log(newUser);
        let savedUser = await newUser.save();
        let result = savedUser.toObject();
        if (result) {
            resp.send(req.body);
            console.log(result, "SAVED USER");
        }
        else {
            console.log("Already a user!");
            resp.status(400).json({ message: "User already exists" });
        }
    }
    catch (error) {
        console.log("error creating user:", error);
        resp.status(500).json({ message: "Something went wrong" }); // Return a JSON error response
    }
});
app.post("/UserLogin", async (req, resp) => {
    try {
        const un = req.body.username;
        const pw = req.body.password;
        console.log(un, pw);
        const findUser = await UserModel.findOne({ username: un, password: pw });
        if (!findUser) {
            resp.status(401).json({ success: false });
            console.log("NON");
        }
        else if (findUser) {
            resp.status(200).json({ success: true });
        }
    }
    catch (error) {
        console.log("Cannot find user!", error);
        resp.status(500).json({ message: "Something went wrong" }); // Return a JSON error response
    }
});
//retrieving user data
app.post("/GetCurrentUser", async (req, resp) => {
    try {
        const un = req.body.currentusername;
        console.log(un, "WORKS UP TO HERE");
        const findUser = await UserModel.findOne({ username: un });
        if (findUser) {
            resp.send(findUser);
        }
    }
    catch (error) {
        console.log("Cannot find user!", error);
        resp.status(500).json({ message: "Something went wrong" }); // Return a JSON error response
    }
});
app.listen(port);
