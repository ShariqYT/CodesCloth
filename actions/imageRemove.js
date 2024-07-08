"use server"
import { utapi } from "./uploadThing";

export const imageRemove = async (imageKey) => {
    try{
        await utapi.deleteFiles(imageKey);
        return{success: true}
    }catch(err){
        return{success: false, error: err}
    }
}