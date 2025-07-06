'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../../_components/Input';
import Button from '../../../_components/Button';
import { getSupervisors } from '@/lib/api';

interface Supervisor {
  id: number;
  name: string;
  gender: string;
  age: number;
  experience: string;
  avatar: string;
}

interface SupervisorCardProps {
  supervisor: Supervisor;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const SupervisorCard = ({ supervisor, isSelected, onSelect }: SupervisorCardProps) => (
  <div
    onClick={() => onSelect(supervisor.id)}
    className={`
      bg-[#4A4E8A] rounded-3xl p-4 flex items-center gap-4
      cursor-pointer transition-all duration-200
      border-2 max-w-md shadow-[0px_2px_0_rgba(30,30,30,1)]
      ${isSelected ? 'border-[#B3EBD6]' : 'border-[#1E1E1E]'}
    `}
  >
    <img src={supervisor.avatar} alt={supervisor.name} className="w-16 h-16 rounded-full object-cover" />
    <div className="text-white p-1">
      <h3 className="font-semibold text-[#FFE16B]">{supervisor.name}</h3>
      <p className="text-sm mt-1">
        {supervisor.gender === 'L' ? 'Laki-laki' : 'Perempuan'}, {supervisor.age} tahun
      </p>
      <p className="text-xs mt-2">{supervisor.experience}</p>
    </div>
  </div>
);

const SupervisorSelectionPage = () => {
  const Router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [filteredSupervisors, setFilteredSupervisors] = useState<Supervisor[]>([]);
  const [selectedSupervisorId, setSelectedSupervisorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const data = await getSupervisors(); 
        console.log('DEBUG in FE: get supervisor ', data)
        setSupervisors(data);
        setFilteredSupervisors(data);
      } catch (err) {
        console.error('Gagal fetch supervisor:', err);
      }
    };

    fetchSupervisors();
  }, []);

  const handleSearch = () => {
    const lower = searchQuery.toLowerCase();
    const filtered = supervisors.filter((s) =>
      s.name.toLowerCase().includes(lower) ||
      (s.gender === 'L' ? 'laki-laki' : 'perempuan').includes(lower) ||
      s.age.toString().includes(lower)
    );
    setFilteredSupervisors(filtered);
  };

  const handleSelectSupervisor = (id: number) => {
    setSelectedSupervisorId(prevId => (prevId === id ? null : id));
  };

  const handleConfirmSelection = () => {
    if (selectedSupervisorId) {
      const selected = supervisors.find(s => s.id === selectedSupervisorId);
      if (selected) {
        localStorage.setItem('selectedSupervisor', JSON.stringify(selected));
        Router.push(`/pre-assessment/supervisor-option/choose-supervisor/proceed-supervisor`);
      }
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
              if (e.key === 'Enter') handleSearch();
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
            {filteredSupervisors.map((supervisor) => (
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
