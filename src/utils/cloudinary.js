import { v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadtocloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        console.log(localFilePath);
        
    const response =await cloudinary.uploader.upload (localFilePath,{
        resource_type :"auto"
    })
    //file is upload successfully
    console.log("file is uploaded successfully",response.secure_url);
    return response;
    } catch (error) {
        console.log(`Error: ${JSON.stringify(error,null,2)}`);
        
        fs.unlinkSync(localFilePath)    // local file temporary file is removed
        return null;
    }

}
export {uploadtocloudinary}