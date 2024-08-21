import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";

const History = () => {
    const { isExpanded } = useSidebar();
    const navigate = useNavigate();
    const [broadcastsPage, setBroadcastsPage] = useState(1);
    const [broadcastsRaw, setBroadcastsRaw] = useState(null);
    const [broadcasts, setBroadcasts] = useState([]);

    useEffect(() => {
        let int = setInterval(() => {
            axios.post(`${config.baseUrl}/api/admin/broadcast?page=${broadcastsPage}`)
            .then(response => {
                let res = response.data;
                setBroadcasts(res.broadcasts.data);
                setBroadcastsRaw(res.broadcasts);
            })
        }, 1000);

        return () => clearInterval(int);
    }, []);

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="message" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <table className="table w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-4 text-slate-700">Tanggal Dibuat</th>
                            <th className="py-4 text-slate-700">Pengguna</th>
                            <th className="py-4 text-slate-700">Judul Broadcast</th>
                            <th className="py-4 text-slate-700">Terkirim</th>
                            <th className="py-4 text-slate-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            broadcasts.map((broad, b) => (
                                <tr key={b}>
                                    <td className="py-4 text-slate-700 text-sm">{moment(broad.created_at).format('DD/MM/Y HH:mm')}</td>
                                    <td className="py-4 text-slate-700 text-sm">
                                        <Link to={`/admin/user/${broad.user.id}/detail`} className="underline">{broad.user.name}</Link>
                                    </td>
                                    <td className="py-4 text-slate-700 text-sm">{broad.title}</td>
                                    <td className="py-4 text-slate-700 text-sm">
                                        {broad.logs.length} / {broad.group_member} 
                                    </td>
                                    <td className="py-4 text-slate-700 text-sm">
                                        {Math.floor(broad.logs.length / broad.group_member * 100)}%
                                    </td>
                                    <td className="py-4 text-slate-700 text-sm">
                                        <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-primary" onClick={() => {
                                            navigate(`/admin/history/${broad.id}/detail`);
                                        }}>
                                            <IconEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default History