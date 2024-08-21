import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Partials/SidebarAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import { useSidebar } from "../Providers/SidebarProvider";
import axios from "axios";
import config from "../config";
import { Link, useSearchParams } from "react-router-dom";
import { IconEye, IconSearch, IconX } from "@tabler/icons-react";
import { useDebouncedCallback } from "use-debounce";

const Contact = () => {
    const { isExpanded } = useSidebar();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [contact, setContact] = useState(null);
    const [group, setGroup] = useState(null);
    const [contactCount, setContactCount] = useState(0);
    const [groupCount, setGroupCount] = useState(0);

    const [contactsRaw, setContactsRaw] = useState(null);
    const [contactsPage, setContactsPage] = useState(1);
    const [groupsRaw, setGroupsRaw] = useState(null);
    const [q, setQ] = useState(searchParams.get('q'));
    const [viewing, setViewing] = useState('all');
    const [message, setMessage] = useState({
        status: 200, body: ''
    });

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/admin/contact?page=${contactsPage}`, {
                q, viewing,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setGroupCount(res.groups_count);
                setContactCount(res.contacts_count);

                if (viewing === "group") {
                    setGroupsRaw(res.groups);
                    setGroups(res.groups.data);
                } else {
                    setContactsRaw(res.contacts);
                    setContacts(res.contacts.data);
                }
            })
        }
    }, [isLoading, triggerLoading]);

    const debounceLoad = useDebouncedCallback(() => {
        setContactsPage(1);
        setLoading(true);
        setTriggerLoading(true);
    }, 500)

    return (
        <>
            <HeaderAdmin />
            <SidebarAdmin active="contact" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-2 px-8 rounded-lg flex items-center gap-4">
                    <div className="text-primary">
                        <IconSearch size={24} />
                    </div>
                    <input type="text" value={q} className="flex grow h-12 outline-0" placeholder="Pencarian" onInput={e => {
                        let val = e.currentTarget.value;
                        searchParams.set('q', val);
                        setSearchParams(searchParams);
                        setQ(val);
                        debounceLoad();
                    }} />
                    {
                        (searchParams.get('q')) &&
                        <div className="cursor-pointer text-red-500" onClick={() => {
                            setQ('');
                            searchParams.delete('q');
                            setSearchParams(searchParams);
                            debounceLoad();
                        }}>
                            <IconX />
                        </div>
                    }
                </div>

                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 px-8 rounded-lg mt-12">
                    <div className="flex items-center gap-8 mb-8">
                        <div className={`flex items-center gap-2 cursor-pointer ${viewing === "all" ? "text-primary" : ""}`} onClick={() => {
                            setViewing('all');
                            setLoading(true);
                            setTriggerLoading(true);
                        }}>
                            <div className="text-xl font-bold">Semua Kontak</div>
                            <div className="text-xs text-slate-500">({contactCount})</div>
                        </div>
                        <div className={`flex items-center gap-2 cursor-pointer ${viewing === "group" ? "text-primary" : ""}`} onClick={() => {
                            setViewing('group');
                            setLoading(true);
                            setTriggerLoading(true);
                        }}>
                            <div className="text-xl font-bold">Grup</div>
                            <div className="text-xs text-slate-500">({groupCount})</div>
                        </div>
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
                        viewing === "group" ?
                        <>
                            <table className="table w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-4 text-slate-700">Nama Grup</th>
                                        <th className="py-4 text-slate-700">Jumlah Kontak</th>
                                        <th className="py-4 text-slate-700">Pengguna</th>
                                        <th className="py-4 text-slate-700">Tindakan</th>
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
                                                <td>
                                                    <Link to={`/admin/user/${grou.user.id}/detail`} className="underline">{grou.user.name}</Link>
                                                </td>
                                                <td className="py-4 text-slate-700 flex gap-2">
                                                    {/* <button className="h-10 px-4 rounded-xl flex items-center justify-center bg-gray-200 text-sm text-primary flex gap-2" onClick={() => {
                                                        setGroup(grou);
                                                        // setSearchResults([]);
                                                    }}>
                                                        <IconPlus size={18} />
                                                        Tambah Kontak ke Grup
                                                    </button>
                                                    <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-red-500" onClick={() => {
                                                        setGroup(grou);
                                                        setDeletingGroup(true);
                                                    }}>
                                                        <IconTrash size={18} />
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>
                        :
                        <>
                            <table className="table w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-4 text-slate-700">Nama</th>
                                        <th className="py-4 text-slate-700">No. WhatsApp</th>
                                        <th className="py-4 text-slate-700">Email</th>
                                        <th className="py-4 text-slate-700">Grup Tergabung</th>
                                        <th className="py-4 text-slate-700">Pengguna</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contacts.map((cont, c) => (
                                            <tr>
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
                                                <td className="py-4 text-slate-700 flex gap-4">
                                                    <Link to={`/admin/user/${cont.user.id}/detail`} className="underline">{cont.user.name}</Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <div className="flex items-center gap-4 mt-4">
                                {
                                    contactsRaw?.prev_page_url !== null &&
                                    <button className="w-3/12 h-12 bg-primary text-primary rounded-lg font-bold bg-opacity-20" onClick={() => {
                                        setContactsPage(contactsPage - 1);
                                        setLoading(true);
                                        setTriggerLoading(true);
                                    }}>Sebelumnya</button>
                                }
                                <div className="flex grow"></div>
                                {
                                    contactsRaw?.next_page_url !== null &&
                                    <button className="w-3/12 h-12 bg-primary text-white rounded-lg font-bold" onClick={() => {
                                        setContactsPage(contactsPage + 1);
                                        setLoading(true);
                                        setTriggerLoading(true);
                                    }}>Berikutnya</button>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Contact