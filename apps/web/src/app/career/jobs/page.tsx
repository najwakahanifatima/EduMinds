"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import Button from "@/app/_components/Button";

/* —— dummy data (ganti fetch API, sesuaiin idnya) —— */
const job = {
  title: "Barista",
  company: "PT Keren",
  hero: "/job.png",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices metus in elit ultricies suscipit eleifend et magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  tasks: ["List pekerjaan 1", "List pekerjaan 2", "List pekerjaan 3", "List pekerjaan 4"],
  requirements: ["List persyaratan 1", "List persyaratan 2", "List persyaratan 3", "List persyaratan 4"],
};

export default function JobDetailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <img
          src={job.hero}
          alt={job.title}
          className="mx-auto h-56 w-full max-w-lg rounded-3xl object-cover border"
        />

        <h1 className="mt-8 text-center text-2xl font-bold">
          {job.title} di {job.company}
        </h1>

        <section className="mt-10 space-y-4 text-[15px] leading-relaxed">
          <h2 className="font-semibold">Deskripsi singkat perusahaan</h2>
          <p>{job.about}</p>

          <h2 className="mt-8 font-semibold">Apa yang akan kamu kerjakan</h2>
          <ul className="list-disc pl-5">
            {job.tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-semibold">Persyaratan</h2>
          <ol className="list-decimal pl-5">
            {job.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>

        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:justify-between">
          <Button
            bgColor="#EDCD50"
            onClick={() => router.push("/career/available-jobs")}
          >
            Lihat pekerjaan lain
          </Button>

          <Button
            bgColor="#B3EBCE"
            onClick={() => alert(`Melamar ${job.title}`)}
          >
            Lamar sekarang
          </Button>
        </div>
      </main>
    </div>
  );
}
