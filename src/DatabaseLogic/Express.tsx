import express from 'express';
import cors from 'cors';
import { UserInterface, UserModel } from './User';
import ConnectDatabase from './ConnectDatabase';
import { Request, Response } from 'express';


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
        const newUser = new UserModel(req.body);
        console.log(newUser);
        let savedUser = await newUser.save();
        let result: UserInterface = savedUser.toObject();
        if (result) {
            resp.send(req.body)
            console.log(result, "SAVED USER")
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

//retrieving user data
app.post("/UserPage", async (req: Request<{}, {}, UserInterface>, resp: Response) => {
    try {
        const un = req.body.username;
        const pw = req.body.password;
        console.log(un, pw, "Retrieved!");
        const findUser = await UserModel.findOne({ username: un, password: pw })
        if (!findUser) {
            resp.status(404).json({ message: "User not found" });
        }
        else if (findUser) {
            const foundUser = findUser?.toObject()
            if (foundUser) {
                resp.send(foundUser)
                console.log("Sending found user")
            }
        }
    }

    catch (error) {
        console.log("Cannot find user!", error);
        resp.status(500).json({ message: "Something went wrong" }); // Return a JSON error response
    }
});

app.post("/UserLogin", async (req: Request<{}, {}, UserInterface>, resp: Response) => {
    try {
        const un = req.body.username;
        const pw = req.body.password;
        console.log(un, pw, "Found!");
        const findUser = await UserModel.findOne({ username: un, password: pw })
        if (!findUser) {
            resp.status(404).json({ message: "User not found" });
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


app.listen(5000);