'use client'

import React, { useState } from 'react';
import Navbar from '../_components/Navbar';


// Buat pengganti profile sementara
const getInitials = (name: string): string => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return `${name.substring(0, 2)}`.toUpperCase();
};

interface SupervisorData {
  name: string;
  gender: string;
  age: string;
  experience: string;
  initials: string;
}

interface FeedbackData {
  id: number;
  taskNumber: number;
  title: string;
  score: number;
  strengths: string;
  improvements: string;
}

// INI MASIH DUMMU
// Untuk melihat tampilan kalo belum punya pendamping, ubah jadi:
// const supervisorData: SupervisorData | null = null;
const supervisorData: SupervisorData | null = {
  name: "Jane Doe",
  gender: "Perempuan",
  age: "28 tahun",
  experience: "Menjadi floris selama 5 tahun",
  initials: getInitials("Jane Doe"),
};

const allFeedback: FeedbackData[] = [
  {
    id: 1,
    taskNumber: 1,
    title: "Komunikasi yang Baik",
    score: 85,
    strengths: "Artikulasi jelas, intonasi cocok",
    improvements: "Suara kurang keras"
  },
  {
    id: 2,
    taskNumber: 2,
    title: "Dasar Memahami Pelanggan",
    score: 65,
    strengths: "Pemahaman cepat",
    improvements: "Berbeda pemahaman dengan pelanggan"
  },
  {
    id: 3,
    taskNumber: 3,
    title: "Mempelajari Bunga",
    score: 55,
    strengths: "Pemahaman cepat",
    improvements: "Masih salah dalam penamaan dan makna bunga"
  },
  {
    id: 4,
    taskNumber: 4,
    title: "Teknik Dasar Merangkai",
    score: 92,
    strengths: "Teknik sangat baik, kreatif",
    improvements: "Waktu pengerjaan bisa dipercepat"
  },
  {
    id: 5,
    taskNumber: 5,
    title: "Presentasi Hasil Karya",
    score: 78,
    strengths: "Presentasi menarik, percaya diri",
    improvements: "Perlu lebih detail dalam penjelasan"
  },
  {
    id: 6,
    taskNumber: 6,
    title: "Layanan Pelanggan",
    score: 88,
    strengths: "Ramah, responsif terhadap kebutuhan",
    improvements: "Bisa lebih proaktif"
  }
];

const SupervisorCard = ({ supervisor }: { supervisor: SupervisorData | null }) => (
  <section className="bg-[#3D3FA0] text-white rounded-3xl p-6 md:p-8 mb-12 md:mb-20">
    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
      <div className="flex-shrink-0">
        {supervisor ? (
          <div className="w-24 h-24 bg-[#C2EED7] rounded-2xl flex items-center justify-center text-3xl font-bold text-[#1E3A8A]">
            {supervisor.initials}
          </div>
        ) : (
          <div className="w-24 h-24 bg-[#D8D3E9] rounded-2xl flex items-center justify-center">
            {/* Profil kosong */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-grow text-center sm:text-left">
        {supervisor ? (
          <>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{supervisor.name}</h3>
            <p className="text-base md:text-lg mb-1 opacity-90">{supervisor.gender}, {supervisor.age}</p>
            <p className="text-base md:text-lg mb-6 opacity-90">{supervisor.experience}</p>
            <button className="bg-[#C2EED7] hover:bg-[#A9E5C1] text-[#1E1E1E] font-bold px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors mx-auto sm:mx-0">
              <span>Hubungi Pendamping</span>
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Kamu belum punya pendamping...</h3>
            <button className="bg-[#C2EED7] hover:bg-[#A9E5C1] text-[#1E1E1E] font-bold px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors mx-auto sm:mx-0">
              <span>Cari Pendamping</span>
            </button>
          </>
        )}
      </div>
    </div>
  </section>
);

const FeedbackCard = ({ feedback }: { feedback: FeedbackData }) => {
  const getCardStyle = (score: number): { container: string; border: string } => {
    if (score >= 80) return { container: 'bg-[#C2EED7]', border: 'border-[#4ADE80]' };
    if (score >= 60) return { container: 'bg-[#FED7AA]', border: 'border-[#FB923C]' };
    return { container: 'bg-[#E0F2FE]', border: 'border-[#6669E3]' };
  };

  const getStarRating = (score: number): number => {
    if (score >= 90) return 5;
    if (score >= 75) return 4;
    if (score >= 60) return 3;
    if (score >= 40) return 2;
    return 1;
  };

  const renderStars = (rating: number) => (
    Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-[#EDCD50] ${index < rating ? 'opacity-100' : 'opacity-30'}`}>⭐</span>
    ))
  );

  const cardStyle = getCardStyle(feedback.score);
  const rating = getStarRating(feedback.score);

  return (
    <div className={`${cardStyle.container} ${cardStyle.border} border-2 rounded-2xl p-4 md:p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-semibold mb-1">Tugas {feedback.taskNumber}</p>
            <h4 className="text-lg font-bold text-[#1E1E1E]">{feedback.title}</h4>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-3xl font-bold text-[#1E1E1E] mb-1">{feedback.score}</div>
          <div className="flex space-x-1">{renderStars(rating)}</div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-bold text-gray-700 mb-1">Yang bagus:</p>
            <p className="text-gray-600 text-sm">{feedback.strengths}</p>
          </div>
          <div>
            <p className="font-bold text-gray-700 mb-1">Perlu diperbaiki:</p>
            <p className="text-gray-600 text-sm">{feedback.improvements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [currentSupervisor] = useState<SupervisorData | null>(supervisorData);
  const [showAllFeedback, setShowAllFeedback] = useState(false);

  const displayedFeedback = showAllFeedback ? allFeedback : allFeedback.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <main className="px-4 md:px-10 lg:px-20 py-8 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Detail Pendamping</h2>

        <SupervisorCard supervisor={currentSupervisor} />

        {currentSupervisor && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-7">Feedback Tugas dari Pendamping</h2>
            <div className="space-y-6">
              {displayedFeedback.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
            {allFeedback.length > 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllFeedback(!showAllFeedback)}
                  className="text-[#3D3FA0] hover:underline font-bold text-lg"
                >
                  {showAllFeedback ? 'Lihat lebih sedikit' : 'Lihat lebih banyak'}
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
