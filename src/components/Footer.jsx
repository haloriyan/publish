import React from "react";
import Logo from "../assets/logo-white.png";
import { BiCopyright, BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IconBrandInstagram, IconBrandTiktok, IconBrandWhatsapp, IconCopyright, IconMail, IconPhone } from "@tabler/icons-react";
import moment from "moment/moment";

const Footer = () => {
    const isMobile = window.screen.width <= 480;
    return (
        <div className="bg-primary text-white p-20 px-14 mobile:p-10 mobile:px-8">
            <div className="flex items-center gap-4">
                <div className="flex grow">
                    <img src={Logo} alt="Logo footer" className="h-14 mobile:h-10" />
                </div>
                <div className="flex items-center gap-4 mobile:gap-2">
                    <Link to={'#'} className="h-10 mobile:h-8 aspect-square rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                        <BiLogoFacebook size={isMobile ? 16 : 24} />
                    </Link>
                    <Link to={'#'} className="h-10 mobile:h-8 aspect-square rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                        <BiLogoInstagram size={isMobile ? 16 : 24} />
                    </Link>
                    <Link to={'#'} className="h-10 mobile:h-8 aspect-square rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                        <BiLogoTwitter size={isMobile ? 16 : 24} />
                    </Link>
                    <Link to={'#'} className="h-10 mobile:h-8 aspect-square rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                        <BiLogoLinkedin size={isMobile ? 16 : 24} />
                    </Link>
                </div>
            </div>

            <div className="w-full bg-white mt-8 mb-8" style={{height: 0.5}}></div>

            <div className="flex gap-8 text-white mobile:flex-col mobile:gap-4">
                <div className="flex flex-col grow gap-4">
                    <div className="text-xl font-bold">Office & Creator Hub</div>
                    <div>
                        <div>OFFICE SURABAYA - PT Layanan Berbasis Awan</div>
                        <div className="text-sm mobile:text-xs mt-2">Sutorejo Utara II No. 29,<br />Kel. Dukuh Sutorejo, Kec. Mulyorejo,<br/>Surabaya, Jawa Timur, 60113</div>
                    </div>
                    <div>
                        <div>CreatorHUB @ Surabaya</div>
                        <div className="text-sm mobile:text-xs mt-2">Koridor Coworking Space, Gedung Siola<br />Jalan Tunjungan No. 1<br />Surabaya, Jawa Timur</div>
                    </div>
                </div>
                <div className="flex flex-col grow gap-4">
                    <div className="text-xl font-bold">Layanan Kami</div>
                    <div className="flex flex-col gap-2">
                        <Link to={'#'} className="text-sm mobile:text-xs">Tiktok Shop Partner</Link>
                        <Link to={'#'} className="text-sm mobile:text-xs">Tiktok Creator Management</Link>
                        <Link to={'#'} className="text-sm mobile:text-xs">Key Opinion Leader</Link>
                        <Link to={'#'} className="text-sm mobile:text-xs">Social Media Management</Link>
                        <Link to={'#'} className="text-sm mobile:text-xs">E-Commerce Management</Link>
                    </div>
                </div>
                <div className="flex flex-col grow gap-4">
                    <div className="text-xl font-bold">Support</div>
                    <div className="flex flex-col gap-2">
                        <Link to={'#'} className="text-sm mobile:text-xs">Blog</Link>
                        <Link to={'#'} className="text-sm mobile:text-xs">FAQ</Link>
                        <Link to={'#'} className="text-sm mobile:text-xs">Contact Us</Link>
                    </div>
                </div>
                <div className="flex flex-col grow gap-4">
                    <div className="text-xl font-bold">Connect with Us</div>
                    <div className="flex flex-col gap-2">
                        <Link to={'#'} className="text-sm mobile:text-xs flex items-center gap-2">
                            <IconPhone />
                            <div>+62 812 9990 3331</div>
                        </Link>
                        <Link to={'#'} className="text-sm mobile:text-xs flex items-center gap-2">
                            <IconBrandWhatsapp />
                            <div>+62 812 9990 4441</div>
                        </Link>
                        <Link to={'#'} className="text-sm mobile:text-xs flex items-center gap-2">
                            <IconMail />
                            <div>hello@publish.co.id</div>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link to={'#'} className="text-sm mobile:text-xs flex items-center gap-2">
                            <IconBrandInstagram size={16} />
                            <div>Publish.Creators</div>
                        </Link>
                        <Link to={'#'} className="text-sm mobile:text-xs flex items-center gap-2">
                            <IconBrandWhatsapp size={16} />
                            <div>Publish.Influencer</div>
                        </Link>
                        <Link to={'#'} className="text-sm mobile:text-xs flex items-center gap-2">
                            <IconBrandTiktok size={16} />
                            <div>Publish.co.id</div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white mt-8 mb-8" style={{height: 0.5}}></div>
            {
                isMobile ?
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex justify-start basis-96 grow content-start gap-2 text-xs">
                        Copyright &copy; {moment().format('Y')} PT Layanan Berbasis Awan - All Rights Reserved. Powered by Publish Agency
                    </div>
                    <Link to={'#'} className="text-xs flex">Terms of Use</Link>
                    <Link to={'#'} className="text-xs flex">Privacy Policy</Link>
                </div>
                :
                <div className="flex items-center gap-4">
                    <div className="text-sm mobile:text-xs flex grow items-center gap-1">
                        Copyright <BiCopyright size={16} /> {moment().format('Y')} PT Layanan Berbasis Awan - All Rights Reserver. Powered by Publish Agency
                    </div>
                    <Link to={'#'} className="text-sm">Terms of Use</Link>
                    <Link to={'#'} className="text-sm">Privacy Policy</Link>
                </div>
            }
        </div>
    )
}

export default Footer