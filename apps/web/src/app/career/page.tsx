/* app/career/page.tsx */
"use client";
import React from "react";
import Navbar from "@/app/_components/Navbar";
import { useRouter, useParams } from "next/navigation";
import JobCard from "@/app/_components/JobCard";
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function CareerPage() {
  const router = useRouter(); 
  /* dummy data */
  const recommended = [
    { company: "PT Keren", title: "Pengrajin Bunga", location: "Bandung", time: "3 Bulan", salary: "Rp 5.000.000", path: "#" },
    { company: "PT Keren", title: "Penata Tanaman", location: "Bekasi", time: "6 Bulan", salary: "Rp 5.000.000", path: "#" },
    { company: "PT Keren", title: "Pengisi Acara", location: "Bandung", time: "6 Bulan", salary: "Rp 5.000.000", path: "#" },
  ];

  const otherCareer = [
    { 
        name: 'Barista', 
        icon: '/barista.png'
    },
    { 
        name: 'Floris',
        icon: '/floris.png'
    },
    { 
        name: 'Koki',
        icon: '/koki.png'
     },
  ];
  const listRef = useRef<HTMLDivElement>(null);
  const scrollByCard = (dir: "left" | "right") => {
    if (!listRef.current) return;
    const cardWidth = listRef.current.firstElementChild?.clientWidth ?? 0;
    listRef.current.scrollBy({
      left: dir === "left" ? -cardWidth - 32 /* gap-x */ : cardWidth + 32,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Navbar />

      <main className="mt-10 px-6 md:px-24 lg:px-40 xl:px-56 w-full overflow-hidden">
        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Cari Pekerjaan <br /> Impianmu!
            </h1>

            {/* search */}
            <div className="relative mt-8 max-w-md">
              <input
                type="text"
                placeholder="Cari pekerjaan..."
                className="w-full bg-[#DCDDFF] rounded-xl border px-4 py-1.5 pr-9 text-base lg:text-lg outline-none focus:ring-2 focus:ring-black"
              />
              <img src="/search.png" alt="search icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            </div>
          </div>

          <img src="/career.png" alt="ilustrasi"
            className="mx-auto md:w-70"
          />
        </section>

        {/* REKOMENDASI UTAMA */}
        <section className="mt-14">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Rekomendasi pekerjaan berdasarkan jalur belajar
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-items-center justify-center md:mx-8 lg:mx-14">
            {recommended.map((job) => (
              <JobCard key={job.title} {...job} />
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-xs font-semibold mt-4 text-[#6669E3] underline hover:scale-105">
                Lihat lebih banyak →
            </button>
          </div>
        </section>

        {/* CAROUSEL JOB LAIN */}
        <section className="mt-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Lihat pekerjaan dari jalur belajar lain
            </h2>
            
          </div>
          <div className="relative mb-5 md:mx-5 lg:mx-10" >
            <button
              onClick={() => scrollByCard("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            <div ref={listRef}
              className="mx-10 overflow-x-auto scroll-smooth
                [&::-webkit-scrollbar]:hidden scrollbar-width:none grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center justify-center">
              {otherCareer.map((c) => {
                return (
                  <div
                    key={c.name}
                    className="
                      flex min-w-[240px] flex-col items-center justify-between
                      rounded-3xl p-6 text-center transition border bg-[#E9F7F0] mt-2"
                  >
                    <div className="h-36 w-52 mb-2 flex items-center justify-center">
                      <img src={c.icon} alt={c.name} className="max-h-full max-w-full" />
                    </div>
                    <h3 className="text-2xl text-[#1E1E1E]">{c.name}</h3>
                    <button 
                    onClick={() => router.push("/career/" + c.name.toLowerCase())}
                    className="mt-6 mb-2 rounded-md border border-yellow-600 bg-yellow-400 px-3 py-1 text-xs font-bold hover:bg-yellow-500 hover:scale-105">
                      Lihat Lowongan
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => scrollByCard("right")}
              className="hidden md:flex h-8 w-8 absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 flex justify-end mb-10">
            <button className="text-xs font-semibold mt-4 text-[#6669E3] underline hover:scale-105">
                Lihat semua jenis pekerjaan →
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
