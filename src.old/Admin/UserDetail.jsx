import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { MdWest } from "react-icons/md";
import TablePlaceholder from "../components/TableLoader";
import { useDebouncedCallback } from "use-debounce";

const UserDetail = () => {
    const { isExpanded } = useSidebar();
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [isLoadingDevice, setLoadingDevice] = useState(false);
    const [triggerLoadingDevice, setTriggerLoadingDevice] = useState(false);
    const [isLoadingContact, setLoadingContact] = useState(false);
    const [triggerLoadingContact, setTriggerLoadingContact] = useState(false);
    const [isLoadingGroup, setLoadingGroup] = useState(false);
    const [triggerLoadingGroup, setTriggerLoadingGroup] = useState(false);

    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [devices, setDevices] = useState([]);
    const [contactPage, setContactPage] = useState(1);
    const [devicePage, setDevicePage] = useState(1);
    const [groupPage, setGroupPage] = useState(1);
    const [groupsRaw, setGroupsRaw] = useState(null);
    const [contactsRaw, setContactsRaw] = useState(null);
    const [devicesRaw, setDevicesRaw] = useState(null);
    const [viewing, setViewing] = useState('contact');
    const [q, setQ] = useState(searchParams.get('q'));

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/admin/user/${id}`)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setUser(res.user);
                setLoadingContact(true);
                setTriggerLoadingContact(true);
            })
        }
    }, [isLoading, triggerLoading]);

    useEffect(() => {
        if (isLoadingContact && triggerLoadingContact) {
            setTriggerLoadingContact(false);
            axios.post(`${config.baseUrl}/api/admin/user/${id}/contact?page=${contactPage}`, { q })
            .then(response => {
                let res = response.data;
                setLoadingContact(false);
                setContactsRaw(res.contacts);
                setContacts(res.contacts.data);
            })
        }
    }, [isLoadingContact, triggerLoadingContact]);
    useEffect(() => {
        if (isLoadingGroup && triggerLoadingGroup) {
            setTriggerLoadingGroup(false);
            axios.post(`${config.baseUrl}/api/admin/user/${id}/group?page=${groupPage}`)
            .then(response => {
                let res = response.data;
                setLoadingGroup(false);
                setGroupsRaw(res.groups);
                setGroups(res.groups.data);
            })
        }
    }, [isLoadingGroup, triggerLoadingGroup]);
    useEffect(() => {
        if (isLoadingDevice && triggerLoadingDevice) {
            setTriggerLoadingDevice(false);
            axios.post(`${config.baseUrl}/api/admin/user/${id}/device?page=${devicePage}`)
            .then(response => {
                let res = response.data;
                setLoadingDevice(false);
                setDevicesRaw(res.devices);
                console.log(res.devices);
                setDevices(res.devices.data);
            })
        }
    }, [isLoadingDevice, triggerLoadingDevice]);

    const debounceContact = useDebouncedCallback(() => {
        setContactPage(1);
        setContacts([]);
        setLoadingContact(true);
        setTriggerLoadingContact(true);
    }, 900)

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="user" />
            {
                isLoading ?
                <div className="absolute top-20 right-0 w-9/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                    <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 mobile:p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col grow">
                                <div className="bg-slate-200 h-8 w-6/12"></div>
                                <div className="bg-slate-200 h-4 w-2/12 mt-2"></div>
                            </div>
                            <div className="bg-slate-200 h-10 rounded-lg w-2/12"></div>
                            <div className="bg-slate-200 h-10 rounded-lg w-2/12"></div>
                        </div>

                        <div className="w-full h-12 bg-slate-200 mt-8"></div>
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
                    </div>
                </div>
                :
                <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                    <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-4 px-8 rounded-lg flex items-center gap-4">
                        <div className="flex items-center gap-8">
                            <div className="cursor-pointer" onClick={() => navigate('/admin/user')}>
                                <MdWest />
                            </div>
                            <div className="flex flex-col group">
                                <div className="text-slate-700 font-black text-2xl">{user.name}</div>
                                <div className="text-slate-500 text-sm">{user.email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 px-8 rounded-lg mt-12">
                        <div className="flex items-center gap-8 mb-8">
                            <div className={`flex items-center gap-2 cursor-pointer ${viewing === "contact" ? "text-primary" : ""}`} onClick={() => {
                                setViewing('contact');
                                setLoadingContact(true);
                                setTriggerLoadingContact(true);
                                setContactPage(1);
                                setContacts([]);
                            }}>
                                <div className="text-xl font-bold">Kontak</div>
                                <div className="text-xs text-slate-500">({user.contacts_count})</div>
                            </div>
                            <div className={`flex items-center gap-2 cursor-pointer ${viewing === "group" ? "text-primary" : ""}`} onClick={() => {
                                setViewing('group');
                                setLoadingGroup(true);
                                setTriggerLoadingGroup(true);
                                setGroupPage(1);
                                setGroups([]);
                            }}>
                                <div className="text-xl font-bold">Grup</div>
                                <div className="text-xs text-slate-500">({user.groups_count})</div>
                            </div>
                            <div className={`flex items-center gap-2 cursor-pointer ${viewing === "device" ? "text-primary" : ""}`} onClick={() => {
                                setViewing('device');
                                setLoadingDevice(true);
                                setTriggerLoadingDevice(true);
                                setDevicePage(1);
                                setDevices([]);
                            }}>
                                <div className="text-xl font-bold">Perangkat</div>
                                <div className="text-xs text-slate-500">({user.devices_count})</div>
                            </div>
                            <div className="flex grow"></div>
                            {
                                viewing === "contact" &&
                                <div className="border rounded-lg p-2 w-4/12">
                                    <div className="text-xs text-slate-500">Cari nama kontak</div>
                                    <input type="text" className="flex grow w-full h-8 outline-0" onInput={e => {
                                        let val = e.currentTarget.value;
                                        searchParams.set('q', val);
                                        setSearchParams(searchParams);
                                        setQ(val);
                                        debounceContact();
                                    }} />
                                </div>
                            }
                        </div>

                        {
                            viewing === "contact" &&
                            <>
                                {
                                    isLoadingContact ?
                                    <TablePlaceholder />
                                    :
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="border-b text-left">
                                                <th className="py-4 text-slate-700">Nama</th>
                                                <th className="py-4 text-slate-700">No. WhatsApp</th>
                                                <th className="py-4 text-slate-700">Email</th>
                                                <th className="py-4 text-slate-700">Grup Tergabung</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                contacts.map((cont, c) => (
                                                    <tr key={c}>
                                                        <td className="py-4 text-slate-700">{cont.name}</td>
                                                        <td className="py-4 text-slate-700">+62{cont.whatsapp}</td>
                                                        <td className="py-4 text-slate-700">{cont.email === null ? "-" : cont.email}</td>
                                                        <td className="py-4 text-slate-700">
                                                            {
                                                                cont.groups_joined.length === 0 ?
                                                                "-"
                                                                :
                                                                <div className="flex items-center gap-2">
                                                                    <Link to={`/group/${cont.groups_joined[0].id}`} className="text-xs p-1 px-2 rounded" style={{
                                                                        backgroundColor: `${cont.groups_joined[0].color}20`,
                                                                        color: cont.groups_joined[0].color,
                                                                    }}>
                                                                        {cont.groups_joined[0].name}
                                                                    </Link>
                                                                    {
                                                                        cont.groups_joined[1] &&
                                                                        <Link to={`/group/${cont.groups_joined[1].id}`} className="text-xs p-1 px-2 rounded" style={{
                                                                            backgroundColor: `${cont.groups_joined[1].color}20`,
                                                                            color: cont.groups_joined[1].color,
                                                                        }}>
                                                                            {cont.groups_joined[1].name}
                                                                        </Link>
                                                                    }
                                                                    {
                                                                        cont.groups_joined.length > 2 &&
                                                                        <Link to={`/group/`} className="text-xs p-1 px-2 rounded bg-slate-100 text-slate-600">
                                                                            +{cont.groups_joined.length - 2}
                                                                        </Link>
                                                                    }
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                }
                                <div className="flex items-center gap-4 mt-4">
                                    {
                                        contactsRaw?.prev_page_url !== null &&
                                        <button className="w-3/12 h-12 bg-primary text-primary rounded-lg font-bold bg-opacity-20" onClick={() => {
                                            setContactPage(contactPage - 1);
                                            setLoadingContact(true);
                                            setTriggerLoadingContact(true);
                                        }}>Sebelumnya</button>
                                    }
                                    <div className="flex grow"></div>
                                    {
                                        contactsRaw?.next_page_url !== null &&
                                        <button className="w-3/12 h-12 bg-primary text-white rounded-lg font-bold" onClick={() => {
                                            setContactPage(contactPage + 1);
                                            setLoadingContact(true);
                                            setTriggerLoadingContact(true);
                                        }}>Berikutnya</button>
                                    }
                                </div>
                            </>
                        }
                        {
                            viewing === "group" &&
                            <>
                                {
                                    isLoadingGroup ?
                                        <TablePlaceholder />
                                    :
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="border-b text-left">
                                                <th className="py-4 text-slate-700">Nama Grup</th>
                                                <th className="py-4 text-slate-700">Jumlah Kontak</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                groups.map((grou, g) => (
                                                    <tr key={g}>
                                                        <td className="py-4 text-slate-700">
                                                            <div className="flex gap-2 items-center">
                                                                <div className={`h-2 aspect-square rounded-full`} style={{
                                                                    backgroundColor: grou.color,
                                                                }}></div>
                                                                <Link to={`/group/${grou.id}`} className="underline">{grou.name}</Link>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-slate-700">{grou.members_id.length}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                }
                            </>
                        }
                        {
                            viewing === "device" &&
                            <>
                                {
                                    isLoadingDevice ?
                                    <TablePlaceholder />
                                    :
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="border-b text-left">
                                                <th className="py-4 text-slate-700">Client ID</th>
                                                <th className="py-4 text-slate-700">Label</th>
                                                <th className="py-4 text-slate-700">No. WhatsApp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                devices.map((dev, d) => (
                                                    <tr key={d}>
                                                        <td className="py-4 text-slate-700">{dev.client_id}</td>
                                                        <td className="py-4 text-slate-700">{dev.label}</td>
                                                        <td className="py-4 text-slate-700">{dev.number}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                }
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default UserDetail