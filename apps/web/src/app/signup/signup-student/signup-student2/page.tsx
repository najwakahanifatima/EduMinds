'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Button from '../../../_components/Button';
import Input from '../../../_components/Input';
import { registerUser } from '@/lib/api';

const SignUp = () => {
  const Router = useRouter();
  const searchParams = useSearchParams();
 
  const [kataSandi, setKataSandi] = useState('');
  const [ulangiKataSandi, setUlangiKataSandi] = useState('');
  const [showError, setShowError] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('DEBUG: clicking submit register');

    if (!kataSandi || !ulangiKataSandi || kataSandi !== ulangiKataSandi) {
      setShowError(true);
      return;
    }

    setShowError(false);

    const nama = searchParams.get('nama') || '';
    const email = searchParams.get('email') || '';
    const tanggal = searchParams.get('tanggal') || '';

    try {
      const data = await registerUser({
        name: nama,
        email: email,
        password: kataSandi,
        birthdate: tanggal,
      });

      setProgressWidth(100);
      localStorage.setItem('id_user', data.id);
      localStorage.setItem('user_name', data.name);
      console.log('DEBUG IN FE: register user', data);

      const params = new URLSearchParams({
        nama,
        email,
        password: kataSandi,
        tanggal,
      });

      console.log('Buat Akun diklik');
      Router.push("/pre-assessment");
    } catch (err) {
      console.error('Gagal mendaftar:', err);
      setShowError(true);
    }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    setProgressWidth(50);
   
    setTimeout(() => {
      const params = new URLSearchParams({
        nama: searchParams.get('nama') || '',
        email: searchParams.get('email') || '',
        tanggal: searchParams.get('tanggal') || ''
      });
     
      Router.push(`/signup/signup-student?${params.toString()}`);
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
        <h1 className="font-semibold text-3xl text-center mb-16 text-[#1E1E1E]">
          Daftar sebagai Pelajar
        </h1>
       
        <div className="space-y-11">
          <Input
            type="password"
            label="Kata Sandi"
            placeholder="Masukkan kata sandi..."
            value={kataSandi}
            onChange={(e) => setKataSandi(e.target.value)}
            required={true}
            hasError={showError && !kataSandi}
          />
          <Input
            type="password"
            label="Ulangi Kata Sandi"
            placeholder="Ulangi kata sandi..."
            value={ulangiKataSandi}
            onChange={(e) => setUlangiKataSandi(e.target.value)}
            required={true}
            hasError={showError && (!ulangiKataSandi || kataSandi !== ulangiKataSandi)}
          />
        </div>
        {showError && (
          <div className="text-red-500 text-sm mt-2">
            {!kataSandi || !ulangiKataSandi 
              ? "Harap isi kata sandi dengan benar"
              : "Kata sandi tidak cocok"
            }
          </div>
        )}
        <div className="mt-20 flex justify-center gap-x-7">
          <form onSubmit={handleBack}>
            <Button type="submit" width="225px">
              Kembali
            </Button>
          </form>
          <form onSubmit={handleSubmit}>
            <Button bgColor="#B3EBCE" width="225px" type="submit">
              Buat Akun
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;