"use client";
import React, { useState } from 'react'
import toast from "react-hot-toast";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { useDarkMode } from "@/context/DarkModeContext";
import Image from 'next/image';

const ImageUpload = ({ setImage }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");
  const { isDarkMode } = useDarkMode();

  const handleRemove = async() => {
    // const res = await imageRemove(imageKey)
    // if(res.success) {
      setImageKey("");
      setImageUrl("");
      setImage(null)
      toast.success('Remove Successful', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
    // }
  };

  return (
    <>
      <UploadButton
        className={`mb-4 mx-8 px-7 ut-upload-icon:text-purple-700 ut-button:ut-uploading:bg-purple-400 ut-button:ut-ready:bg-purple-700 ut-button:bg-purple-700 ${isDarkMode ? "ut-allowed-content:text-white" : "ut-allowed-content:text-black"} ut-label:text-purple-700 flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 py-6 text-sm transition hover:border-purple-700 focus:border-solid focus:border-purple-800 focus:outline-none focus:ring-1 focus:ring-purple-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75`}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          
          if(res[0].url === imageUrl) {
            toast.error('Upload Failed, File Already Exist', { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
          }else{
            setImageUrl(res[0].url);
            setImageKey(res[0].key);
            setImage(res[0].url);
            toast.success('Upload Successful', { duration: 5000, style: { border: '2px solid green', padding: '15px 20px', marginBottom: '40px' } });
          }
        }}
        onUploadError={(error) => {
          // Do something with the error.
          toast.error(error, { duration: 5000, style: { border: '2px solid red', padding: '15px 20px', marginBottom: '40px' } });
        }}
      />
      <div className="mt-4 mx-8 grid grid-cols-3 gap-4">
        {
          imageUrl && (
            <div className="relative w-fit">
              <Image
                src={imageUrl}
                alt={"Image"}
                width={200}
                height={200}
                className={`h-32 w-32 hover:scale-[2] ${isDarkMode? 'shadow-[1px_1px_20px_rgba(255,255,255,.6)]' : 'shadow-[0_0_20px_rgba(0,0,0,.3)]'} transition-all duration-200 object-cover rounded-md`}
              />
              <p onClick={handleRemove} className='text-center mt-2 text-red-500 underline cursor-pointer'>Remove</p>
            </div>
          )
        }
      </div>
    </>
  )
}

export default ImageUpload