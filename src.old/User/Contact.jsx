import React, { useEffect, useState, CSSProperties } from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import axios from "axios";
import config from "../config";
import { IconCheck, IconEdit, IconEye, IconFileSpreadsheet, IconPlus, IconSearch, IconShare2, IconTrash, IconX } from "@tabler/icons-react";
import { Link, useSearchParams } from "react-router-dom";
import { BiX } from "react-icons/bi";
import ClipLoader from "react-spinners/ClipLoader";
import { useDebouncedCallback } from "use-debounce";
import InArray from "../lib/InArray";
import { useSidebar } from "../Providers/SidebarProvider";

const Contact = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    const { isExpanded } = useSidebar();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [contact, setContact] = useState(null);
    const [group, setGroup] = useState(null);
    const [contactCount, setContactCount] = useState(0);
    const [groupCount, setGroupCount] = useState(0);
    const isMobile = window.screen.width <= 480;
    
    const [contactsRaw, setContactsRaw] = useState(null);
    const [contactsPage, setContactsPage] = useState(1);
    const [groupsRaw, setGroupsRaw] = useState(null);
    const [q, setQ] = useState(searchParams.get('q'));
    const [viewing, setViewing] = useState('all');
    const [message, setMessage] = useState({
        status: 200, body: ''
    });

    const [isAdding, setAdding] = useState(false);
    const [isAddingProc, setAddingProc] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isDeletingProc, setDeletingProc] = useState(false);
    const [isDeletingGroup, setDeletingGroup] = useState(false);
    const [isDeletingGroupProc, setDeletingGroupProc] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isEditingProc, setEditingProc] = useState(false);
    const [isImporting, setImporting] = useState(false);
    const [isImportingProc, setImportingProc] = useState(false);
    const [isDetailing, setDetailing] = useState(false);

    const [isAddingGroup, setAddingGroup] = useState(false);
    const [isAddingGroupProc, setAddingGroupProc] = useState(false);
    const [isAddingMember, setAddingMember] = useState(false);
    const [isAddingMemberProc, setAddingMemberProc] = useState(false);

    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [importFile, setImportFile] = useState(null);

    const [groupName, setGroupName] = useState('');
    const [groupColor, setGroupColor] = useState('#198754');

    // FOR ADDING MEMBER NEED
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setSearching] = useState(false);
    const [addToGrupBtn, setAddToGroupBtn] = useState([]);

    useEffect(() => {
        if (isSearching) {
            setSearching(false);
            setSearchResults([]);
            axios.post(`${config.baseUrl}/api/contact?page=${contactsPage}`, {
                token: user.token, 
                q: search,
                viewing: 'all',
            })
            .then(response => {
                let res = response.data;
                setSearchResults(res.contacts.data)
            })
        }
    }, [isSearching]);

    const debounce = useDebouncedCallback(() => {
        setSearching(true);
    }, 1000);
    const debounceLoad = useDebouncedCallback(() => {
        setContactsPage(1);
        setLoading(true);
        setTriggerLoading(true);
    }, 500)
    
    useEffect(() => {
        if (isLoading && triggerLoading && user !== null) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/contact?page=${contactsPage}`, {
                token: user.token,
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
    }, [user, isLoading, triggerLoading]);

    useEffect(() => {
        if (message.body !== "") {
            let to = setTimeout(() => {
                setMessage({
                    status: 200, body: ''
                });
            }, 2500);
            return () => clearTimeout(to);
        }
    }, [message]);

    useEffect(() => {
        document.title = `Kontak - ${config.appName}`;
    }, []);

    const resetForm = () => {
        if (viewing === "group") {
            setGroupName('');
            setGroupColor('#198754');
        } else {
            setName('');
            setWhatsapp('');
            setEmail('');
        }
        setLoading(true);
        setTriggerLoading(true);
    }
    const submitGroup = e => {
        e.preventDefault();
        setAddingGroupProc(true);
        axios.post(`${config.baseUrl}/api/group/store`, {
            token: user.token,
            name: groupName,
            color: groupColor,
        })
        .then(response => {
            resetForm();
            setAddingGroupProc(false);
            setAddingGroup(false);
        })
    }
    const submit = e => {
        setAddingProc(true);
        e.preventDefault();
        axios.post(`${config.baseUrl}/api/contact/store`, {
            token: user.token,
            name, whatsapp, email,
        })
        .then(response => {
            setAddingProc(false);
            setAdding(false);
            resetForm();
        })
    }
    const del = (e) => {
        e.preventDefault();
        setDeletingProc(true);
        axios.post(`${config.baseUrl}/api/contact/delete`, {
            token: user.token,
            id: contact.id,
        })
        .then(response => {
            resetForm();
            setDeleting(false);
            setDeletingProc(false);
        })
    }
    const delGroup = (e) => {
        e.preventDefault();
        setDeletingGroupProc(true);
        axios.post(`${config.baseUrl}/api/group/delete`, {
            token: user.token,
            id: group.id,
        })
        .then(response => {
            resetForm();
            setDeletingGroup(false);
            setDeletingGroupProc(false);
        })
    }
    const update = e => {
        e.preventDefault();
        setEditingProc(true);
        axios.post(`${config.baseUrl}/api/contact/update`, {
            token: user.token,
            id: contact.id,
            name, whatsapp, email,
        })
        .then(response => {
            let res = response.data;
            setEditingProc(false);
            setEditing(false);
            resetForm();
        })
    }
    const addToGroup = (contactID, groupID, btn) => {
        btn.classList.add('bg-primary', 'text-white');
        setAddToGroupBtn((prevBtn) => [...prevBtn, contactID]);
        axios.post(`${config.baseUrl}/api/group/${groupID}/add-member`, {
            token: user.token,
            group_id: groupID,
            contact_id: contactID,
        })
        .then(response => {
            setLoading(true);
            setTriggerLoading(true);
        })
    }

    const doImport = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('berkas', importFile.files[0]);
        setImportingProc(true);

        axios.post(`${config.baseUrl}/api/contact/import`, formData)
        .then(response => {
            let res = response.data;
            setLoading(true);
            setTriggerLoading(true);
            setContactsPage(1);
            setImporting(false);
            setImportingProc(false);
            setImportFile(null);
        })
    }

    return (
        <>
            <Header title="Kontak" />
            <Sidebar active="contact" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-2 px-8 rounded-lg flex items-center gap-4 mobile:gap-2">
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
                    <button className="bg-gray-100 p-2 px-4 rounded-lg flex gap-2 items-center text-sm text-slate-500" onClick={() => {
                        setImporting(true);
                    }}>
                        <div className="rotate-180"><IconShare2 size={isMobile ? 14 : 18} /></div>
                        <div className="mobile:hidden">Impor</div>
                    </button>
                    <button className="bg-green-100 text-green-500 p-2 px-4 rounded-lg flex gap-2 items-center text-sm" onClick={() => {
                        setAdding(true);
                        setName('');
                        setWhatsapp('');
                        setEmail('');
                    }}>
                        <IconPlus size={isMobile ? 14 : 18} />
                        <div className="mobile:hidden">Tambahkan Kontak</div>
                    </button>
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
                        <div className="flex grow"></div>
                        {
                            viewing === "group" &&
                            <button className="bg-primary text-white p-2 px-4 rounded-lg flex gap-2 items-center text-sm" onClick={() => setAddingGroup(true)}>
                                <IconPlus />
                                <div className="mobile:hidden">Grup Baru</div>
                            </button>
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
                        viewing === "group" ?
                        <div className="overflow-x-auto">
                            <table className="table min-w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-4 mobile:text-sm text-slate-700">Nama Grup</th>
                                        <th className="py-4 mobile:text-sm text-slate-700">Jumlah Kontak</th>
                                        <th className="py-4 mobile:text-sm text-slate-700">Tindakan</th>
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
                                                <td className="py-4 text-slate-700 flex gap-2">
                                                    <button className="h-10 px-4 rounded-xl flex items-center justify-center bg-gray-200 text-sm text-primary flex gap-2" onClick={() => {
                                                        setAddingMember(true);
                                                        setGroup(grou);
                                                        setSearchResults([]);
                                                        setAddToGroupBtn([]);
                                                    }}>
                                                        <IconPlus size={18} />
                                                        <div className="mobile:hidden">Tambah Kontak ke Grup</div>
                                                        <div className="desktop:hidden">Kontak</div>
                                                    </button>
                                                    <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-red-500" onClick={() => {
                                                        setGroup(grou);
                                                        setDeletingGroup(true);
                                                    }}>
                                                        <IconTrash size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="overflow-x-auto">
                            <table className="table min-w-full">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-4 mobile:text-sm text-slate-700">Nama</th>
                                        <th className="py-4 mobile:text-sm text-slate-700">No. WhatsApp</th>
                                        <th className="py-4 mobile:text-sm text-slate-700">Email</th>
                                        <th className="py-4 mobile:text-sm text-slate-700">Grup Tergabung</th>
                                        <th className="py-4 mobile:text-sm text-slate-700">Tindakan</th>
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
                                                    <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-primary" onClick={() => {
                                                        setContact(cont);
                                                        setDetailing(true);
                                                    }}>
                                                        <IconEye size={18} />
                                                    </button>
                                                    <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-slate-500" onClick={() => {
                                                        setContact(cont);
                                                        setName(cont.name);
                                                        setEmail(cont.email);
                                                        setWhatsapp(cont.whatsapp);
                                                        setEditing(true);
                                                    }}>
                                                        <IconEdit size={18} />
                                                    </button>
                                                    <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-red-500" onClick={() => {
                                                        setContact(cont);
                                                        setDeleting(true);
                                                    }}>
                                                        <IconTrash size={18} />
                                                    </button>
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
                        </div>
                    }
                </div>
            </div>

            {
                isDeletingGroup &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setDeletingGroup(false);
                    }
                }}>
                    {
                        isDeletingGroupProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isDeletingGroupProc}
                                color={config.primaryColor}
                            />
                            <div>Menghapus</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={delGroup}>
                            <div className="flex items-center gap-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Hapus Grup</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setDeletingGroup(false)}>
                                    <BiX />
                                </div>
                            </div>
                            <div>Yakin ingin menghapus grup {group.name}?</div>
                            <div className="border-t pt-4 mt-4 flex items-center justify-end gap-4">
                                <button type="button" className="bg-gray-200 text-slate-700 rounded-lg p-2 px-4" onClick={() => setDeletingGroup(false)}>
                                    Batal
                                </button>
                                <button className="bg-red-500 text-white rounded-lg p-2 px-4">
                                    Hapus
                                </button>
                            </div>
                        </form>
                    }
                </div>
            }

            {
                isDeleting &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setDeleting(false);
                    }
                }}>
                    {
                        isDeletingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isDeletingProc}
                                color={config.primaryColor}
                            />
                            <div>Menghapus</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={del}>
                            <div className="flex items-center gap-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Hapus Kontak</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setDeleting(false)}>
                                    <BiX />
                                </div>
                            </div>
                            <div className="text-slate-700">
                                Yakin ingin menghapus {contact.name}?
                            </div>
                            <div className="border-t pt-4 mt-4 flex items-center justify-end gap-4">
                                <button type="button" className="bg-gray-200 text-slate-700 rounded-lg p-2 px-4" onClick={() => setDeleting(false)}>
                                    Batal
                                </button>
                                <button className="bg-red-500 text-white rounded-lg p-2 px-4">
                                    Hapus
                                </button>
                            </div>
                        </form>
                    }
                </div>
            }
            {
                isImporting &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setImporting(false);
                    }
                }}>
                    {
                        isImportingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isImportingProc}
                                color={config.primaryColor}
                            />
                            <div>Mengimpor Kontak...</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={doImport}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Impor Kontak</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setImporting(false)}>
                                    <BiX />
                                </div>
                            </div>
                            {
                                importFile === null ?
                                <>
                                    <div className="relative w-full aspect-video">
                                        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl flex flex-col gap-2 items-center justify-center border">
                                            <IconFileSpreadsheet size={32} />
                                            <div className="text-sm text-slate-700">Pilih Spreadsheet</div>
                                        </div>
                                        <input type="file" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer" style={{opacity: 0.01}} onChange={e => {
                                            setImportFile(e.currentTarget);
                                        }} />
                                    </div>
                                    <div className="text-slate-500 text-sm mt-2">
                                        Download <a href="/templates/Contacts.xlsx" className="text-primary">Template Spreadsheet</a> untuk mengimpor kontak
                                    </div>
                                </>
                                :
                                <>
                                    <div className="relative w-full aspect-video">
                                        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl flex flex-col gap-2 items-center justify-center border">
                                            <IconFileSpreadsheet size={32} />
                                            <div className="text-sm text-slate-700">{importFile.files[0].name}</div>
                                        </div>
                                        <input type="file" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer" style={{opacity: 0.01}} onChange={e => {
                                            setImportFile(e.currentTarget);
                                        }} />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <div className="text-sm text-red-500 cursor-pointer" onClick={() => setImportFile(null)}>
                                            Hapus File
                                        </div>
                                    </div>
                                </>
                            }

                            <button className="w-full h-12 bg-primary rounded-lg text-white mt-4">
                                Upload
                            </button>
                        </form>
                    }
                </div>
            }
            {
                isAdding &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setAdding(false)
                    }
                }}>
                    {
                        isAddingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isAddingProc}
                                color={config.primaryColor}
                            />
                            <div>Menambahkan</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={submit}>
                            <div className="flex items-center gap-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Tambahkan Kontak</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setAdding(false)}>
                                    <BiX />
                                </div>
                            </div>

                            <div className="text-sm text-slate-500 mt-4">Nama :</div>
                            <input type="text" className="h-12 w-full border-b outline-0" value={name} onInput={e => setName(e.currentTarget.value)} />
                            <div className="text-sm text-slate-500 mt-4">Nomor WhatsApp :</div>
                            <div className="flex border-b items-center">
                                <div>+62</div>
                                <input type="text" className="h-12 flex grow outline-0" value={whatsapp} onInput={e => setWhatsapp(e.currentTarget.value)} />
                            </div>
                            <div className="text-sm text-slate-500 mt-4">Email :</div>
                            <input type="text" className="h-12 w-full border-b outline-0" value={email} onInput={e => setEmail(e.currentTarget.value)} />

                            <button className="bg-primary text-white h-12 w-full mt-4 rounded-lg">
                                Tambahkan
                            </button>
                        </form>
                    }
                </div>
            }
            {
                isEditing &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setEditing(false)
                    }
                }}>
                    {
                        isEditingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isAddingProc}
                                color={config.primaryColor}
                            />
                            <div>Mengubah</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={update}>
                            <div className="flex items-center gap-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Ubah Kontak</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setEditing(false)}>
                                    <BiX />
                                </div>
                            </div>

                            <div className="text-sm text-slate-500 mt-4">Nama :</div>
                            <input type="text" className="h-12 w-full border-b outline-0" value={name} onInput={e => setName(e.currentTarget.value)} />
                            <div className="text-sm text-slate-500 mt-4">Nomor WhatsApp :</div>
                            <div className="flex border-b items-center">
                                <div>+62</div>
                                <input type="text" className="h-12 flex grow outline-0" value={whatsapp} onInput={e => setWhatsapp(e.currentTarget.value)} />
                            </div>
                            <div className="text-sm text-slate-500 mt-4">Email :</div>
                            <input type="text" className="h-12 w-full border-b outline-0" value={email} onInput={e => setEmail(e.currentTarget.value)} />

                            <button className="bg-primary text-white h-12 w-full mt-4 rounded-lg">
                                Tambahkan
                            </button>
                        </form>
                    }
                </div>
            }

            {
                isAddingGroup &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setAddingGroup(false);
                    }
                }}>
                    {
                        isAddingGroupProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isAddingProc}
                                color={config.primaryColor}
                            />
                            <div>Menambahkan</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={submitGroup}>
                            <div className="flex items-center gap-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Buat Grup</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setAddingGroup(false)}>
                                    <BiX />
                                </div>
                            </div>
                            <div className="text-sm text-slate-500 mt-4">Nama Grup :</div>
                            <input type="text" className="h-12 w-full border-b outline-0" value={groupName} onInput={e => setGroupName(e.currentTarget.value)} />
                            <div className="flex items-center gap-4 mt-4">
                                <div className="text-slate-500 text-sm flex grow">Warna Aksen :</div>
                                <input type="color" value={groupColor} className="h-12 aspect-square rounded-full" onChange={e => setGroupColor(e.currentTarget.value)} />
                            </div>

                            <button className="bg-primary text-white h-12 w-full mt-4 rounded-lg">
                                Tambahkan
                            </button>
                        </form>
                    }
                </div>
            }
            {
                isDetailing &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setDetailing(false);
                    }
                }}>
                    <div className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12">
                        <div className="flex items-center gap-4">
                            <div className="text-xl font-bold text-slate-700 flex grow">Detail Kontak</div>
                            <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setDetailing(false)}>
                                <BiX />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="flex items-center gap-4">
                                <div className="text-slate-500 text-sm flex grow">Nama</div>
                                <div className="text-slate-700 font-bold">{contact.name}</div>
                            </div>
                            <div className="flex items-center gap-4 border-t pt-4">
                                <div className="text-slate-500 text-sm flex grow">Whatsapp</div>
                                <div className="text-slate-700 font-bold">{contact.whatsapp}</div>
                            </div>
                            <div className="flex items-center gap-4 border-t pt-4">
                                <div className="text-slate-500 text-sm flex grow">Email</div>
                                <div className="text-slate-700 font-bold">{contact.email === null ? '-' : contact.email}</div>
                            </div>
                            <div className="border-t pt-4">
                                <div className="text-slate-500 text-sm flex grow">Grup</div>
                                <div className="flex items-center gap-2 mt-2">
                                    {
                                        contact.groups_joined.map((gr, g) => (
                                            <Link to={`/group/${gr.id}`} key={g} className="rounded p-1 px-2 text-xs" style={{
                                                backgroundColor: `${gr.color}20`,
                                                color: gr.color,
                                            }}>
                                                {gr.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isAddingMember &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setAddingMember(false);
                    }
                }}>
                    {
                        isAddingMemberProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isAddingProc}
                                color={config.primaryColor}
                            />
                            <div>Menambahkan</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col grow">
                                    <div className="text-xl font-bold text-slate-700">Tambah Kontak</div>
                                    <div className="text-xs text-slate-500">ke {group.name}</div>
                                </div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setAddingMember(false)}>
                                    <BiX />
                                </div>
                            </div>
                            
                            <div className="border rounded-lg p-2 mt-4">
                                <div className="text-xs text-slate-500">Cari nama kontak</div>
                                <input type="text" className="flex grow w-full h-8 outline-0" onInput={e => {
                                    setSearch(e.currentTarget.value);
                                    debounce();
                                }} />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                {
                                    searchResults.map((res, r) => (
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col grow">
                                                <div className="text-slate-700">{res.name}</div>
                                                <div className="text-slate-500 text-xs">+62{res.whatsapp}</div>
                                            </div>
                                            
                                            <button key={r} type="button" className={`px-4 py-2 rounded border border-primary text-primary text-xs flex items-center gap-2 hover:bg-primary hover:text-white ${InArray(res.id, group?.members_id) ? "bg-primary text-white" : ""}`} onClick={e => {
                                                if (!InArray(res.id, group?.members_id)) {
                                                    addToGroup(res.id, group.id, e.currentTarget)
                                                }
                                            }}>
                                                { (addToGrupBtn.includes(res.id) || InArray(res.id, group?.members_id)) ? (
                                                    <>
                                                        <IconCheck /> <div>Ditambahkan</div>
                                                    </>
                                                ) :
                                                    'Tambahkan'
                                                }
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </form>
                    }
                </div>
            }
        </>
    )
}

export default Contact