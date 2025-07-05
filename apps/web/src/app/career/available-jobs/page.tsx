/* app/career/jobs/page.tsx */
"use client";

import { useState } from "react";
import Navbar from "@/app/_components/Navbar";
import JobCard from "@/app/_components/JobCard";
import { FunnelIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid";

type Job = {
  id: number;
  company: string;
  title: string;
  location: string;
  time: string;
  salary: string;
};
const JOBS: Job[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  company: "PT Keren",
  title: ["Pengrajin Bunga", "Penata Tanaman", "Penghias Acara"][i % 3],
  location: ["Bandung", "Bekasi", "Jakarta"][i % 3],
  time: `${(i % 3) + 3} Bulan`,
  salary: "Rp 5.000.000",
}));
const LOCATIONS = ["Semua Lokasi", "Bandung", "Bekasi", "Jakarta"];

export default function JobExplorePage() {
  const [query, setQuery] = useState("");
  const [loc, setLoc] = useState(LOCATIONS[0]);
  const [showOnlyTop, setShowOnlyTop] = useState(false);

  const filtered = JOBS.filter(
    (j) =>
      (loc === LOCATIONS[0] || j.location === loc) &&
      (!query || j.title.toLowerCase().includes(query.toLowerCase())) &&
      (!showOnlyTop || j.id < 6)
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <h1 className="mb-8 text-center text-3xl font-semibold">Cari Pekerjaan</h1>

        <div className="mb-10 flex flex-wrap gap-4 justify-center">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari pekerjaan..."
              className="w-72 rounded-xl border bg-[#DCDDFF] py-2 pl-4 pr-9 text-sm outline-none"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
          </div>

          <div className="relative">
            <select
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="w-48 appearance-none rounded-xl border bg-[#DCDDFF] py-2 pl-4 pr-8 text-sm outline-none"
            >
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <img src="/dropdown.png" className="absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 text-gray-600" />
          </div>

          <button
            onClick={() => setShowOnlyTop((s) => !s)}
            className={`flex items-center gap-1 rounded-xl border px-4 py-2 text-sm font-semibold ${
              showOnlyTop ? "bg-[#EDCD50]" : "bg-white"
            }`}
          >
            Filter <img src="/filter.png" className="h-3 w-3" />
          </button>
        </div>

        {filtered.length ? (
          <div className="md:mx-2 lg:mx-16 grid gap-8 grid-cols-2 sm:grid-cols-3 justify-items-center">
            {filtered.map((j) => (
              <JobCard
                key={j.id}
                company={j.company}
                title={j.title}
                location={j.location}
                time={j.time}
                salary={j.salary}
                path="#"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada lowongan sesuai pencarian.</p>
        )}
      </main>
    </>
  );
}