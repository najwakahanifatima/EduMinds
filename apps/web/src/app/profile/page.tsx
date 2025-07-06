"use client";

import { useState } from "react";
import Navbar from "@/app/_components/Navbar";

const student = {
  avatar: "/pendamping2.png",
  name: "Grace Doe",
  email: "gracedoe@email.com",
  birth: "05/07/03",
};
const careerMain = { title: "Floris", progress: 36, image:"/floris.png" };
const careerOthers = [
  { title: "Barista", progress: 23, image:"/barista.png" },
  { title: "Koki", progress: 15, image:"/koki.png" },
];
const certificates = [
  { title: "Sertifikat Floris", img: "/diploma.png", badge: "/floris.png" },
  { title: "Sertifikat Barista", img: "/diploma.png", badge: "/barista.png" },
  { title: "Sertifikat Koki", img: "/diploma.png", badge: "/koki.png" },
];


export default function StudentProfile() {
  const [tab, setTab] = useState<"data" | "career" | "cert">("data");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        <HeaderSection />
        <TabBar tab={tab} setTab={setTab} />

        <div className="mx-auto max-w-xl">
            {tab === "data" && <DataTab />}
            {tab === "career" && <CareerTab />}
            {tab === "cert" && <CertTab />}
        </div>
      </main>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="relative mb-26">
        <div className="h-48 w-full overflow-hidden rounded-3xl bg-[#3D3FA0] border-2 border-[#1E1E1E]">
        <img src="/landing-page-bg.png" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-40 h-40">
        <img
            src={student.avatar}
            className="h-full w-full rounded-xl border border-[#1E1E1E] object-cover"
        />
        <button className="absolute -right-2 bottom-0 rounded-full bg-[#C2EED7] p-1 shadow hover:scale-105">
            <img src="/camera.png" className="h-6 w-6 text-gray-700" />
        </button>
        </div>
    </div>
  );
}


function TabBar({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (t: "data" | "career" | "cert") => void;
}) {
  const base =
    "rounded-full px-6 py-1 text-xs transition-colors h-8 w-45 border border-[#1E1E1E]";
  const active = "bg-[#15246E] text-white";
  const idle = "bg-[#BFC1FF] hover:opacity-90 text-[#1E1E1E]";

  return (
    <div className="mb-10 flex justify-center gap-6">
      <button className={`${base} ${tab === "data" ? active : idle}`} onClick={() => setTab("data")}>
        Data Diri
      </button>
      <button className={`${base} ${tab === "career" ? active : idle}`} onClick={() => setTab("career")}>
        Progres Karir
      </button>
      <button className={`${base} ${tab === "cert" ? active : idle}`} onClick={() => setTab("cert")}>
        Sertifikat
      </button>
    </div>
  );
}


function DataTab() {
  return (
    <div className="space-y-8">
      <Field label="Nama Lengkap" value={student.name} />
      <Field label="Alamat Email" value={student.email} />
      <Field label="Tanggal Lahir" value={student.birth} />

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:justify-between">
        <button className="w-full rounded-lg border border-[#1E1E1E] bg-[#EDCD50] py-2 text-sm font-semibold hover:scale-105 sm:w-48">
          Ubah Data Diri
        </button>
        <button className="w-full rounded-lg border border-[#1E1E1E] bg-[#EDCD50] py-2 text-sm font-semibold hover:scale-105 sm:w-48">
          Ubah Kata Sandi
        </button>
      </div>
    </div>
  );
}

function CareerTab() {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-semibold mb-2">Karir Utama</h3>
        <CareerCard {...careerMain} variant="primary" />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Karir Lain yang Diambil</h3>
        {careerOthers.map((c, idx) => (
            <CareerCard key={idx} {...c} variant="secondary" />
        ))}
      </div>

      <button className="mx-auto mt-6 block rounded-lg border border-[#1E1E1E] bg-[#EDCD50] px-10 py-2 text-sm font-semibold hover:scale-105">
        Ganti Karir
      </button>
    </div>
  );
}

function CertTab() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((c) => (
        <div key={c.title} className="flex flex-col items-center gap-4">
          <div className="relative bg-[#B3EBCE]/50 border rounded-lg border-[#1E1E1E] p-5">
            <img src={c.img} className="h-20 w-32 object-contain" />
            <img src={c.badge} className="absolute -right-2 -top-2 h-9 w-9" />
          </div>
          <p className="text-sm font-semibold">{c.title}</p>
          <button className="rounded-md border border-[#1E1E1E] bg-[#EDCD50] px-8 py-1 text-xs hover:scale-105">
            Lihat
          </button>
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{label}</p>
      <input
        type="text"
        readOnly
        value={value}
        className="w-full rounded-lg bg-[#DCDDFF] border border-[#1E1E1E]/45 px-4 py-2 text-sm outline-none"
      />
    </div>
  );
}


function CareerCard({
  title,
  progress,
  image,
  variant,
}: {
  title: string;
  progress: number;
  variant: "primary" | "secondary";
}) {
  const bg = variant === "primary" ? "bg-[#FFEEAB]/75" : "bg-[#B3EBCE]/50";
  return (
    <div className={`${bg} flex items-start gap-4 w-full border border-[#1E1E1E] rounded-2xl p-5 mb-4`}>
      <img src={image} className="h-20 w-32 object-contain" />
      <div className="w-full mr-2 h-full">
        <p className="mb-4 font-bold">{title}</p>
        <div className="h-2 w-full rounded-full bg-[#1C245B]">
            <div
            style={{ width: `${progress}%` }}
            className="h-full border border-[#1C245B] rounded-full bg-[#7375F3]"
            ></div>
        </div>
        <p className="mt-1 text-right text-xs font-semibold">{progress}%</p>
      </div>
    </div>
  );
}
