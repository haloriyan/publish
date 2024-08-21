import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";

const User = () => {
    const { isExpanded } = useSidebar();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);

    const [q, setQ] = useState(searchParams.get('q'));
    const [page, setPage] = useState(1);
    const [raw, setRaw] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/admin/user?page=${page}`, {
                q,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setRaw(res.users);
                setUsers(res.users.data);
            })
        }
    }, [isLoading, triggerLoading]);

    const debounceLoad = useDebouncedCallback(() => {
        setPage(1);
        setLoading(true);
        setTriggerLoading(true);
    }, 500)

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="user" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-2 px-8 rounded-lg flex items-center gap-4">
                    <div className="text-primary">
                        <IconSearch size={24} />
                    </div>
                    <input type="text" value={q} className="flex grow h-12 outline-0" placeholder="Pencarian" onInput={e => {
                        let val = e.currentTarget.value;
                        searchParams.set('q', val);
                        setSearchParams(searchParams);
                        setQ(val);
                        debounceLoad();
                    }} />
                    {
                        (searchParams.get('q')) &&
                        <div className="cursor-pointer text-red-500" onClick={() => {
                            setQ('');
                            searchParams.delete('q');
                            setSearchParams(searchParams);
                            debounceLoad();
                        }}>
                            <IconX />
                        </div>
                    }
                </div>

                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 px-8 rounded-lg mt-12">
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
                                    <th className="py-4 text-slate-700">Email</th>
                                    <th className="py-4 text-slate-700">Kontak</th>
                                    <th className="py-4 text-slate-700">Grup</th>
                                    <th className="py-4 text-slate-700">Terdaftar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((usr, u) => (
                                        <tr key={u}>
                                            <td className="py-4 text-slate-700">
                                                <Link to={`/admin/user/${usr.id}/detail`} className="underline">{usr.name}</Link>
                                            </td>
                                            <td className="py-4 text-slate-700">{usr.email}</td>
                                            <td className="py-4 text-slate-700">{usr.contacts_count}</td>
                                            <td className="py-4 text-slate-700">{usr.groups_count}</td>
                                            <td className="py-4 text-slate-700">{moment(usr.created_at).format('DD/MM/Y HH:mm')}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }

                    <div className="flex items-center gap-4 mt-4">
                        {
                            raw?.prev_page_url !== null &&
                            <button className="w-3/12 h-12 bg-primary text-primary rounded-lg font-bold bg-opacity-20" onClick={() => {
                                setPage(page - 1);
                                setLoading(true);
                                setTriggerLoading(true);
                            }}>Sebelumnya</button>
                        }
                        <div className="flex grow"></div>
                        {
                            raw?.next_page_url !== null &&
                            <button className="w-3/12 h-12 bg-primary text-white rounded-lg font-bold" onClick={() => {
                                setPage(page + 1);
                                setLoading(true);
                                setTriggerLoading(true);
                            }}>Berikutnya</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default User