Project Akhir Backend Express

🗂️ Judul:
Mini Online Store API (Tema nya bebas)

🕒 Durasi:
3 hari pengerjaan mini project

Fitur:
1. Register & Login
 - Hashing password (bcrypt)
 - Auth menggunakan JWT
 - Role-based authorization (admin / user)

2. Produk
 - Admin bisa Create, Read dan Update Produk
 - User dapat melihat semua Produk
 - Filtering, Sorting, Pagination

3. Order
 - User bisa order produk
 - User melihat order miliknya
 - Admin bisa melihat semua order
 - Group order by user ID
 - Filtering, Sorting, Pagination

4. Transfer Antar Point Pengguna
 - Validasi saldo poin
 - Menggunakan Prisma transaction
 - Validasi error handling

5. Upload Foto
 - Upload gambar profil menggunakan multer
 - Upload gambar produk menggunakan multer

6. Soft Delete Produk
 - Tambahkan field deletedAt (nullable DateTime) / status(nullable boolean) di tabel Product
 - Saat produk dihapus, ubah deletedAt jadi waktu sekarang
 - Tambahkan endpoint untuk restore produk (PATCH /products/:id/restore)

7. Dokumentasi API
 - Save semua endpoint projeck ini pada postman
 - export collection/folder tersebut lalu taruh di GitHub bareng dengan projek nya
