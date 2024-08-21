import React, { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Logout = () => {
    useEffect(() => {
        window.localStorage.removeItem('admin_data');
        setTimeout(() => {
            window.location.href = "/admin/login";
        }, 500);
    }, []);
    
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-4">
            <ClipLoader />
            <div>Logging out...</div>
        </div>
    )
}

export default Logout