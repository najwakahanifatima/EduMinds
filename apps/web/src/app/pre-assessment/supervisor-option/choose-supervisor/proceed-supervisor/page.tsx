'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '../../../../_components/Button';
import { assignSupervisor } from '@/lib/api';

interface Supervisor {
    id: number;
    name: string;
    gender: string;
    age: number;
    experience: string;
    avatar: string;
}

const ProceedSupervisorPage = () => {
    const Router = useRouter();
    const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('selectedSupervisor');
        if (stored) {
            try {
            const supervisor = JSON.parse(stored) as Supervisor;
            setSelectedSupervisor(supervisor);
            } catch (err) {
            console.error('Gagal parse data supervisor:', err);
            }
        }
    }, []);


    const handleBack = () => {
        Router.back();
    };

    const handleContinue = async () => {
        if (!selectedSupervisor) return;

        try {
            const userIdStr = localStorage.getItem('id_user');
            const userId = userIdStr ? parseInt(userIdStr, 10) : null;

            if (userId !== null) {
                await assignSupervisor(userId, selectedSupervisor.id);
            } else {
                console.error('User ID is missing in localStorage');
            }

            localStorage.removeItem('selectedSupervisor');
            Router.push('/user-dashboard');
        } catch (err) {
            console.error('Gagal menyimpan supervising:', err);
            alert('Terjadi kesalahan saat menyimpan pendamping.');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans p-4">
            <div className="w-full bg-[#1C245B] h-1.5 mb-5 rounded-full"></div>
            
            <div className="w-full flex-grow flex flex-col items-center justify-center">
                <h1 className="font-bold text-4xl text-center mb-12 text-[#1E1E1E]">
                    Siap! Ini dia pendamping belajarmu
                </h1>
                
                {selectedSupervisor ? (
                    <div className="flex flex-col items-center gap-12">
                        <div className="bg-[#4A4E8A] rounded-3xl p-6 flex items-center gap-6 border-2 border-[#1E1E1E] shadow-[0px_3px_0_rgba(30,30,30,1)] max-w-lg">
                            <img 
                                src={selectedSupervisor.avatar} 
                                alt={selectedSupervisor.name} 
                                className="w-20 h-20 rounded-full object-cover" 
                            />
                            <div className="text-white p-1">
                                <h3 className="font-semibold text-xl text-[#FFE16B]">
                                    {selectedSupervisor.name}
                                </h3>
                                <p className="text-md mt-1">
                                    {selectedSupervisor.gender}, {selectedSupervisor.age} tahun
                                </p>
                                <p className="text-sm mt-2">
                                    {selectedSupervisor.experience}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <Button 
                                width="220px" 
                                onClick={handleContinue}
                            >
                                Lanjut
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6">
                        <p className="text-gray-500 text-center">
                            Pendamping tidak ditemukan...
                        </p>
                        <Button 
                            width="120px" 
                            onClick={handleBack}
                        >
                            Kembali
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProceedSupervisorPage;