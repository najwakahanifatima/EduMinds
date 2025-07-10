"use client";

import { useRouter } from "next/navigation";

export type Student = {
  id: number;
  name: string;
  avatar: string;
};

export default function StudentCard({ stu }: { stu: Student }) {
  const router = useRouter();

  return (
    <div
      className="
        relative flex items-start justify-between gap-6
        rounded-2xl border-2 border-[#15246E] bg-[#FFF4BE] py-6 px-10
        shadow-[0px_2px_0_rgba(30,30,30,1)]
        before:absolute before:inset-y-0 before:left-0 before:w-3
        before:rounded-l-2xl before:bg-[#15246E]
      "
    >
      <div>
        <p className="mb-3 text-xs">Informasi Pelajar</p>
        <div className="flex items-center gap-4">
          <img src={stu.avatar} alt={stu.name} className="h-10 w-10 rounded-full border" />
          <h3 className="text-lg font-semibold">{stu.name}</h3>
        </div>
      </div>

      <div className="flex w-48 flex-col gap-2">
        <button
          onClick={() => router.push(`/students/perkembangan`)}
          className="rounded-lg bg-[#374394] border border-[#1E1E1E] py-1 text-xs font-medium text-white hover:scale-105 shadow-[0.5px_1.5px_0_rgba(30,30,30,1)]"
        >
          Lihat Perkembangan
        </button>

        <button
          onClick={() => router.push(`/students/task-detail`)}
          className="rounded-lg bg-[#BFC1FF] border border-[#1E1E1E] py-1 text-xs font-medium text-[#1E1E1E] hover:scale-105 shadow-[0.5px_1.5px_0_rgba(30,30,30,1)]"
        >
          Lihat Detail Tugas
        </button>
      </div>
    </div>
  );
}
