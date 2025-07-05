'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '../../_components/Button';
import Input from '../../_components/Input';

const SignUp = () => {
  const Router = useRouter();
  const searchParams = useSearchParams();
 
  const [namaLengkap, setNamaLengkap] = useState(searchParams.get('nama') || '');
  const [jenisKelamin, setJenisKelamin] = useState(searchParams.get('jenis') || '');
  const [alamatEmail, setAlamatEmail] = useState(searchParams.get('email') || '');
  const [tanggalLahir, setTanggalLahir] = useState(searchParams.get('tanggal') || '');
  const [showError, setShowError] = useState(false);
  const [progressWidth, setProgressWidth] = useState(33);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaLengkap || !jenisKelamin || !alamatEmail || !tanggalLahir) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setProgressWidth(66);
   
    setTimeout(() => {
      const params = new URLSearchParams({
        nama: namaLengkap,
        jenis: jenisKelamin,
        email: alamatEmail,
        tanggal: tanggalLahir
      });
     
      console.log('Lanjutkan diklik');
      Router.push(`/signup/signup-supervisor/signup-supervisor2?${params.toString()}`);
    }, 300);
  };

  return (
    <div className="min-h-screen m-2">
      <div className="w-full bg-[#1C245B] h-2.5 mb-5 rounded-full overflow-hidden">
        <div
          className="bg-[#7375F3] h-2.5 rounded-r-full transition-all duration-500 ease-out"
          style={{width: `${progressWidth}%`}}
        ></div>
      </div>
     
      <div className="max-w-lg mx-auto pt-16 px-4">
        <h1 className="font-semibold text-3xl text-center mb-12 text-[#1E1E1E]">
          Daftar sebagai Supervisor
        </h1>
       
        <div className="space-y-6">
          <Input
            type="text"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap..."
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            required={true}
            hasError={showError && !namaLengkap}
          />
        <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            Jenis Kelamin
        </label>
        
        <div className="relative">
            <select
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
            className={`w-full px-4 py-3 pr-10 border rounded-lg bg-[#e9e9ff] 
                appearance-none cursor-pointer
                focus:ring-2 focus:ring-[#7476e7] focus:border-transparent 
                outline-none transition-all
                ${showError && !jenisKelamin ? 'border-red-500' : 'border-gray-400'}
                hover:border-[#7476e7]
            `}
            style={{ backgroundImage: 'none' }}
            >
            <option value="" disabled className="text-gray-300">Masukkan jenis kelamin...</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
            </select>
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            </div>
        </div>
        </div>
          <Input
            type="email"
            label="Alamat Email"
            placeholder="Masukkan alamat email..."
            value={alamatEmail}
            onChange={(e) => setAlamatEmail(e.target.value)}
            required={true}
            hasError={showError && !alamatEmail}
          />
          <Input
            type="date"
            label="Tanggal Lahir"
            placeholder="DD/MM/YY"
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
            required={true}
            hasError={showError && !tanggalLahir}
          />
        </div>
        {showError && (
          <div className="text-red-500 text-sm mt-2">
            Harap isi seluruh informasi
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <form onSubmit={handleSubmit}>
            <Button width="200px">
              Lanjutkan
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;