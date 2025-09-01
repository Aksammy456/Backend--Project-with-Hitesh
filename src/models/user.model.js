import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userschema = new Schema ({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true

    },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
        fullname:{
        type:String,
        required:true,
       
        lowercase:true,
        trim:true,
        index:true

    },
    avatar:{
        type:String,   // cloundnary url
        required:true
    },
    coverImage:{
        type:String,  //cloudnary url
        require :true
    },
    Watchhistory :[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password :{
        type:String,
        required :[true,"Passoword is required"]


    },
    refreshtoken:{
        type:String
    }



},
{timesstamps:true})

userschema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)
    next()
})

userschema.methods.isPasswordCorrect = async function (password){      // customs methods
  return await  bcrypt.compare(password,this.password)
}

userschema.methods.generateAccesstoken=function (){
   return jwt.sign({
        _id :this._id,
        email:this.email,
        fullname:this.fullname,
        username:this.username,



    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
    

    
}
userschema.methods.generateRefreshToken = function(){
   return jwt.sign({
        _id:this.id
    },
    process.env.REFRESH_TOKEN_SECRET ,
    {
       expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
    }
)

}

export const User = mongoose.model("User",userschema)

