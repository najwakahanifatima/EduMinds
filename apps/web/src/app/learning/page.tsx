"use client";

import React from "react";
import Navbar from "@/app/_components/Navbar";
import LearningItemCard from "@/app/_components/LearningItemCard";

export default function LearningPage() {
  const progress = 0.12;

  /* data dummy */
  const items = [
    { id: 1, idx : 1, type: "lesson", title: "Komunikasi yang Baik", completed: true },
    { id: 2, idx : 1, type: "task",   title: "Komunikasi yang Baik", completed: false },
    { id: 3, idx : 2, type: "lesson", title: "Teknik Merangkai Bunga", completed: false },
    { id: 4, idx : 2, type: "task",   title: "Teknik Merangkai Bunga", completed: true },
  ];

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full px-4 md:px-8 py-6">
        <section className="mt-12 mb-8 rounded-2xl border-2 border-black bg-[#D5D6FF] p-6 max-w-xl lg:max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src="./floris.png"
              alt="bouquet"
              className="h-10 w-10"
            />
            <h2 className="text-2xl font-semibold text-black">Floris</h2>
          </div>

          <div className="mt-6">
            <p className="mb-2 font-semibold text-gray-900">Progres:</p>

            <div className="h-3 w-full overflow-hidden rounded-full border-2 bg-[#1C245B]">
              <div
                className="h-full rounded-full bg-[#B3EBCE]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <p className="mt-1 text-sm font-semibold text-[#1C245B]">
              {(progress * 100).toFixed(0)}%
            </p>
          </div>
        </section>

        <div id="LearningList" className="space-y-8 max-w-xl lg:max-w-2xl mx-auto">
          {items.map((it, i) => (
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
        </div>
      </main>
    </>
  );
}
