import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import { MdMoney } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import Currency from "../lib/Currency";
import PaymentStatus from "../lib/PaymentStatus";
import { IconCopy, IconEye } from "@tabler/icons-react";
import banks from "../assets/banks";

const Purchase = () => {
    const { isExpanded } = useSidebar();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const user = JSON.parse(window.localStorage.getItem('user_data'));

    const [raw, setRaw] = useState(false);
    const [page, setPage] = useState(1);
    const [purchases, setPurchases] = useState([]);
    const [purchase, setPurchase] = useState(null);
    const vaNumRef = useRef(null);

    const [isDetailing, setDetailing] = useState(false);

    useEffect(() => {
        document.title = `Riwayat Pembelian Paket - ${config.appName}`;
    }, []);

    useEffect(() => {
        if (isLoading && triggerLoading && user) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/user/upgrade-history?page=1`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setPurchases(res.purchases.data);
            })
        }
    }, [isLoading, triggerLoading, user])

    const copyText = toCopy => {
        navigator.clipboard.writeText(toCopy).then(() => {
            vaNumRef.current.innerHTML = 'Disalin!';
            setTimeout(() => {
                vaNumRef.current.innerHTML = toCopy;
            }, 3000);
        })
    }

    return (
        <>
            <Header />
            <Sidebar active="purchase" />
            <div className="absolute top-20 right-0 w-10/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-4 rounded-lg mt-4">
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
                                    <th className="py-4 text-slate-700">Order ID</th>
                                    <th className="py-4 text-slate-700">Nama Paket</th>
                                    <th className="py-4 text-slate-700"><BiMoney /></th>
                                    <th className="py-4 text-slate-700">Status</th>
                                    <th className="py-4 text-slate-700">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    purchases.map((purc, p) => (
                                        <tr key={p}>
                                            <td className="py-4 text-slate-700">
                                                <div>{purc.order_id}</div>
                                                <div className="text-xs text-slate-500">Transaction ID : {purc.transaction_id}</div>
                                            </td>
                                            <td className="py-4 text-slate-700">
                                                <div>{purc.package_name}</div>
                                                <div className="text-xs text-slate-500">{purc.quantity} bulan</div>
                                            </td>
                                            <td className="py-4 text-slate-700">{Currency(purc.total_pay).encode()}</td>
                                            <td className="py-4 text-slate-700 flex flex-row">
                                                <div className="p-2 px-4 rounded-full text-xs font-bold" style={{
                                                    backgroundColor: `${PaymentStatus[purc.payment_status.toUpperCase()].color}20`,
                                                    color: PaymentStatus[purc.payment_status.toUpperCase()].color,
                                                }}>
                                                    {PaymentStatus[purc.payment_status.toUpperCase()].label}
                                                </div>
                                            </td>
                                            <td className="py-4 text-slate-700">
                                                <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-primary" onClick={() => {
                                                    setPurchase(purc);
                                                    setDetailing(true);
                                                }}>
                                                    <IconEye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>

            {
                isDetailing &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setDetailing(false);
                    }
                }}>
                    {
                        purchase.payment_method === "qris" &&
                        <form className="bg-white rounded-lg p-8 w-3/12 mobile:w-10/12">
                            <div className="flex justify-center mb-8">
                                {JSON.parse(purchase.payment_payload).actions.map((act, a) => {
                                    if (act.name === "generate-qr-code") {
                                        return (
                                            <img src={act.url} alt={'qris image'} className="w-10/12 aspect-square rounded-lg" />
                                        )
                                    }
                                })}
                            </div>
                            <div className="flex flex-col gap-4 items-center mt-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-xs text-slate-500">Nominal</div>
                                    <div className="text-slate-700 font-medium">{Currency(purchase.total_pay).encode()}</div>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-xs text-slate-500">Status</div>
                                    <div className="text-slate-700 font-medium">{purchase.payment_status.toUpperCase()}</div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t flex items-center justify-end">
                                <div className="text-primary cursor-pointer" onClick={() => setDetailing(false)}>Tutup</div>
                            </div>
                        </form>
                    }
                    {
                        purchase.payment_method === "bank_transfer" &&
                        <form className="bg-white rounded-lg p-8 w-3/12 mobile:w-10/12">
                            <div className="flex justify-center mb-8">
                                <img src={banks[JSON.parse(purchase.payment_payload).va_numbers[0].bank].uri} alt={'bank logo'} className="h-32 aspect-square rounded-lg" />
                            </div>
                            {
                                JSON.parse(purchase.payment_payload).va_numbers.map((va, v) => (
                                    <div key={v} className="flex flex-col w-full gap-4 items-center">
                                        <div className="flex flex-col gap-1 w-full">
                                            <div className="text-xs text-slate-500">Bank</div>
                                            <div className="text-slate-700 font-medium">{va.bank.toUpperCase()}</div>
                                        </div>
                                        <div className="flex flex-col gap-1 w-full">
                                            <div className="text-xs text-slate-500">Nomor Virtual Account</div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-slate-700 font-medium flex grow" ref={vaNumRef}>{va.va_number}</div>
                                                <div className="cursor-pointer" onClick={() => copyText(va.va_number)}>
                                                    <IconCopy size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="flex flex-col gap-4 items-center mt-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-xs text-slate-500">Nominal</div>
                                    <div className="text-slate-700 font-medium">{Currency(purchase.total_pay).encode()}</div>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-xs text-slate-500">Status</div>
                                    <div className="text-slate-700 font-medium">{purchase.payment_status.toUpperCase()}</div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t flex items-center justify-end">
                                <div className="text-primary cursor-pointer" onClick={() => setDetailing(false)}>Tutup</div>
                            </div>
                        </form>
                    }
                </div>
            }
        </>
    )
}

export default Purchase