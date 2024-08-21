import React, { useEffect, useState } from "react";
import Sidebar from "../Partials/Sidebar";
import Header from "../Partials/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { MdAdd, MdClose, MdWest } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import { IconCheck, IconEdit, IconPlus } from "@tabler/icons-react";
import InArray from "../lib/InArray";
import { useDebouncedCallback } from "use-debounce";

const Group = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const user = JSON.parse(window.localStorage.getItem('user_data'));

    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState(null);
    const [membersRaw, setMembersRaw] = useState(null);
    const [membersCount, setMembersCount] = useState(0);

    const [isAdding, setAdding] = useState(false);
    const [isAddingProc, setAddingProc] = useState(false);
    const [isRemoving, setRemoving] = useState(false);
    const [isRemovingProc, setRemovingProc] = useState(false);
    const [isChangingName, setChangingName] = useState(false);

    const [groupName, setGroupName] = useState('');

    // FOR ADDING MEMBER NEED
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setSearching] = useState(false);
    const [addToGrupBtn, setAddToGroupBtn] = useState([]);

    useEffect(() => {
        if (isLoading && triggerLoading && user !== null) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/group/${id}`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setGroup(res.group);
                setGroupName(res.group.name);
                setMembersRaw(res.members);
                setMembers(res.members.data);
                setMembersCount(res.members_count);
                setLoading(false);
                setChangingName(false);
            })
        }
    }, [isLoading, triggerLoading, user]);

    useEffect(() => {
        if (isSearching) {
            setSearching(false);
            setSearchResults([]);
            axios.post(`${config.baseUrl}/api/contact`, {
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

    const rem = e => {
        e.preventDefault();
        setRemovingProc(true);
        axios.post(`${config.baseUrl}/api/group/${id}/remove-member`, {
            id: member.id,
        })
        .then(response => {
            let res = response.data;
            setRemoving(false);
            setRemovingProc(false);
            setLoading(true);
            setTriggerLoading(true);
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

    const updateGroupName = e => {
        e.preventDefault();
        axios.post(`${config.baseUrl}/api/group/${id}/change-name`, {
            name: groupName,
        })
        .then(response => {
            setLoading(true);
            setTriggerLoading(true);
        })
    }
    
    return (
        <>
            <Header />
            <Sidebar active="contact" />
            {
                isLoading ? 
                    <div className="absolute top-20 right-0 w-10/12 mobile:w-full p-4 ps-0 mobile:ps-4">
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
                <div className="absolute top-20 right-0 w-10/12 mobile:w-full p-4 ps-0 mobile:ps-4">
                    <div className="bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 mobile:p-4 rounded-lg">
                        <div className="flex items-center gap-8">
                            <div className="cursor-pointer" onClick={() => navigate(-1)}>
                                <MdWest />
                            </div>
                            <div className="flex flex-col grow">
                                {
                                    isChangingName ?
                                    <form className="flex items-center gap-2 group" onSubmit={updateGroupName}>
                                        <input type="text" value={groupName} className="border rounded-lg p-2" onInput={e => setGroupName(e.currentTarget.value)} />
                                    </form>
                                    :
                                    <div className="flex items-center gap-2 group">
                                        <div className="text-slate-700 font-black text-2xl">{group.name}</div>
                                        <div className="hidden group-hover:block cursor-pointer" onClick={() => setChangingName(true)}><IconEdit /></div>
                                    </div>
                                }
                                <div className="text-slate-500 text-sm">{membersCount} kontak</div>
                            </div>
                            <div className="h-12 px-4 rounded-lg bg-primary bg-opacity-25 text-primary text-center text-sm flex gap-4 items-center justify-center cursor-pointer" onClick={() => {
                                setAdding(true);
                                setSearchResults([]);
                            }}>
                                <IconPlus size={16} />
                                <div>Tambahkan Kontak</div>
                            </div>
                        </div>

                        <table className="table w-full mt-8">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="py-4 text-slate-700">Nama</th>
                                    <th className="py-4 text-slate-700">No. WhatsApp</th>
                                    <th className="py-4 text-slate-700">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    members.map((mem, m) => (
                                        <tr key={m}>
                                            <td className="py-4 text-slate-700">{mem?.contact?.name}</td>
                                            <td className="py-4 text-slate-700">+62{mem.contact.whatsapp}</td>
                                            <td className="py-4 text-slate-700">
                                                <button className="h-10 aspect-square rounded-xl flex items-center justify-center bg-gray-200 text-red-500" onClick={() => {
                                                    setMember(mem);
                                                    setRemoving(true);
                                                }}>
                                                    <MdClose />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {
                isRemoving &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setRemoving(false);
                    }
                }}>
                    {
                        isRemovingProc ?
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12 flex flex-col gap-4 items-center justify-center">
                            <ClipLoader 
                                loading={isRemovingProc}
                                color={config.primaryColor}
                            />
                            <div>Menghapus</div>
                        </form>
                        :
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12" onSubmit={rem}>
                            <div className="flex items-center gap-4">
                                <div className="text-xl font-bold text-slate-700 flex grow">Hapus Kontak</div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setRemoving(false)}>
                                    <MdClose />
                                </div>
                            </div>
                            
                            <div className="text-slate-700 mt-4">
                                Yakin ingin menghapus {member.contact.name} dari {group.name}?
                            </div>

                            <div className="border-t pt-4 mt-4 flex items-center justify-end gap-4">
                                <button type="button" className="bg-gray-200 text-slate-700 rounded-lg p-2 px-4" onClick={() => setRemoving(false)}>
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
                isAdding &&
                <div id="overlay" className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-700 backdrop-blur-sm bg-opacity-75 flex items-center justify-center" onClick={e => {
                    if (e.target.getAttribute('id') === "overlay") {
                        setAdding(false);
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
                        <form className="bg-white rounded-lg p-8 w-4/12 mobile:w-10/12">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col grow">
                                    <div className="text-xl font-bold text-slate-700">Tambah Kontak</div>
                                    <div className="text-xs text-slate-500">ke {group.name}</div>
                                </div>
                                <div className="h-12 aspect-square rounded-full border flex items-center justify-center cursor-pointer" onClick={() => setAdding(false)}>
                                    <MdClose />
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

export default Group