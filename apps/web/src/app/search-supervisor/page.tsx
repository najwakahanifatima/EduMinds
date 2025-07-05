'use client'

import React, { useState } from 'react';
import SupervisorCard from '../_components/SupervisorCard';
import Navbar from '../_components/Navbar';
import Input from '../_components/Input';

interface Supervisor {
    id: number;
    name: string;
    gender: string;
    age: number;
    experience: string;
    avatar: string;
}

const supervisorData: Supervisor[] = [
    { id: 1, name: 'Sari Bunga', gender: 'Perempuan', age: 28, experience: 'Menjadi floris selama 5 tahun', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=SB' },
    { id: 2, name: 'Ahmad Rifai', gender: 'Laki-laki', age: 32, experience: 'Koki profesional selama 8 tahun', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=AR' },
    { id: 3, name: 'Maya Sari', gender: 'Perempuan', age: 25, experience: 'Barista dengan 3 tahun pengalaman', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=MS' },
    { id: 4, name: 'Budi Santoso', gender: 'Laki-laki', age: 35, experience: 'Manager toko bunga selama 10 tahun', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=BS' },
    { id: 5, name: 'Dewi Lestari', gender: 'Perempuan', age: 29, experience: 'Spesialis kopi dan latte art', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=DL' },
    { id: 6, name: 'Riko Pratama', gender: 'Laki-laki', age: 22, experience: 'Asisten koki di restoran ternama', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=RP' },
    { id: 7, name: 'Fitri Handayani', gender: 'Perempuan', age: 31, experience: 'Ahli dekorasi dan event organizer', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=FH' },
    { id: 8, name: 'Agus Setiawan', gender: 'Laki-laki', age: 27, experience: 'Barista championship winner', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=AS' },
    { id: 9, name: 'Rina Wijaya', gender: 'Perempuan', age: 24, experience: 'Pastry chef dengan 4 tahun pengalaman', avatar: 'https://placehold.co/100x100/E9F7F0/333?text=RW' },
];

const SearchSupervisorPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSupervisors, setFilteredSupervisors] = useState<Supervisor[]>(supervisorData);
    const [hasCurrentSupervisor, setHasCurrentSupervisor] = useState(false); // Simulasi apakah user sudah punya pendamping

    const handleSearch = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = supervisorData.filter(supervisor =>
            supervisor.name.toLowerCase().includes(lowercasedQuery) ||
            supervisor.gender.toLowerCase().includes(lowercasedQuery) ||
            supervisor.age.toString().includes(lowercasedQuery)
        );
        setFilteredSupervisors(filtered);
    };

    const handleActionClick = (supervisorId: number) => {
        const supervisor = supervisorData.find(s => s.id === supervisorId);
        if (supervisor) {
            if (hasCurrentSupervisor) {
                alert(`Mengganti pendamping ke ${supervisor.name}`);
            } else {
                alert(`Menjadikan ${supervisor.name} sebagai pendamping`);
                setHasCurrentSupervisor(true);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8 mt-7">
                <div className="mb-10 flex justify-center">
                    <Input
                        width="w-[80%]"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {filteredSupervisors.map(supervisor => (
                        <SupervisorCard
                            key={supervisor.id}
                            supervisor={supervisor}
                            showActionButton={true}
                            hasCurrentSupervisor={hasCurrentSupervisor}
                            onActionClick={handleActionClick}
                        />
                    ))}
                </div>

                {filteredSupervisors.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Tidak ada pendamping yang ditemukan</p>
                        <p className="text-gray-400 mt-2">Coba ubah kata kunci pencarian Anda</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchSupervisorPage;