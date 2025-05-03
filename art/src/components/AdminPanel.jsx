import React, { useState } from "react";
import axios from "axios"
import DeleteContent from "./DeleteContent";


function AdminPanel(){
    const [image, setimage] = useState(null)
    // const [thumbnail, setthumbnail] = useState(null)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [deletePanel, setDel] = useState(false)

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setimage(file);
    }
    // const handleThumbChange = (e)=>{
    //     const file = e.target.files[0];
    //     setthumbnail(file);
    // }
    const handleTextChange = (e)=>{
        setText(e.target.value)
    }
    const handleTitleChange = (e)=>{
        setTitle(e.target.value)
    }
    const handleUpload = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        formData.append("image", image);
        // formData.append("thumbnail", thumbnail);
    
        try {
          const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          console.log("Success:", response.data);
          alert("Upload successful!");
        } catch (error) {
          console.error("Error uploading:", error);
          alert("Upload failed!");
        }
    };

    if(deletePanel == true){
        return(
            <DeleteContent/>
        )
    }

    return(
      <div className="flex flex-col items-center justify-center w-full h-screen bg-green-100">
        <h1 className="text-2xl my-[5vh] font-bold">Welcome, Shikhar!</h1>
        <div className="flex flex-col justify-start">
        <input name="title" value={title} onChange={handleTitleChange} placeholder="Title" className="border p-2 m-2 w-full" />
        <textarea name="text" value={text} onChange={handleTextChange} placeholder="Description" className="border m-2 p-2 w-full" />
        <h1 className="mx-2">Image</h1>
        <input name="image" type="file" onChange={handleImageChange} className="w-full m-2 " />
        {/* thumbnail
        <input name="thumbnail" type="file" onChange={handleThumbChange} className="w-full m-2" /> */}
        <button onClick={handleUpload} className="m-2 bg-white border border-black">upload</button>
        <button onClick={()=>{setDel(true)}} className="border border-black bg-red-600 text-white mx-2">Delete content</button>
        </div>
      </div>
    )
}

export default AdminPanel