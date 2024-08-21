import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import { Currency } from "../lib";
import { Line } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Filler, Legend
} from "chart.js";
import {faker} from "@faker-js/faker";
import { Link } from "react-router-dom";

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend
)

const Dashboard = () => {
    const { isExpanded } = useSidebar();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const exampleLabels = ['28 Okt', '31 Okt', '33 Okt', '37 Okt', '2 Feb', '4 Feb', '6 Feb'];

    const [usersCount, setUsersCount] = useState(0);
    const [broadcastsCount, setBroadcastsCount] = useState(0);
    const [pending, setPending] = useState(0);
    const [paid, setPaid] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [paidCount, setPaidCount] = useState(0);
    const [chartsData, setChartsData] = useState(null);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/admin/dashboard`)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setBroadcastsCount(res.broadcasts_count);
                setUsersCount(res.users_count);
                setPaid(res.paid);
                setPending(res.pending);
                setPaidCount(res.paid_count);
                setPendingCount(res.pending_count);
                setChartsData(res.charts_data);
            })
        }
    }, [isLoading, triggerLoading])

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="dashboard" />
            {
                isLoading ?
                <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                    <div className="flex gap-4 mt-4">
                        <div className="bg-slate-200 flex grow aspect-video rounded-lg"></div>
                        <div className="bg-slate-200 flex grow aspect-video rounded-lg"></div>
                        <div className="bg-slate-200 flex grow aspect-video rounded-lg"></div>
                        <div className="bg-slate-200 flex grow aspect-video rounded-lg"></div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="bg-slate-200 flex grow aspect-video rounded-lg"></div>
                        <div className="bg-slate-200 flex grow aspect-video rounded-lg"></div>
                    </div>
                </div>
                :
                <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                    <div className="flex gap-4 mt-4">
                        <Link to={'/admin/purchase'} className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow gap-1 p-8 rounded-lg">
                            <div className="text-xs text-slate-500">Pembelian Tertunda</div>
                            <div className="flex gap-4 items-center">
                                <div className="text-2xl font-black text-slate-700">{pendingCount}</div>
                                <div className="flex grow"></div>
                                <div className="text-sm text-yellow-500">{Currency(pending).encode()}</div>
                            </div>
                        </Link>
                        <Link to={'/admin/purchase'} className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow gap-1 p-8 rounded-lg">
                            <div className="text-xs text-slate-500">Pembelian Paket</div>
                            <div className="flex gap-4 items-center">
                                <div className="text-2xl font-black text-slate-700">{paidCount}</div>
                                <div className="flex grow"></div>
                                <div className="text-sm text-green-500">{Currency(paid).encode()}</div>
                            </div>
                        </Link>
                        <Link to={'/admin/user'} className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow gap-1 p-8 rounded-lg">
                            <div className="text-xs text-slate-500">Pengguna</div>
                            <div className="text-2xl font-black text-slate-700">{usersCount}</div>
                        </Link>
                        <Link to={'/admin/history'} className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow gap-1 p-8 rounded-lg">
                            <div className="text-xs text-slate-500">Pesan Terkirim</div>
                            <div className="text-2xl font-black text-slate-700">{broadcastsCount}</div>
                        </Link>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow gap-1 p-8 rounded-lg w-6/12">
                            <Line
                                options={{
                                    responsive: true,
                                    bezierCurve: true,
                                }}
                                data={{
                                    labels: chartsData.users.labels,
                                    datasets: [
                                        {
                                            fill: true,
                                            label: 'Pengguna',
                                            data: chartsData.users.datasets,
                                            borderWidth: 1,
                                            borderColor: '#2196f3',
                                            backgroundColor: '#2196f300'
                                        },
                                        {
                                            fill: true,
                                            label: 'Perangkat',
                                            data: chartsData.devices.datasets,
                                            borderWidth: 1,
                                            borderColor: '#EF4444',
                                            backgroundColor: '#EF444400'
                                        },
                                    ]
                                }}
                            />
                        </div>
                        <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow gap-1 p-8 rounded-lg">
                            <Line
                                options={{
                                    responsive: true,
                                    bezierCurve: true,
                                }}
                                data={{
                                    labels: chartsData.users.labels,
                                    datasets: [
                                        {
                                            fill: true,
                                            label: 'Broadcast',
                                            data: chartsData.broadcasts.datasets,
                                            borderWidth: 1,
                                            borderColor: '#2ecc71',
                                            backgroundColor: '#2ecc7100'
                                        },
                                    ]
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow gap-1 p-8 rounded-lg">
                        <Line
                            options={{
                                responsive: true,
                                bezierCurve: true,
                            }}
                            data={{
                                labels: chartsData.users.labels,
                                datasets: [
                                    {
                                        fill: true,
                                        label: 'Broadcast Logs',
                                        data: chartsData.logs.datasets,
                                        borderWidth: 1,
                                        borderColor: '#F97316',
                                        backgroundColor: '#F9731600'
                                    },
                                ]
                            }}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard