import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import { MdWest } from "react-icons/md";
import Checkbox from "../components/Checkbox";
import { InArray } from "../lib";
import ClipLoader from "react-spinners/ClipLoader";

const Sync = () => {
    const { deviceID } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [contactsView, setContactsView] = useState([]);
    const [selectedIDs, setSelectedIDs] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [device, setDevice] = useState(null);

    const [isImporting, setImporting] = useState(false);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/contact/temp`, {
                device_id: deviceID,
            })
            .then(response => {
                let res = response.data;
                let selIds = [...selectedIDs];
                let selItems = [...selectedItems];
                setLoading(false);
                setContacts(res.contacts);
                setContactsView(res.contacts);
                setDevice(res.device);
                res.contacts.map((cont, c) => {
                    selIds.push(cont.id);
                    selItems.push(cont);
                })

                setSelectedIDs(selIds);
                setSelectedItems(selItems);
            })
        }
    }, [isLoading, triggerLoading]);

    const searchContact = (keyword) => {
        return contacts.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    const submit = () => {
        setImporting(true);
        let theItems = [];
        contacts.map((cont, c) => {
            if (InArray(cont.id, selectedIDs)) {
                theItems.push(cont);
            }
        });
        axios.post(`${config.baseUrl}/api/contact/temp/save`, {
            device_id: deviceID,
            items: theItems
        })
        .then(response => {
            let res = response.data;
            navigate('/contact')
        })
    }

    return (
        <>
            <div className="flex items-center gap-8 mobile:gap-4 text-slate-700 fixed p-8 mobile:p-4 z-20 top-0 left-0 right-0 h-40 mobile:h-24 bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                <div className="cursor-pointer text-2xl">
                    <MdWest />
                </div>
                <div className="flex flex-col gap-2 desktop:grow">
                    <div className="text-2xl mobile:text-sm font-bold text-slate-700">Sinkronkan Kontak</div>
                    {
                        (device !== null && window.screen.width > 480) &&
                        <div className="text-sm mobile:text-xs text-slate-500">Device : {device.label} ({device.number})</div>
                    }
                </div>
                <div className="flex flex-col gap-1 desktop:w-5/12 mobile:grow">
                    <div className="desktop:border rounded-lg p-2 mobile:p-0 mobile:border-b w-full">
                        <div className="text-xs text-slate-500">Cari kontak :</div>
                        <input type="text" className="h-12 mobile:h-10 flex grow w-full outline-0" onInput={e => {
                            let q = e.currentTarget.value;
                            let theContacts = searchContact(q);
                            setContactsView(theContacts);
                        }} />
                    </div>
                </div>
                {
                    window.screen.width > 480 &&
                    <button className="bg-primary text-white text-sm font-bold p-2 px-4 rounded-lg" onClick={submit}>
                        Impor Kontak
                    </button>
                }
            </div>
            <div className="absolute top-32 left-0 right-0 p-10 mobile:p-4 flex flex-col gap-4 z-10 bg-white">
                <div className="overflow-x-auto">
                    <table className="table min-w-full">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="py-4 mobile:text-sm text-slate-700">
                                    <Checkbox selected={selectedIDs.length === contacts.length} onSelect={() => {
                                        let ids = [];
                                        let items = [];
                                        if (selectedIDs.length !== contacts.length) {
                                            contacts.map(cont => {
                                                items.push(cont);
                                                ids.push(cont.id);
                                            });
                                        }

                                        setSelectedIDs(ids);
                                        setSelectedItems(items);
                                    }} />
                                </th>
                                <th className="py-4 mobile:text-sm text-slate-700">Nama</th>
                                <th className="py-4 mobile:text-sm text-slate-700">No. WhatsApp</th>
                                <th className="py-4 mobile:text-sm text-slate-700">Tipe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contactsView.map((cont, c) => (
                                    <tr key={c}>
                                        <td className="py-4 text-slate-700">
                                            <Checkbox selected={InArray(cont.id, selectedIDs)} onSelect={() => {
                                                let selIds = [...selectedIDs];
                                                if (InArray(cont.id, selectedIDs)) {
                                                    selIds.splice(selIds.indexOf(cont.id), 1);
                                                } else {
                                                    selIds.push(cont.id);
                                                }
                                                setSelectedIDs(selIds);
                                            }} />
                                        </td>
                                        <td className="py-4 text-slate-700">{cont.name}</td>
                                        <td className="py-4 text-slate-700">{cont.number}</td>
                                        <td className="py-4 text-slate-700">
                                            { cont.is_group ? "Grup" : "" }
                                            { cont.is_contact ? "Kontak" : "" }
                                            { cont.is_business ? "Bisnis" : "" }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className="h-40"></div>
                </div>
            </div>

            {
                window.screen.width <= 480 &&
                <div className="fixed bottom-0 left-0 right-0 flex items-center p-4 bg-white border-t z-20">
                    <div className="flex flex-col grow gap-1">
                        <div className="text-xs text-slate-500">Total Kontak :</div>
                        <div className="text-slate-700 font-bold text-sm">{selectedIDs.length} Kontak</div>
                    </div>
                    <button className="text-sm text-white font-bold bg-primary rounded-lg p-2 px-4" onClick={submit}>
                        Impor
                    </button>
                </div>
            }

            {
                isImporting &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        // setImporting(false)
                    }
                }}>
                    <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                        <ClipLoader 
                            loading={isImporting}
                            color={config.primaryColor}
                        />
                        <div>Menyimpan {selectedIDs.length} kontak</div>
                    </form>
                </div>
            }
        </>
    )
}

export default Sync