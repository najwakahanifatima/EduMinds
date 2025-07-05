'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../_components/Button';
import Input from '../_components/Input';
import { loginRequest } from '@/lib/api';

const Login = () => {
  const Router = useRouter();
  const [alamatEmail, setAlamatEmail] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (role: 'user' | 'supervisor') => {
    if (!alamatEmail || !kataSandi) {
      setShowError(true);
      setErrorMessage('Harap isi semua field');
      return;
    }

    try {
      const { access_token } = await loginRequest(role, alamatEmail, kataSandi);
      localStorage.setItem('token', access_token);

      if (role === 'user') {
        Router.push('/user-dashboard');
      } else {
        Router.push('/supervisor-dashboard');
      }
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(err.message || 'Login gagal');
    }
  };

  return (
    <div className="h-screen flex">
        <div className="flex-1 relative overflow-hidden">
            <img
            src="login-bgver2.png"
            alt="Login Background"
            className="w-full h-full object-cover"
            />
        </div>
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="font-semibold text-3xl text-gray-800 mb-2">Masuk ke</h1>
            <div className="flex justify-center -mt-10 -mb-3">
              <img
                src="logo.png"
                alt="EduMinds Logo"
                className="w-72 h-auto"
              />
            </div>
          </div>
          <div className="space-y-4">
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
              type="password"
              label="Kata Sandi"
              placeholder="Masukkan kata sandi..."
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
              required={true}
              hasError={showError && !kataSandi}
            />
          </div>
          {showError && (
            <div className="text-red-500 text-sm mt-2">
              Harap isi alamat email dan kata sandi dengan benar
            </div>
          )}
          <div className="space-y-5 mt-12">
              <Button
                type="submit"
                bgColor="#EDCD50"
                width="full"
                fontWeight="font-medium"
                onClick={() => handleLogin('user')}
              >
                Masuk sebagai Pelajar
              </Button>
              <Button
                type="submit"
                bgColor="#B3EBCE"
                width="full"
                fontWeight="font-medium"
                onClick={() => handleLogin('supervisor')}
              >
                Masuk sebagai Supervisor
              </Button>
          </div>
          <div className="text-right">
            <a
              href="#"
              className="text-[#1A1C7B] hover:text-[#5254A8] text-sm underline"
              onClick={(e) => {
                e.preventDefault();
                console.log('Lupa kata sandi diklik');
              }}
            >
              Lupa kata sandi?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;