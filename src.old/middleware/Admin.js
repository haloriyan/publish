import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";                  
import config from "../config";

const AdminMiddleware = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin === null) {
            let myData = JSON.parse(window.localStorage.getItem('admin_data'));
            if (myData === null) {
                navigate('/admin/login');
            } else {
                setAdmin(myData);
            }
        }
    }, [admin]);

    if (admin !== null) {
        return children;
    }
}

export default AdminMiddleware;