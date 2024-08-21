import React, { useEffect, useState } from "react";
import Industries from "../assets/industries";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import OnboardingImage from "../assets/images/onboarding.png";

const Onboarding = () => {
    const user = JSON.parse(window.localStorage.getItem('user_data'));
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [companyIndustry, setCompanyIndustry] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const submit = e => {
        e.preventDefault();
        if (!isSubmitting) {
            setSubmitting(true);
            axios.post(`${config.baseUrl}/api/user/onboarding`, {
                token: user.token,
                company_name: companyName,
                company_size: companySize,
                company_industry: companyIndustry,
                position_at_company: position,
            })
            .then(response => {
                setSubmitting(false);
                navigate('/dashboard');
            })
            .catch(e => setSubmitting(false));
        }
    }

    useEffect(() => {
        if (companyName !== "" && companySize !== "" && position !== "" && companyIndustry !== "") {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [companyName, companyIndustry, position, companySize]);

    return (
        <>
            <div className="absolute top-0 bottom-0 left-0 w-5/12 mobile:w-full p-8 flex flex-col justify-center">
                <div className="text-2xl text-slate-700 font-medium">Selamat Datang di Zainzo Broadcast</div>
                <div className="text-sm text-slate-500">Sebelum memulai, kami ingin tahu tentang perusahaan Anda</div>

                <form className="mt-8 flex flex-col gap-4" onSubmit={submit}>
                    <div className="border rounded-lg p-2">
                        <div className="text-xs text-slate-500">Nama Perusahaan</div>
                        <input type="text" className="w-full h-10 outline-0" required onInput={e => {
                            setCompanyName(e.currentTarget.value);
                        }} />
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="text-xs text-slate-500">Jabatan Anda</div>
                        <input type="text" className="w-full h-10 outline-0" required onInput={e => {
                            setPosition(e.currentTarget.value);
                        }} />
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="text-xs text-slate-500">Jumlah Karyawan</div>
                        <select className="w-full h-10 outline-0" required onChange={e => setCompanySize(e.currentTarget.value)}>
                            <option value="">Pilih...</option>
                            <option value="1 - 10">1 - 10 Karyawan</option>
                            <option value="11 - 50">11 - 50 Karyawan</option>
                            <option value="51 - 100">51 - 100 Karyawan</option>
                            <option value="100 Karyawan Lebih">100 Karyawan lebih</option>
                        </select>
                    </div>
                    <div className="border rounded-lg p-2">
                        <div className="text-xs text-slate-500">Jenis Industri</div>
                        <select className="w-full h-10 outline-0" required onChange={e => setCompanyIndustry(e.currentTarget.value)}>
                            <option value="">Pilih...</option>
                            {
                                Industries.map((ind, i) => (
                                    <option value={ind.name}>{ind.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <button type={canSubmit ? 'submit' : 'button'} className={`w-full h-14 mt-4 rounded-lg bg-primary text-white font-bold ${canSubmit ? '' : 'bg-opacity-45 cursor-not-allowed'}`}>
                        {isSubmitting ? 'Memproses...' : 'Mulai'}
                    </button>
                </form>
            </div>
            <div className="absolute top-0 bottom-0 right-0 w-7/12 flex items-center justify-center mobile:hidden">
                <img src={OnboardingImage} alt="Onboarding" style={{height: '400px'}} />
            </div>
        </>
    )
}

export default Onboarding