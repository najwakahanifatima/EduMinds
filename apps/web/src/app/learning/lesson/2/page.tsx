"use client";
import Navbar from "@/app/_components/Navbar";
import TTSButton from "@/app/_components/TextToSpeech";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export default function LessonReadingPage() {
  const router   = useRouter();
  const { id }   = useParams<{ id: string }>();

  const lesson = {
    order: 2,
    title: "Komunikasi yang Baik",
    image: "/communication.png",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices metus in elit ultricies suscipit eleifend et magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      "Morbi ut vehicula justo. Maecenas euismod et nunc sit amet finibus. Cras at lacus vel lectus ultricies pulvinar. Quisque dignissim ipsum in viverra pharetra. In vestibulum vel ex non aliquet. Donec tristique blandit ornare.",
    ],
    bullets: ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
  };

  const tts = [lesson.title, ...lesson.paragraphs, ...lesson.bullets].join(". ");

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 md:px-8 py-6">
        <p className="text-base text-gray-600">
          Pelajaran {lesson.order}
        </p>
        <div className="mt-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">
            {lesson.title}
          </h1>
          <TTSButton text={tts} />
        </div>

        <section className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="flex justify-center items-center md:col-span-1">
            <img src={lesson.image} alt="communication" className="rounded-lg h-44 w-44 md:h-52 md:w-52" />
          </div>

          <article className="space-y-6 text-justify text-[15px] leading-relaxed md:col-span-2">
            {lesson.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <ul className="list-disc pl-5">
              {lesson.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        </section>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => router.push("/lesson/")}
            className="text-sm font-semibold text-[#1A1C7B] underline hover:scale-105"
          >
            Ganti metode belajar
          </button>

          <button
            onClick={() => router.push("/lesson/" + (id + 1))}
            className="self-end rounded-md bg-[#EDCD50] px-8 py-2 text-sm font-semibold
                       text-gray-900 shadow-2xl hover:scale-105 border border-[#1E1E1E]"
          >
            Lanjutkan
          </button>
        </div>
      </main>
    </>
  );
}
