'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../_components/Button';

const CareerRecommendationPage = () => {
  const router = useRouter();
  const [recommendedCareer, setRecommendedCareer] = useState<string | null>(null);
  const [recommendedImage, setRecommendedImage] = useState<string | null>(null);

  useEffect(() => {
    const storedCareer = localStorage.getItem('recommendedCareer');
    const storedImage = localStorage.getItem('recommendedCareerImage');
    console.log('DEBUG in FE: ', storedCareer, storedImage);

    setRecommendedCareer(storedCareer || 'Karier Tidak Diketahui');
    setRecommendedImage(storedImage || '/default-career.png');
  }, []);

  const handleConfirmSelection = () => {
    if (recommendedCareer) {
      localStorage.setItem('userSelectedCareer', recommendedCareer);
      router.push('/pre-assessment/supervisor-option');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans p-4">
      <div className="w-full bg-[#1C245B] h-1.5 mb-5 rounded-full"></div>

      <div className="w-full flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h1 className="mt-7 font-semibold text-3xl text-center mb-12 text-[#1E1E1E] leading-relaxed">
            Rekomendasi Karier dan Jalur <br /> Belajar untukmu
          </h1>

          <div
            className="
              bg-[#E9F7F0] rounded-3xl w-60 h-64 p-6 flex flex-col items-center 
              justify-center text-center shadow-[0px_3.5px_0_rgba(30,30,30,1)]
              border-2 border-[#2A3AA9]
            "
          >
            <div className="w-32 h-32 mb-4 flex items-center justify-center">
              <img
                src={recommendedImage || '/default-career.png'}
                alt={recommendedCareer || 'Karier Tidak Diketahui'}
                className="object-contain w-full h-full"
              />
            </div>
            <h2 className="text-[#1E1E1E] font-bold text-xl">
              {recommendedCareer}
            </h2>
          </div>
        </div>

        <div className="w-full max-w-2xl flex items-center justify-between mt-12 px-4">
          <a
            href="#"
            className="text-[#1A1C7B] hover:text-[#5254A8] text-sm underline"
          >
            Saya ingin memilih jalur belajar sendiri
          </a>

          <Button width="180px" onClick={handleConfirmSelection}>
            Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendationPage;
