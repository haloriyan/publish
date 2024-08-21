import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import ClipLoader from "react-spinners/ClipLoader";
import { IconLock, IconTrash, IconX } from "@tabler/icons-react";

const Admin = () => {
    const { isExpanded } = useSidebar();
    const [admins, setAdmins] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const user = JSON.parse(window.localStorage.getItem('admin_data'));

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isAddingProc, setAddingProc] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isDeletingProc, setDeletingProc] = useState(false);
    const [isChangePass, setChangePass] = useState(false);
    const [isChangePassProc, setChangePassProc] = useState(false);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            console.log('loading');
            axios.post(`${config.baseUrl}/api/admin/admin`)
            .then(response => {
                let res = response.data;
                console.log(res);
                setLoading(false);
                setAdmins(res.admins);
            })
        }
    }, [isLoading, triggerLoading]);

    const resetForm = () => {
        setAdding(false);
        setName('');
        setUsername('');
        setPassword('');
        setLoading(true);
        setTriggerLoading(true);
    }

    const submit = e => {
        e.preventDefault();
        setAddingProc(true);
        axios.post(`${config.baseUrl}/api/admin/admin/store`, {
            name, username, password
        })
        .then(response => {
            setAddingProc(false);
            resetForm();
        })
    }
    const del = e=> {
        e.preventDefault();
        setDeletingProc(true);
        axios.post(`${config.baseUrl}/api/admin/admin/delete`, {
            id: admin.id,
        })
        .then(response => {
            setDeletingProc(true);
            setDeleting(false);
            setLoading(true);
            setTriggerLoading(true);
        })
    }

    const changePass = e => {
        e.preventDefault();
        setChangePassProc(true);
        axios.post(`${config.baseUrl}/api/admin/admin/change-pass`, {
            id: admin.id,
            password: password,
        })
        .then(response => {
            setChangePass(false);
            setChangePassProc(false);
            setTriggerLoading(true);
            setLoading(true);
        })
    }

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="admin" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="flex flex-row justify-end mt-4 mb-4">
                    <button className="p-3 px-6 rounded-lg bg-primary text-white font-bold" onClick={() => setAdding(true)}>Tambah</button>
                </div>

                {
                    isLoading ?
                    <>
                        <div className="w-full h-12 bg-slate-200"></div>
                        <div className="flex gap-4 mt-2">
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                            <div className="flex grow h-10 bg-slate-200"></div>
                        </div>
                    </>
                    :
                    <table className="table w-full">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="py-4 text-slate-700">Nama</th>
                                <th className="py-4 text-slate-700">Username</th>
                                <th className="py-4 text-slate-700">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                admins.map((adm, a) => (
                                    <tr key={a}>
                                        <td className="py-4 text-slate-700">{adm.name}</td>
                                        <td className="py-4 text-slate-700">{adm.username}</td>
                                        <td className="py-4 text-slate-700 flex gap-2 items-center">
                                            <button className="h-10 px-4 rounded-xl flex items-center justify-center bg-gray-200 text-sm text-primary flex gap-2" onClick={() => {
                                                setAdmin(adm);
                                                setChangePass(true);
                                            }}>
                                                <IconLock size={18} />
                                                Ganti Password
                                            </button>
                                            {
                                                adm.id !== user.id &&
                                                <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-red-500" onClick={() => {
                                                    setAdmin(adm);
                                                    setDeleting(true);
                                                }}>
                                                    <IconTrash size={18} />
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>

            {
                isChangePass &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setChangePass(false);
                    }
                }}>
                    {
                        isChangePassProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isChangePass}
                                color={config.primaryColor}
                            />
                            <div>Mengubah</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4" onSubmit={changePass}>
                            <div className="flex items-center gap-4">
                                <div className="flex grow text-slate-700 font-bold text-lg">Ubah Password {admin.name}</div>
                                <div className="cursor-pointer" onClick={() => setChangePass(false)}>
                                    <IconX />
                                </div>
                            </div>

                            <div className="border rounded-lg p-2">
                                <div className="text-xs text-slate-500">Password Baru</div>
                                <input type="password" className="w-full h-10 outline-0" required onInput={e => {
                                    setPassword(e.currentTarget.value);
                                }} />
                            </div>

                            <button className="w-full h-12 rounded-lg bg-primary text-white font-bold">Terapkan Password</button>
                        </form>
                    }
                </div>
            }

            {
                isDeleting &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setDeleting(false);
                    }
                }}>
                    {
                        isDeletingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isDeletingProc}
                                color={config.primaryColor}
                            />
                            <div>Menghapus</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4" onSubmit={del}>
                            <div className="flex items-center gap-4">
                                <div className="flex grow text-slate-700 font-bold text-lg">Hapus {admin.name}</div>
                                <div className="cursor-pointer" onClick={() => setDeleting(false)}>
                                    <IconX />
                                </div>
                            </div>
                            <div>Yakin ingin menghapus admin {admin.name}?</div>
                            <div className="flex items-center justify-end gap-4 pt-4 mt-4 border-t">
                                <button className="p-2 px-4 rounded-lg font-bold text-sm text-slate-500" type="button" onClick={() => setDeleting(false)}>Batal</button>
                                <button className="p-2 px-4 rounded-lg font-bold text-sm bg-red-500 text-white">Hapus</button>
                            </div>
                        </form>
                    }
                </div>
            }

            {
                isAdding &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setAdding(false);
                    }
                }}>
                    {
                        isAddingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isAddingProc}
                                color={config.primaryColor}
                            />
                            <div>Menambahkan</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4" onSubmit={submit}>
                            <div className="flex items-center gap-4">
                                <div className="flex grow text-slate-700 font-bold text-lg">Tambah Admin</div>
                                <div className="cursor-pointer" onClick={() => setAdding(false)}>
                                    <IconX />
                                </div>
                            </div>

                            <div className="border rounded-lg p-2 mt-4">
                                <div className="text-xs text-slate-500">Nama</div>
                                <input type="text" className="w-full h-10 outline-0" required onInput={e => {
                                    setName(e.currentTarget.value);
                                }} />
                            </div>
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

                            <button className="w-full h-12 rounded-lg bg-primary text-white font-bold">Tambahkan</button>
                        </form>
                    }
                </div>
            }
        </>
    )
}

export default Admin