"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/_components/Navbar";
import JobCard from "@/app/_components/JobCard";
import { getJobs } from "@/lib/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type Job = {
  id: number;
  imageUrl: string | null;
  company: string | null;
  title: string | null;
  location: string | null;
  time: string | null;
  salary: string | null;
  description: string | null;
  tasks: string[] | null;
  requirements: string[] | null;
};

const LOCATIONS = ["Semua Lokasi", "Bandung", "Bekasi", "Jakarta"];

export default function JobExplorePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk filter
  const [query, setQuery] = useState("");
  const [loc, setLoc] = useState(LOCATIONS[0]);
  
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const data = await getJobs(query, loc);
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce untuk menunda eksekusi fetch selama 500ms setelah user berhenti mengetik
    const handler = setTimeout(() => {
        fetchJobs();
    }, 500);

    // Membersihkan timeout jika user mengetik lagi sebelum 500ms tercapai
    return () => {
        clearTimeout(handler);
    };
  }, [query, loc]);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <h1 className="mb-8 text-center text-3xl font-semibold">Cari Pekerjaan</h1>

        {/* Bagian Filter */}
        <div className="mb-10 flex flex-wrap gap-4 justify-center">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul pekerjaan..."
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
            <img alt="dropdown-icon" src="/dropdown.png" className="absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        {/* Bagian Daftar Pekerjaan */}
        {isLoading ? (
            <p className="text-center text-gray-500">Memuat lowongan...</p>
        ) : jobs.length > 0 ? (
          <div className="md:mx-2 lg:mx-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {jobs.map((j) => (
              <JobCard
                key={j.id}
                company={j.company ?? "Perusahaan"}
                title={j.title ?? "Tanpa Judul"}
                location={j.location ?? "Remote"}
                time={j.time ?? "Penuh Waktu"}
                salary={j.salary ?? "N/A"}
                path={`/career/jobs/${j.id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada lowongan yang sesuai dengan pencarian Anda.</p>
        )}
      </main>
    </>
  );
}