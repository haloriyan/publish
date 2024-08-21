import React, { useRef } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";

function showPreview(text) {
    text = text.replace(/\*(.*?)\*/g, '<b>$1</b>');
    text = text.replace(/_(.*?)_/g, '<i>$1</i>');
    text = text.replace(/~(.*?)~/g, '<s>$1</s>');
    
    return text;
}
function replaceText(text, oldWord, newWord) {
    const regex = new RegExp(oldWord, 'g');
    return text.replace(regex, newWord);
}


const StepThree = ({fields, changeFields, setStep, step, submit}) => {
    const selRef = useRef(null);
    
    const replaceVar = text => {
        let toReturn = text;
        const regex = /%([^%]+)%/g;
        const matches = [];
        let match;
        const templates = {
            contact: fields.group.latest_member,
            group: fields.group,
        }
        
        while ((match = regex.exec(text)) !== null) {
            matches.push(match[1]);
        }
        
        matches.map(item => {
            let it = item.split(".");
            toReturn = replaceText(toReturn, `%${item}%`, templates[it[0]][it[1]]);
        })
        
        return toReturn;
    }
    return (
        <div className="p-8 flex mobile:flex-col gap-8">
            <div className="bg-slate-400 w-5/12 mobile:w-full aspect-square rounded-xl p-8 mobile:p-4" style={{
                backgroundImage: `url(/wa-bg.jpg)`,
            }}>
                <div className="bg-white rounded-lg p-4">
                    {
                        fields.image !== null &&
                        <img src={fields.image_base64} className="w-full aspect-square rounded-lg object-cover mb-2" />
                    }
                    <div dangerouslySetInnerHTML={{__html: showPreview(replaceVar(fields.content))}}></div>
                </div>
            </div>
            <div className="flex flex-col grow">
                <div className="flex flex-row content-center items-center gap-4 border-b">
                    <div className="w-4/12 text-slate-700">
                        Judul
                    </div>
                    <div className="text-slate-700 py-4">{fields.title}</div>
                </div>
                <div className="flex flex-row content-center items-center gap-4 border-b">
                    <div className="w-4/12 text-slate-700">
                        Pengirim
                    </div>
                    <div className="text-slate-700 py-4">{fields.device.label} - {fields.device.number}</div>
                </div>
                <div className="flex flex-row content-center items-center gap-4 border-b">
                    <div className="w-4/12 text-slate-700">
                        Penerima
                    </div>
                    <div className="text-slate-700 py-4">{fields.group.name} ({fields.group.members_count})</div>
                </div>
                <div className="flex flex-row content-center items-center gap-4 border-b">
                    <div className="w-4/12 text-slate-700">
                        Waktu Pengiriman
                    </div>
                    {
                        fields.delivery_time === "PROCESSING" ?
                        <select className="w-4/12 text-sm h-12 outline-0 border my-4 rounded-lg" ref={selRef} onChange={e => {
                            changeFields({
                                delivery_time: e.currentTarget.value
                            })
                        }}>
                            <option value="PROCESSING">Sekarang</option>
                            <option value="SCHEDULED">Jadwalkan</option>
                        </select>
                        :
                        <div className="w-6/12 text-sm h-12 outline-0 border my-4 px-4 rounded-lg">
                            <Flatpickr
                                style={{height: 40,width: '100%',outline: 'none'}}
                                defaultValue={fields.delivery_time}
                                options={{
                                    enableTime: true,
                                }}
                                onChange={([date]) => {
                                    let dt = moment(date);
                                    changeFields({
                                        delivery_time: dt.format('Y-MM-DD HH:mm')
                                    })
                                    // setStartDate(dt.format('Y-MM-DD'));
                                }}
                            />
                        </div>
                    }
                </div>
                <div className="flex flex-row content-center items-center gap-4 border-b">
                    <div className="w-4/12 text-slate-700">
                        Kecepatan
                    </div>
                    <div className="text-slate-700 py-4 flex items-center gap-4">
                        <div className="h-8 aspect-square rounded-full border border-primary text-primary cursor-pointer flex items-center justify-center" onClick={() => {
                            changeFields({
                                delay_time: fields.delay_time <= 5 ? 5 : fields.delay_time - 5
                            });
                        }}>
                            <IconMinus />
                        </div>
                        <div>{fields.delay_time}</div>
                        <div>detik</div>
                        <div className="h-8 aspect-square rounded-full border border-primary text-primary cursor-pointer flex items-center justify-center" onClick={() => {
                            changeFields({
                                delay_time: fields.delay_time < 5 ? 5 : fields.delay_time + 5
                            })
                        }}>
                            <IconPlus />
                        </div>
                    </div>
                </div>

                <button className="bg-primary w-full mt-4 text-white rounded-lg h-12 font-bold" onClick={submit}>
                    Kirim
                </button>
            </div>
        </div>
    )
}

export default StepThree