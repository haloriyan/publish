import React, { useEffect, useState } from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import Switch from "../components/Switch";
import { IconCheck } from "@tabler/icons-react";
import { useSidebar } from "../Providers/SidebarProvider";
import config from "../config";
import ClipLoader from "react-spinners/ClipLoader";
import Currency from "../lib/Currency";
import moment from "moment";
import { MdWest } from "react-icons/md";
import banks from "../assets/banks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckCircle = () => {
    return (
        <div className="bg-green-100 text-green-500 flex items-center justify-center rounded-full h-6 aspect-square">
            <IconCheck size={14} />
        </div>
    )
}

const Upgrade = () => {
    const { isExpanded } = useSidebar();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [period, setPeriod] = useState('monthly');

    const user = JSON.parse(window.localStorage.getItem('user_data'));

    const pakets = [
        {
            name: "PERSONAL",
            price: {
                monthly: 55000,
                yearly: 41250,
            }
        },
        {
            name: "STANDARD",
            price: {
                monthly: 60000,
                yearly: 45000,
            }
        },
        {
            name: "PREMIUM",
            price: {
                monthly: 75000,
                yearly: 56250,
            }
        }
    ]

    const [isBuying, setBuying] = useState(false);
    const [isPaying, setPaying] = useState(false);

    useEffect(() => {
        document.title = `Pembelian Paket - ${config.appName}`;
    }, []);

    const pay = (method, channel) => {
        setBuying(true);
        axios.post(`${config.baseUrl}/api/user/upgrade`, {
            token: user.token,
            price: plan.price[period],
            period: period,
            package_name: plan.name,
            payment_method: method,
            payment_channel: channel,
        })
        .then(response => {
            let res = response.data;
            navigate('/purchase')
        })
    }

    return (
        <>
            <Header />
            <Sidebar active="upgrade" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="text-slate-700 text-center text-4xl font-bold">Siap Tingkatkan Penjualan?</div>
                <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="p-1 px-2 rounded-full border border-primary text-primary text-xs opacity-0">
                        Hemat 00%
                    </div>
                    <div className="text-slate-700">per-Bulan</div>
                    <Switch active={period === "yearly"} onChange={() => setPeriod(
                        period === "monthly" ? "yearly" : "monthly"
                    )} />
                    <div className="text-slate-700">per-Tahun</div>
                    <div className="p-1 px-2 rounded-full border border-primary text-primary text-xs">
                        Hemat 25%
                    </div>
                </div>

                <div className="flex mobile:flex-col gap-8 mt-8">
                    <div className="flex flex-col grow p-8 rounded-lg shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                        <div className="text-center text-slate-700 text-xl font-medium">PERSONAL</div>
                        <div className="flex gap-2 items-center justify-center">
                            <div className="text-slate-500">Rp</div>
                            <div className="text-4xl font-black text-slate-700">{Currency(pakets[0].price[period]).encode()}</div>
                        </div>
                        <div className="text-sm text-primary text-center mt-2 mb-4">{Currency(
                            period === "monthly" ? pakets[0].price[period] * 3 : pakets[0].price[period] * 12
                        ).encode()} / {period === 'monthly' ? '3' : '12'} bulan</div>

                        <div className="flex flex-col grow">
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm"><span className="font-bold">2</span> Nomor Whatsapp</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm"><span className="font-bold">10.000</span> Kontak</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Broadcast Tanpa Batas</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Device Tanpa Batas</div>
                            </div>
                        </div>

                        <div className="text-slate-700 mt-6">Support</div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">24/7 Layanan Pelanggan</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Video Tutorial</div>
                            </div>
                        </div>
                        </div>

                        <button className="border border-primary text-primary rounded-lg h-12 mt-8" onClick={() => setPlan(pakets[0])}>
                            Pilih Paket
                        </button>
                    </div>
                    <div className="flex flex-col grow p-8 rounded-lg shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)] border border-primary relative">
                        <div className="absolute top-2 right-2 text-xs text-primary font-bold bg-primary bg-opacity-20 p-2 rounded">
                            BEST SELLER
                        </div>

                        <div className="text-center text-slate-700 text-xl font-medium">STANDARD</div>
                        <div className="flex gap-2 items-center justify-center">
                            <div className="text-slate-500">Rp</div>
                            <div className="text-4xl font-black text-slate-700">{Currency(pakets[1].price[period]).encode()}</div>
                        </div>
                        <div className="text-sm text-primary text-center mt-2 mb-4">{Currency(
                            period === "monthly" ? pakets[1].price[period] * 3 : pakets[1].price[period] * 12
                        ).encode()} / {period === 'monthly' ? '3' : '12'} bulan</div>

                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm"><span className="font-bold">4</span> Nomor Whatsapp</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm"><span className="font-bold">40.000</span> Kontak</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Broadcast Tanpa Batas</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Device Tanpa Batas</div>
                            </div>
                        </div>

                        <div className="text-slate-700 mt-6">Support</div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">24/7 Layanan Pelanggan</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Video Tutorial</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Pelatihan Penggunaan Aplikasi</div>
                            </div>
                        </div>

                        <button className="border border-primary bg-primary text-white font-bold rounded-lg h-12 mt-8" onClick={() => setPlan(pakets[1])}>
                            Pilih Paket
                        </button>
                    </div>
                    <div className="flex flex-col grow p-8 rounded-lg shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                        <div className="text-center text-slate-700 text-xl font-medium">PREMIUM</div>
                        <div className="flex gap-2 items-center justify-center">
                            <div className="text-slate-500">Rp</div>
                            <div className="text-4xl font-black text-slate-700">{Currency(pakets[2].price[period]).encode()}</div>
                        </div>
                        <div className="text-sm text-primary text-center mt-2 mb-4">{Currency(
                            period === "monthly" ? pakets[2].price[period] * 3 : pakets[2].price[period] * 12
                        ).encode()} / {period === 'monthly' ? '3' : '12'} bulan</div>

                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm"><span className="font-bold">6</span> Nomor Whatsapp</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm"><span className="font-bold">60.000</span> Kontak</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Broadcast Tanpa Batas</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Device Tanpa Batas</div>
                            </div>
                        </div>

                        <div className="text-slate-700 mt-6">Support</div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">24/7 Layanan Pelanggan</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Video Tutorial</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle />
                                <div className="text-slate-600 text-sm">Pelatihan Penggunaan Aplikasi</div>
                            </div>
                        </div>

                        <button className="border border-primary text-primary rounded-lg h-12 mt-8" onClick={() => setPlan(pakets[2])}>
                            Pilih Paket
                        </button>
                    </div>
                </div>

                <div className="desktop:hidden h-24"></div>
            </div>

            {
                isPaying &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setPaying(false);
                    }
                }}>
                    {
                        isBuying ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isBuying}
                                color={config.primaryColor}
                            />
                            <div>Memproses Pembayaran</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12">
                            <div className="flex items-center gap-4">
                                <div className="cursor-pointer text-primary" onClick={() => setPaying(false)}>
                                    <MdWest />
                                </div>
                                <div className="flex grow text-xl font-bold text-slate-700">Pilih Pembayaran</div>
                            </div>

                            <div className="text-slate-500 text-xs mt-8">Transfer Bank (Verifikasi Otomatis)</div>
                            <div className="flex gap-4 py-1 items-center cursor-pointer" onClick={() => pay('bank_transfer', 'bca')}>
                                <img src={banks.bca.uri} alt="BCA" className="h-14" />
                                <div className="text-sm text-slate-700">{banks.bca.name}</div>
                            </div>
                            <div className="flex gap-4 py-1 items-center cursor-pointer" onClick={() => pay('bank_transfer', 'bri')}>
                                <img src={banks.bri.uri} alt="BCA" className="h-14" />
                                <div className="text-sm text-slate-700">{banks.bri.name}</div>
                            </div>
                            {/* <div className="flex gap-4 py-1 items-center cursor-pointer" onClick={() => pay('bank_transfer', 'mandiri')}>
                                <img src={banks.mandiri.uri} alt="MANDIRI" className="h-14" />
                                <div className="text-sm text-slate-700">{banks.mandiri.name}</div>
                            </div> */}
                            <div className="flex gap-4 py-1 items-center cursor-pointer" onClick={() => pay('bank_transfer', 'bni')}>
                                <img src={banks.bni.uri} alt="BNI" className="h-14" />
                                <div className="text-sm text-slate-700">{banks.bni.name}</div>
                            </div>
                            {/* <div className="flex gap-4 py-1 items-center cursor-pointer" onClick={() => pay('bank_transfer', 'permata')}>
                                <img src={banks.permata.uri} alt="PERMATA" className="h-14" />
                                <div className="text-sm text-slate-700">{banks.permata.name}</div>
                            </div> */}

                            <div className="text-slate-500 text-xs mt-8">E-Wallet</div>
                            <div className="flex gap-4 py-1 items-center cursor-pointer" onClick={() => pay('qris', 'gopay')}>
                                <img src={'/qr.png'} alt="qr" className="h-14" />
                                <div className="text-sm text-slate-700">QRIS</div>
                            </div>
                        </form>
                    }
                </div>
            }
            {
                (plan !== null && !isPaying) &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setPlan(null);
                    }
                }}>
                    <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12">
                        <div className="flex items-center gap-4">
                            <div className="flex grow text-xl font-bold text-slate-700">Upgrade Paket</div>
                            <div className="cursor-pointer text-primary cursor-pointer" onClick={() => setPlan(null)}>Ubah</div>
                        </div>

                        <div className="flex items-center gap-4 py-2 mt-6">
                            <div className="flex grow text-sm text-slate-500">Nama Paket</div>
                            <div className="font-bold text-slate-700">{plan.name}</div>
                        </div>
                        <div className="flex mobile:flex-col items-center mobile:items-start gap-4 py-2">
                            <div className="flex grow text-sm text-slate-500">Periode Pembayaran</div>
                            <div className="flex items-center p-2 rounded-lg bg-gray-100 mobile:w-full">
                                <div className={`text-xs px-6 py-2 cursor-pointer rounded-lg mobile:flex mobile:grow mobile:justify-center ${period === "monthly" ? "bg-white text-primary shadow font-bold" : ""}`} onClick={() => setPeriod('monthly')}>
                                    Triwulan
                                </div>
                                <div className={`text-xs px-6 py-2 cursor-pointer rounded-lg mobile:flex mobile:grow mobile:justify-center ${period === "yearly" ? "bg-white text-primary shadow font-bold" : ""}`} onClick={() => setPeriod('yearly')}>
                                    Tahunan
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 py-2">
                            <div className="flex grow text-sm text-slate-500">Aktif Hingga</div>
                            <div className="font-bold text-slate-700">{moment().add(period === "monthly" ? 3 : 12, 'month').format('DD MMM Y')}</div>
                        </div>
                        <div className="flex items-center gap-4 py-2 mt-3">
                            <div className="flex grow text-sm text-slate-500">Total Pembayaran</div>
                            <div className="font-bold text-slate-700">{Currency(
                                period === "monthly" ? 3 * plan.price[period] : 12 * plan.price[period]
                            ).encode()}</div>
                        </div>

                        <button className="w-full h-12 rounded-lg bg-primary text-white font-bold mt-8" type="button" onClick={() => setPaying(true)}>
                            Proses Pembayaran
                        </button>
                    </form>
                </div>
            }
        </>
    )
}

export default Upgrade