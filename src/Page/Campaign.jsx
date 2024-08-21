import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../Partials/CTA";
import { IconArrowRight, IconCalendar, IconPlus, IconSpeakerphone } from "@tabler/icons-react";
import config from "../config";
import moment from "moment";

const Campaign = () => {
    const [campaigns] = useState([
        {
            title: 'Promo Internet Merdeka Oxygen.id',
            start_date: '2024-08-17',
            end_date: '2024-08-25',
            cover: '/campaigns/promo-internet-merdeka.png',
            brand: {
                name: "Oxygen.id",
            }
        },
        {
            title: 'Kelas Basic MPASI',
            start_date: '2024-08-15',
            end_date: '2024-09-15',
            cover: '/campaigns/kelas-basic-mpasi.png',
            brand: {
                name: "Tanya Ners",
            }
        },
        {
            title: 'Promo Internet Merdeka Oxygen.id',
            start_date: '2024-08-17',
            end_date: '2024-08-25',
            cover: '/campaigns/promo-internet-merdeka.png',
            brand: {
                name: "Oxygen.id",
            }
        },
        {
            title: 'Kelas Basic MPASI',
            start_date: '2024-08-15',
            end_date: '2024-09-15',
            cover: '/campaigns/kelas-basic-mpasi.png',
            brand: {
                name: "Tanya Ners",
            }
        },
        {
            title: 'Promo Internet Merdeka Oxygen.id',
            start_date: '2024-08-17',
            end_date: '2024-08-25',
            cover: '/campaigns/promo-internet-merdeka.png',
            brand: {
                name: "Oxygen.id",
            }
        },
        {
            title: 'Kelas Basic MPASI',
            start_date: '2024-08-15',
            end_date: '2024-09-15',
            cover: '/campaigns/kelas-basic-mpasi.png',
            brand: {
                name: "Tanya Ners",
            }
        },
        // {
        //     title: '',
        //     start_date: '',
        //     end_date: '',
        //     cover: '',
        //     brand: {
        //         name: "",
        //     }
        // }
    ])
    return (
        <>
            <Header active="campaign" />
            <div className="absolute top-20 left-0 right-0">
                <div className="flex items-center gap-4 bg-white p-8 px-16 mobile:p-4">
                    <IconSpeakerphone color={config.primaryColor} size={28} />
                    <div className="text-slate-700 text-lg font-medium flex grow">Campaign</div>
                    <div className="cursor-pointer text-primary text-sm flex items-center gap-4">
                        <IconPlus />
                        Buat Campaign
                    </div>
                </div>

                <div className="flex flex-row flex-wrap gap-4 p-8 px-16 bg-white">
                    {
                        campaigns.map((camp, c) => (
                            <div key={c} className="flex flex-col grow basis-72 max-w-xs p-4 rounded-lg">
                                <img src={camp.cover} alt={camp.title} className="w-full aspect-square rounded-lg mb-2" />
                                <div className="text-xl text-slate-700 font-bold mb-2">{camp.title}</div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <IconCalendar size={18} />
                                    <div className="text-xs">
                                        {moment(camp.start_date).format('DD MMM')} - {moment(camp.end_date).format('DD MMM Y')}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 mt-1">
                                    <IconSpeakerphone size={18} />
                                    <div className="text-xs">{camp.brand.name}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <CTA />
                <Footer />
            </div>
        </>
    )
}

export default Campaign;