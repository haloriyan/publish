import React, { useEffect, useState } from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";

const Account = () => {
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user_data')));
    const [name, setName] = useState(user.name);
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = `Akun Saya - ${config.appName}`;
    }, []);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.post(`${config.baseUrl}/api/user/auth`, {
                token: user.token
            })
            .then(response => {
                let res = response.data;
                setUser(res.user);
                window.localStorage.setItem('user_data', JSON.stringify(res.user));
            })
        }
    }, [isLoading]);

    useEffect(() => {
        if (message !== "") {
            let to = setTimeout(() => setMessage(''), 4000);
            return () => clearTimeout(to);
        }
    }, [message]);

    const submit = e => {
        e.preventDefault();
        axios.post(`${config.baseUrl}/api/user/update`, {
            token: user.token,
            name,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setMessage(res.message);
        })
    }

    return (
        <>
            <Header />
            <Sidebar active="dashboard" />
            <div className="absolute top-20 right-0 w-10/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 rounded-lg flex flex-col items-center">
                    <form onSubmit={submit} className="w-6/12 mobile:w-full">
                        <div className="text-xl font-bold text-slate-700 w-full mb-8">Akun Saya</div>
                        <div className="flex items-center gap-8">
                            <div className="flex text-slate-500 w-2/12">Nama</div>
                            <input type="text" value={name} className="border-b flex grow outline-0 h-14" onInput={e => setName(e.currentTarget.value)} required />
                        </div>
                        <div className="flex items-center gap-8 mt-2">
                            <div className="flex text-slate-500 w-2/12">Email</div>
                            <input type="text" value={user.email} className="border-b flex grow outline-0 h-14 cursor-not-allowed" readOnly />
                        </div>
                        <div className="flex items-center gap-8 mt-2">
                            <div className="flex text-slate-500 w-2/12">Paket</div>
                            <div className="border-b h-14 flex items-center grow gap-4">
                                <div className="flex grow">{user.package_name}</div>
                                <Link to={'/upgrade'} className="text-primary">
                                    {user.package_name.toUpperCase() === "BASIC" ? "Upgrade" : "Ubah"}
                                </Link>
                            </div>
                        </div>

                        {
                            message !== "" &&
                            <div className="p-4 rounded-lg text-sm bg-green-100 text-green-600 mt-8">
                                {message}
                            </div>
                        }

                        <div className="flex items-center gap-4 justify-end mt-8">
                            <button className="bg-primary text-white font-bold p-2 px-4 rounded-lg">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Account