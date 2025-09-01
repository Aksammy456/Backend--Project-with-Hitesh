import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschema = new Schema({

    videofile:{
        type:String ,// cloudnary url
        required:true
    },
      thumbnail:{
        type:String ,// cloudnary url
        required:true
    }, 
     title:{
        type:String ,
        required:true
    },
      description:{
        type:String ,
        required:true
    },
      duration:{
        type:Number ,
        required:true
    },
      views:{
        type:Number ,
        default:0
    },
      ispublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref :"User"
    }

    
},{timesstamps:true})

videoschema.plugin(mongooseAggregatePaginate)
export const Video =  mongoose.model("Video",videoschema)

