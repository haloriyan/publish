import { IconArrowRight, IconBuildingStore, IconCategory, IconChartBar, IconEye, IconFlame, IconLivePhoto, IconLiveView, IconPlayerSkipForward, IconShoppingBag, IconSignRight } from "@tabler/icons-react";
import { Substring } from "../../lib";
import config from "../../config";

const PopularVideo = ({streamDatas}) => {
    return (
        <>
            <div className="flex items-center gap-4">
                <IconChartBar color={config.primaryColor} size={28} />
                <div className="text-slate-700 text-lg font-medium flex grow">Video Populer</div>
                <div className="cursor-pointer text-primary text-sm flex items-center gap-4">
                    Lainnya <IconArrowRight />
                </div>
            </div>

            {
                window.screen.width <= 480 ?
                <div className="mt-8 overflow-x-auto">
                    <div className="flex gap-4 md:flex-wrap">
                        {
                            streamDatas.map((str, s) => (
                                <div 
                                    className="relative flex flex-col grow-0 shrink-0 basis-[calc(85vw-2rem)] md:basis-auto rounded-lg"
                                    key={s}
                                    style={{ aspectRatio: '9/16' }}
                                >
                                    <img 
                                        src={str.thumbnail} 
                                        alt={str.caption} 
                                        className="absolute top-0 left-0 right-0 bottom-0 rounded-lg object-cover" 
                                        style={{ aspectRatio: '9/16' }} 
                                    />
                                    <div className="absolute top-0 left-0 p-4 z-20">
                                        <div className="p-1 font-bold bg-primary text-white px-3 rounded-full text-xs flex items-center gap-2">
                                            <IconLivePhoto size={12} />
                                            <div>Live</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 bottom-0 left-0 right-0 p-4 z-10 flex items-end gap-4 text-white bg-black bg-opacity-25 hover:bg-opacity-45 rounded-lg">
                                        <div className="flex flex-col grow">
                                            <div className="flex items-center gap-2">
                                                <img src={str.user.photo} alt={str.user.username} className="h-10 aspect-square rounded-full object-cover" />
                                                <div className="text-sm">{Substring(str.user.username, 15)}</div>
                                            </div>
                                            <div className="mt-2 text-sm">{str.caption}</div>
                                            <div className="flex mt-2">
                                                <div className="text-xs text-white bg-primary rounded-full p-1 px-2">{Substring(str.category, 20)}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="h-12 aspect-square flex flex-col items-center justify-center">
                                                <IconShoppingBag />
                                                <div className="text-xs mt-1">{parseFloat(str.sales / 1000).toFixed(2)}k</div>
                                            </div>
                                            <div className="h-12 aspect-square flex flex-col items-center justify-center">
                                                <IconEye />
                                                <div className="text-xs mt-1">{parseFloat(str.viewers / 1000).toFixed(2)}k</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            :
                <div className="flex gap-4 mt-8">
                    {
                        streamDatas.map((str, s) => (
                            <div className="relative flex flex-col grow rounded-lg" key={s} style={{aspectRatio: 9/16}}>
                                <img src={str.thumbnail} alt={str.caption} className="absolute top-0 left-0 right-0 bottom-0 rounded-lg object-cover" style={{aspectRatio: 9/16}} />
                                <div className="absolute top-0 bottom-0 left-0 right-0 p-2 z-10 flex flex-col justify-end content-end gap-2 text-white bg-black bg-opacity-25 hover:bg-opacity-45 rounded-lg">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <img src={str.user.photo} alt={str.user.username} className="h-6 aspect-square rounded-full object-cover" />
                                            <div className="text-xs font-medium">{Substring(str.user.username, 12)}</div>
                                        </div>
                                        <div className="mt-2 text-xs">{Substring(str.caption, 25)}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="grow aspect-square flex flex-col items-center justify-center">
                                            <IconShoppingBag size={16} />
                                            <div className="text-xs mt-1">{parseFloat(str.sales / 1000).toFixed(2)}k</div>
                                        </div>
                                        <div className="grow aspect-square flex flex-col items-center justify-center">
                                            <IconEye size={16} />
                                            <div className="text-xs mt-1">{parseFloat(str.viewers / 1000).toFixed(2)}k</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default PopularVideo