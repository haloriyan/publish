import React, { useEffect, useState } from "react";
import Sidebar from "../../Partials/Sidebar";
import Header from "../../Partials/Header";
import { IconEye, IconSearch, IconSend, IconShare2 } from "@tabler/icons-react";
import config from "../../config";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";

const Message = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [q, setQ] = useState(searchParams.get('q'));
    const [isLoading, setLoading] = useState(false);
    const [triggerLoading, setTriggerLoading] = useState(false);
    const user = JSON.parse(window.localStorage.getItem('user_data'));

    const [broadcastsPage, setBroadcastsPage] = useState(1);
    const [broadcastsRaw, setBroadcastsRaw] = useState(null);
    const [broadcasts, setBroadcasts] = useState([]);

    useEffect(() => {
        document.title = `Riwayat Pesan - ${config.appName}`;
    }, []);

    useEffect(() => {
        if (user !== null) {
            let int = setInterval(() => {
                axios.post(`${config.baseUrl}/api/broadcast?page=${broadcastsPage}`, {
                    token: user.token,
                })
                .then(response => {
                    let res = response.data;
                    console.log(res.broadcasts.data);
                    setBroadcasts(res.broadcasts.data);
                    setBroadcastsRaw(res.broadcasts);
                })
            }, 1000);

            return () => clearInterval(int);
        }
    }, [isLoading, setLoading, user]);

    const sendNow = id => {
        axios.post(`${config.baseUrl}/api/broadcast/${id}/send-now`)
        .then(response => {
            let res = response.data;
        })
    }

    return (
        <>
            <Header />
            <Sidebar active="message" />
            <div className="absolute top-20 right-0 w-10/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                <div className="text-slate-500 mt-4">Kirim Pesan</div>
                <div className="bg-white rounded-lg p-4 mt-2 flex items-center gap-4 shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                    <IconSearch size={28} color={config.primaryColor} />
                    <input type="text" className="flex grow h-12 outline-0" placeholder="Pencarian" onInput={e => {
                        let val = e.currentTarget.value;
                        searchParams.set('q', val);
                        setSearchParams(searchParams);
                        setQ(val);
                    }} />
                    <button className="bg-gray-100 p-2 px-4 rounded-lg flex gap-2 items-center text-sm text-slate-500">
                        <IconShare2 />
                        <div className="mobile:hidden">Ekspor</div>
                    </button>
                    <button className="bg-green-100 text-green-500 p-2 px-4 rounded-lg flex gap-2 items-center text-sm" onClick={() => navigate(`/message/create`)}>
                        <IconSend />
                        <div className="mobile:hidden">Buat Pesan Broadcast</div>
                    </button>
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
                    <div className="overflow-x-auto">
                        <table className="table min-w-full">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="py-4 mobile:text-sm text-slate-700">Tanggal Dibuat</th>
                                    <th className="py-4 mobile:text-sm text-slate-700">Judul Broadcast</th>
                                    <th className="py-4 mobile:text-sm text-slate-700">Terkirim</th>
                                    <th className="py-4 mobile:text-sm text-slate-700">Status</th>
                                    <th className="py-4 mobile:text-sm text-slate-700">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    broadcasts.map((broad, b) => (
                                        <tr key={b}>
                                            <td className="py-4 mobile:text-sm text-slate-700 text-sm">{moment(broad.created_at).format('DD/MM/Y HH:mm')}</td>
                                            <td className="py-4 mobile:text-sm text-slate-700 text-sm">{broad.title}</td>
                                            <td className="py-4 mobile:text-sm text-slate-700 text-sm">
                                                {broad.logs.length} / {broad.group_member}
                                            </td>
                                            <td className="py-4 mobile:text-sm text-slate-700 text-sm">
                                                {Math.floor(broad.logs.length / broad.group_member * 100)}%
                                            </td>
                                            <td className="py-4 mobile:text-sm text-slate-700 flex gap-4">
                                                <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-primary" onClick={() => {
                                                    navigate(`/history/${broad.id}/detail`)
                                                }}>
                                                    <IconEye size={18} />
                                                </button>
                                                {
                                                    (broad.delivery_status === "SCHEDULED") &&
                                                    <button className="h-10 px-4 text-sm rounded-xl flex items-center justify-center bg-gray-200 text-primary" onClick={() => {
                                                        sendNow(broad.id);
                                                    }}>
                                                        Kirim Sekarang
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
                </div>
            </div>
        </>
    )
}

export default Message