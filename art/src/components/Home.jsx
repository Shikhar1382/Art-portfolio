import Card from "./Card"
import React, {useState, useEffect} from "react"
import axios from 'axios';
import { FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Home() {
  const [content, setContent] = useState([])
  const API_BASE = import.meta.env.VITE_API_URL;


  useEffect(() => {
    // Fetch content from the backend
    axios.get(`${API_BASE}/api/get-content`)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => console.error(error));
}, []);

  return (
    <div className='flex flex-wrap bg-[#E5E5E5] max-w-screen w-full'>
      <div className='flex flex-col md:flex-row h-auto w-full p-4 gap-6 bg-[#003566]'>
        {/* intro section */}
        <img src='pfp.jpg' className='w-full max-w-[200px] h-auto shadow-sm rounded-md object-contain'></img>
        <div className='flex flex-col justify-between h-auto'>
          <div className="mb-[2vh]">
            <h1 className="font-semibold text-2xl text-[#ffc300]">Shikhar Seth</h1>
            <a href="https://www.instagram.com/lone_blaze_?igsh=bTl2bnd5Yzl4ODh1" target="_blank" rel="noopener noreferrer"><img src='QR.png' className='w-full max-w-[70px] h-auto rounded-md object-contain'></img></a>
          </div>
          <p className='text-end text-[#fff6cc]'>I am a young learning artist from Varanasi who is obsessed with blending nature with emotions. I was intrigued by art since childhood now I am learning art by myself. Recently I have found great interest in depiction of scenarios indicating deep emotions which can be seen in some of my paintings.
          </p> 
        </div>
      </div>
      {/* disclaimer */}
      <h1 className="bg-[#001d3d] text-[#ffd60a] p-2 w-full">Disclaimer : All the paintings shown in this page is copyrighted by Shikhar Seth, use of these without permission is strictly prohibited.</h1>

      {/* <div className='flex flex-col p-2 gap-4 mt-16 w-full'> */}
        {Array.isArray(content) && content.map((item, index) =>(
          <div key={item.id} className="flex flex-col w-full items-end m-2">
          <Card img={item} align={index % 2 === 0 ? 'left' : 'right'}/>
          </div>
        ))}
        {/* <Card img={img}/>
        <Card img={img} allign="right"/> */}
      {/* </div> */}

      <div title="Contact info" className="flex flex-col bg-[#003566] w-full p-4 items-center">
          <h1 className="text-[#ffc300] md:text-xl text-lg">Contact me to place orders</h1>
          <div className="flex flex-col my-4 items-center">
          <a
           href="mailto:sethshikhar998@gmail.com"
           className="flex items-center space-x-2 text-[#ffc300] hover:underline"
          >
          <MdEmail size={20} />
          <span>sethshikhar998@gmail.com</span>
          </a>
          
          <a
             href="https://www.instagram.com/lone_blaze_?igsh=bTl2bnd5Yzl4ODh1"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 text-[#ffc300] hover:underline whitespace-nowrap"
          >
          <FaInstagram size={20} />
          <span>@lone_blaze_</span>
          </a>          
          </div>
      </div>
    </div>
  )
}

export default Home
