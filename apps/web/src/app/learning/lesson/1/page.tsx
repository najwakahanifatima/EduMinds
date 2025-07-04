"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import VideoPlayer from "@/app/_components/VideoPlayer";

export default function LessonVideoPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const lesson = {
    order: 1,
    title: "Komunikasi yang Baik",
    video: "/sample.mp4",
  };
  const currentId = parseInt(id ?? "", 10);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 md:px-8 py-6">
        <p className="text-sm text-gray-600">
          Pelajaran {lesson.order}
        </p>
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">
          {lesson.title}
        </h1>

        <VideoPlayer src={lesson.video} />
        <div className="mt-6 flex items-center justify-between">
            <button
                onClick={() => alert("Pilih metode lain")}
                className="mt-4 text-sm font-semibold text-[#1A1C7B] underline hover:text-indigo-900"
            >
                Ganti metode belajar
            </button>

            <button
                onClick={() => router.push(`/learning/lesson/${currentId + 1}`)}
                className="rounded-md bg-[#EDCD50] px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-500/80"
            >
                Lanjutkan
            </button>
        </div>
      </main>
    </>
  );
}

//todo: fix routing to next lesson
