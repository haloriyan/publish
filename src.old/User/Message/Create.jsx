import React, { useEffect, useState } from "react";
import Sidebar from "../../Partials/Sidebar";
import Header from "../../Partials/Header";
import axios from "axios";
import config from "../../config";
import { useSidebar } from "../../Providers/SidebarProvider";
import { useNavigate } from "react-router-dom";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const MessageCreate = () => {
    const { isExpanded } = useSidebar(); 
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [fields, setFields] = useState({
        device_id: null,
        device: null,
        group_id: null,
        group: null,
        title: '',
        content: '',
        delay_time: 5,
        image: null,
        delivery_time: 'PROCESSING',
        image: null,
        image_base64: null,
    });
    const user = JSON.parse(window.localStorage.getItem('user_data'));

    useEffect(() => {
        document.title = `Kirim Broadcast - ${config.appName}`;
    }, []);
    
    // Devices
    const [devices, setDevices] = useState([]);
    const [isLoadingDevices, setLoadingDevices] = useState(true);
    useEffect(() => {
        if (isLoadingDevices && user !== null) {
            setLoadingDevices(false);
            axios.post(`${config.baseUrl}/api/user/device`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setDevices(res.devices);
            })
        }
    }, [isLoadingDevices, user]);

    // Groups
    const [groups, setGroups] = useState([]);
    const [isLoadingGroup, setLoadingGroup] = useState(true);
    useEffect(() => {
        if (isLoadingGroup && user !== null) {
            setLoadingGroup(false);
            axios.post(`${config.baseUrl}/api/user/group`, {
                token: user.token,
                with: 'latest_member'
            })
            .then(response => {
                let res = response.data;
                setGroups(res.groups);
            })
        }
    }, [isLoadingGroup, user]);

    const changeFields = (toChanges) => {
        let theFields = {...fields};
        let keys = Object.keys(toChanges);
        keys.map((key, k) => {
            theFields[key] = toChanges[key];
        })
        setFields(theFields);
    }

    const submit = e => {
        let formData = new FormData();
        formData.append('token', user.token);
        formData.append('device_id', fields.device_id);
        formData.append('group_id', fields.group_id);
        formData.append('title', fields.title);
        formData.append('content', fields.content);
        formData.append('delay_time', fields.delay_time);
        formData.append('delivery_time', fields.delivery_time);

        if (fields.image != null) {
            formData.append('image', fields.image);
        }

        axios.post(`${config.baseUrl}/api/broadcast/send`, formData)
        .then(response => {
            let res = response.data;
            navigate('/history');
        })
    }

    return (
        <>
            <Header />
            <Sidebar active="send-message" />
            <div className={`absolute top-20 right-0 ${isExpanded ? 'w-10/12' : 'w-11/12'} mobile:w-full p-4 ps-0 mobile:ps-4`}>
                <div className="flex items-center gap-2 mt-4">
                    <div className="text-slate-500">Kirim Pesan</div>
                    <div className="text-slate-500">/</div>
                    <div className="text-slate-700">Buat Pesan Broadcast</div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className={`h-16 aspect-square rounded-full mt-6 font-bold flex items-center justify-center border border-primary ${step < 1 ? 'text-primary' : 'bg-primary text-white'}`}>
                            1
                        </div>
                        <div className="text-xs text-slate-700">Penerima</div>
                    </div>
                    <div className={`w-2/12 h-1 ${step <= 1 ? "bg-slate-200" : "bg-primary"}`}></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className={`h-16 aspect-square rounded-full mt-6 font-bold flex items-center justify-center border border-primary ${step < 2 ? 'text-primary' : 'bg-primary text-white'}`}>
                            2
                        </div>
                        <div className="text-xs text-slate-700">Konten</div>
                    </div>
                    <div className={`w-2/12 h-1 ${step <= 2 ? "bg-slate-200" : "bg-primary"}`}></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className={`h-16 aspect-square rounded-full mt-6 font-bold flex items-center justify-center border border-primary ${step < 3 ? 'text-primary' : 'bg-primary text-white'}`}>
                            3
                        </div>
                        <div className="text-xs text-slate-700">Pratinjau</div>
                    </div>
                </div>

                {
                    step === 1 &&
                    <StepOne fields={fields} changeFields={changeFields} devices={devices} groups={groups} step={step} setStep={setStep} />
                }
                {
                    step === 2 &&
                    <StepTwo fields={fields} changeFields={changeFields} step={step} setStep={setStep} />
                }
                {
                    step === 3 &&
                    <StepThree fields={fields} changeFields={changeFields} step={step} setStep={setStep} submit={submit} />
                }

                {/* <button onClick={() => setStep(step + 1)}>Next</button> */}

                <div className="desktop:hidden h-24"></div>
            </div>
        </>
    )
}

export default MessageCreate