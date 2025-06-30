'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../_components/Navbar';


// --- Tipe untuk Props Komponen ---
interface StatCardProps {
  value: string | number;
  label: string;
}

interface JourneyStepProps {
  step: number;
  title: string;
}

interface ProgressDataItem {
  task: string;
  score: number;
}

interface BarChartProps {
  data: ProgressDataItem[];
}

const StatCard = ({ value, label }: StatCardProps) => (
  <div className="bg-indigo-100 border border-[#6669E3] rounded-2xl p-7 text-center">
      <p className="text-3xl font-bold text-[#3D3FA0] mb-4">{value}</p>
      <p className="text-md text-[#3D3FA0] mt-2">{label}</p>
  </div>
);

const JourneyStep = ({ step, title }: JourneyStepProps) => (
  <div className="bg-green-100 text-green-800 rounded-xl p-5 text-left w-full flex-1 h-28 flex flex-col">
      <p className="text-xs text-[#5254A8] font-semibold mb-2">Langkah ke-{step}</p>
      <div className="text-[#1A1C7B] flex-1 flex items-center">
          <p className="font-medium">{title}</p>
      </div>
  </div>
);

const BarChart = ({ data }: BarChartProps) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex h-64 items-end justify-around">
          {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-2">
                  <div 
                      className="w-12 bg-[#EDCD50] mb-2"
                      style={{ height: `${(item.score / 100) * 200}px` }}
                  ></div>
                  <p className="text-sm text-gray-600 text-center">{item.task}</p>
                  <p className="text-xs text-gray-500 font-semibold">{item.score}</p>
              </div>
          ))}
      </div>
  </div>
);


const UserDashboard = () => {
  const [user, setUser] = useState({ name: 'Grace Doe' });
  const [careerPath, setCareerPath] = useState('Floris');

  useEffect(() => {
      const savedCareer = localStorage.getItem('userSelectedCareer');
      if (savedCareer) {
          setCareerPath(savedCareer);
      }
  }, []);

  //DUMMY
  const stats: { value: string | number; label: string }[] = [
      { value: '30%', label: 'Progres Belajar' },
      { value: '85', label: 'Nilai Rata-rata' },
      { value: 'Menengah', label: 'Tingkat Kompetensi' }
  ];

  const journey: { step: number; title: string }[] = [
      { step: 1, title: 'Mempelajari skill untuk pekerjaan' },
      { step: 2, title: 'Mendapatkan sertifikat dari ujian sertifikasi' },
      { step: 3, title: 'Melamar pekerjaan yang sesuai' }
  ];

  const progressData: ProgressDataItem[] = [
      { task: 'Tugas 1', score: 82 },
      { task: 'Tugas 2', score: 68 },
      { task: 'Tugas 3', score: 95 },
      { task: 'Tugas 4', score: 92 },
      { task: 'Tugas 5', score: 85 },
  ];

  return (
      <div className="bg-gray-50 min-h-screen">
          <Navbar />

          <main className="px-4 md:px-10 lg:px-20 py-8 w-full mt-5">
              {/* Welcome Banner */}
              <section className="bg-[#3D3FA0] text-white rounded-3xl p-8 mb-16">
                  <h1 className="text-3xl font-bold">Selamat Datang {user.name}</h1>
                  <p className="mt-5 opacity-90">Mari review perjalananmu</p>
                  {/* FIX: Menggunakan flexbox untuk alignment yang benar */}
                  <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                      <JourneyStep step={journey[0].step} title={journey[0].title} />
                      <p className="text-[#FDE06C] font-medium text-4xl">&gt;</p>
                      <JourneyStep step={journey[1].step} title={journey[1].title} />
                      <p className="text-[#FDE06C] font-medium text-4xl">&gt;</p>
                      <JourneyStep step={journey[2].step} title={journey[2].title} />
                  </div>
              </section>

              {/* Current Path & Stats */}
              <section className="mb-16">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      Saat ini kamu sedang menempuh jalur <span className="text-[#3D3FA0]">{careerPath}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {stats.map(stat => <StatCard key={stat.label} value={stat.value} label={stat.label} />)}
                  </div>
              </section>

              {/* Learning Progress Chart */}
              <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      Perkembangan belajar kamu
                  </h2>
                  <BarChart data={progressData} />
              </section>
          </main>
      </div>
  )
}

export default UserDashboard;