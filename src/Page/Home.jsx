import React from "react";
import Header from "../components/Header";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import BannerImage from "../assets/banner.png";
import { Link } from "react-router-dom";
import { IconArrowRight, IconArrowRightCircle, IconBox, IconBuildingStore, IconCategory, IconChartAreaLine, IconChartBar, IconChartLine, IconEye, IconFlame, IconLivePhoto, IconLiveView, IconPlayerSkipForward, IconShoppingBag, IconSignRight } from "@tabler/icons-react";
import config from "../config";
import PopularLive from "../Partials/Home/PopularLive";
import Footer from "../components/Footer";
import PopularVideo from "../Partials/Home/PopularVideo";
import CTA from "../Partials/CTA";

const Home = () => {
    const jumboImages = [
        {
            uri: BannerImage,
            title: "PROMO 10% UNTUK 1 TAHUN PERTAMA",
            action: '/',
        },
    ];
    const streamDatas = [
        {
            caption: "BELI 1 GRATIS 1",
            sales: 3822,
            viewers: 33040,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/7350274651953561605~c5_720x720.jpeg",
            user: {
                photo: "https://s.500fd.com/tt_author/1b367c4b4edd46d4df01ebb1941198d3~c5_720x720.jpeg",
                username: "tokoibunia"
            }
        },
        {
            caption: "Semua kebutuhanmu ada disini gais, yuk buruan CO",
            sales: 989,
            viewers: 22090,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/2bc144d2cc42c9f2d1375dcc7999bafd~c5_720x720.jpeg",
            user: {
                photo: "https://s.500fd.com/tt_live/2bc144d2cc42c9f2d1375dcc7999bafd~c5_720x720.jpeg",
                username: "papah.muda"
            }
        },
        {
            caption: "Spesial Agustusan!!! Krim pelembab wajah dan kulit",
            sales: 4320,
            viewers: 44959,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/9c23b91473fb2b10eae0897634cd2ff3~c5_720x720.jpeg",
            user: {
                photo: "https://s.500fd.com/tt_live/9c23b91473fb2b10eae0897634cd2ff3~c5_720x720.jpeg",
                username: "fingkyshop123"
            }
        },
        {
            caption: "Spesial Agustusan!!! Krim pelembab wajah dan kulit",
            sales: 4320,
            viewers: 44959,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/9c23b91473fb2b10eae0897634cd2ff3~c5_720x720.jpeg",
            user: {
                photo: "https://s.500fd.com/tt_live/9c23b91473fb2b10eae0897634cd2ff3~c5_720x720.jpeg",
                username: "fingkyshop123"
            }
        },
        {
            caption: "Bantu kamu untu kdapetin hadiah yang kamu inginkan",
            sales: 446,
            viewers: 18490,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/7357602363669678853~tplv-obj.image",
            user: {
                photo: "https://s.500fd.com/tt_live/7357602363669678853~tplv-obj.image",
                username: "pantiatujuhbelasan_"
            }
        }
    ]
    const viralShops = [
        {
            name: "Maybelline Indonesia",
            image: 'https://s.500fd.com/tt_shop/92d7b05390b6b74dc5ecf5adb08f48ce?imageMogr2/thumbnail/84x84',
            category: "Perawatan & Kecantikan Wajah",
            gmv: '43232323320',
        },
        {
            name: "SBY SHOP 10",
            image: 'https://s.500fd.com/tt_shop/48fc05a0b4274b2492cf4eab4c4dc5e2~tplv-aphluv4xwc-resize-webp:300:300.webp?imageMogr2/thumbnail/84x84',
            category: "Perawatan & Kecantikan Wajah",
            gmv: '43232323320',
        }
    ];
    const viralInfluencers = [
        {
            name: "Willie Salim",
            username: "williesalim",
            photo_url: "https://echotik.live/_next/image?url=https%3A%2F%2Fd304ly0se1sg9m.cloudfront.net%2Fuser-avatar%2F876%2FMS4wLjABAAAAdPCAdcoGomXKnrJxNxkyG0hVJnasKEsL1FnRzVxI162mmVeebQA3SyhBBpvDOnlq.jpeg%3FExpires%3D1724130875%26Signature%3DMiSVXfUvzKO9swGCbz57klSOJnYcMcuswWNsNmSXz5EdUOqDRe~3ZRT2NgxSCd4MRcu8fLFDmVD~8qSs3hvdlHiqent936JWezsK-RTTr9VQA1jITaH~tHH3mWeP1vuYgygWxhShxFXzRjU8h5Hd5jepNtw3~A-f6d-Fqy-3i0d-BjGxYLbVnF7tH41-ae6wzCGCXEwA4lGJJ~Nj40bousqomdhm-YdjrN4IRPF7v3MqoZebwFr0ufVCkQtvqnkvjmW4cza5T0lbEVnpiPC3MBdi2wlVYWgsZxOEgHmRqUIQ1dQ4CV7M64ch8uRCgjjplO8PDqUvU4xHY0hNTFgBjw__%26Key-Pair-Id%3DK18GL1X40JAX3H&w=128&q=75",
            gmv: 57430930,
            followers: 5785559,
            followers_growth: 700330,
        },
        {
            name: "Mamanya Kamari",
            username: "jennifer.copen",
            photo_url: "https://echotik.live/_next/image?url=https%3A%2F%2Fd304ly0se1sg9m.cloudfront.net%2Fuser-avatar%2F987%2FMS4wLjABAAAACarElN1POjHr1tIi3cTaUXmrP1spliG9K38eWQzN4A2fGCwq8dAJvnHU9P6EiXUs.jpeg%3FExpires%3D1724130875%26Signature%3DdMeEUQpUszV9q6NZ-rqfdVoaHBEhwy6PWL-35NyVmhfp3gfKZyiW1u~0M~12OoyxR6NYQspvdUJx8OxGvrOyzpmiGR9os5nipIqY5p9ySILuPDIELr2VtznYTGatAGOReDZo84vwMAj-88PqfNmORgKQ7AHAmc0OgBbr0YZ6-ViiTQhU4c2geAJKl4YPX-i462yZN~SNONgWsA7AFCo9J-yx9p7Cns5ayQgQ-N05TjZTRrtqba50kEvdHUMJISjvCQerrec0junoVRkwBi~CGYAKBAgJmgR7jIOk3x6tNAQZnkXB8zNcWQUl~u0dqQESQoFanaMs4oLhw0mgEvSZDQ__%26Key-Pair-Id%3DK18GL1X40JAX3H&w=128&q=75",
            gmv: 4339230,
            followers: 5012390,
            followers_growth: 694203,
        },
        {
            name: "Neng_Fitoy",
            username: "neng_fitoy",
            photo_url: "https://echotik.live/_next/image?url=https%3A%2F%2Fd304ly0se1sg9m.cloudfront.net%2Fuser-avatar%2F412%2FMS4wLjABAAAA7Ok_AY4ixwCPShIU0QV-9AmyBfcVq5JKxRY3Us-T8pqsuu5ox_MHu3BZYrXtC3n2.jpeg%3FExpires%3D1724131238%26Signature%3DVJ7x~kTj6-xGZZaq9u5KM6ibNTu~8DTG1l9wNser37UuhUbS37ZkXUxzZXvjPlkm1RIFThgip4FQml9D9L7BKumkxGGinQJDDC6DmRsGER5ca1ZzF7X8-FHlhvSuxshcuc3NYTyY0UcbFr9x4QWIFlhQHhf4tY5XchhN7vKiP2saMI4nwgKVxJQBYl~PT053S-97CCdO9O1DEGxgUjZ-cdjGLfNf6e2mWnu2ORwerT4s~HK91fxmoVfbTSwyXqkfd0IARfPBTncJ2Lac~aUKxZbnjdQCCZWVOcGmzDHbR37Sc6X~Sl3EkmpZUPZiu2a33MnxtqnqUKpV8BQDdO3GIg__%26Key-Pair-Id%3DK18GL1X40JAX3H&w=128&q=75",
            gmv: 4890,
            followers: 66550449,
            followers_growth: 493480,
        },
        {
            name: "Mamah Papah Angels",
            username: "mamah_papah_angels",
            photo_url: "https://echotik.live/_next/image?url=https%3A%2F%2Fd304ly0se1sg9m.cloudfront.net%2Fuser-avatar%2F784%2FMS4wLjABAAAAnMavhSpd-Z6o6fXmP3CpOO6a2CMOulGDwojqT3XZL_RVmiDGG8skmMsDKYasXxUM.jpeg%3FExpires%3D1724131239%26Signature%3Dgu~mBRcfCLdUreywpzrE9WdIO23JIKWe5CDTrP399b8Rp6kf5~46DzM~ulxvLIfjY1EPfqC8~Hc40z-TQSHHh18m~QLf2ptL4kkP2w7M79rAgIWVW8PZJ8emgjEnfivNHWDxI7UgbRkonRlP5UIKYz3M5D8xLPbmnnJIgL2-z5WxJG5sl3wvJ1ofshutA-1hYR9Tcp20HuwWlJHdbH4azK6j-ssvIuF6lKvFQhpOcdXdwQLN~GJm~b15f~4iUT3E2MXJNqNIv9dHiqXrhUDy0nbJQcs3-OmF4Zg3-fToq9wDOUX1RQhK1RuBrxeWG5APCEX8f11U1SpS2AOWwngy5w__%26Key-Pair-Id%3DK18GL1X40JAX3H&w=128&q=75",
            gmv: 4119239,
            followers: 30550449,
            followers_growth: 400500,
        },
    ]
    const viralProducts = [
        {
            name: "Jestham Triple Lux Ungu (LU)",
            photo: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/6ebc59536cd64cc596fa5c2a83417ef1~tplv-aphluv4xwc-resize-jpeg:400:400.jpeg?from=1826719393&Expires=1724131473&Signature=N-NA0Kxb~GBFef4CtImoaJdQtHVuVg7~SLTgC~W5cBssgKm5pPYehP9PHasSFiptGFjVvFryq6fRGmNbaUzml2VoapZFEYY6wbPPtkChmV2Rv0Ich3UQqCPFj-ApC-oyl9hjJLGs4HhgZI2lcb2WYCNrOyevgMjVtAtw1EeiN1nibL3k14OXTWWm-G28v7Mjgh8iTHaeYX1wAI9dGdOvdGKOiwYa81KWVqmtZzoMv1ulJ5hh0kD9jYn29D1D5tLmQ~~Ub~zOjVR34rH9NVe3JZtf0E0n1caLyhRtY6xTooeX11oWCKLrxBKPi4lW1KmYl4SSrYO5R7FEDhrS4XHuUw__&Key-Pair-Id=K18GL1X40JAX3H",
            gmv: 830372834,
        },
        {
            name: "ArafahId-Kemeja Wanita Basic Kombinasi / Kemeja Rayon Wanita",
            photo: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/92755035a6764f8a9db43f2b75ab22e3~tplv-aphluv4xwc-resize-jpeg:400:400.jpeg?from=1826719393&Expires=1724131473&Signature=d-UJNF~DEg5IbJshxWlB1~9j6Puyp6OqhmjlW7jvQASvTyeqDNzEuc4wM916nk7d9xSAx-CH9UxZhrzmMEMPz6fPNXqgRRRXD5teUC1nIPmRCBBUOREUDWiTQ3AhGJnc3eVPDp8gGolVaCIJBskdqn-KL0oAVXgXjTCmWJcVrtHK4S05PY6uvDtuwChSyLA0vGZOi1ePlm-OTcC9QgKSbxBJXuQn-KfiVYLf-n6r2RHSf~95S3zV8TrXENuIn7SnxsffXa6Xph2sGoVrUfLv6-wFNnXe8yF4BxxccOkg19cxOHR3mJ-O710EWmkjDfTdrKkamPylsRYvwvPk6--WmQ__&Key-Pair-Id=K18GL1X40JAX3H",
            gmv: 780372834,
        },
        {
            name: "Nabila Tunik Setrip Polos Polo Linen Variasi Kancing",
            photo: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/800485bbb6354f39afed5d2b346fb6c4~tplv-aphluv4xwc-resize-jpeg:400:400.jpeg?from=1826719393&Expires=1724131473&Signature=Qsb6pDgsB6~sR3CMySNc4BjUGDtHkDfXVKu2lCHrxAw43OClqBbyXx0k3Bt5qpXMfsBJnpZJTqd5aiHTt8iDPYyMCt1YHpveRZI8t8h3tsIQRp28Mrm5x3ESr5o~XwkJ96SjJ1zNwcQWfTnj13XUM80Nh6BVAXqyIpajCV9WgozFQsQME913OScle7~17plB8p4hnSj53bcywOZ4p2u3qXREvi~Ur006Y4fvF1e3WD80DZp48Le5igSgtjb4FuJeOF~ZvEel8wJvreQjh~9A436Spq2x7~28dBFeCHMAs5GTItAj2dp0-uggsBUvT-XqTtWaS4mfL250BLstF2ei3A__&Key-Pair-Id=K18GL1X40JAX3H",
            gmv: 720372834,
        },
        {
            name: "ARCA GENTLE GLOW SERIES - Paket Lengkap Skincare Pria",
            photo: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/1288066fa79f4bcc8cd70b0171ac3e3a~tplv-aphluv4xwc-resize-jpeg:400:400.jpeg?from=1826719393&Expires=1724131473&Signature=CVW5qa3hCj3--sJMaH6V1aKb2lXO0ZUE8cXL~IdckLel4njhs1llapOBEwOb9MW-ZKzPCbrfM~jIq30WCTLR-QTbHJTTq2t5cQkmyWO3~BAUSaUf5ZSifg-UCPHfYrYcGUMX~dbcuhlJ1J~QEipON2DkzP~PspBmK1vB6pDWpWlJXdNoKXHUA8RveE101BVe8Dz-gBXRiM49aetXsiDbU3Aj8Mu-WqG7Qo~uuoMHViU9~HgPBDynKeNGLLVQ48-OVk3cAuB46HWpvm0z095mBcDzJoSVT9XdiffKxxUNOZksICpmHr6XzpA5iHWs-zrXScAKoPmMy7crsrFazWqrqQ__&Key-Pair-Id=K18GL1X40JAX3H",
            gmv: 640372834,
        },
    ]
    const popularVideos = [
        {
            caption: "BELI 1 GRATIS 1",
            sales: 3822,
            viewers: 33040,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/7350274651953561605~c5_720x720.jpeg",
            user: {
                photo: "https://s.500fd.com/tt_author/1b367c4b4edd46d4df01ebb1941198d3~c5_720x720.jpeg",
                username: "tokoibunia"
            }
        },
        {
            caption: "Semua kebutuhanmu ada disini gais, yuk buruan CO",
            sales: 989,
            viewers: 22090,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/2bc144d2cc42c9f2d1375dcc7999bafd~c5_720x720.jpeg",
            user: {
                photo: "https://s.500fd.com/tt_live/2bc144d2cc42c9f2d1375dcc7999bafd~c5_720x720.jpeg",
                username: "papah.muda"
            }
        },
        {
            caption: "Spesial Agustusan!!! Krim pelembab wajah dan kulit",
            sales: 4320,
            viewers: 44959,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/9c23b91473fb2b10eae0897634cd2ff3~c5_720x720.jpeg",
            user: {
                photo: "https://s.500fd.com/tt_live/9c23b91473fb2b10eae0897634cd2ff3~c5_720x720.jpeg",
                username: "fingkyshop123"
            }
        },
        {
            caption: "Bantu kamu untu kdapetin hadiah yang kamu inginkan",
            sales: 446,
            viewers: 18490,
            category: "Perawatan & Kecantikan Wajah",
            thumbnail: "https://s.500fd.com/tt_live/7357602363669678853~tplv-obj.image",
            user: {
                photo: "https://s.500fd.com/tt_live/7357602363669678853~tplv-obj.image",
                username: "pantiatujuhbelasan_"
            }
        }
    ]

    return (
        <>
            <Header />
            <div className="absolute top-20 left-0 right-0">
                <div className="p-10 px-14 mobile:p-4 bg-white flex flex-col items-center">
                    <div className="w-full">
                        <Slide st>
                            {
                                jumboImages.map((img, i) => (
                                    <div key={i} className={`each-slide-effect relative w-full rounded-lg`} style={{
                                        backgroundImage: `url(${img.uri})`,
                                        aspectRatio: 4.82/1,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center center'
                                    }}>
                                        <Link to={img.action} className={'flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 text-white rounded-lg p-8'}>
                                            <div className="w-6/12 mobile:w-10/12 text-center">
                                                <div className={'text-4xl mobile:text-sm font-black'}>{img.title}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </Slide>
                    </div>

                    <div className="w-full mt-8">
                        <div className="text-4xl mobile:text-2xl font-bold text-slate-700">Powerful TikTok Analytics for Your Business</div>
                        <div className="text-xl mobile:text-base font-medium text-slate-500 mobile:mt-2">Get detailed insights to optimize your TikTok strategy</div>

                        <div className="flex gap-8 items-center mt-4 mobile:flex-col mobile:gap-4">
                            <Link to={'#'} className="flex gap-4 grow mobile:w-full items-center p-4 rounded-lg shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                                <div className="h-16 aspect-square bg-primary bg-opacity-15 rounded-lg flex items-center justify-center">
                                    <IconFlame size={32} color={config.primaryColor} />
                                </div>
                                <div className="flex flex-col gap-1 grow">
                                    <div className="text-slate-700">Cari Influencer</div>
                                </div>
                            </Link>
                            <Link to={'#'} className="flex gap-4 grow mobile:w-full items-center p-4 rounded-lg shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                                <div className="h-16 aspect-square bg-primary bg-opacity-15 rounded-lg flex items-center justify-center">
                                    <IconBox size={32} color={config.primaryColor} />
                                </div>
                                <div className="flex flex-col gap-1 grow">
                                    <div className="text-slate-700">Cari Produk Viral</div>
                                </div>
                            </Link>
                            <Link to={'#'} className="flex gap-4 grow mobile:w-full items-center p-4 rounded-lg shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                                <div className="h-16 aspect-square bg-primary bg-opacity-15 rounded-lg flex items-center justify-center">
                                    <IconBuildingStore size={32} color={config.primaryColor} />
                                </div>
                                <div className="flex flex-col gap-1 grow">
                                    <div className="text-slate-700">Cari Toko Viral</div>
                                </div>
                            </Link>
                            <Link to={'#'} className="flex gap-4 grow mobile:w-full items-center p-4 rounded-lg shadow-[0px_16px_32px_rgba(0,0,0,0.05)]">
                                <div className="h-16 aspect-square bg-primary bg-opacity-15 rounded-lg flex items-center justify-center">
                                    <IconCategory size={32} color={config.primaryColor} />
                                </div>
                                <div className="flex flex-col gap-1 grow">
                                    <div className="text-slate-700">Lainnya</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="p-10 px-14 mobile:p-4 mobile:py-8 bg-white">
                    <PopularLive streamDatas={streamDatas} />
                </div>

                <div className="p-10 px-14 mobile:p-4 mobile:py-8 flex mobile:flex-col gap-8">
                    <div className="flex flex-col grow bg-white rounded-lg p-8 shadow-[0px_16px_32px_rgba(0,0,0,0.05)] basis-48">
                        <div className="flex items-center gap-4">
                            <IconShoppingBag color={config.primaryColor} size={28} />
                            <div className="text-slate-700 text-lg font-medium flex grow">Produk Viral</div>
                            <div className="cursor-pointer text-primary text-sm flex items-center gap-4">
                                Lainnya <IconArrowRight />
                            </div>
                        </div>

                        <table className="table w-full mt-4">
                            <thead className="mb-8">
                                <tr className="text-left">
                                    <td className="rounded-l-xl text-slate-500 text-sm p-2">Produk</td>
                                    <td className="rounded-r-xl text-slate-500 text-sm p-2 text-right">Perkiraan GMV</td>
                                </tr>
                            </thead>
                            <tbody className="mt-4">
                                {
                                    viralProducts.map((product, p) => (
                                        <tr key={p}>
                                            <td className="p-2 flex items-center gap-2">
                                                <img src={product.photo} alt={product.name} className="h-12 rounded-lg object-cover" />
                                                <div className="flex flex-col grow">
                                                    <div className="text-slate-700">{product.name}</div>
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <div className="text-primary text-sm">Rp {Math.floor(product.gmv / 1000000)}jt</div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col grow bg-white rounded-lg p-8 shadow-[0px_16px_32px_rgba(0,0,0,0.05)] basis-48">
                        <div className="flex items-center gap-4">
                            <IconBuildingStore color={config.primaryColor} size={28} />
                            <div className="text-slate-700 text-lg font-medium flex grow">Toko Viral</div>
                            <div className="cursor-pointer text-primary text-sm flex items-center gap-4">
                                Lainnya <IconArrowRight />
                            </div>
                        </div>

                        <table className="table w-full mt-4">
                            <thead className="mb-8">
                                <tr className="text-left">
                                    <td className="rounded-l-xl text-slate-500 text-sm p-2">Toko</td>
                                    <td className="rounded-r-xl text-slate-500 text-sm p-2 text-right">Perkiraan GMV</td>
                                </tr>
                            </thead>
                            <tbody className="mt-4">
                                {
                                    viralShops.map((shop, s) => (
                                        <tr key={s}>
                                            <td className="p-2 flex items-center gap-2">
                                                <img src={shop.image} alt={shop.name} className="h-12 rounded-lg object-cover" />
                                                <div className="flex flex-col grow">
                                                    <div className="text-slate-700 text-sm">{shop.name}</div>
                                                    <div className="text-slate-500 text-xs">{shop.category}</div>
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <div className="text-primary text-sm">Rp {Math.floor(shop.gmv / 1000000)}jt</div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col grow bg-white rounded-lg p-8 shadow-[0px_16px_32px_rgba(0,0,0,0.05)] basis-48">
                        <div className="flex items-center gap-4">
                            <IconLivePhoto color={config.primaryColor} size={28} />
                            <div className="text-slate-700 text-lg font-medium flex grow">Influencers</div>
                            <div className="cursor-pointer text-primary text-sm flex items-center gap-4">
                                Lainnya <IconArrowRight />
                            </div>
                        </div>

                        <table className="table w-full mt-4">
                            <thead className="mb-8">
                                <tr className="text-left">
                                    <td className="rounded-l-xl text-slate-500 text-sm p-2">Influencer</td>
                                    <td className="rounded-r-xl text-slate-500 text-sm p-2 text-right">Perkiraan GMV</td>
                                </tr>
                            </thead>
                            <tbody className="mt-4">
                                {
                                    viralInfluencers.map((user, u) => (
                                        <tr key={u}>
                                            <td className="p-2 flex items-center gap-2">
                                                <img src={user.photo_url} alt={user.name} className="h-12 rounded-lg object-cover aspect-square bg-slate-100" />
                                                <div className="flex flex-col grow">
                                                    <div className="text-slate-700">{user.name}</div>
                                                    <div className="text-slate-500 text-xs">@{user.username}</div>
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <div className="text-primary text-sm">Rp {Math.floor(user.gmv / 1000000)}jt</div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-10 px-14 mobile:p-4 mobile:py-8 flex mobile:flex-col gap-8">
                    <div className="flex flex-col grow bg-white rounded-lg p-8 shadow-[0px_16px_32px_rgba(0,0,0,0.05)] basis-48">
                        <div className="flex items-center gap-4">
                            <IconChartBar color={config.primaryColor} size={28} />
                            <div className="text-slate-700 text-lg font-medium flex grow">Peringkat Pertumbuhan Pengikut</div>
                            <div className="cursor-pointer text-primary text-sm flex items-center gap-4">
                                Lainnya <IconArrowRight />
                            </div>
                        </div>

                        <table className="table w-full mt-4">
                            <thead className="mb-8">
                                <tr className="text-left">
                                    <td className="rounded-l-xl text-slate-500 text-sm p-2">Influencer</td>
                                    <td className="rounded-l-xl text-slate-500 text-sm p-2">Pengikut</td>
                                    <td className="rounded-r-xl text-slate-500 text-sm p-2 text-right">Pertumbuhan Pengikut</td>
                                </tr>
                            </thead>
                            <tbody className="mt-4">
                                {
                                    viralInfluencers.map((influencer, i) => (
                                        <tr key={i}>
                                            <td className="p-2 flex items-center gap-2">
                                                <img src={influencer.photo_url} alt={influencer.name} className="h-12 rounded-full object-cover aspect-square bg-slate-100" />
                                                <div className="flex flex-col grow">
                                                    <div className="text-slate-700">{influencer.name}</div>
                                                    <div className="text-slate-500 text-xs">@{influencer.username}</div>
                                                </div>
                                            </td>
                                            <td className="p-2">{Math.round(influencer.followers / 1000000).toFixed(2)}jt</td>
                                            <td className="p-2 text-primary flex items-center justify-end gap-2">+{Math.round(influencer.followers_growth / 1000).toFixed(2)}k <div className="text-xs text-slate-500">/ 7 hari</div></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col grow bg-white rounded-lg p-8 shadow-[0px_16px_32px_rgba(0,0,0,0.05)] basis-48">
                        <PopularVideo streamDatas={popularVideos} />
                    </div>
                </div>

                <CTA />

                <Footer />
            </div>
        </>
    )
}

export default Home