'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../../_components/Input';
import Button from '../../../_components/Button';
import SupervisorCard from '@/app/_components/SupervisorCard';

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

const SupervisorSelectionPage = () => {
    const Router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSupervisors, setFilteredSupervisors] = useState<Supervisor[]>(supervisorData);
    const [selectedSupervisorId, setSelectedSupervisorId] = useState<number | null>(null);

    const handleSearch = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = supervisorData.filter(supervisor =>
            supervisor.name.toLowerCase().includes(lowercasedQuery) ||
            supervisor.gender.toLowerCase().includes(lowercasedQuery) ||
            supervisor.age.toString().includes(lowercasedQuery)
        );
        setFilteredSupervisors(filtered);
    };

    const handleSelectSupervisor = (id: number) => {
        setSelectedSupervisorId(prevId => (prevId === id ? null : id));
    };

    const handleConfirmSelection = () => {
        if (selectedSupervisorId) {
            Router.push(`/pre-assessment/supervisor-option/choose-supervisor/proceed-supervisor?id=${selectedSupervisorId}`);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans p-4">
            <div className="w-full bg-[#1C245B] h-1.5 mb-5 rounded-full"></div>
            
            <div className="w-full max-w-4xl mx-auto flex flex-col flex-grow">
                <h1 className="font-bold text-4xl text-center my-8 text-[#1E1E1E]">
                    Pilih pendampingmu
                </h1>

                <div className="mb-8">
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        placeholder="Cari berdasarkan nama, jenis kelamin, dan usia..."
                        icon={
                            <img 
                                src="/search.png" 
                                className="w-[22px] h-[22px] cursor-pointer hover:opacity-70 transition-opacity"
                                onClick={handleSearch}
                            />
                        }
                    />
                </div>

                <div className="flex-grow overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start">
                        {filteredSupervisors.map(supervisor => (
                            <SupervisorCard
                                key={supervisor.id}
                                supervisor={supervisor}
                                isSelected={selectedSupervisorId === supervisor.id}
                                onSelect={handleSelectSupervisor}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-end mt-8 mb-4">
                     <Button 
                        width="180px" 
                        onClick={handleConfirmSelection}
                        disabled={!selectedSupervisorId}
                     >
                        Pilih
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SupervisorSelectionPage;