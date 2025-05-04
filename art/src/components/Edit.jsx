import React, { useState } from 'react';
import axios from 'axios';

function Edit({ content, onClose, onUpdate }) {
  const [title, setTitle] = useState(content.title);
  const [text, setText] = useState(content.text);
  const [imageFile, setImageFile] = useState(null);
  const API_BASE = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = content.image;
    let image_id = content.id;
    // let thumbnail = content.thumbnail;
    //delete this url
    if(imageFile){
    try {
        // Send selected items to backend for deletion
        await axios.post(`${API_BASE}/api/delete-image`, { id: content.id});
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    

    
        const formData = new FormData();
        formData.append('image', imageFile);
      
        const res = await axios.post(`${API_BASE}/api/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      
        imageUrl = res.data.image_url;
        image_id = res.data.id;
        console.log("new image id:",image_id);
        // thumbnail = res.data.thumbnail; // optional, same as image_url or a resized version
    }
      

    await axios.put(`${API_BASE}/api/edit-content/${content.id}`, {
      new_id:image_id,
      title,
      text,
      image: imageUrl,
    //   thumbnail
    });

    onUpdate(); // trigger re-fetch or update local state
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Title"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Description"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
          <button onClick={onClose} type="button" className="ml-2 text-gray-600">Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
