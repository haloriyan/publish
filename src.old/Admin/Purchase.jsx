import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import { Currency } from "../lib";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { IconCheck, IconX } from "@tabler/icons-react";
import PaymentStatus from "../lib/PaymentStatus";
import ClipLoader from "react-spinners/ClipLoader";

const Purchase = () => {
    const { isExpanded } = useSidebar();
    const [raw, setRaw] = useState(false);
    const [page, setPage] = useState(1);
    const [purchases, setPurchases] = useState([]);
    const [purchase, setPurchase] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [q, setQ] = useState(searchParams.get('q'));
    const [revenue, setRevenue] = useState(0);

    const [isMaking, setMaking] = useState(false);
    const [isMakingProc, setMakingProc] = useState(false);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/admin/purchase?page=${page}`, {q})
            .then(response => {
                let res = response.data;
                setLoading(false);
                setRaw(res.purchases);
                setPurchases(res.purchases.data);
                setRevenue(res.revenue);
            })
        }
    }, [isLoading, triggerLoading]);

    const debounceLoad = useDebouncedCallback(() => {
        setPage(1);
        setLoading(true);
        setTriggerLoading(true);
    }, 500)

    const makePaid = (e) => {
        e.preventDefault();
        setMakingProc(true);
        axios.post(`${config.baseUrl}/api/admin/purchase/make-paid`, {
            id: purchase.id,
        })
        .then(response => {
            setLoading(true);
            setTriggerLoading(true);
            setMakingProc(false);
            setMaking(false);
        })
    }

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="purchase" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="flex flex-row justify-end items-center mb-8 mt-8 gap-8">
                    <div className="flex flex-col grow gap-1">
                        <div className="text-slate-500 text-xs">Pendapatan Bulan ini :</div>
                        <div className="text-slate-700 font-bold text-xl">{Currency(revenue).encode()}</div>
                    </div>
                    <div className="border rounded-lg p-2 w-5/12">
                        <div className="text-xs text-slate-500">Cari Order ID / Nama Pengguna</div>
                        <div className="flex items-center gap-4">
                            <input type="text" value={q} className="w-full h-10 outline-0" required onInput={e => {
                                let val = e.currentTarget.value;
                                searchParams.set('q', val);
                                setSearchParams(searchParams);
                                setQ(val);
                                debounceLoad();
                            }} />
                            {
                                q !== "" &&
                                <div className="cursor-pointer text-red-500" onClick={() => {
                                    setQ('');
                                    searchParams.set('q', '');
                                    setSearchParams(searchParams);
                                    debounceLoad();
                                }}>
                                    <IconX />
                                </div>
                            }
                        </div>
                    </div>
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
                    <>
                        <table className="table w-full">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="py-4 text-slate-700">Order ID</th>
                                    <th className="py-4 text-slate-700">Pengguna</th>
                                    <th className="py-4 text-slate-700">Nominal</th>
                                    <th className="py-4 text-slate-700">Pembayaran</th>
                                    <th className="py-4 text-slate-700"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    purchases.map((purc, p) => (
                                        <tr key={p}>
                                            <td className="py-4 text-slate-700">
                                                <div>{purc.order_id}</div>
                                                <div className="text-xs text-slate-500">Transaction ID :{purc.transaction_id}</div>
                                            </td>
                                            <td className="py-4 text-slate-700">{purc.user.name}</td>
                                            <td className="py-4 text-slate-700">
                                                <div>{Currency(purc.total_pay).encode()}</div>
                                                <div className="text-xs text-slate-500">Paket : {purc.package_name} {purc.quantity} bulan</div>
                                            </td>
                                            <td className="py-4 text-slate-700">
                                                <div>{purc.payment_method}</div>
                                                <div className="text-xs text-slate-500">Channel : {purc.payment_channel}</div>
                                            </td>
                                            <td className="py-4 text-slate-700 flex row">
                                                {
                                                    purc.payment_status.toUpperCase() !== "SETTLEMENT" ?
                                                    <button className="h-10 px-4 rounded-xl flex items-center justify-center bg-gray-200 text-sm text-primary flex gap-2" onClick={() => {
                                                        setPurchase(purc);
                                                        setMaking(true);
                                                    }}>
                                                        <IconCheck size={18} />
                                                        Aktifkan Pembelian
                                                    </button>
                                                    :
                                                    <div className="p-2 px-4 rounded-full text-xs font-bold" style={{
                                                        backgroundColor: `${PaymentStatus[purc.payment_status.toUpperCase()].color}20`,
                                                        color: PaymentStatus[purc.payment_status.toUpperCase()].color,
                                                    }}>
                                                        {PaymentStatus[purc.payment_status.toUpperCase()].label}
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                }
            </div>

            {
                isMaking &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setMaking(false);
                    }
                }}>
                    {
                        isMakingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isMakingProc}
                                color={config.primaryColor}
                            />
                            <div>Memproses pembayaran</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4" onSubmit={makePaid}>
                            <div>Yakin ingin mengaktifkan pembelian paket {purchase.package_name} selama {purchase.quantity} bulan ({Currency(purchase.total_pay).encode()}) oleh {purchase.user.name}?</div>
                            <div className="border-t pt-4 mt-4 flex items-center justify-end gap-4">
                                <button className="p-2 px-4 rounded-lg font-bold text-slate-500" type="button" onClick={() => setMaking(false)}>Batal</button>
                                <button className="p-2 px-4 rounded-lg font-bold bg-primary text-white">Aktifkan</button>
                            </div>
                        </form>
                    }
                </div>
            }
        </>
    )
}

export default Purchase