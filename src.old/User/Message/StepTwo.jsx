import React, { useEffect, useRef, useState } from "react";
import { IconBold, IconItalic, IconStrikethrough, IconX } from "@tabler/icons-react";

const StepTwo = ({fields, changeFields, setStep, step}) => {
    const [ableToNext, setAbleToNext] = useState(false);
    const varRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setAbleToNext(fields.content !== "");
    }, [fields]);

    const insertVar = type => {
        let newContent = fields.content + ` %${type}%`;
        changeFields({
            content: newContent,
        });
        varRef.current.value = "";
    }
    const insertStyle = type => {
        let newContent = fields.content;
        if (type === "bold") {
            newContent += ` *BOLD*`;
        } else if (type === "italic") {
            newContent += ` _ITALIC_`;
        } else if (type === "strike") {
            newContent += ` ~STRIKE~`;
        }

        changeFields({
            content: newContent,
        });
    }
    
    return (
        <div className="flex flex-col items-center">
            <div className="mt-8 bg-white shadow-[0px_16px_32px_rgba(0,0,0,0.05)] px-8 rounded-lg w-6/12 mobile:w-full flex items-center">
                <select className="w-4/12 text-sm h-12 outline-0" ref={varRef} onChange={e => insertVar(e.currentTarget.value)}>
                    <option value="">Pilih variable...</option>
                    <option value="contact.name">Nama Kontak</option>
                    <option value="contact.whatsapp">Nomor Kontak</option>
                    <option value="group.name">Nama Grup</option>
                </select>
                <div className="flex grow"></div>
                <div className="h-12 aspect-square flex items-center justify-center cursor-pointer" onClick={() => insertStyle('bold')}>
                    <IconBold />
                </div>
                <div className="h-12 aspect-square flex items-center justify-center cursor-pointer" onClick={() => insertStyle('italic')}>
                    <IconItalic />
                </div>
                <div className="h-12 aspect-square flex items-center justify-center cursor-pointer" onClick={() => insertStyle('strike')}>
                    <IconStrikethrough />
                </div>
            </div>
            <textarea value={fields.content} className="bg-slate-200 mt-4 p-4 rounded-lg w-6/12 mobile:w-full" rows={10} onInput={e => {
                changeFields({
                    content: e.currentTarget.value,
                })
            }}></textarea>

            <div className="w-6/12 mobile:w-full mt-4 flex flex-col gap-2">
                <div className="text-sm text-slate-600">Sisipkan Gambar :</div>
                <input type="file" ref={inputRef} name="image" className="hidden" onChange={e => {
                    let file = e.currentTarget.files[0];
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.addEventListener('load', evt => {
                        changeFields({
                            image: file,
                            image_base64: reader.result,
                        })
                    })
                }} />
                <div className={`flex flex-row grow`}>
                    {
                        fields.image === null ?
                        <button className="rounded-lg p-2 px-4 bg-primary text-primary bg-opacity-25 text-sm" onClick={() => inputRef.current.click()}>
                            Pilih Gambar
                        </button>
                        :
                        <div className="flex items-center gap-4 grow">
                            <img src={fields.image_base64} className="h-16 aspect-square rounded-lg object-cover" />
                            <div className="flex grow text-sm">{fields.image.name}</div>
                            <div className="cursor-pointer text-red-500" onClick={() => changeFields({
                                image: null, image_base64: null,
                            })}>
                                <IconX />
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-8">
            <button onClick={() => setStep(step - 1)} className={`p-3 px-8 rounded-full font-bold border border-slate-500 text-slate-700`}>Kembali</button>
                <button onClick={() => {
                    if (ableToNext) {
                        setStep(step + 1);
                    }
                }} className={`p-3 px-8 rounded-full font-bold border border-primary/[0.15] text-primary bg-primary bg-opacity-25 ${ableToNext ? "" : "opacity-45 cursor-not-allowed"}`}>Lanjut</button>
            </div>
        </div>
    )
}

export default StepTwo