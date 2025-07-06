'use client'

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../_components/Navbar';


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
  <div className="bg-indigo-100 border border-[#6669E3] text-[#3D3FA0] rounded-2xl p-7 text-center">
      <p className="text-3xl font-bold mb-4">{value}</p>
      <p className="text-md mt-2">{label}</p>
  </div>
);

const JourneyStep = ({ step, title }: JourneyStepProps) => (
  <div className="bg-[#C2EED7] rounded-xl p-5 text-left w-full flex-1 h-28 flex flex-col">
      <p className="text-xs text-gray-600 font-semibold mb-2">Langkah ke-{step}</p>
      <div className="text-[#1E1E1E] flex-1 flex items-center">
          <p className="font-medium">{title}</p>
      </div>
  </div>
);

const BarChart = ({ data }: BarChartProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  return (
    <div ref={chartRef} className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex h-64 items-end justify-around">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 mx-2">
            <div 
              className="w-12 bg-[#EDCD50] mb-2 transition-all duration-1000 ease-out"
              style={{ 
                height: isVisible ? `${(item.score / 100) * 200}px` : '0px',
                transitionDelay: `${index * 200}ms`
              }}
            ></div>
            <p className="text-sm text-gray-600 text-center">{item.task}</p>
            <p className="text-xs text-gray-500 font-semibold">{item.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


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

          <main className="px-4 md:px-10 lg:px-20 py-8 w-full mt-7">
              <section className="bg-[#3D3FA0] text-white rounded-3xl p-8 mb-20 border-2 border-[#1E1E1E] shadow-[0px_2px_0_rgba(30,30,30,1)]">
                  <h1 className="text-2xl font-semibold">Selamat Datang <span className="text-[#FDE06C]">{user.name}</span></h1>
                  <p className="mt-5 text-[#eaeaff]">Mari review perjalananmu</p>
                  <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                      <JourneyStep step={journey[0].step} title={journey[0].title} />
                      <p className="text-[#FDE06C] font-medium text-4xl">&gt;</p>
                      <JourneyStep step={journey[1].step} title={journey[1].title} />
                      <p className="text-[#FDE06C] font-medium text-4xl">&gt;</p>
                      <JourneyStep step={journey[2].step} title={journey[2].title} />
                  </div>
              </section>

              <section className="mb-20">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-7">
                      Saat ini kamu sedang menempuh jalur <span className="text-[#3D3FA0]">{careerPath}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {stats.map(stat => <StatCard key={stat.label} value={stat.value} label={stat.label} />)}
                  </div>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-7">
                      Perkembangan belajar kamu
                  </h2>
                  <BarChart data={progressData} />
              </section>
          </main>
      </div>
  )
}

export default UserDashboard;