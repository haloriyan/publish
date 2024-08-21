import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import axios from "axios";
import config from "../config";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        let me = JSON.parse(window.localStorage.getItem('admin_data'));
        if (me !== null) {
            navigate('/admin/dashboard');
        }
    }, []);

    const submit = e => {
        e.preventDefault();
        axios.post(`${config.baseUrl}/api/admin/login`, {
            username, password,
        })
        .then(response => {
            let res = response.data;
            if (res.status === 200) {
                window.localStorage.setItem('admin_data', JSON.stringify(res.admin));
                navigate('/admin/dashboard');
            } else {
                setMessage('Kombinasi username dan password tidak tepat');
            }
        })
    }

    useEffect(() => {
        if (message !== "") {
            let to = setTimeout(() => setMessage(''), 4000);
            return () => clearTimeout(to);
        }
    }, [message]);

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 flex items-center justify-center">
            <div className="bg-white p-4 py-20 rounded-3xl w-4/12 tablet:w-8/12 mobile:w-10/12 flex flex-col items-center gap-2">
                <AppIcon size={'80px'} textSize="4xl" />

                <h1 className="text-2xl font-bold text-slate-800 mt-4">Masuk</h1>
                <div className="text-base text-slate-500">Sebagai Administrator</div>

                <form onSubmit={submit} className="w-11/12 mt-4 flex flex-col gap-4">
                    <div className="border rounded-lg p-2">
                        <div className="text-xs text-slate-500">Username</div>
                        <input type="text" className="w-full h-10 outline-0" required onInput={e => {
                            setUsername(e.currentTarget.value);
                        }} />
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="text-xs text-slate-500">Password</div>
                        <input type="password" className="w-full h-10 outline-0" required onInput={e => {
                            setPassword(e.currentTarget.value);
                        }} />
                    </div>
                    {
                        message !== "" &&
                        <div className="p-4 rounded text-sm bg-red-100 text-red-500">
                            {message}
                        </div>
                    }
                    <button className="w-full h-14 bg-primary text-white font-bold rounded-lg">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login