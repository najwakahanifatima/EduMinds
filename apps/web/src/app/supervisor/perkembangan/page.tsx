"use client";

import NavbarSupervisor from "@/app/_components/NavbarSupervisor";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const student = {
    id: 1,
    name: "Grace Doe",
    avatar: "/no-profile.png",
    progress: 30,
    avgScore: 85,
    competency: "Menengah",
    pie: { correct: 40, blank: 20, wrong: 40 },
    bars: [80, 65, 100, 90, 85],
};

const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="rounded-2xl text-[#1C245B] bg-[#CACBFF] border border-[#6669E3] px-6 py-4 text-center">
        <p className="text-2xl font-semibold mb-1">{value}</p>
        <p className="text-xs">{label}</p>
    </div>
);

export default function StudentProgressPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSupervisor />

      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        {/* header card */}
        <div className="rounded-3xl bg-[#3D3FA0] border-2 border-[#1E1E1E] p-6 text-white flex items-center gap-6 mb-14">
          <img src={student.avatar} className="h-20 w-20 rounded-full bg-gray-300" />
          <div className="flex-1 ml-4">
            <h1 className="text-2xl font-semibold">{student.name}</h1>
            <button
              onClick={() => router.push(`/supervisor/${student.id}/tasks`)}
              className="mt-4 block w-120 rounded-md bg-[#B3EBCE] py-1 text-sm text-gray-900 font-medium border-[#1E1E1E] border hover:bg-emerald-400"
            >
              Lihat Detail Tugas 
              <img src="/assignment.png" className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        </div>

        <h2 className="mb-6 text-lg font-semibold">Statistik Keseluruhan</h2>
        <section className="grid gap-10 md:grid-cols-[240px_1fr]">
            <div className="space-y-4">
                <StatCard value={`${student.progress}%`} label="Progres Belajar" />
                <StatCard value={`${student.avgScore}`} label="Nilai Rata-rata" />
                <StatCard value={student.competency} label="Tingkat Kompetensi" />
            </div>

            {/* pie chart */}
            <div className="mt-8 grid gap-6 md:grid-cols-3 md:items-start">
            <div className="md:col-span-2 flex justify-center">
              <div
                className="relative h-60 w-60 rounded-full border border-black
                          shadow-[0_0_0_1px_black_inset]"
                style={{
                  background: `conic-gradient(
                    #83D8B6 0% ${student.pie.correct}%,
                    #F1D66F ${student.pie.correct}% ${student.pie.correct + student.pie.blank}%,
                    #E06060 ${student.pie.correct + student.pie.blank}% 100%
                    )`,
                  }}
              />
            </div>
            <ul className="space-y-2 text-sm md:col-span-1">
              <li className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#83D8B6]" />
                Jawaban benar ({student.pie.correct}%)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#F1D66F]" />
                Jawaban kosong  ({student.pie.blank}%)
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-[#E06060]" />
                Jawaban salah ({student.pie.wrong}%)
              </li>
            </ul>
          </div>
        </section>
        
        <section className="mt-14">
          <h2 className="mb-5 text-lg font-semibold">Perkembangan Belajar</h2>

          <div className="rounded-2xl border-2 border-[#1E1E1E] p-6">
            {/* wadah grafik */}
            <div className="flex h-56 items-end justify-around">
              {student.bars.map((val, i) => (
                <div           /* wrapper tiap kolom: tinggi penuh */
                  key={i}
                  className="flex h-full flex-col items-center justify-end"
                >
                  {/* batang */}
                  <div
                    className="w-10 rounded-t bg-[#EDCD50] border border-[#1E1E1E]"
                    /* gunakan persen dari tinggi container */
                    style={{ height: `${val}%` }}
                  />
                  <span className="mt-2 text-xs">{`Tugas ${i + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
