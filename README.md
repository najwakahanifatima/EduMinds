# 🧠 EduMinds

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

## 👥 Kontributor

| Nama                    | Peran               |
|-------------------------|---------------------|
| Nayla Zahira            | Frontend Developer  |
| Najwa Kahani Fatima     | Backend Developer   |
| Ranashahira Reztaputri  | Frontend Developer  |
