'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Button from '../../../_components/Button';
import Input from '../../../_components/Input';

const SignUp = () => {
  const Router = useRouter();
  const searchParams = useSearchParams();
 
  const [pengalaman, setPengalaman] = useState('');
  const [showError, setShowError] = useState(false);
  const [progressWidth, setProgressWidth] = useState(66);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pengalaman) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setProgressWidth(100);
   
    setTimeout(() => {
      const params = new URLSearchParams({
        nama: searchParams.get('nama') || '',
        jenis: searchParams.get('jenis') || '',
        email: searchParams.get('email') || '',
        tanggal: searchParams.get('tanggal') || '',
        pengalaman: pengalaman
      });
     
      console.log('Lanjutkan diklik');
      Router.push(`/signup/signup-supervisor/signup-supervisor3?${params.toString()}`);
    }, 300);
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    setProgressWidth(33);
   
    setTimeout(() => {
      const params = new URLSearchParams({
        nama: searchParams.get('nama') || '',
        jenis: searchParams.get('jenis') || '',
        email: searchParams.get('email') || '',
        tanggal: searchParams.get('tanggal') || ''
      });
     
      Router.push(`/signup/signup-supervisor?${params.toString()}`);
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
            type="textarea"
            label="Pengalaman"
            placeholder="Masukkan pengalaman..."
            value={pengalaman}
            onChange={(e) => setPengalaman(e.target.value)}
            required={true}
            hasError={showError && !pengalaman}
          />
        </div>
        {showError && (
          <div className="text-red-500 text-sm mt-2">
            Harap isi pengalaman Anda
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