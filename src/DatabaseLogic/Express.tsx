import express from 'express';
import cors from 'cors';
import { CurrentUserInterface, CurrentUserModel, UserInterface, UserModel } from './User';
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

app.post("/UserLogin", async (req: Request<{}, {}, UserInterface>, resp: Response) => {
    try {
        const un = req.body.username;
        const pw = req.body.password;
        console.log(un, pw);
        const findUser = await UserModel.findOne({ username: un, password: pw })
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

//for now the id for current user is always current user
app.post("/LogCurrentUser", async (req: Request<{}, {}, CurrentUserInterface>, resp: Response) => {
    try {
        const un = req.body.currentusername;
        console.log(un, "WORKS UP TO HERE");
        const FoundCurrentLoggedUser = await CurrentUserModel.findOneAndUpdate({ _id: "6721f76badfdbd58c3f3ebf7" }, { currentusername: `${un}` }, { new: true, runValidators: true });
        console.log(FoundCurrentLoggedUser, "LOGGED");
        if (!FoundCurrentLoggedUser) {
            resp.status(401).json({ success: false });
            console.log("Cannot find currently logged user");
        }
        else if (FoundCurrentLoggedUser) {
            resp.status(200).send(FoundCurrentLoggedUser);
        }
    }

    catch (error) {
        console.log("Cannot find user!", error);
        resp.status(500).json({ message: "Something went wrong" }); // Return a JSON error response
    }
});


//retrieving user data
app.get("/GetCurrentUser", async (req: Request<{}, {}, {}>, resp: Response) => {
    try {
        const FoundCurrentLoggedUser = await CurrentUserModel.findById("6721f76badfdbd58c3f3ebf7");
        console.log(FoundCurrentLoggedUser, "GOT");
        if (!FoundCurrentLoggedUser) {
            resp.status(404).json({ message: "User not found" });
        }
        else if (FoundCurrentLoggedUser) {
            const findUser = await UserModel.findOne({ username: FoundCurrentLoggedUser.currentusername })
            if (findUser) {
                resp.send(findUser)
                //console.log("Sending found user")
                //console.log(findUser);
            }
        }
    }

    catch (error) {
        console.log("Cannot find user!", error);
        resp.status(500).json({ message: "Something went wrong" }); // Return a JSON error response
    }
});


app.listen(5000);