import React, { useState, useEffect } from "react";
import axios from 'axios';

function DeleteContent(){
    const [content, setContent] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const API_BASE = import.meta.env.VITE_API_URL;


    useEffect(() => {
        // Fetch content from the backend
        axios.get(`${API_BASE}/api/get-content`)
          .then((response) => {
            setContent(response.data);
          })
          .catch((error) => console.error(error));
    }, []);

    const handleSelect = (id) => {
        setSelectedItems((prev) =>{
            if(prev.includes(id)){
                return prev.filter(item => item !== id)
            }
            else{
                return [...prev, id]
            }
        });
    };

    const handleDelete = async () => {
        try {
          // Send selected items to backend for deletion
          await axios.post(`${API_BASE}/api/delete-content`, { ids: selectedItems });
          setContent(content.filter(item => !selectedItems.includes(item.id)));
          setSelectedItems([]); // Reset selected items
        } catch (error) {
          console.error('Error deleting content:', error);
        }
    };

    return(
    <div className="flex flex-col items-center bg-gray-700 w-full h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-2">
        {Array.isArray(content) && content.map(item => (
          <div key={item.id} className="border border-black bg-white p-4 rounded-lg">
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-2"/>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.text}</p>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelect(item.id)}
              className="mt-2"
            />
          </div>
        ))}
      </div>

      <button 
        onClick={handleDelete}
        className="my-4 bg-red-500 text-white p-2 rounded hover:bg-red-700"
      >
        Delete Selected
      </button>
    </div>
    )
}

export default DeleteContent