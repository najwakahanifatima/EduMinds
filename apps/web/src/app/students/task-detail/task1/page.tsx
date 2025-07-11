'use client';

import { useState } from 'react';
import NavbarSupervisor from '@/app/_components/NavbarSupervisor';

const dummyAnswerData = {
  taskId: '1',
  order: 1,
  title: 'Komunikasi yang Baik',
  prompt: 'Adakah rekomendasi bunga untuk diberikan kepada orang spesial?',
  answer: 'Mawar warna merah cocok buat orang spesial.',
};

export default function TaskFeedbackPage() {
  const [step, setStep] = useState<'answer' | 'feedback'>('answer');
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');

  return (
    <>
      <NavbarSupervisor />
      <main className="mx-auto w-full max-w-5xl px-4 md:px-8 py-6 font-sans">
        <p className="text-base text-gray-600">Tugas {dummyAnswerData.order}</p>

        <div className="mt-1 mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">
            {dummyAnswerData.title}
            {step === 'feedback' ? ' - Feedback' : ''}
          </h1>
        </div>

        {step === 'answer' ? (
          <>
            <section className="mt-6 space-y-6">
              <p className="text-[15px] leading-relaxed text-[#1E1E1E]">
                Bagaimana balasan yang tepat untuk kalimat “{dummyAnswerData.prompt}”
              </p>

              <div
                className="
                  w-full rounded-xl border border-[#1E1E1E]/65
                  bg-[#DCDDFF] p-4 text-sm text-gray-700 whitespace-pre-wrap min-h-[8rem]
                "
              >
                {dummyAnswerData.answer}
              </div>
            </section>

            <div className="mt-12 flex justify-end">
              <button
                onClick={() => setStep('feedback')}
                className="rounded-md bg-[#B3EBCE] px-8 py-2 text-sm font-semibold
                text-gray-900 shadow border border-[#1E1E1E] hover:scale-105"
              >
                Lanjut
              </button>
            </div>
          </>
        ) : (
          <>
            <section className="mt-6 space-y-6">
              <div>
                <p className="mb-2 text-sm font-medium text-[#1E1E1E]">Aspek yang sudah bagus</p>
                <textarea
                  rows={5}
                  placeholder="Masukkan feedback mengenai aspek yang sudah bagus..."
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  className="w-full rounded-xl border border-[#1E1E1E]/65 bg-[#DCDDFF] p-4 text-sm outline-none"
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-[#1E1E1E]">Tips untuk Perbaikan</p>
                <textarea
                  rows={5}
                  placeholder="Masukkan feedback mengenai tips perbaikan..."
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  className="w-full rounded-xl border border-[#1E1E1E]/65 bg-[#DCDDFF] p-4 text-sm outline-none"
                />
              </div>
            </section>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setStep('answer')}
                className="rounded-md bg-[#EDCD50] px-8 py-2 text-sm font-semibold
                text-gray-900 border border-[#1E1E1E] hover:scale-105 shadow-[0.5px_1.5px_0_rgba(30,30,30,1)]"
              >
                Kembali
              </button>

              <button
                onClick={() => alert('Feedback dikirim!')}
                className="rounded-md bg-[#B3EBCE] px-8 py-2 text-sm font-semibold
                text-gray-900 border border-[#1E1E1E] hover:scale-105 shadow-[0.5px_1.5px_0_rgba(30,30,30,1)]"
              >
                Selesai
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}