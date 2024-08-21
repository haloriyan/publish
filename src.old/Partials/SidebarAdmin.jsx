import React, { useState } from "react";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import AppIcon from "../components/AppIcon";
import { Link } from "react-router-dom";
import { IconHome, IconSend, IconMessageDots, IconUserSquare, IconShoppingCart, IconShoppingBag, IconCalendar, IconUser } from "@tabler/icons-react";
import { useSidebar } from "../Providers/SidebarProvider";

const SidebarAdmin = ({active = 'send'}) => {
    const { isExpanded, setExpanded } = useSidebar();
    const isMobile = window.screen.width <= 480;

    return (
        <div className={`fixed desktop:top-0 left-0 bottom-0 ${isExpanded ? 'w-2/12' : 'w-1/12'} mobile:w-full p-4 flex flex-col`}>
            <div className="bg-primary shadow-[0px_16px_32px_rgba(0,0,0,0.05)] text-white rounded-lg mobile:rounded-full p-4 mobile:p-2 desktop:pb-8 flex flex-col grow mobile:flex-row mobile:items-center mobile:gap-2 mobile:justify-center">
                {
                    !isMobile &&
                    <div className="flex items-center gap-4 p-2 mb-4">
                        {
                            isExpanded &&
                            <div className="flex grow">
                                <AppIcon size={'40px'} />
                            </div>
                        }
                        <div className="cursor-pointer flex items-center justify-center aspect-square" style={{height: '40px'}} onClick={() => setExpanded(!isExpanded)}>
                            {
                                isExpanded ? <MdOutlineSkipPrevious /> : <MdOutlineSkipNext />
                            }
                        </div>
                    </div>
                }

                <Link to={'/admin/dashboard'} className={`flex items-center gap-4 p-4 rounded-2xl mobile:rounded-full ${active === "dashboard" ? "bg-white bg-opacity-25" : ""}`}>
                    <IconHome size={24} />
                    { isExpanded && <div className="font-medium text-sm mobile:hidden">Dasbor</div> }
                </Link>
                <Link to={'/admin/history'} className={`flex items-center gap-4 p-4 rounded-2xl mobile:rounded-full ${active === "message" ? "bg-white bg-opacity-25" : ""}`}>
                    <IconMessageDots size={24} />
                    { isExpanded && <div className="font-medium text-sm mobile:hidden">Riwayat Pesan</div> }
                </Link>
                <Link to={'/admin/user'} className={`flex items-center gap-4 p-4 rounded-2xl mobile:rounded-full ${active === "user" ? "bg-white bg-opacity-25" : ""}`}>
                    <IconUser size={24} />
                    { isExpanded && <div className="font-medium text-sm mobile:hidden">Pengguna</div> }
                </Link>
                <Link to={'/admin/contact'} className={`flex items-center gap-4 p-4 rounded-2xl mobile:rounded-full ${active === "contact" ? "bg-white bg-opacity-25" : ""}`}>
                    <IconUserSquare size={24} />
                    { isExpanded && <div className="font-medium text-sm mobile:hidden">Kontak</div> }
                </Link>
                <Link to={'/admin/purchase'} className={`flex items-center gap-4 p-4 rounded-2xl mobile:rounded-full ${active === "purchase" ? "bg-white bg-opacity-25" : ""}`}>
                    <IconShoppingBag size={24} />
                    { isExpanded && <div className="text-sm font-medium mobile:hidden">Pembelian</div> }
                </Link>

                <div className="h-10"></div>
                <Link to={'/admin/admin'} className={`flex items-center gap-4 p-4 rounded-2xl mobile:rounded-full ${active === "admin" ? "bg-white bg-opacity-25" : ""}`}>
                    <IconUser size={24} />
                    { isExpanded && <div className="font-medium text-sm mobile:hidden">Admin</div> }
                </Link>
                
            </div>
        </div>
    )
}

export default SidebarAdmin