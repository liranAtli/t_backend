import * as mongoose from "mongoose";
import { app } from "./app";

const PORT = 3001;
const start = async ()=>{

    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect('mongodb://localhost:27017');

        console.log("Connected to MongoDb");
    }catch (e) {
        console.log(e);
    }

    app.listen(PORT,()=>{
        console.log(`app running and listen to ${PORT}`)
    })

}

start();


