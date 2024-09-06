import mongoose from "mongoose";

const connectToDB = async ()=>{
    try{
 await mongoose.connect(
    "mongodb+srv://raghavvidyadhar:l6qzvoOZh59PWq0h@cluster0.cksns.mongodb.net/"
    );
    console.log('mongodb is coonected')
    }catch(e){
        console.log(e);
    }
}
export default connectToDB;