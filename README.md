![image](https://github.com/user-attachments/assets/dd568965-2b5d-4dde-8d8d-c6f1727b6fc3)# 🧠 EduMinds

![logo](https://github.com/user-attachments/assets/d18d4337-392f-43f6-8def-a0e87c06a671)
EduMinds adalah platform pembelajaran berbasis AI yang dirancang untuk meningkatkan partisipasi kerja penyandang disabilitas intelektual. Dengan pra-asesmen potensi, jalur belajar adaptif, dan sistem sertifikasi resmi, EduMinds membantu menciptakan tenaga kerja terampil yang siap diserap industri.

## 🎯 Visi & Dampak

- Meningkatkan tingkat partisipasi kerja penyandang disabilitas intelektual
- Menurunkan beban anggaran perlindungan sosial negara
- Memperluas basis tenaga kerja terampil bagi industri
- Mendukung **SDG 8**: Pekerjaan layak dan pertumbuhan ekonomi inklusif
- Mendukung **SDG 10**: Pengurangan ketimpangan sosial

### 🏆 Manfaat

- **Untuk pengguna:** Pembelajaran sesuai gaya kognitif, bimbingan personal, akses ke lowongan kerja terkurasi
- **Untuk perusahaan:** Kandidat terlatih sesuai standar industri, laporan perkembangan tervalidasi
- **Untuk masyarakat:** Budaya kerja inklusif, persepsi baru terhadap keberagaman kemampuan

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- **Next.js**
- **Tailwind CSS**

### 🔧 Backend
- **NestJS** – REST API utama
- **Supabase** – Auth + Database
- **Drizzle ORM** – ORM ringan dan typesafe
- **JWT** – JSON Web Token untuk autentikasi

### 🤖 Machine Learning
- **FastAPI** – Layanan ML
- **Google Generative AI (Gemini API)** – Integrasi AI

---

## 📁 Struktur Folder

```bash
apps/
├── api/
│   ├── src/
│   └── test/
│   ├── .gitignore
│   ├── README.md
│   └── ...
├── web/
│   ├── public/
│   └── src/app/
│       ├── _components/
│       ├── career/
│       ├── chat/
│       ├── learning/
│       ├── login/
│       ├── signup/
│       ├── pre-assessment/
│       ├── supervisor/
│       ├── user-dashboard/
│       └── ...
```

## 💻 Struktur Basis Data
![EduMinds MVP](https://github.com/user-attachments/assets/d8a5f4ea-3c26-4a65-85c9-ef4acb779ea0)


## 📦 Install Dependensi

### 🔧 Backend (NestJS & FastAPI)

```bash
pip install fastapi "uvicorn[standard]"
pip install joblib
npm install drizzle-orm
npm install pg
npm install dotenv
npm install numpy
npm install scikit-learn
npm install @supabase/ssr
npm install @google/generative-ai
npm install @nestjs/jwt
```

### 🖥️ Frontend (Next.js + Tailwind)

```bash
npm install @heroicons/react
```


## 🚀 Cara Menjalankan

### ML Service
```bash
cd apps/api/ml-service
uvicorn api:app --reload --port 5000
```

### Backend API
```bash
cd apps/api
npm install
npm run start
```

### Frontend
```bash
cd apps/web
npm install
npm run dev
```

## 🖼️ Tampilan Aplikasi
| Halaman | Screenshot |
|---|---|
| Halaman Awal | ![Screenshot 2025-07-06 213327](https://github.com/user-attachments/assets/436a9ca3-beb7-422a-9e00-7c4e95d1d881) |
| Masuk | ![image](https://github.com/user-attachments/assets/42e450d7-1607-45ad-b901-288c973e4c34) |
| Daftar | ![image](https://github.com/user-attachments/assets/7fa0d25d-ff79-4b9d-90f8-a57a338603c6) |
| Beranda - Pelajar | ![image](https://github.com/user-attachments/assets/661194c0-fc01-49cb-9b1b-22f40df8d342) |
| Belajar - Pelajar | ![image](https://github.com/user-attachments/assets/e2a30def-644d-47f6-b42f-9626d910233c) |
| Cari Lowongan - Pelajar | ![image](https://github.com/user-attachments/assets/b26ced1b-1df5-4b40-8afc-670abea55de8) |
| Lowongan Tersedia - Pelajar | ![image](https://github.com/user-attachments/assets/c596b2f0-78bd-4f3a-8b30-14989cf7598d) |
| Lihat Pendamping - Pelajar | ![image](https://github.com/user-attachments/assets/ed43a703-c67f-4e84-b60c-6c23f1b08d35) |
| Cari Pendamping - Pelajar | ![image](https://github.com/user-attachments/assets/a9a8ab47-bf28-4f93-ae06-6a92aae58d38) |
| Chat - Pelajar | ![image](https://github.com/user-attachments/assets/7e66f10c-91b7-406a-b078-1a5a43234c36) |
| Profil - Pelajar | ![image](https://github.com/user-attachments/assets/c12c5297-6ec4-477f-85b4-2c41cde73356) |
| Beranda - Supervisor | ![image](https://github.com/user-attachments/assets/4cf09861-fbdf-4eca-af67-ddb804b02afe) |
| Lihat Perkembangan - Supervisor | ![image](https://github.com/user-attachments/assets/b2220b92-eb46-4987-8efd-ba0e878900f7) |
| Detail Tugas - Supervisor | ![image](https://github.com/user-attachments/assets/436edd88-8cc7-4a53-b1a4-e01d31da6410) |
| Lihat Jadwal - Supervisor | ![image](https://github.com/user-attachments/assets/9627bad8-48c0-492a-a6b2-5b314e137488) |
| Pelajar - Supervisor | ![image](https://github.com/user-attachments/assets/c21b961c-5b1e-40f5-8807-b812df40d78a) |
| Profil - Supervisor | ![image](https://github.com/user-attachments/assets/81a80b1d-2bc6-486d-8f72-c5fc16a060e1) |


## 👥 Kontributor

| Nama                    | Peran               |
|-------------------------|---------------------|
| Nayla Zahira            | Frontend Developer  |
| Najwa Kahani Fatima     | Backend Developer   |
| Ranashahira Reztaputri  | Frontend Developer  |
