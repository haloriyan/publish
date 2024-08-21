import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { IconMenu, IconSearch, IconX } from "@tabler/icons-react";

const Header = ({active = 'home'}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [mobileActive, setMobileActive] = useState(false);
    const menus = [
        {uri: '/',key: 'home', text: 'Home'},
        {uri: '/campaign',key: 'campaign', text: 'Campaign'},
        {uri: '#',key: 'analytics', text: 'Analytics'},
        {uri: '#',key: 'blog', text: 'Blog'},
        {uri: '#',key: 'upgrade', text: 'Peningkatan'},
    ]
    const isMobile = window.screen.width <= 480;

    return (
        <div className="fixed top-0 left-0 right-0 h-20 bg-white flex flex-row items-center gap-8 px-14 mobile:px-4 z-30">
            <img src={Logo} alt="Header Logo" className="h-12 mobile:h-8" />
            <div className="desktop:hidden flex grow"></div>
            <div className="desktop:hidden h-12 aspect-square flex items-center justify-center" onClick={() => setMobileActive(!mobileActive)}>
                {
                    mobileActive ? <IconX /> : <IconMenu />
                }
            </div>
            {
                (isMobile && mobileActive) ?
                <div className="fixed top-20 left-0 right-0 bottom-0 p-6 bg-white flex flex-col gap-2">
                    <div className="border w-full rounded-lg p-4 flex flex-row gap-2">
                        <IconSearch />
                        <input type="text" className="flex grow w-full outline-0 text-sm" placeholder="Username / ID Tiktok" />
                    </div>
                    <div className="flex flex-col grow gap-4 mt-8">
                    {
                        menus.map((menu, m) => {
                            let isActive = menu.key === active;
                            return (
                                <Link to={menu.uri} className={isActive ? 'text-primary font-bold' : 'text-slate-500 font-medium'} key={m}>
                                    <div>{menu.text}</div>
                                    {
                                        isActive &&
                                        <div style={{height: 0.8}} className="bg-primary w-2/12"></div>
                                    }
                                </Link>
                            )
                        })
                    }
                    </div>
                    <div className="flex grow"></div>
                    <div className="flex gap-4 items-center mt-8">
                        <button className="font-medium flex grow justify-center p-2 px-6 rounded-lg bg-primary text-white">Masuk</button>
                        <button className="font-medium flex grow justify-center p-2 px-6 rounded-lg bg-primary text-primary bg-opacity-25">Daftar</button>
                    </div>
                </div>
                :
                <div className="flex items-center gap-4 grow mobile:hidden">
                    {
                        menus.map((menu, m) => {
                            let isActive = menu.key === active;
                            return (
                                <Link to={menu.uri} className={isActive ? 'text-primary font-bold' : 'text-slate-500 font-medium'} key={m}>
                                    <div>{menu.text}</div>
                                    {
                                        isActive &&
                                        <div style={{height: 0.8}} className="bg-primary w-full"></div>
                                    }
                                </Link>
                            )
                        })
                    }
                </div>
            }
            <div className="border w-3/12 rounded-lg p-2 px-4 flex flex-row gap-2 mobile:hidden">
                <IconSearch />
                <input type="text" className="flex grow w-full outline-0 text-sm" placeholder="Username / ID Tiktok" />
            </div>
            <div className="flex gap-4 items-center mobile:hidden">
                <button className="font-medium p-2 px-6 rounded-lg bg-primary text-white">Masuk</button>
                <button className="font-medium p-2 px-6 rounded-lg bg-primary text-primary bg-opacity-25">Daftar</button>
            </div>
        </div>
    )
}

export default Header