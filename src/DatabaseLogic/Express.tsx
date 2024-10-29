import express from 'express';
import cors from 'cors';
import { User, UserInterface } from './User';
import ConnectDatabase from './ConnectDatabase';


await ConnectDatabase();

const app = express();
app.use(express.json());
app.use(cors());

console.log("App listen at port 5000");

app.get("/", (req, resp) => {
    resp.send("App is working")
});

app.post("/CreateUser", async (req, resp) => {
    try {
        const newUser = new User(req.body);
        console.log(newUser);
        let savedUser = await newUser.save();
        let result: UserInterface = savedUser.toObject();
        if (result) {
            resp.send(req.body)
            console.log(result)
        }

        else {
            console.log("Already a user!");
            resp.status(400).json({ message: "User already exists" });
        }
    }

    catch (error) {
        console.log("error creating use", error);
        resp.status(500).json({ message: "Something went wrong" }); // Return a JSON error response
    }
});

app.listen(5000);