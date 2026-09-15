import mongoose, {Schema,model} from "mongoose"

export interface UserInterface{
    Username:string;
    subId:string;
    profile:{
        firstName:string;
        lastName:string;
    },
    email:string;
    accessToBranches?:string[];
    createdAt?:string;
    updatedAt?:string;
}

 export const UsersSchema = new Schema({

    username:{
        type:String,
        required:true,
    },
    subId:{
        type:String,
        required:true
    },
    profile:{
        firstName:{
            type:String,
        },
        lastName:{
            type:String
        }
    },
    email:{
        type:String,
        
    },
    accessToBranches:{
        type:[String],
        default:[]
    },
    
},{timestamps:true}) 

export const Users = mongoose.model("Users",UsersSchema,"Users")

UsersSchema.index({subId:1});
UsersSchema.index({_id:1,subId:1});