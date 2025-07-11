"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const activeNav = (prefix: string): string =>
    pathname === prefix || pathname.startsWith(prefix + "/")
      ? "rounded-full bg-[#EDCD50]/65 px-4 py-1 font-semibold text-gray-900"
      : "button-navbar-off";

  const activePendamping = (): string => {
    const pendampingRoutes = ["/search-supervisor", "/supervisor-detail", "/pendamping", "/supervisor"];
    const isActive = pendampingRoutes.some(route =>
      pathname === route || pathname.startsWith(route + "/")
    );
    return isActive
      ? "rounded-full bg-[#EDCD50]/65 px-4 py-1 font-semibold text-gray-900"
      : "button-navbar-off";
  };

  const [openCareer, setOpenCareer] = useState(false);
  const [openPendamping, setOpenPendamping] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const careerRef = useRef<HTMLDivElement>(null);
  const pendampingRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        careerRef.current &&
        !careerRef.current.contains(e.target as Node)
      ) {
        setOpenCareer(false);
      }
      if (
        pendampingRef.current &&
        !pendampingRef.current.contains(e.target as Node)
      ) {
        setOpenPendamping(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur">
      <div className="mx-4 md:mx-6 lg:mx-8 flex border-b-2 flex-row items-center justify-between px-2 sm:px-4 md:px-6 py-2">
        <div className="flex flex-row items-center gap-8">
          <button onClick={() => router.push("/")}>
            <img src="/logo-cropped.png" alt="EduMinds" className="h-4 w-auto scale-[1.05] sm:h-5 sm:scale-[1.15] md:h-6 md:scale-100 lg:h-7 origin-left"/>
          </button>
          <button onClick={() => router.push("/supervisor")} className={`${activeNav("/supervisor")} inline`}>
            Beranda
          </button>
          <button
            onClick={() => router.push("/schedule")}
            className={activeNav("/schedule")}
          >
            Lihat Jadwal
          </button>
          <button
            onClick={() => router.push("/students")}
            className={activeNav("/students")}
          >
            Pelajar
          </button>
        </div>
        <div className="flex flex-row items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          <button onClick={() => router.push("/chat/supervisor")} className="p-2 hover:text-indigo-600">
            <img src="/chat.png" alt="Chat" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => router.push("/notifications")}
            className="p-2 hover:text-indigo-600">
            <img src="/bell.png" alt="Notif" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          <span className="h-6 w-px bg-gray-300" />
          <div className="hidden xl:text-right xl:block">
            <p className="text-xs text-gray-500">Halo, Calon Florist!</p>
            <p className="text-sm font-medium text-indigo-700">Grace Doe</p>
          </div>
          
          <div ref={profileRef} className="relative">
            <button onClick={() => setOpenProfile((s) => !s)}>
              <img
                src="/dummy-profile.png"
                alt="profile"
                className="h-8 w-8 rounded-full bg-green-200 object-cover"
              />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-gray-800 bg-white shadow-lg">
                <button
                  onClick={() => {
                    router.push("/supervisor-profile");
                    setOpenProfile(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-[#EDCD50]/65"
                >
                  Lihat Profil
                </button>
                <button
                  onClick={() => {
                    // LOGOUT
                    router.push("/");
                    setOpenProfile(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-[#EDCD50]/65"
                >
                  Keluar Akun
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}