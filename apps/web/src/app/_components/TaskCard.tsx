/* app/_components/TaskCard.tsx */
"use client";

export type Task = {
  id: number;
  number: number;
  title: string;
  score: number;
  reviewed: boolean;
};

export default function TaskCard({ task }: { task: Task }) {
  // warna kartu & border kiri
  let bg = "bg-[#E4F0FF]";
  let bd = "border-[#4D8AC7]";
  if (task.score >= 80) {
    bg = "bg-[#DFF4ED]";
    bd = "border-[#1C7C4A]";
  } else if (task.score >= 60) {
    bg = "bg-[#FFF4D7]";
    bd = "border-[#B57900]";
  }

  const stars = Math.ceil(task.score / 20);

  return (
    <div
      className={`
        relative rounded-2xl p-6
        border-2 border-l-[10px] ${bd} ${bg}
      `}
    >
      {task.reviewed && (
        <span className="absolute right-3 top-3 rounded-lg bg-[#EDCD50]/85 px-2 py-[2px] text-[10px] text-[#1E1E1E]">
          Sudah diberi feedback
        </span>
      )}

      {/* header baris */}
      <div className="flex items-start justify-between mt-4">
        <div className="flex items-start gap-4">
          <img src="/communication.png" className="h-10 w-10" />

          <div>
            <p className="text-xs text-gray-600 font-semibold mb-px">
              Tugas {task.number}
            </p>
            <h3 className="font-bold">{task.title}</h3>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold">{task.score}</p>
          <div className="text-[#EDCD50] -ml-[2px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < stars ? "opacity-100" : "opacity-30"}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <button className="mt-4 block w-full rounded-lg bg-[#374394] py-2 text-xs font-semibold text-white shadow-[0.5px_1.5px_0_rgba(30,30,30,1)] hover:text-gray-200">
        Lihat Detail Jawaban
      </button>
    </div>
  );
}