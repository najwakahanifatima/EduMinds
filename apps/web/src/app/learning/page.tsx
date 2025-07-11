"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../_components/Navbar";
import LearningItemCard from "../_components/LearningItemCard";
import Button from "../_components/Button";

export default function LearningPage() {
  const router = useRouter();
  const progress = 0.23;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState("Normal");
  const [currentMood, setCurrentMood] = useState("");
  
  interface LearningItem {
    id: number;
    idx: number;
    type: "lesson" | "task";
    title: string;
    completed: boolean;
  }

  const items: LearningItem[] = [
    { id: 1, idx: 1, type: "lesson", title: "Komunikasi yang Baik", completed: true },
    { id: 2, idx: 1, type: "task", title: "Komunikasi yang Baik", completed: true },
    { id: 3, idx: 2, type: "lesson", title: "Dasar Memahami Pelanggan", completed: false },
    { id: 4, idx: 2, type: "task", title: "Dasar Memahami Pelanggan", completed: false },
    { id: 5, idx: 3, type: "lesson", title: "Mempelajari Bunga", completed: false },
    { id: 6, idx: 3, type: "task", title: "Mempelajari Bunga", completed: false },
    { id: 7, idx: 4, type: "lesson", title: "Filosofi Bunga", completed: false },
    { id: 8, idx: 4, type: "task", title: "Filosofi Bunga", completed: false },
  ];

  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
    if (mood === "senang") {
      setSelectedSpeed("Normal");
    } else if (mood === "biasa") {
      setSelectedSpeed("Santai");
    } else if (mood === "tidak_senang") {
      setSelectedSpeed("Pelan");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="mx-auto w-full px-4 md:px-8 py-6">
        <section className="mt-12 mb-8 rounded-2xl border-2  bg-[#D5D6FF] p-6 max-w-xl lg:max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src="./Florist.png"
              alt="bouquet"
              width={40}
              height={40}
            />
            <h2 className="text-2xl font-semibold text-black">Floris</h2>
          </div>
          <div className="mt-6">
            <p className="mb-2 font-semibold text-gray-900">Progres:</p>
            <div className="h-3 w-full overflow-hidden rounded-full border-2 border-[#1E1E1E] bg-[#1C245B]">
              <div
                className="h-full rounded-full bg-[#B3EBCE]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="mt-1 text-sm font-semibold text-right text-[#1C245B]">
              {(progress * 100).toFixed(0)}%
            </p>
          </div>
        </section>

        <section className="mb-6 max-w-xl lg:max-w-2xl mx-auto">
          <div className="rounded-2xl border-2 border-[#1E1E1E] bg-[#D5D6FF] p-4">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className="py-1">
                <p className="text-sm font-medium text-gray-900">Sesuaikan kecepatan belajar dengan kondisimu saat ini</p>
                <p className="text-sm text-gray-600">Kecepatan belajar saat ini: {selectedSpeed}</p>
              </div>
              <button className="text-gray-600 hover:text-gray-800">
                <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {isDropdownOpen && (
              <div className="mt-6 mb-2">
                <p className="text-sm font-medium text-gray-900 mb-3">Bagaimana perasaanmu saat ini?</p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleMoodSelect("senang")} className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${currentMood === "senang" ? "bg-green-100 border-green-500 text-green-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                    <img src="/ri_emotion-happy-line.png" className="w-6 h-6" /><span className="text-sm">Senang</span>
                  </button>
                  <button onClick={() => handleMoodSelect("biasa")} className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${currentMood === "biasa" ? "bg-yellow-100 border-yellow-500 text-yellow-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                  <img src="/ri_emotion-normal-line.png" className="w-6 h-6" /><span className="text-sm">Biasa saja</span>
                  </button>
                  <button onClick={() => handleMoodSelect("tidak_senang")} className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${currentMood === "tidak_senang" ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                  <img src="/ri_emotion-unhappy-line.png" className="w-6 h-6" /><span className="text-sm">Tidak senang</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <div id="LearningList" className="space-y-4 max-w-xl lg:max-w-2xl mx-auto">
          {items.map((it) => (
            <LearningItemCard
              key={it.id}
              idx={it.idx}
              type={it.type}
              title={it.title}
              completed={it.completed}
              onStart={() => console.log("Mulai", it.title)}
              onReview={() => console.log("Ulangi", it.title)}
              onResult={() => console.log("Lihat hasil", it.title)}
            />
          ))}
          
          {/* Ujian Sertifikasi using LearningItemCard */}
          <LearningItemCard
            idx={0}
            type="task"
            title="Ujian Sertifikasi"
            onStart={() => router.push("/pre-assessment/question")}
            overrideLabel="Ujian"
            overrideClassName="border-[#1E1E1E] bg-[#EDD57A]"
          />

          {/* Sertifikat Siap */}
          <div className="rounded-2xl border-2 border-[#1E1E1E] bg-[#EDD57A] p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-lg flex items-center justify-center">
                 <img src="/diploma.png" alt="Sertifikat" width={120} height={120} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Sertifikatmu Sudah Siap!</h3>
              <p className="text-sm text-gray-700">Kamu sudah menyelesaikan jalur belajar ini. Hebat!</p>
            </div>
            <Button bgColor="#5254A8" textColor="#FFFFFF" fontWeight="font-medium">
              Simpan Sertifikat
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
