# LearnAI — Setup Guide

## Struktur folder
```
learnai-backend/
├── server.js         ← backend Express
├── package.json
└── public/
    └── index.html    ← frontend website
```

## Cara pakai

### 1. Install Node.js
Download di https://nodejs.org (pilih versi LTS)

### 2. Masuk ke folder project
```bash
cd learnai-backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Taruh API Key kamu
Buka file `server.js`, cari baris ini:
```js
const ANTHROPIC_API_KEY = 'sk-ant-XXXXXXXXXXXXXXXXXXXXXXXX';
```
Ganti dengan API key kamu dari https://console.anthropic.com

### 5. Jalankan server
```bash
npm start
```
atau pakai nodemon biar auto-reload pas edit:
```bash
npm run dev
```

### 6. Buka di browser
```
http://localhost:3000
```

## Dapat API Key dari mana?
1. Daftar/login di https://console.anthropic.com
2. Klik "API Keys" di sidebar
3. Klik "Create Key"
4. Copy dan tempel ke server.js

## Catatan
- API key JANGAN di-share atau di-upload ke GitHub
- Kalau mau deploy ke internet nanti, pindahin API key ke file .env
