import React, { useEffect, useState } from "react";
import { IconBell, IconBrandFacebook, IconBrandInstagram, IconDeviceMobile, IconHelp, IconLogout, IconPhone, IconSettings, IconUser, IconUserSquare } from "@tabler/icons-react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import moment from "moment";
import { UcWords } from "../lib";

const Header = ({title = "Dashboard"}) => {
    const navigate = useNavigate();
    const [showNotif, setShowNotif] = useState(false);
    const [hasUnreadNotif, setHasUnreadNotif] = useState(false);
    const [notifs, setNotifs] = useState([]);
    const [isFullscreen, setFullscreen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const {isExpanded, setExpanded} = useSidebar();
    const [isLoadingNotif, setLoadingNotif] = useState(true);
    const user = JSON.parse(window.localStorage.getItem('user_data'));

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
            let notifInterval = setInterval(() => {
                setHasUnreadNotif(false);
                axios.post(`${config.baseUrl}/api/notification`, {
                    token: user.token,
                })
                .then(response => {
                    let res = response.data;
                    setNotifs(res.notifications.data);
                    res.notifications.data.map(not => {
                        setHasUnreadNotif(!not.has_read);
                    })
                })
            }, 4000);

            return () => clearInterval(notifInterval);
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
                (showNotif || showProfileMenu) &&
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-700 backdrop-blur-sm bg-opacity-75 z-50 cursor-pointer" onClick={() => {
                    setShowNotif(false);
                    setShowProfileMenu(false);
                }}></div>
            }

            <div className={`fixed z-50 top-0 bottom-0 bg-white duration-400 ${showProfileMenu ? 'w-3/12 mobile:w-10/12 right-0' : 'w-0 right-[-20px]'}`}>
                <div className="p-8 bg-gray-100 flex items-center gap-4">
                    <img src={user.photo_url} alt={'user photo'} className="h-16 rounded-lg aspect-square object-cover" />
                    <div className="flex flex-col gap-1 grow">
                        <div className="text-sm text-slate-700 font-bold">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <Link to={'/account'} className="flex w-6/12 h-20 gap-4 items-center justify-center border border-t-0 border-e-0">
                        <IconUser />
                        <div className="text-sm">Akun Saya</div>
                    </Link>
                    <Link to={'/logout'} className="flex w-6/12 h-20 gap-4 items-center justify-center border border-t-0">
                        <IconLogout />
                        <div className="text-sm">Keluar</div>
                    </Link>
                </div>
                <div className="p-8 flex items-center gap-4">
                    <div className="flex flex-col grow">
                        <div className="font-bold text-slate-700">Subscription</div>
                        <div className="capitalize text-slate-500 mt-2">Paket {UcWords(user.package_name)}</div>
                    </div>
                    <Link to={'/upgrade'} className="text-sm text-primary">
                        {user.package_name.toLowerCase() === "basic" ? "Upgrade" : "Ubah Paket"}
                    </Link>
                </div>
                <div className="p-8 pt-0 flex items-center gap-4">
                    <div className="flex flex-col grow">
                        <div className="font-bold text-slate-700">Perangkat</div>
                        <div className="capitalize text-slate-500 mt-2">{user.devices_count} Perangkat Terhubung</div>
                    </div>
                    <Link to={'/devices'} className="text-sm text-primary">Lihat</Link>
                </div>
                <div className="p-8 pt-0 flex flex-col">
                    <div className="font-bold text-slate-700 mb-1">Newsroom</div>
                    <Link to={'#'} className="mt-1 text-sm text-slate-500">Live Webinar</Link>
                    <Link to={'#'} className="mt-1 text-sm text-slate-500">Blog</Link>
                </div>
                <div className="p-8 pt-0 flex flex-col">
                    <div className="font-bold text-slate-700 mb-1">Connect with Us!</div>
                    <div className="flex items-center gap-2 mt-1">
                        <Link to={'#'} className="text-slate-500"><IconBrandFacebook size={20} /></Link>
                        <Link to={'#'} className="text-slate-500"><IconBrandInstagram size={20} /></Link>
                    </div>
                </div>
            </div>

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
        </>
    )
}

export default Header