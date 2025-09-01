import { asynchandler } from "../utils/asynchandler.js";
  import { ApiError } from "../utils/ApiError.js";
  import { User } from "../models/user.model.js";
  import { uploadtocloudinary } from "../utils/cloudinary.js";
  import { ApiResponse } from "../utils/ApiResponse.js";


const userregister = asynchandler (async ( req,res)=>{   // after here this controller goes to routes then after app.js where full api is created

  const {username, email,fullname ,password}= req.body
   if([username, email,fullname ,password].some((field)=>(field?.trim()===""))

   ){
    throw new ApiError(400,"all field are compulsary")
   }
//    if(username ==="") {
//     throw new ApiError(400,"fullname is required")   
//    }
//    if(fullname ==="") {
//     throw new ApiError(400,"fullname is required")
//    }
//    if(email ==="") {
//     throw new ApiError(400,"fullname is required")
//    }
//    if(password ==="") {
//     throw new ApiError(400,"fullname is required")
//    }

  
  
 const existeduser = await User.findOne({
    $or:[{username},{email}]
})
if(existeduser){
    throw new ApiError(404," username and email already exists")
}

const avatarlocalpath= req.files?.avatar?.[0]?.path
const coverImageLocalpath=req.files?.coverImage?.[0]?.path
console.log(avatarlocalpath);
console.log("found good version")
if(!avatarlocalpath){
    throw new ApiError(404,"Avatar is mandatory")
}
const avatar = await uploadtocloudinary(avatarlocalpath);
if(!avatar){
    throw new ApiError (400,"avatar not found");
}
const coverImage = coverImageLocalpath?await uploadtocloudinary(coverImageLocalpath):null;

const user =   await User.create({
        fullname,
       email,
       password,
       username:username.toLowerCase(),
       avatar:avatar.secure_url,
       coverImage:coverImage?.url || "",



    })

  const createduser= await User.findById(user._id).select("-password -refreshtoken")    // remove if we dont want the information

    if(!createduser){
        throw new ApiError(500,"server error while regestring the user")
    }

    return res.status(201).json(
        new ApiResponse(404,createduser,"user register successfully")
        
    )





}) 


  
                                                     //1.please enter the username and password
                                                      // validation is not empty
                                                 //2.check whether the username is already register
                                                              //3. check for images and avatar
                                                         //4. upload them to cloudinary                                                  //5.create user object - create entry in db
                                                        // remove password and refresh token
                                                        // check for user creation
                                                         // return response
//  const userregister =async (req,res)=>{
//     try {
//         res.status(200).json({message :"ok"})
        
//     } catch (error) {
//         console.log("error find",error);
        
        
//     }
//  }

export { userregister}
