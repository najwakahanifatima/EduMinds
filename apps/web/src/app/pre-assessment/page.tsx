'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '../_components/Button';
import Input from '../_components/Input';

const PreAssessment = () => {
  const Router = useRouter();

  return (
    <div className="min-h-screen m-2">
        <div className="w-full bg-[#1C245B] h-1.5 mb-5 rounded-full overflow-hidden">
        </div>
        <div className="max-w-xl mx-auto pt-16 px-4 mt-32 flex flex-col items-center">
            <h1 className="font-semibold text-3xl text-center mb-16 text-[#1E1E1E] leading-relaxed">
            Sebelum belajar, <br /> 
            jawab beberapa pertanyaan dulu
            </h1>
            <Button width="250px" onClick={() => Router.push("/pre-assessment/question")}>Mulai Tes Awal</Button>
        </div>
    </div>
  );
};

export default PreAssessment;