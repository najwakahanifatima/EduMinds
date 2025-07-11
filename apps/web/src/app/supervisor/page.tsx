"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarSupervisor from "@/app/_components/NavbarSupervisor";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import StudentCard, { Student } from "@/app/_components/StudentCard";

const students: Student[] = [
  { id: 1, name: "Grace Doe", avatar: "/no-profile.png" },
  { id: 2, name: "John Smith", avatar: "/no-profile.png" },
  { id: 3, name: "John Doe", avatar: "/no-profile.png" },
];

type Event = {
  title: string;
  datetime: string;
  mentee: string;
};

const nextEvent: Event = {
  title: "Mentoring",
  mentee: "Grace Doe",
  datetime: "Rabu, 13 Juli 2025 • 13.00-14.00",
};

const EventCard = ({ event }: { event: Event }) => (
  <div className="rounded-b-xl rounded-tr-xl bg-[#C2EED7] p-4 text-sm text-gray-900">
    <div className="flex flex-row gap-1">
        <p className="font-semibold">
        {event.title}:
        </p>
        <p className="text-[#1E1E1E]/80">bersama {event.mentee}</p>
    </div>
    <p className="mt-1 text-[#1E1E1E]/80">{event.datetime}</p>
  </div>
);


export default function SupervisorDashboard() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSupervisor />

      <main className="mx-auto w-full max-w-6xl px-4 md:px-10 lg:px-20 py-10">
        <section className="rounded-3xl border-2 border-[#1E1E1E] bg-[#3D3FA0] p-8 text-white shadow-[0px_2px_0_rgba(30,30,30,1)]">
          <h1 className="text-xl md:text-2xl font-semibold">
            Selamat Datang Jane Doe!
          </h1>

          <span className="inline-block rounded-t-lg bg-[#20217A] px-3 py-1 text-xs text-[#D2D3FF] font-semibold mt-6">
            Event terdekat
          </span>

          <EventCard event={nextEvent} />
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Daftar Pelajar</h2>

            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari pelajar..."
                className="w-56 rounded-xl border bg-[#DCDDFF] py-1.5 pl-4 pr-9 text-sm outline-none focus:ring-1 focus:ring-indigo-600"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
            </div>
          </div>

          <div className="space-y-6">
            {filtered.map((stu) => (
              <StudentCard key={stu.id} stu={stu} />
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button 
            onClick={() => router.push("/students")}
            className="text-xs font-semibold text-indigo-600 underline hover:opacity-80">
              Lihat lebih banyak →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
