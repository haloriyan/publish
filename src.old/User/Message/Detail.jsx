import React, { useEffect, useState } from "react";
import Sidebar from "../../Partials/Sidebar";
import Header from "../../Partials/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { MdWest } from "react-icons/md";
import DeliveryStatus from "../../lib/DeliveryStatus";

function showPreview(text) {
    text = text.replace(/\*(.*?)\*/g, '<b>$1</b>');
    text = text.replace(/_(.*?)_/g, '<i>$1</i>');
    text = text.replace(/~(.*?)~/g, '<s>$1</s>');
    
    return text;
}
function replaceText(text, oldWord, newWord) {
    const regex = new RegExp(oldWord, 'g');
    return text.replace(regex, newWord);
}

const HistoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingLog, setLoadingLog] = useState(false);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [broadcast, setBroadcast] = useState(null);
    
    const [logs, setLogs] = useState([]);
    const [logsRaw, setLogsRaw] = useState(null);
    const [logsPage, setLogsPage] = useState(1);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.get(`${config.baseUrl}/api/broadcast/${id}/detail`)
            .then(response => {
                let res = response.data;
                setBroadcast(res.broadcast);
                setLoading(false);
                setLoadingLog(true);
            })
        }
    }, [isLoading, triggerLoading]);

    useEffect(() => {
        if (isLoadingLog) {
            let logInterval = setInterval(() => {
                axios.get(`${config.baseUrl}/api/broadcast/${id}/log?page=${logsPage}`)
                .then(response => {
                    let res = response.data;
                    setLogs(res.logs.data);
                    setLogsRaw(res.logs);
                })
            }, 1000);

            return () => clearInterval(logInterval)
        }
    }, [isLoadingLog, logsPage]);

    const replaceVar = text => {
        let toReturn = text;
        const regex = /%([^%]+)%/g;
        const matches = [];
        let match;
        const templates = {
            contact: logs[0].contact,
            group: broadcast.group,
        }
        
        while ((match = regex.exec(text)) !== null) {
            matches.push(match[1]);
        }
        
        matches.map(item => {
            let it = item.split(".");
            toReturn = replaceText(toReturn, `%${item}%`, templates[it[0]][it[1]]);
        })
        
        return toReturn;
    }

    return (
        <>
            <Header />
            <Sidebar active="message" />
            {
                isLoading ?
                <div className="absolute top-20 right-0 w-10/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                    <div className="flex items-center gap-2 mt-4">
                        <div className="text-slate-500">Pesan</div>
                        <div className="text-slate-500">/</div>
                        <div className="text-slate-700">Buat Pesan Broadcast</div>
                    </div>
                    <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-4 rounded-lg mt-2">
                        Detail
                    </div>
                </div>
                :
                <div className="absolute top-20 right-0 w-10/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                    <div className="flex items-center gap-2 mt-4">
                        <div className="text-slate-500">Pesan</div>
                        <div className="text-slate-500">/</div>
                        <div className="text-slate-700">Buat Pesan Broadcast</div>
                    </div>
                    <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-4 rounded-lg mt-2">
                        <div className="flex items-center gap-8">
                            <div className="cursor-pointer" onClick={() => navigate(-1)}>
                                <MdWest />
                            </div>
                            <div className="text-slate-700 font-black text-2xl">{broadcast.title}</div>
                        </div>

                        <div className="flex mobile:flex-col gap-8 mobile:gap-4 mt-8">
                            <div className="flex flex-col gap-4 grow">
                                <div className="flex flex-col gap-1">
                                    <div className="text-slate-500 text-sm">Perangkat</div>
                                    <div className="text-slate-700 text-lg font-bold">{broadcast.device.label} - {broadcast.device.number}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-slate-500 text-sm">Tujuan</div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-slate-700 text-lg font-bold">{broadcast.group.name}</div>
                                        <div className="text-slate-500 text-xs">({broadcast.group_member} kontak)</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-slate-500 text-sm">Status</div>
                                    <div className="flex row">
                                        <div className="p-2 px-4 rounded-full text-xs font-bold" style={{
                                            backgroundColor: `${DeliveryStatus[broadcast.delivery_status].color}20`,
                                            color: DeliveryStatus[broadcast.delivery_status].color,
                                        }}>
                                            {DeliveryStatus[broadcast.delivery_status].label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                logs.length > 0 &&
                                <div className="bg-slate-400 w-5/12 mobile:w-full aspect-square rounded-xl p-8" style={{
                                    backgroundImage: `url(/wa-bg.jpg)`,
                                }}>
                                    <div className="bg-white rounded-lg p-4">
                                        {
                                            broadcast.image !== null &&
                                            <img src={`${config.baseUrl}/storage/bc_images/${broadcast.image}`} alt={broadcast.id} className="w-full rounded-lg aspect-square object-cover mb-2" />
                                        }
                                        <div dangerouslySetInnerHTML={{__html: showPreview(replaceVar(broadcast.content))}}></div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="text-slate-500 text-sm mt-8">Log</div>
                        <table className="table w-full">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="py-4 text-slate-700">Nama Kontak</th>
                                    <th className="py-4 text-slate-700">Nomor</th>
                                    <th className="py-4 text-slate-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    logs.map((lg, l) => (
                                        <tr key={l}>
                                            <td className="py-4 text-slate-700 text-sm">{lg.contact.name}</td>
                                            <td className="py-4 text-slate-700 text-sm">{lg.contact.whatsapp}</td>
                                            <td className="py-4 text-slate-700 text-sm flex row">
                                                <div className="p-2 px-4 rounded-full text-xs font-bold" style={{
                                                    backgroundColor: `${DeliveryStatus[lg.status].color}20`,
                                                    color: DeliveryStatus[lg.status].color,
                                                }}>
                                                    {DeliveryStatus[lg.status].label}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="flex items-center gap-4 mt-4">
                            {
                                logsRaw?.prev_page_url !== null &&
                                <button className="w-3/12 h-12 bg-primary text-primary rounded-lg font-bold bg-opacity-20" onClick={() => {
                                    setLogsPage(logsPage - 1);
                                }}>Sebelumnya</button>
                            }
                            <div className="flex grow"></div>
                            {
                                logsRaw?.next_page_url !== null &&
                                <button className="w-3/12 h-12 bg-primary text-white rounded-lg font-bold" onClick={() => {
                                    setLogsPage(logsPage + 1);
                                }}>Berikutnya</button>
                            }
                        </div>
                    </div>

                    <div className="desktop:hidden h-24"></div>
                </div>
            }
        </>
    )
}

export default HistoryDetail