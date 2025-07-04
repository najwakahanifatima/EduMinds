/* app/career/page.tsx */
"use client";
import React from "react";
import Navbar from "@/app/_components/Navbar";
import JobCard from "@/app/_components/JobCard";
import Image from "next/image";

export default function CareerPage() {
  /* dummy data */
  const recommended = [
    { company: "PT Keren", title: "Pengrajin Bunga", location: "Bandung", time: "3 Bulan", salary: "Rp 5.000.000", path: "#" },
    { company: "PT Keren", title: "Penata Tanaman", location: "Bekasi", time: "6 Bulan", salary: "Rp 5.000.000", path: "#" },
    { company: "PT Keren", title: "Pengisi Acara", location: "Bandung", time: "6 Bulan", salary: "Rp 5.000.000", path: "#" },
  ];

  const otherJobs = [
    { title: "Barista" },
    { title: "Koki" },
    { title: "Teknisi" },
  ];

  return (
    <>
      <Navbar />

      <main className="px:10 md:px-20 w-full overflow-hidden">
        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-gray-900">
              Cari Pekerjaan <br /> Impianmu!
            </h1>

            {/* search */}
            <div className="relative mt-8 max-w-xs">
              <input
                type="text"
                placeholder="Cari pekerjaan..."
                className="w-full bg-[#DCDDFF] rounded-xl border px-4 py-1.5 pr-9 text-sm outline-none focus:ring-2 focus:ring-black"
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
        <section className="mt-10">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Rekomendasi pekerjaan berdasarkan jalur belajar
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center justify-center">
            {recommended.map((job) => (
              <JobCard key={job.title} {...job} />
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-xs font-semibold mt-4 text-[#6669E3] underline">
                Lihat lebih banyak →
            </button>
          </div>
        </section>

        {/* CAROUSEL JOB LAIN */}
        <section className="mt-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Lihat pekerjaan dari jalur belajar lain
            </h2>
          </div>

          Nanti
        </section>
      </main>
    </>
  );
}
