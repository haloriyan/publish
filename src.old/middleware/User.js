import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";                  
import config from "../config";

const UserMiddleware = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            if (admin === null) {
                let myData = JSON.parse(window.localStorage.getItem('user_data'));
                if (myData === null) {
                    navigate('/login');
                } else {
                    axios.post(`${config.baseUrl}/api/user/auth`, {
                        token: myData.token,
                    })
                    .then(response => {
                        let res = response.data;
                        window.localStorage.setItem('user_data', JSON.stringify(res.user));
                        if (res.user.company_name === null) {
                            navigate('/onboarding');
                        }
                        setAdmin(res.user);
    
                    })
                }
            }
        }
    }, [admin, isLoading]);

    if (admin !== null) {
        return children;
    }
}

export default UserMiddleware;