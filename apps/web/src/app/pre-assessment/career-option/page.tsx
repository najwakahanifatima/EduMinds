'use client'
import { useState } from 'react';
import Button from '../../_components/Button';
import { useRouter } from 'next/navigation';

const careerOptions = [
    { 
        name: 'Barista', 
        icon: '/barista.png'
    },
    { 
        name: 'Floris',
        icon: '/floris.png'
    },
    { 
        name: 'Koki',
        icon: '/koki.png'
     },
  ];
  
  const CareerRecommendationPage = () => {
    const Router = useRouter();
    const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  
    const handleSelectCareer = (careerName: string) => {
      setSelectedCareer(prev => (prev === careerName ? null : careerName));
    };
  
    const handleConfirmSelection = () => {
      if (selectedCareer) {
        localStorage.setItem('userSelectedCareer', selectedCareer);
        console.log(`Karier yang dipilih: ${selectedCareer}`);
        Router.push('/pre-assessment/supervisor');
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans p-4">
        <div className="w-full bg-[#1C245B] h-1.5 mb-5 rounded-full"></div>
        
        <div className="w-full flex-grow flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl flex flex-col items-center">
              <h1 className="mt-7 font-semibold text-3xl text-center mb-12 text-[#1E1E1E] leading-relaxed">
                Rekomendasi Karier dan Jalur <br /> Belajar untukmu
              </h1>
  
              <div className="flex flex-wrap gap-8 items-center justify-center mb-12">
                {careerOptions.map((career) => {
                  const isSelected = selectedCareer === career.name;
                  return (
                    <div
                      key={career.name}
                      onClick={() => handleSelectCareer(career.name)}
                      className={`
                        bg-[#E9F7F0] rounded-3xl w-60 h-64 p-6 flex flex-col items-center 
                        justify-center text-center cursor-pointer transition-all duration-300
                        shadow-[0px_3.5px_0_rgba(30,30,30,1)]
                        ${isSelected ? 'border-2 border-[#2A3AA9] scale-105' : 'border border-[#1E1E1E] hover:scale-105'}
                      `}
                    >
                      <div className="w-32 h-32 mb-4 flex items-center justify-center">
                        <img src={career.icon}/>
                      </div>
                      <h2 className="text-[#1E1E1E] font-bold text-xl">
                        {career.name}
                      </h2>
                    </div>
                  );
                })}
              </div>
          </div>
  
          <div className="w-full max-w-4xl flex items-center justify-between mt-auto mb-8 px-4">
              <a href="#" className="text-[#1A1C7B] hover:text-[#5254A8] text-sm underline">
                  Saya ingin memilih jalur belajar sendiri
              </a>
  
              <Button 
                  width="180px" 
                  onClick={handleConfirmSelection}
                  disabled={!selectedCareer}
              >
                  Pilih
              </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CareerRecommendationPage;