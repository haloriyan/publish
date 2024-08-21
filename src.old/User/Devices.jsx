import React, { useEffect, useState } from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import axios from "axios";
import config from "../config";
import { IconCheck, IconDeviceMobile, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSidebar } from "../Providers/SidebarProvider";
import { Link, useNavigate } from "react-router-dom";

const Devices = () => {
    const navigate = useNavigate();
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    const { isExpanded, setExpanded } = useSidebar();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState(null);
    const [raw, setRaw] = useState(null);
    
    const [qrData, setQrData] = useState(null);
    const [isLoadingQr, setLoadingQr] = useState(false);

    const [canAdd, setCanAdd] = useState(false);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isDeletingProc, setDeletingProc] = useState(false);

    useEffect(() => {
        document.title = `Daftar Perangkat - ${config.appName}`;
    }, []);

    // useEffect(() => {
    //     if (user) {
    //         let int = setInterval(() => {
    //             axios.get(`${config.baseUrl}/api/user/is-connecting?token=${user.token}`)
    //             .then(response => {
    //                 let res = response.data;
    //                 if (res.status === 1 && qrData !== null && qrData !== "loading") {
    //                     setAdding(true);
    //                 } else {
    //                     console.log('setting alse', typeof res.status, res.status, qrData);
    //                     setAdding(false);
    //                 }
    //             })
    //         }, 1000);

    //         return () => clearInterval(int);
    //     }
    // }, [user, qrData]);

    useEffect(() => {
        if (isLoading && triggerLoading && user !== null) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/user/device`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setRaw(res.devices);
                setDevices(res.devices);
                setCanAdd(res.can_add);
            })
        }
    }, [isLoading, triggerLoading, user]);

    useEffect(() => {
        if (isLoadingQr === true && user !== null) {
            setLoadingQr(false);
            setQrData("loading")
            axios.post(`${config.whatsappUrl}/create-client`, {
                id: Math.floor(Math.random() * 9999),
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setQrData(res.qrCodeUrl);
            })
            .catch(err => {
                setQrData(null);
                console.error(err);
            })
        }
    }, [isLoadingQr, user])

    const del = e => {
        e.preventDefault();
        setDeletingProc(true);
        axios.post(`${config.baseUrl}/api/device/remove`, {
            id: device.id,
            token: user.token,
        })
        .then(response => {
            let res = response.data;
            setDeletingProc(false);
            setDeleting(false);
            setLoading(true);
            setTriggerLoading(true);
        })
    }

    const syncContact = (client_id, device_id) => {
        axios.post(`${config.whatsappUrl}/contacts`, {
            client_id: client_id,
        })
        .then(response => {
            let res = response.data;
            setTimeout(() => {
                navigate(`/sync/${device_id}`)
            }, 1500);
            // DELETE FROM `contact_temps` WHERE user_id = 1
        })
        .catch(e => console.log(e))
    }

    return (
        <>
            <Header />
            <Sidebar active={null} />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="flex items-center gap-2 mt-4">
                    <div className="text-slate-500">Pengaturan</div>
                    <div className="text-slate-500">/</div>
                    <div className="text-slate-700">Daftar Perangkat</div>
                </div>

                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 px-8 rounded-lg mt-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-xl font-bold flex grow">Daftar Perangkat</div>
                        {
                            canAdd ?
                            <button className="bg-green-100 text-green-500 p-2 px-4 rounded-lg flex gap-2 items-center text-sm" onClick={() => {
                                setLoadingQr(true);
                                setAdding(true);
                                setQrData(null);
                                // axios.post(`${config.baseUrl}/api/user/set-connecting`, {
                                //     status: true,
                                //     id: user.id
                                // });
                            }}>
                                <IconPlus />
                                <div className="mobile:hidden">Tambahkan Perangkat</div>
                            </button>
                            :
                            <Link to={'/upgrade'} className="text-primary text-sm underline">Upgrade untuk Menambahkan Perangkat</Link>
                        }
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
                                        <th className="py-4 text-slate-700">Label</th>
                                        <th className="py-4 text-slate-700">Nomor</th>
                                        <th className="py-4 text-slate-700">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        devices.map((dev, d) => (
                                            <tr key={d}>
                                                <td className="py-4 text-slate-600">{dev.label}</td>
                                                <td className="py-4 text-slate-600">{dev.number}</td>
                                                <td className="py-4 text-slate-600">
                                                    <div className="flex gap-4">
                                                        <button className="h-10 px-4 rounded-xl flex items-center justify-center bg-gray-200 text-sm text-primary flex gap-2" onClick={() => {
                                                            syncContact(dev.client_id, dev.id);
                                                        }}>
                                                            <IconDeviceMobile size={18} />
                                                            Sinkronkan Kontak dari Perangkat
                                                        </button>
                                                        <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-red-500" onClick={() => {
                                                            setDevice(dev)
                                                            setDeleting(true);
                                                        }}>
                                                            <IconTrash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                </div>
            </div>

            {
                isDeleting &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setDeleting(false)
                    }
                }}>
                    {
                        isDeletingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isDeletingProc}
                                color={config.primaryColor}
                            />
                            <div>Menghapus perangkat</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4" onSubmit={del}>
                            <div className="flex items-center gap-4">
                                <div className="text-slate-700 text-lg font-bold flex grow">Hapus Perangkat "{device.label}"</div>
                                <div className="h-12 aspect-square rounded-full flex items-center justify-center cursor-pointer border" onClick={() => setDeleting(false)}>
                                    <IconX />
                                </div>
                            </div>
                            <div>Yakin ingin menghapus perangkat <b>{device.label}</b> dengan nomor <b>{device.number}</b>?</div>
                            <div className="flex items-center justify-end gap-4 mt-4 pt-4 border-t">
                                <button className="p-2 px-4 rounded-lg bg-slate-200" type="button" onClick={() => setDeleting(false)}>Batal</button>
                                <button className="p-2 px-4 rounded-lg bg-red-500 text-white">Hapus</button>
                            </div>
                        </form>
                    }
                </div>
            }

            {
                (isAdding && qrData !== null) &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setAdding(false)
                    }
                }}>
                    {
                        qrData === "loading" ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={qrData === "loading"}
                                color={config.primaryColor}
                            />
                            <div>Memuat Kode QR</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-6/12 mobile:w-10/12 flex mobile:flex-col flex-row gap-8">
                            <div className="w-6/12 mobile:w-full">
                                <img src={qrData} alt="qr code" className="w-full aspect-square" />
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

                                <button className="border border-primary text-primary w-full rounded-lg h-12 mt-4" onClick={() => {
                                    setQrData(null);
                                    setAdding(false);
                                }}>
                                    Tutup
                                </button>
                            </div>
                        </form>
                    }
                </div>
            }
        </>
    )
}

export default Devices