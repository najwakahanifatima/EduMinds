'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../_components/Navbar';
import Button from '../_components/Button';


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
//const supervisorData: SupervisorData | null = null;
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
    improvements: "Keraskan suara"
  },
  {
    id: 2,
    taskNumber: 2,
    title: "Dasar Memahami Pelanggan",
    score: 65,
    strengths: "Pemahaman cepat",
    improvements: "Dengarkan baik-baik apa yang diminta pelanggan"
  },
  {
    id: 3,
    taskNumber: 3,
    title: "Mempelajari Bunga",
    score: 55,
    strengths: "Pemahaman cepat",
    improvements: "Tingkatkan hafalan penamaan bunga"
  },
  {
    id: 4,
    taskNumber: 4,
    title: "Teknik Dasar Merangkai",
    score: 92,
    strengths: "Teknik sangat baik, kreatif",
    improvements: "Bisa percepat waktu pengerjaan"
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

const SupervisorCard = ({ supervisor }: { supervisor: SupervisorData | null }) => {
  const Router = useRouter();
  
  return (
    <section className="bg-[#3D3FA0] text-white rounded-3xl p-8 mb-20 border-2 border-[#1E1E1E] shadow-[0px_2px_0_rgba(30,30,30,1)]">
      <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-6 sm:space-y-0 sm:space-x-6 ml-8">
        <div className="flex-shrink-0">
          {supervisor ? (
            <div className="w-28 h-28 bg-[#E9F7F0] rounded-full flex items-center justify-center text-4xl font-semibold text-[#1E1E1E]/85">
              {supervisor.initials}
            </div>
          ) : (
            <div className="w-28 h-28 bg-[#D8D3E9] rounded-full flex items-center justify-center my-4">
              <img src="no-profile.png" className="rounded-full w-28 h-28 object-cover" />
            </div>
          )}
        </div>
        <div className="flex-grow text-center sm:text-left">
          {supervisor ? (
            <div className="ml-12">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#FFE16B]">{supervisor.name}</h3>
              <p className="mb-1 text-[#FAFAF6]">{supervisor.gender}, {supervisor.age}</p>
              <p className="mb-6 text-[#FAFAF6]">{supervisor.experience}</p>
              <Button bgColor="#B3EBCE" width="90%">
                <p>Hubungi Pendamping</p>
                <img src="phone.png" className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="ml-12">
              <h3 className="text-xl md:text-2xl font-semibold mb-10">Kamu belum punya pendamping...</h3>
              <Button onClick={() => Router.push("/search-supervisor")} bgColor="#B3EBCE" width="90%">
                <p>Cari Pendamping</p>
                <img src="search.png" className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FeedbackCard = ({ feedback }: { feedback: FeedbackData }) => {
  const getCardStyle = (score: number): { container: string; border: string } => {
    if (score >= 80) return { container: 'bg-[#C5E9CD]/50', border: 'border-[#308242] border-l-10 border' };
    if (score >= 60) return { container: 'bg-[#FFE5B0]/50', border: 'border-[#B57900] border-l-10 border' };
    return { container: 'bg-[#CBE6FF]/50', border: 'border-[#72A8DA] border-l-10 border' };
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
            <p className="font-bold text-gray-700 mb-1">Tips perbaikan:</p>
            <p className="text-gray-600 text-sm">{feedback.improvements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const SupervisorDetail = () => {
  const [currentSupervisor] = useState<SupervisorData | null>(supervisorData);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const Router = useRouter();
  const displayedFeedback = showAllFeedback ? allFeedback : allFeedback.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <main className="px-4 md:px-10 lg:px-20 py-8 w-full mt-7">
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
              <div className="text-right mt-8">
                <button
                  className="text-[#1A1C7B] hover:text-[#5254A8] underline"
                  onClick={() => setShowAllFeedback(!showAllFeedback)}
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

export default SupervisorDetail;
