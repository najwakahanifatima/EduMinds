"use client";

import { useState } from "react";
import NavbarSupervisor from "@/app/_components/NavbarSupervisor";
import { PencilIcon } from "@heroicons/react/24/solid";

export default function SupervisorProfile() {
  /* dummy state  */
  const [profile] = useState({
    name: "Jane Doe",
    email: "gracedoe@email.com",
    birth: "05/07/03",
    experience: "Menjadi floris selama 5 tahun",
    avatar: "/pendamping2.png",
  });

  return (
    <div className="min-h-screen bg-white">
      <NavbarSupervisor />

      <main className="mx-auto w-full max-w-xl px-6 py-10">
        <div className="relative mb-22">
          <div className="h-48 w-full overflow-hidden rounded-3xl bg-[#3D3FA0] border-2 border-[#1E1E1E]">
            <img src="/landing-page-bg.png" alt="" className="h-full w-full object-cover" />
          </div>

          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-40 h-40">
            <img
              src={profile.avatar}
              className="h-full w-full rounded-xl border border-[#1E1E1E] object-cover"
            />
            <button className="absolute -right-2 bottom-0 rounded-full bg-[#C2EED7] p-1 shadow hover:scale-105">
              <img src="/camera.png" className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>

        <h1 className="mb-5 text-center text-xl font-semibold">{profile.name}</h1>

        <form className="space-y-8">
          <Field label="Nama Lengkap" value={profile.name} />
          <Field label="Alamat Email" value={profile.email} />
          <Field label="Tanggal Lahir" value={profile.birth} />
          <Field label="Pengalaman" value={profile.experience} textarea />
        </form>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:justify-between">
          <button className="w-full rounded-md border border-[#1E1E1E] bg-[#EDCD50] py-2 text-sm font-bold hover:scale-105 sm:w-48">
            Ubah Data Diri
          </button>
          <button className="w-full rounded-md border border-[#1E1E1E] bg-[#EDCD50] py-2 text-sm font-bold hover:scale-105 sm:w-48">
            Ubah Kata Sandi
          </button>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  textarea = false,
}: {
  label: string;
  value: string;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          readOnly
          rows={3}
          className="w-full resize-none rounded-lg bg-[#DCDDFF]/65 px-4 py-2 text-sm outline-none border border-[#1E1E1E]/45"
        />
      ) : (
        <input
          type="text"
          value={value}
          readOnly
          className="w-full rounded-lg bg-[#DCDDFF]/65 px-4 py-2 text-sm outline-none border border-[#1E1E1E]/45"
        />
      )}
    </div>
  );
}
