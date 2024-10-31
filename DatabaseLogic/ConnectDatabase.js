import mongoose from "mongoose";
const MongoDbUrl = "mongodb+srv://pavan192004:2mT9wlZpJ338zKzQ@cluster0.rdm1aur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
export default async function ConnectDatabase() {
    try {
        await mongoose.connect(MongoDbUrl, { dbName: "UserInfo" });
        console.log("MongoDB Connected!");
    }
    catch (error) {
        console.log(`Couldn't connect due to ${error}`);
    }
}
;
export async function DisconnectDatabase() {
    try {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected");
    }
    catch (error) {
        console.log(`Couldn't disconnect due to ${error}`);
    }
}
;
