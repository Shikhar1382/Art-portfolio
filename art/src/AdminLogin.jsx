import React from "react";
import { useState } from "react";
import axios from "axios"
import AdminPanel from "./components/AdminPanel";

function Admin(){
    const [password, setpass] = useState('')
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const API_BASE = import.meta.env.VITE_API_URL;

    const Check = async () => {
        try {
            const response = await axios.post(`${API_BASE}/api/admin/login`, { password });
            if (response.data.success) {
                setAuthenticated(true);
                setError('');
            } else {
                setError('Incorrect password');
            }
        } catch (err) {
            setError('Server error');
            console.error(err);
        }
    };
    if (authenticated) {
        return (
            <AdminPanel/>
        )
    }
    return(
        <div className="flex flex-col flex-wrap items-center justify-center bg-[#E2DED0] max-w-screen w-full h-screen">
            
            <h1 className="m-4 text-center">Only for admin</h1>
            <div className="flex rounded-lg overflow-hidden">
                <input
                 type="password"
                 placeholder="Enter Password"
                 value={password}
                 onChange={e => setpass(e.target.value)}
                 className="px-2 rounded py-2 "
                />
                <button onClick={Check} 
                className="bg-cyan-700 px-2 text-white">Login</button>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
            </div>    
        </div>
    )
}

export default Admin