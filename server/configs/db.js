import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected",() => {
            console.log("DataBase Connected succussfully")
        })

        let mongodb_url = process.env.MONGODB_URL;
        const project_name = "resume_builder";

        if (!mongodb_url){
            throw new Error("mongodb_url env variable not set");
        }

        await mongoose.connect(`${mongodb_url}/${project_name}`)
    }catch (error) {
        console.error("mongodb error: ",error)
    }
}

export default connectDB