import React from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";

const Dashboard = () => {
    const { isExpanded } = useSidebar();

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="dashboard" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                Dashboard
            </div>
        </>
    )
}

export default Dashboard