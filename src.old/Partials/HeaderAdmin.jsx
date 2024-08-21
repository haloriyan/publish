import React, { useEffect, useState } from "react";
import { IconBell, IconDeviceMobile, IconHelp, IconPhone, IconSettings, IconUser, IconUserSquare } from "@tabler/icons-react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import moment from "moment";

const HeaderAdmin = ({title = "Dashboard"}) => {
    const navigate = useNavigate();
    const [showNotif, setShowNotif] = useState(false);
    const [hasUnreadNotif, setHasUnreadNotif] = useState(false);
    const [notifs, setNotifs] = useState([]);
    const [isFullscreen, setFullscreen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const {isExpanded, setExpanded} = useSidebar();
    const [isLoadingNotif, setLoadingNotif] = useState(true);
    const user = JSON.parse(window.localStorage.getItem('admin_data'));

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else {
            document.exitFullscreen();
            setFullscreen(false);
        }
    }

    useEffect(() => {
        if (user !== null) {
            // let notifInterval = setInterval(() => {
            //     setHasUnreadNotif(false);
            //     axios.post(`${config.baseUrl}/api/notification`, {
            //         token: user.token,
            //     })
            //     .then(response => {
            //         let res = response.data;
            //         setNotifs(res.notifications.data);
            //         res.notifications.data.map(not => {
            //             setHasUnreadNotif(!not.has_read);
            //         })
            //     })
            // }, 1500);

            // return () => clearInterval(notifInterval);
        }
    }, [])

    const readNotif = (not) => {
        axios.post(`${config.baseUrl}/api/notification/read`, {
            token: user.token,
            id: not.id,
        })
        .then(response => {
            setShowNotif(false);
            navigate(not.action);
        })
    }
    const clearNotif = () => {
        axios.post(`${config.baseUrl}/api/notification/clear`, {
            token: user.token,
        });
    }

    return (
        <>
            <div className={`fixed top-0 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full pt-4 pe-4 mobile:ps-4 z-10`}>
                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] h-16 rounded-lg flex items-center gap-4 px-8">
                    <div className="text-xl mobile:text-lg font-bold text-slate-700 flex grow">Zainzo Blast</div>
                    <div className="flex gap-2 items-center">
                        {
                            window.screen.width > 480 &&
                            <div className="cursor-pointer text-2xl h-12 rounded-lg aspect-square flex items-center justify-center" onClick={toggleFullScreen}>
                                {
                                    isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />
                                }
                            </div>
                        }
                        <div className="cursor-pointer text-2xl h-12 rounded-lg aspect-square flex items-center justify-center relative" onClick={() => {
                            setShowNotif(true);
                        }}>
                            <IconBell />
                            {
                                hasUnreadNotif &&
                                <div className="h-2 bg-red-500 rounded-full aspect-square absolute top-2 right-2"></div>
                            }
                        </div>
                        <div className="cursor-pointer h-12 rounded-lg aspect-square flex items-center justify-center text-primary bg-primary bg-opacity-20" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                            <RxPerson size={32} />
                        </div>
                    </div>
                </div>
            </div>

            {
                showNotif &&
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-700 backdrop-blur-sm bg-opacity-75 z-50 cursor-pointer" onClick={() => {
                    setShowNotif(false);
                }}></div>
            }

            <div className={`fixed z-50 top-0 bottom-0 bg-white duration-400 p-4 ${showNotif ? 'w-4/12 mobile:w-10/12 right-0' : 'w-0 right-[-20px]'}`}>
                <div className="flex items-center gap-4">
                    <div className="text-slate-700 font-bold text-lg flex grow">Notifikasi</div>
                    <div className="cursor-pointer" onClick={() => setShowNotif(false)}>
                        <BiX size={18} />
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-8">
                    {
                        notifs.map((not, n) => (
                            <div key={n} className={`cursor-pointer p-4 text-slate-700 rounded-lg flex items-center gap-4 ${not.has_read ? "" : "bg-slate-200"}`} onClick={() => readNotif(not)}>
                                <div className="flex grow">{not.body}</div>
                                <div className="text-xs text-slate-500">{moment(not.created_at).format('DD/MM/Y HH:mm')}</div>
                            </div>
                        ))
                    }

                    {
                        notifs.length > 0 ?
                        <button className="w-full h-8 text-primary text-sm font-bold mt-4" onClick={clearNotif}>
                            Bersihkan Notifikasi
                        </button>
                        :
                        <div className="text-center">Tidak ada notifikasi</div>
                    }
                </div>
            </div>

            {
                showProfileMenu &&
                <div className="fixed z-20 top-24 shadow-[0px_16px_32px_rgba(0,0,0,0.05)] right-5 bg-white rounded-lg flex flex-col">
                    <Link to={'/account'} className="p-3 px-6 flex items-center gap-4 text-slate-500 text-sm hover:bg-gray-100 rounded-tl-lg rounded-tr-lg">
                        <IconSettings size={16} />
                        Pengaturan
                    </Link>
                    <Link to={'/admin/logout'} className="p-3 px-6 flex items-center gap-4 text-red-500 text-sm hover:bg-gray-100 rounded-bl-lg rounded-br-lg border-t">
                        Sign Out
                    </Link>
                </div>
            }
        </>
    )
}

export default HeaderAdmin