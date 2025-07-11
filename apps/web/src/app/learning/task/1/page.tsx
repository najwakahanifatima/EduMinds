"use client";
import Navbar from "@/app/_components/Navbar";
import TTSButton from "@/app/_components/TextToSpeech";
import { useRouter, useParams } from "next/navigation";

export default function TaskPage() {
  const router  = useRouter();
  const { id }  = useParams<{ id: string }>();

  const task = {
    order: 1,
    title: "Komunikasi yang Baik",
    prompt:
      'Bagaimana balasan yang tepat untuk kalimat “Adakah rekomendasi bunga untuk diberikan kepada orang spesial?”',
  };

  const tts = [task.title, task.prompt].join(". ");

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 md:px-8 py-6">
        <p className="text-base text-gray-600">Tugas {task.order}</p>

        <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">{task.title}</h1>
          <TTSButton text={tts} />
        </div>

        <section className="mt-10 space-y-6">
          <p className="text-[15px] leading-relaxed">{task.prompt}</p>
          <textarea
            rows={8}
            placeholder="Ketik jawaban kamu disini..."
            className="
              w-full rounded-xl border border-[#1E1E1E]/65
              bg-[#DCDDFF] p-4 text-sm outline-none"
          />
        </section>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => router.push(`/lesson/`)}
            className="text-sm font-semibold text-[#1A1C7B] underline hover:scale-105"
          >
            Ganti metode belajar
          </button>

          <button
            onClick={() => alert("Jawaban dikumpulkan!")}
            className="
              self-end rounded-md bg-[#EDCD50] px-8 py-2 text-sm font-semibold
              text-gray-900 shadow-[0.5px_1.5px_0_rgba(30,30,30,1)] border border-[#1E1E1E]
              hover:scale-105
            "
          >
            Kumpulkan
          </button>
        </div>
      </main>
    </>
  );
}
