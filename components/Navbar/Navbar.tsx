"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { CgProfile, CgMenuRight, CgClose } from "react-icons/cg"
import { useSession, signOut } from "next-auth/react"
import { TbLogout } from "react-icons/tb"
import { IoCartOutline } from "react-icons/io5"

export default function Navbar() {
    const cardRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const navContentRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { data: session } = useSession()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        if (!isMenuOpen) {
            gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" })
        } else {
            gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power3.in" })
        }
    }

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const mm = gsap.matchMedia()

        mm.add({
            isDesktop: "(min-width: 1280px)",
            isTablet: "(min-width: 768px) and (max-width: 1279px)",
            isMobile: "(max-width: 767px)",
        }, (context) => {
            // @ts-ignore
            const { isDesktop, isTablet } = context.conditions

            // safe area -- notch / dynamic island ke liye
            const sat = getComputedStyle(document.documentElement).getPropertyValue("--sat")
            const safeTop = parseInt(sat || "0") || 0

            const baseH = isDesktop ? 100 : isTablet ? 80 : 70
            const scrollH = isDesktop ? 80 : isTablet ? 65 : 60

            gsap.set(cardRef.current, {
                width: "100%",
                height: baseH + safeTop,
                top: 0,
                left: 0,
                backgroundColor: "#ffffff",
                position: "fixed",
                paddingTop: safeTop,
            })

            gsap.set(logoRef.current, { scale: 1, y: 0 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "+=300",
                    scrub: 1,
                },
            })

            tl.to(logoRef.current, {
                scale: 0.7,
                y: isDesktop ? -5 : -2,
                ease: "none",
            }, 0)

            tl.to(cardRef.current, {
                backgroundColor: "rgba(255,255,255,0)",
                backdropFilter: "blur(10px)",
                height: scrollH + safeTop,
                ease: "none",
            }, 0)

            tl.to(navContentRef.current, {
                paddingLeft: isDesktop ? "150px" : isTablet ? "40px" : "20px",
                paddingRight: isDesktop ? "150px" : isTablet ? "40px" : "20px",
                ease: "power1.inOut",
            }, 0)
        })

        return () => mm.revert()
    }, [])

    return (
        <>
            <main className="relative w-full bg-white z-30">
                <div
                    ref={cardRef}
                    style={{ paddingTop: "env(safe-area-inset-top)" }}
                    className="fixed top-0 left-0 w-full z-40 flex flex-col"
                >
                    <div ref={navContentRef} className="w-full p-4 md:p-8 flex justify-between items-center h-full relative">

                        {/* desktop nav -- left side */}
                        <div className="hidden xl:flex gap-4 xl:gap-20 font-bold text-black text-sm xl:text-xl z-[110] overflow-visible">
                            <Link href="/topartist">
                                <span className="relative">
                                    Artist
                                    <small className="absolute -top-1 -right-3 md:right-4 text-[8px] md:text-[10px]">15</small>
                                </span>
                            </Link>
                            <Link href="/products"><span className="cursor-pointer">Art's</span></Link>

                            <div className="relative group cursor-pointer">
                                <span className="flex items-center gap-1 hover:text-zinc-500 transition-colors">
                                    Category
                                    <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>

                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[120]">
                                    <div className="flex flex-col">
                                        <Link href="/category/terracotta" className="px-4 py-2 hover:bg-black hover:text-white text-xs md:text-sm border-b border-black/10 last:border-0">Terracotta</Link>
                                        <Link href="/category/metal" className="px-4 py-2 hover:bg-black hover:text-white text-xs md:text-sm border-b border-black/10 last:border-0">Metal</Link>
                                        <Link href="/category/glass" className="px-4 py-2 hover:bg-black hover:text-white text-xs md:text-sm border-b border-black/10 last:border-0">Glass Art</Link>
                                        <Link href="/category/premium" className="px-4 py-2 hover:bg-black hover:text-white text-xs md:text-sm border-b border-black/10 last:border-0">Premium</Link>
                                        <Link href="/category/photography" className="px-4 py-2 hover:bg-black hover:text-white text-xs md:text-sm border-b border-black/10 last:border-0">Photography</Link>
                                        <Link href="/category/other" className="px-4 py-2 hover:bg-black hover:text-white text-xs md:text-sm border-b border-black/10 last:border-0">Other's</Link>

                                    </div>
                                </div>
                            </div>

                            <Link href="/cart">
                                <span className="cursor-pointer"><IoCartOutline size={25} /></span>
                            </Link>
                        </div>

                        {/* hamburger -- mobile + tablet */}
                        <div className="xl:hidden z-[110] flex items-center">
                            <button onClick={toggleMenu} className="text-black p-1">
                                <CgMenuRight size={28} />
                            </button>
                        </div>

                        {/* logo center */}
                        <div ref={logoRef} className="absolute left-1/2 -translate-x-1/2 flex items-center font-bold text-[8vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw]">
                            <span className="text-black">Nano</span>
                            <div className="bg-gray-200 text-black px-2 py-0.5 ml-1 flex items-center justify-center">
                                <span className="text-[0.45em]">PIXEL</span>
                            </div>
                        </div>

                        {/* desktop nav -- right side */}
                        <div className="hidden xl:flex items-center gap-4 xl:gap-20 font-bold text-black text-sm xl:text-xl z-50">
                            {session ? (
                                <div className="flex items-center gap-4 border-2 border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="text-sm font-medium">{session.user?.email}</span>
                                    <button onClick={() => signOut({ callbackUrl: "/" })} className="text-red-500 hover:text-red-700 transition-colors">
                                        <TbLogout size={20} />
                                    </button>
                                    <Link href="/admin"><CgProfile size={20} /></Link>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login"><CgProfile size={24} /></Link>
                                    <Link href="/about"><span className="cursor-pointer animation-heartbeat">About</span></Link>
                                    <Link href="/contact" className="group relative overflow-hidden inline-block h-[20px]">
                                        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                                            <span className="cursor-pointer text-black font-bold h-[20px] flex items-center">Contact</span>
                                            <span className="cursor-pointer text-blue-600 font-bold h-[20px] flex items-center">Contact</span>
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* sidebar */}
                <div
                    ref={sidebarRef}
                    style={{ paddingTop: "env(safe-area-inset-top)" }}
                    className="fixed top-0 right-0 w-[75%] max-w-[300px] h-screen bg-white border-l-4 border-black z-[200] translate-x-full shadow-[-10px_0px_20px_rgba(0,0,0,0.1)] flex flex-col"
                >
                    <div className="p-6 flex justify-end border-b-2 border-black/10">
                        <button onClick={toggleMenu} className="text-black p-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
                            <CgClose size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 p-8 text-2xl font-black uppercase tracking-tighter overflow-y-auto">
                        <Link href="/topartist" onClick={toggleMenu} className="hover:text-zinc-500">Artist</Link>
                        <Link href="/products" onClick={toggleMenu} className="hover:text-zinc-500">Art's</Link>

                        <div className="border-l-4 border-black pl-4 my-2 flex flex-col gap-4 text-lg">
                            <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Category</p>
                            <Link href="/product/bronze" onClick={toggleMenu}>Bronze</Link>
                            <Link href="/product/metal" onClick={toggleMenu}>Metal</Link>
                            <Link href="/product/glass" onClick={toggleMenu}>Glass Art</Link>
                            <Link href="/product/premium" onClick={toggleMenu}>Premium</Link>
                        </div>

                        <Link href="/cart" onClick={toggleMenu} className="flex items-center gap-2 hover:text-zinc-500">
                            <IoCartOutline size={25} /> Cart
                        </Link>
                        <Link href="/about" onClick={toggleMenu} className="hover:text-zinc-500">About</Link>
                        <Link href="/contact" onClick={toggleMenu} className="hover:text-zinc-500">Contact</Link>
                    </div>

                    <div className="mt-auto p-8 border-t-4 border-black bg-zinc-50">
                        {session ? (
                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-bold truncate">{session.user?.email}</span>
                                <div className="flex justify-between items-center">
                                    <Link href="/admin" onClick={toggleMenu} className="flex items-center gap-2 font-bold">
                                        <CgProfile size={24} /> Profile
                                    </Link>
                                    <button
                                        onClick={() => { signOut({ callbackUrl: "/" }); toggleMenu() }}
                                        className="text-red-500 flex items-center gap-1 font-bold"
                                    >
                                        <TbLogout size={24} /> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" onClick={toggleMenu} className="flex items-center gap-2 text-xl font-black uppercase">
                                <CgProfile size={24} /> Login
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}