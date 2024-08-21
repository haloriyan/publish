import React from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";

const Dashboard = () => {
    return (
        <>
            <Header />
            <Sidebar active="dashboard" />
            <div className="absolute top-20 right-0 w-9/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-4 rounded-lg">
                    sdsd
                </div>
            </div>
        </>
    )
}

export default Dashboard