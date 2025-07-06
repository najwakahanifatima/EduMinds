"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarSupervisor from "@/app/_components/NavbarSupervisor";
import TaskCard, { Task } from "@/app/_components/TaskCard";
import { MagnifyingGlassIcon, FunnelIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

const student = {
    id: 1,
    name: "Grace Doe",
    avatar: "/no-profile.png",
};

const tasks: Task[] = [
  { id: 1, number: 1, title: "Komunikasi yang Baik", score: 85, reviewed: true },
  { id: 2, number: 2, title: "Dasar Memahami Pelanggan", score: 65, reviewed: false },
  { id: 3, number: 3, title: "Mempelajari Bunga", score: 55, reviewed: false },
];

export default function TaskListPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <NavbarSupervisor />

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-3xl bg-[#3D3FA0] border-2 border-[#1E1E1E] p-6 text-white flex items-center gap-6 mb-14">
          <img src={student.avatar} className="h-20 w-20 rounded-full bg-gray-300" />
          <div className="flex-1 ml-4">
            <h1 className="text-2xl font-semibold">{student.name}</h1>
            <button
              onClick={() => router.push(`/supervisor/perkembangan`)}
              className="mt-4 block w-180 rounded-md bg-[#B3EBCE] py-1 text-sm text-[#1E1E1E] font-medium border-[#1E1E1E] border hover:bg-emerald-300"
            >
              Lihat Perkembangan
              <img src="/progress.png" className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        </div>

        <h2 className="mb-4 text-lg font-semibold">Daftar Tugas</h2>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="relative ">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tugas…"
              className="w-80 rounded-xl border bg-[#DCDDFF] py-1.5 pl-4 pr-9 text-sm outline-none"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
          </div>
          <button className="flex items-center gap-1 rounded-md border bg-[#EDCD50] px-3 py-1 text-xs font-semibold">
            <img src="/filter.png" className="h-4 w-4" />
            Filter
          </button>

          <button className="flex items-center gap-1 rounded-md border bg-[#EDCD50] px-3 py-1 text-xs font-semibold">
            <ArrowsUpDownIcon className="h-4 w-4" />
            Urutkan
          </button>
        </div>

        <div className="space-y-8">
          {filtered.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>

        <div className="mt-6 text-right">
          <button className="text-xs font-semibold text-indigo-700 underline hover:scale-105">
            Lihat lebih banyak →
          </button>
        </div>
      </main>
    </div>
  );
}
