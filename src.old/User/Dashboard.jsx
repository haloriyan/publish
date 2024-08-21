import React, { useEffect, useState } from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import { IconFileSpreadsheet, IconPlus, IconScan, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useSidebar } from "../Providers/SidebarProvider";
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = () => {
    const { isExpanded } = useSidebar();
    const navigate = useNavigate();
    const [isLoadingQr, setLoadingQr] = useState(false);
    const [qrData, setQrData] = useState(null);
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [contactsCount, setContactsCount] = useState(0);
    const [broadcastsCount, setBroadcastsCount] = useState(0);
    const [broadcastsSentCount, setBroadcastsSentCount] = useState(0);

    const pakets = {
        BASIC: {
            max_contacts: 100,
        },
        PERSONAL: {
            max_contacts: 20000,
        },
        STANDARD: {
            max_contacts: 40000,
        },
        PREMIUM: {
            max_contacts: 60000,
        }
    }
    
    const [isImporting, setImporting] = useState(false);
    const [isImportingProc, setImportingProc] = useState(false);
    const [importFile, setImportFile] = useState(null);

    const [isScanning, setScanning] = useState(false);

    const [activeDevicesCount, setActiveDevicesCount] = useState(0);

    useEffect(() => {
        document.title = `Dashboard - ${config.appName}`;
    }, []);

    useEffect(() => {
        if (isLoading && triggerLoading && user !== null) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/user/dashboard`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setActiveDevicesCount(res.active_devices_count);
                setContactsCount(res.contacts_count);
                setBroadcastsCount(res.broadcasts_count);
                setBroadcastsSentCount(res.broadcasts_sent_count);
            })
        }
    }, [isLoading, triggerLoading, user]);

    useEffect(() => {
        if (isLoadingQr && user !== null) {
            setLoadingQr(false);
            console.log('generating qr');
            axios.post(`${config.whatsappUrl}/create-client`, {
                id: Math.floor(Math.random() * 9999),
                token: user.token,
            })

            .then(response => {
                let res = response.data;
                setQrData(res.qrCodeUrl);
            })
            .catch(err => {
                console.error(err);
            })
        }
    }, [isLoadingQr, user])

    const doImport = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('berkas', importFile.files[0]);
        setImportingProc(true);

        axios.post(`${config.baseUrl}/api/contact/import`, formData)
        .then(response => {
            let res = response.data;
            navigate('/contact');
            setImporting(false);
            setImportingProc(false);
            setImportFile(null);
        })
    }

    return (
        <>
            <Header />
            {
                isLoading ?
                <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                    <div className="flex gap-4 mt-8 items-center justify-end">
                        <div className="bg-slate-200 h-12 rounded-lg w-2/12"></div>
                        <div className="bg-slate-200 h-12 rounded-lg w-2/12"></div>
                    </div>
                    <div className="flex gap-8 mt-8">
                        <div className="bg-slate-200 rounded-lg p-8 flex flex-col grow aspect-video"></div>
                        <div className="bg-slate-200 rounded-lg p-8 flex flex-col grow aspect-video"></div>
                        <div className="bg-slate-200 rounded-lg p-8 flex flex-col grow aspect-video"></div>
                    </div>
                    <div className="flex gap-8 mt-8">
                        <div className="bg-slate-200 rounded-lg p-8 flex flex-col grow aspect-video"></div>
                        <div className="bg-slate-200 rounded-lg p-8 flex flex-col grow aspect-video"></div>
                    </div>
                </div>
                :
                <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <button className="p-2 px-4 rounded-lg bg-gray-500 text-white" onClick={() => {
                            setImporting(true);
                        }}>
                            Impor Kontak
                        </button>
                        <button className="p-2 px-4 rounded-lg bg-green-100 text-green-500 flex gap-2" onClick={() => navigate('/message/create')}>
                            <IconPlus />
                            Buat Broadcast
                        </button>
                    </div>

                    <div className="flex gap-8">
                        {/* <div className="bg-white rounded-lg p-8 shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow">
                            <div className="text-slate-500">Sisa Kuota Broadcast</div>
                            <div className="flex items-center gap-4">
                                <div className="text-slate-700 font-bold text-4xl flex grow">300</div>
                                <div className="text-slate-500 text-xs">Dari 200</div>
                            </div>
                            <div className="flex grow bg-slate-100 rounded-lg mt-2">
                                <div className="h-3 rounded-full bg-primary" style={{width: '33%'}}></div>
                            </div>
                        </div> */}
                        <Link to={'/contact'} className="bg-white rounded-lg p-8 shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow">
                            <div className="text-slate-500">Kontak</div>
                            <div className="flex items-center gap-4">
                                <div className="text-slate-700 font-bold text-4xl flex grow">{contactsCount}</div>
                                <div className="text-slate-500 text-xs">Dari {pakets[user.package_name].max_contacts / 1000}rb</div>
                            </div>
                            <div className="flex grow bg-slate-100 rounded-lg mt-2">
                                <div className="h-3 rounded-full bg-primary" style={{width: `${contactsCount / pakets[user.package_name].max_contacts * 100}%`}}></div>
                            </div>
                        </Link>
                        <Link to={'/history'} className="bg-white rounded-lg p-8 shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow">
                            <div className="text-slate-500">Total Broadcast Terkirim</div>
                            <div className="flex items-center gap-4">
                                <div className="text-slate-700 font-bold text-4xl flex grow">{broadcastsSentCount}</div>
                                <div className="text-slate-500 text-xs">Dari {broadcastsCount}</div>
                            </div>
                            <div className="flex grow bg-slate-100 rounded-lg mt-2">
                                <div className="h-3 rounded-full bg-primary" style={{width: `${broadcastsSentCount / broadcastsCount * 100}%`}}></div>
                            </div>
                        </Link>
                    </div>

                    <div className="flex mobile:flex-col gap-8 mt-8">
                        <div className="bg-white rounded-lg p-8 shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-col grow">
                            <div className="text-slate-500">Perangkat Anda</div>
                            <div className="flex gap-4 mt-4">
                                <Link to={'/devices'} className="bg-primary text-white aspect-video rounded-lg p-4 flex flex-col grow">
                                    <div>Aktif</div>
                                    <div className="text-4xl font-bold">{activeDevicesCount}</div>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-8 shadow shadow-[0px_16px_32px_rgba(0,0,0,0.05)] flex flex-row mobile:flex-col gap-8 grow">
                            <div className="w-5/12 mobile:w-full aspect-square bg-slate-200 rounded-lg relative">
                                <img src="/qr.png" alt="QR" className="w-full aspect-square rounded-lg blur-sm" />
                                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-slate-200 bg-opacity-85 flex flex-col gap-2 items-center justify-center">
                                    <div className="h-12 aspect-square rounded-full bg-primary text-white flex items-center justify-center cursor-pointer" onClick={() => {
                                        setLoadingQr(true);
                                        setScanning(true);
                                    }}>
                                        <IconScan />
                                    </div>
                                    <div>Tampilkan QR</div>
                                </div>
                            </div>
                            <div className="flex flex-col grow">
                                <div className="text-slate-700 font-bold text-xl">Sambungkan ke WhatsApp</div>
                                <ul className="ps-4 mt-4 text-sm flex flex-col gap-2">
                                    <li className="list-disc text-slate-500">Pastikan koneksi ponsel stabil</li>
                                    <li className="list-disc text-slate-500">Buka aplikasi whatsapp di ponsel Anda</li>
                                    <li className="list-disc text-slate-500">Tekan titik tiga di pojok kanan atas</li>
                                    <li className="list-disc text-slate-500">Pilih <span className="font-bold">Perangkat Tertaut</span></li>
                                    <li className="list-disc text-slate-500">Klik tombol <span className="font-bold">Tautkan Perangkat</span></li>
                                    <li className="list-disc text-slate-500">Lakukan scan kode QR</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="desktop:hidden mobile:h-24"></div>
                </div>
            }
            {
                isScanning &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setScanning(false);
                    }
                }}>
                    {
                        qrData === null ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={qrData === null}
                                color={config.primaryColor}
                            />
                            <div>Memuat kode QR...</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={doImport}>
                            <img src={qrData} alt="qr code" className="w-8/12 aspect-square bg-slate-200 rounded-lg" />
                            <div>Scan ini di hpmu</div>
                        </form>
                    }
                </div>
            }

            {
                isImporting &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setImporting(false);
                    }
                }}>
                    {
                        isImportingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isImportingProc}
                                color={config.primaryColor}
                            />
                            <div>Mengimpor Kontak...</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={doImport}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Impor Kontak</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setImporting(false)}>
                                    <IconX />
                                </div>
                            </div>
                            {
                                importFile === null ?
                                <>
                                    <div className="relative w-full aspect-video">
                                        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl flex flex-col gap-2 items-center justify-center border">
                                            <IconFileSpreadsheet size={32} />
                                            <div className="text-sm text-slate-700">Pilih Spreadsheet</div>
                                        </div>
                                        <input type="file" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer" style={{opacity: 0.01}} onChange={e => {
                                            setImportFile(e.currentTarget);
                                        }} />
                                    </div>
                                    <div className="text-slate-500 text-sm mt-2">
                                        Download <a href="/templates/Contacts.xlsx" className="text-primary">Template Spreadsheet</a> untuk mengimpor kontak
                                    </div>
                                </>
                                :
                                <>
                                    <div className="relative w-full aspect-video">
                                        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl flex flex-col gap-2 items-center justify-center border">
                                            <IconFileSpreadsheet size={32} />
                                            <div className="text-sm text-slate-700">{importFile.files[0].name}</div>
                                        </div>
                                        <input type="file" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer" style={{opacity: 0.01}} onChange={e => {
                                            setImportFile(e.currentTarget);
                                        }} />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <div className="text-sm text-red-500 cursor-pointer" onClick={() => setImportFile(null)}>
                                            Hapus File
                                        </div>
                                    </div>
                                </>
                            }

                            <button className="w-full h-12 bg-primary rounded-lg text-white mt-4">
                                Upload
                            </button>
                        </form>
                    }
                </div>
            }
            <Sidebar active="dashboard" />
        </>
    )
}

export default Dashboard