import React from "react";
import BG from "../assets/CTA.svg";

const CTA = () => {
    return (
        <div className="w-full p-14 flex gap-8 items-center" style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: 'cover',
            aspectRatio: 4/1,
        }}>
            <div className="text-4xl font-bold basis-48 flex grow text-slate-700">Jangan lewatkan kesempatan bergabung dengan Publish sekarang dan lihat perubahannya!</div>
            <button className="bg-primary rounded-lg text-white p-4 px-8 text-xl font-bold">
                Learn More
            </button>
        </div>
    )
}

export default CTA