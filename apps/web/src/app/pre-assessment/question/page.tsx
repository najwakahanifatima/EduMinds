'use client'
import { useState, useEffect } from 'react';
import Button from '../../_components/Button';

interface Answers {
  [key: number]: string[];
}

// INI MASIH DUMMY
const quizData = [
{
    id: 1,
    questionText: 'Apa yang biasa dipakai untuk mengirim pesan ke teman kerja?',
    options: ['Kertas', 'Slack', 'TV', 'Kalkulator'],
    type: 'single',
    correctAnswer: 'Slack',
},
{
    id: 2,
    questionText: 'Pilih semua yang bisa digunakan untuk bekerja di komputer.',
    options: ['Mouse', 'Keyboard', 'Kipas angin', 'Monitor'],
    type: 'multiple',
    correctAnswer: ['Mouse', 'Keyboard', 'Monitor'],
},
{
    id: 3,
    questionText: 'Apa yang harus kita lakukan jika tidak paham tugas?',
    options: [
    'Diam saja',
    'Tanya ke teman atau atasan',
    'Pulang saja',
    'Lanjut kerja asal-asalan',
    ],
    type: 'single',
    correctAnswer: 'Tanya ke teman atau atasan',
},
{
    id: 4,
    questionText: 'Apa itu “deadline”?',
    options: [
    'Waktu istirahat',
    'Waktu selesai tugas',
    'Nama makanan',
    'Jam pulang kerja',
    ],
    type: 'single',
    correctAnswer: 'Waktu selesai tugas',
},
{
    id: 5,
    questionText: 'Pilih semua hal yang menunjukkan sikap baik di tempat kerja.',
    options: ['Datang tepat waktu', 'Marah-marah', 'Membantu teman', 'Tidur di meja'],
    type: 'multiple',
    correctAnswer: ['Datang tepat waktu', 'Membantu teman'],
},
];
  

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Answers>({});
  const [isFinished, setIsFinished] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const totalQuestions = quizData.length;
  const currentQuestion = quizData[currentQuestionIndex];
  const currentAnswers = allAnswers[currentQuestionIndex] || [];

  useEffect(() => {
    const newProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    setProgressWidth(newProgress);
  }, [currentQuestionIndex, totalQuestions]);

  const handleOptionSelect = (option: string) => {
    const newAnswers: Answers = { ...allAnswers };
    let currentSelection = allAnswers[currentQuestionIndex] || [];

    if (currentQuestion.type === 'single') {
      currentSelection = [option];
    } else if (currentQuestion.type === 'multiple') {
      if (currentSelection.includes(option)) {
        currentSelection = currentSelection.filter((item) => item !== option);
      } else {
        currentSelection = [...currentSelection, option];
      }
    }
    newAnswers[currentQuestionIndex] = currentSelection;
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

  const restartQuiz = () => {
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setAllAnswers({});
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-[#1E1E1E] mb-4">Tes Awal Selesai!</h1>
        <p className="text-lg text-gray-700 mb-8">Terima kasih telah berpartisipasi.</p>
        <button
          onClick={restartQuiz}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Ulangi Kuis
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 m-2 flex flex-col">
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
                      w-full h-12 p-4 border-1 rounded-lg text-center cursor-pointer transition-all duration-200 flex items-center justify-center
                      ${isSelected 
                        ? 'bg-[#E9FFF3] border-[#59a87e] text-[#234e38]' 
                        : 'bg-white border-[#1E1E1E] hover:bg-gray-100 hover:border-gray-400'
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
                bgColor="#B3EBCE"
                width="175px"
                disabled={currentQuestionIndex === 0}
            >
                Kembali
            </Button>
            
            <Button
                onClick={handleNextQuestion}
                bgColor="#EDCD50"
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