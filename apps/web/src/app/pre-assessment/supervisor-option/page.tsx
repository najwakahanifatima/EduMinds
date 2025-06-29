'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '../../_components/Button';

const SupervisorOption = () => {
  const Router = useRouter();

  return (
    <div className="min-h-screen m-2">
        <div className="w-full bg-[#1C245B] h-1.5 mb-6 rounded-full overflow-hidden">
        </div>
        <div className="max-w-xl mx-auto pt-16 px-4 mt-28 flex flex-col items-center">
            <h1 className="font-semibold text-3xl text-center mb-7 leading-relaxed">
            Mau ditemani saat belajar?
            </h1>
            <p className="font-medium text-gray-700 mb-16 text-center">Kami bisa menyediakan pendamping yang siap bantu 
                <br /> kamu kalau bingung atau butuh arahan.</p>
            <div className="flex justify-center items-center space-x-8">
                <Button bgColor="#EDCD50" width="175px" onClick={() => Router.push("/pre-assessment/supervisor-option/choose-supervisor")}>
                    Ya
                </Button>
            
                <Button bgColor="#B3EBCE" width="175px" onClick={() => Router.push("/user-dashboard")}>
                    Tidak
                </Button>
            </div>
        </div>
    </div>
  );
};

export default SupervisorOption;