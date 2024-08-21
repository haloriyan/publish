import React, { useEffect, useState } from "react";

const StepOne = ({fields, changeFields, devices = [], groups = [], setStep, step}) => {
    const [ableToNext, setAbleToNext] = useState(false);
    
    useEffect(() => {
        if (fields.title !== "" && fields.device !== null && fields.group !== null) {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [fields]);

    return (
        <div className="mt-8 bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] p-8 rounded-lg">
            <div className="flex items-center gap-4 border-b">
                <div className="w-4/12 text-slate-700">
                    Judul<span className="text-red-500">*</span>
                </div>
                <input type="text" value={fields.title} className="flex grow h-16 outline-0" onInput={e => changeFields({
                    title: e.currentTarget.value
                })} />
            </div>
            <div className="flex items-center gap-4 border-b mt-4">
                <div className="w-4/12 text-slate-700">
                    Pengirim<span className="text-red-500">*</span>
                </div>
                <select className="flex grow h-16 outline-0" value={JSON.stringify(fields.device)} onChange={e => {
                    let val = JSON.parse(e.currentTarget.value);
                    changeFields({
                        device_id: val.id,
                        device: val,
                    });
                }}>
                    <option value="">Pilih Pengirim...</option>
                    {
                        devices.map((dev, d) => (
                            <option value={JSON.stringify(dev)} key={d}>{dev.label} - {dev.number}</option>
                        ))
                    }
                </select>
            </div>
            <div className="flex items-center gap-4 border-b mt-4">
                <div className="w-4/12 text-slate-700">
                    Penerima<span className="text-red-500">*</span>
                </div>
                <select className="flex grow h-16 outline-0" value={JSON.stringify(fields.group)} onChange={e => {
                    let val = JSON.parse(e.currentTarget.value);
                    changeFields({
                        group_id: val.id,
                        group: val,
                    });
                }}>
                    <option value="">Pilih Penerima...</option>
                    {
                        groups.map((gru, g) => (
                            <option value={JSON.stringify(gru)} key={g}>{gru.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex items-center justify-end gap-4 mt-8">
                {
                    step > 1 &&
                    <button onClick={() => setStep(step - 1)} className={`p-3 px-8 rounded-full font-bold border border-slate-500 text-slate-700 ${ableToNext ? "" : "opacity-45 cursor-not-allowed"}`}>Kembali</button>
                }
                <button onClick={() => {
                    if (ableToNext) {
                        setStep(step + 1);
                    }
                }} className={`p-3 px-8 rounded-full font-bold border border-primary/[0.15] text-primary bg-primary bg-opacity-25 ${ableToNext ? "" : "opacity-45 cursor-not-allowed"}`}>Lanjut</button>
            </div>
        </div>
    )
}

export default StepOne