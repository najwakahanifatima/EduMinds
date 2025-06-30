'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '../../../../_components/Button';

interface Supervisor {
    id: number;
    name: string;
    gender: string;
    age: number;
    experience: string;
    avatar: string;
}

const supervisorData: Supervisor[] = [
    { id: 1, name: 'Jane Doe', gender: 'Perempuan', age: 28, experience: 'Menjadi floris selama 5 tahun', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=JD' },
    { id: 2, name: 'John Smith', gender: 'Laki-laki', age: 32, experience: 'Koki profesional selama 8 tahun', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=JS' },
    { id: 3, name: 'Elijah Doe', gender: 'Laki-laki', age: 25, experience: 'Barista dengan 3 tahun pengalaman', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=ED' },
    { id: 4, name: 'Grace Smith', gender: 'Perempuan', age: 35, experience: 'Manager toko bunga selama 10 tahun', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=GS' },
    { id: 5, name: 'Bob Mateo', gender: 'Laki-laki', age: 29, experience: 'Spesialis kopi dan latte art', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=BM' },
    { id: 6, name: 'Stella Hunter', gender: 'Perempuan', age: 22, experience: 'Asisten koki di restoran ternama', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=SH' },
];

const ProceedSupervisorPage = () => {
    const Router = useRouter();
    const searchParams = useSearchParams();
    const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);

    useEffect(() => {
        const supervisorId = searchParams.get('id');

        if (supervisorId) {
            const supervisor = supervisorData.find(s => s.id === parseInt(supervisorId, 10));
            if (supervisor) {
                setSelectedSupervisor(supervisor);
            }
        }
    }, [searchParams]);

    const handleBack = () => {
        Router.back();
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
                                onClick={() => Router.push("/user-dashboard")}
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