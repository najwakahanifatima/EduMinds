'use client'

import React, { useState } from 'react';
import Input from '../_components/Input';
import NavbarSupervisor from "@/app/_components/NavbarSupervisor";
import StudentCard from '../_components/StudentCard';

type Student = {
  id: number;
  name: string;
  avatar: string;
};

const students: Student[] = [
  { id: 1, name: "Grace Doe", avatar: "/no-profile.png" },
  { id: 2, name: "John Smith", avatar: "/no-profile.png" },
  { id: 3, name: "John Doe", avatar: "/no-profile.png" },
  { id: 4, name: "Sarah Wilson", avatar: "/no-profile.png" },
  { id: 5, name: "Michael Brown", avatar: "/no-profile.png" },
  { id: 6, name: "Emily Davis", avatar: "/no-profile.png" },
];

// const StudentCard = ({ stu }: { stu: Student }) => (
//   <div
//     className="
//       relative flex items-start justify-between gap-6 rounded-2xl border-2 border-[#15246E] bg-[#FFF4BE] py-6 px-10 shadow-[0px_2px_0_rgba(30,30,30,1)]
//       before:absolute before:inset-y-0 before:left-0 before:w-3
//       before:rounded-l-2xl before:bg-[#15246E]            /* strip ungu */
//     "
//   >
//     <div>
//       <p className="mb-3 text-xs">
//         Informasi Pelajar
//       </p>

//       <div className="flex items-center gap-4">
//         <img
//           src={stu.avatar}
//           alt={stu.name}
//           className="h-10 w-10 rounded-full border"
//         />
//         <h3 className="text-lg font-semibold">{stu.name}</h3>
//       </div>
//     </div>

//     <div className="flex w-48 flex-col gap-2">
//       <button className="rounded-lg bg-[#374394] border border-[#1E1E1E] py-1 text-xs font-medium text-white hover:scale-105 shadow-[0.5px_1.5px_0_rgba(30,30,30,1)]">
//         Lihat Perkembangan
//       </button>
//       <button 
//       onClick={() => {Router.push(`/students/task-detail`)}}
//       className="rounded-lg bg-[#BFC1FF] border border-[#1E1E1E] py-1 text-xs font-medium text-[#1E1E1E] hover:scale-105 shadow-[0.5px_1.5px_0_rgba(30,30,30,1)]">
//         Lihat Detail Tugas
//       </button>
//     </div>
//   </div>
// );

export default function StudentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredStudents(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSupervisor />

      <div className="max-w-7xl mx-auto px-4 py-8 mt-7">
        <h1 className="text-3xl font-bold text-center mb-10">
          Daftar Pelajar
        </h1>

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
            placeholder="Cari pelajar..."
            icon={
              <img
                src="/search.png"
                className="w-[22px] h-[22px] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={handleSearch}
              />
            }
          />
        </div>

        <div className="space-y-6 mx-28">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} stu={student} />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada pelajar yang ditemukan</p>
            <p className="text-gray-400 mt-2">Coba ubah kata kunci pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  );
}