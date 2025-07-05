'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '../../_components/Button';
import Input from '../../_components/Input';

const SignUp = () => {
  const Router = useRouter();
  const searchParams = useSearchParams();
  
  const [namaLengkap, setNamaLengkap] = useState(searchParams.get('nama') || '');
  const [alamatEmail, setAlamatEmail] = useState(searchParams.get('email') || '');
  const [tanggalLahir, setTanggalLahir] = useState(searchParams.get('tanggal') || '');
  const [showError, setShowError] = useState(false);
  const [progressWidth, setProgressWidth] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaLengkap || !alamatEmail || !tanggalLahir) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setProgressWidth(100);
    
    setTimeout(() => {
      const params = new URLSearchParams({
        nama: namaLengkap,
        email: alamatEmail,
        tanggal: tanggalLahir
      });
      
      console.log('Lanjutkan diklik');
      Router.push(`/signup/signup-student/signup-student2?${params.toString()}`);
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
          Daftar sebagai Pelajar
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
            placeholder="Masukkan tanggal lahir..."
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
            <Button 
              width="200px"
              type="submit"
            >
              Lanjutkan
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;