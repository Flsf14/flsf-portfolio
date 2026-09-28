# Afsun Filosof Portfolio

Website portfolio multidisiplin berbasis Next.js. Data lokal membuat seluruh halaman publik dapat dijalankan tanpa layanan eksternal. Supabase menambahkan database project, media storage, autentikasi admin, dan penyimpanan pesan kontak.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Menghubungkan Supabase

1. Buat project Supabase.
2. Jalankan `supabase/migrations/001_portfolio.sql` melalui migration workflow atau SQL Editor.
3. Salin `.env.example` menjadi `.env.local` dan isi URL serta keys dari dashboard Supabase.
4. Jangan pernah mengekspos `SUPABASE_SERVICE_ROLE_KEY` ke browser.
5. Buat akun admin melalui Supabase Auth sebelum mengaktifkan operasi tulis di dashboard.

Tanpa konfigurasi Supabase, form kontak menampilkan instruksi email langsung dan dashboard berjalan dalam mode baca data lokal. Website tidak berpura-pura menyimpan data.

## Verifikasi

```bash
npm run lint
npm run build
```
