'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../_components/Button';
import { getCareerRecommendation } from '@/lib/api';

interface Answers {
  [key: number]: string[];
}

const quizData = [
  {
    id: 1,
    questionText: 'Apakah kamu suka merawat tanaman atau berkebun?',
    options: ['Suka', 'Tidak suka'],
    type: 'single',
    category: 'Tanaman',
  },
  {
    id: 2,
    questionText: 'Apakah kamu suka berbicara dengan orang lain atau melayani pelanggan?',
    options: ['Suka', 'Tidak suka'],
    type: 'single',
    category: 'Interaksi',
  },
  {
    id: 3,
    questionText: 'Apakah kamu suka memasak atau menyiapkan makanan?',
    options: ['Suka', 'Tidak suka'],
    type: 'single',
    category: 'Masak',
  },
  {
    id: 4,
    questionText: 'Apakah kamu suka menjaga kebersihan dan kerapihan?',
    options: ['Suka', 'Tidak suka'],
    type: 'single',
    category: 'Kebersihan',
  },
  {
    id: 5,
    questionText: 'Apakah kamu termotivasi oleh uang atau suka mengelola uang?',
    options: ['Suka', 'Tidak suka'],
    type: 'single',
    category: 'Uang',
  },
  {
    id: 6,
    questionText: 'Apakah kamu orang yang tenang dan bisa fokus dalam pekerjaan?',
    options: ['Suka', 'Tidak suka'],
    type: 'single',
    category: 'Tenang',
  },
];

const getScore = (answer: string): number => {
  switch (answer) {
    case 'Suka': return 1;
    case 'Tidak suka': return 0;
    default: return 0;
  }
};

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Answers>({});
  const [isFinished, setIsFinished] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [recommendedCareer, setRecommendedCareer] = useState<string | null>(null);
  const [recommendedImage, setRecommendedImage] = useState<string | null>(null);
  const Router = useRouter();

  const totalQuestions = quizData.length;
  const currentQuestion = quizData[currentQuestionIndex];
  const currentAnswers = allAnswers[currentQuestionIndex] || [];

  useEffect(() => {
    const newProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    setProgressWidth(newProgress);
  }, [currentQuestionIndex, totalQuestions]);

  useEffect(() => {
  if (isFinished) {
    const preference: Record<string, number> = {};
    quizData.forEach((q, i) => {
      preference[q.category] = getScore(allAnswers[i]?.[0] || '');
    });

    getCareerRecommendation(preference as any)
    .then((res) => {
      console.log('DEBUG FULL RESPONSE:', res);
      const { career, image } = res;
      setRecommendedCareer(career);       
      setRecommendedImage(image);
      localStorage.setItem('recommendedCareer', career ?? ''); 
      localStorage.setItem('recommendedCareerImage', image ?? '');
    })
    .catch(() => {
      setRecommendedCareer('Tidak diketahui');
    });

  }
}, [isFinished]);

  const handleOptionSelect = (option: string) => {
    const newAnswers = { ...allAnswers };
    newAnswers[currentQuestionIndex] = [option];
    setAllAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (isFinished) {
    return (
      <div className="h-screen m-2 overflow-hidden flex flex-col">
        <div className="w-full bg-[#1C245B] h-1.5 rounded-full overflow-hidden flex-shrink-0" />
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center justify-center flex-1">
          <h1 className="font-semibold text-3xl text-center mb-5 text-[#1E1E1E]">Selamat!</h1>
          <p className="text-lg font-medium text-gray-700 mb-8 text-center">
            Tes awal kamu sudah selesai.
          </p>

            <p className="text-gray-500 text-center mb-6">Lanjut untuk melihat rekomendasi karir.</p>

          <Button
            width="200px"
            bgColor="#EDCD50"
            onClick={() => Router.push('/pre-assessment/career-option')}
          >
            Lanjut
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden m-2 flex flex-col font-sans">
      <div className="w-full bg-[#1C245B] h-2.5 mb-5 rounded-full overflow-hidden">
        <div
          className="bg-[#7375F3] h-2.5 rounded-r-full transition-all duration-500 ease-out"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      <div className="max-w-2xl mx-auto pt-10 md:pt-16 px-4">
        {currentQuestion && (
          <>
            <p className="text-center text-indigo-500 font-semibold mb-4">
              Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
            </p>

            <h1 className="font-semibold text-2xl md:text-3xl text-center mb-12 text-[#1E1E1E]">
              {currentQuestion.questionText}
            </h1>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentAnswers.includes(option);
                return (
                  <div
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`
                      w-full h-12 p-4 border rounded-lg text-center cursor-pointer transition-all duration-200 flex items-center justify-center
                      ${
                        isSelected
                          ? 'bg-[#E9FFF3] border-2 border-[#59a87e] text-[#234e38]'
                          : 'bg-white border border-gray-400 hover:bg-gray-100 hover:border-gray-400'
                      }
                    `}
                  >
                    <span className="font-medium">{option}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center items-center space-x-8">
              <Button
                onClick={handlePreviousQuestion}
                bgColor="#EDCD50"
                width="175px"
                disabled={currentQuestionIndex === 0}
              >
                Kembali
              </Button>

              <Button
                onClick={handleNextQuestion}
                bgColor="#B3EBCE"
                width="175px"
                disabled={currentAnswers.length === 0}
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Selesai' : 'Lanjut'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
