import React from "react"
import { useState, useEffect } from "react"
function Card({img, align}){
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
    
        // Cleanup on unmount or when modal closes
        return () => {
          document.body.style.overflow = '';
        };
    }, [isOpen]);
    if(align == "right"){
        return(
            <>
            <div className="flex flex-col-reverse md:flex-row w-full items-end justify-end">
              <div className="flex h-full flex-col justify-between">
                <h1 className="pb-[8vw] md:p-10 md:pt-5 text-2xl md:text-4xl text-[#5a189a] font-semibold text-end">{img.title}</h1>
                <p className="px-[1vw] md:p-10 text-[#001d3d] whitespace-pre-wrap md:pb-5 md:text-xl text-end">{img.text}</p>
              </div>
                <img src={img.image} alt="hover zoom"
                 onClick={()=>setIsOpen(true)}
                 className="w-[80vw] md:max-w-[400px] transition-transform origin-bottom-right cursor-pointer duration-300 hover:scale-110 rounded-md object-contain"></img>
            </div>
            {isOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-80 flex flex-wrap items-center justify-center z-50"
                onClick={() => setIsOpen(false)}
              >
              <img
                src={img.image}
                alt="Full view"
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-lg"
                onClick={(e) => e.stopPropagation()} // So clicking the image doesn't close the modal
              />
             </div>
            )}
           </>   
        )
    }
    return(
        <>
        <div className="flex flex-col md:flex-row w-full items-start md:items-end justify-start">
            <img src={img.image} alt="hover zoom"
            onClick={()=>setIsOpen(true)}
            className="w-full max-w-[80vw] md:max-w-[400px] transition-transform cursor-pointer origin-bottom-left duration-300 hover:scale-110  h-auto rounded-md object-contain"></img>
            <div className="flex h-full flex-col justify-between">
                <h1 className="pb-[8vw] md:p-10 md:pt-5 text-2xl md:text-4xl text-[#5a189a] font-semibold text-start">{img.title}</h1>
                <p className="md:p-10 md:pb-5 text-[#001d3d] whitespace-pre-wrap md:text-xl text-start">{img.text}</p>
            </div>
        </div>
        {isOpen && (
            <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center object-contain justify-center z-50"
            onClick={() => setIsOpen(false)}>
            <img
            src={img.image}
            alt="Full view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}/>
            </div>
        )}
        </>
    )
}

export default Card