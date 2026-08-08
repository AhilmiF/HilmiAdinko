# Install

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- [MySQL](https://www.mysql.com) v8 or later
- [nodemon](https://nodemon.io) (installed automatically as a dependency)

## 1. Clone the repository

```bash
git clone https://github.com/AhilmiF/HilmiAdinko.git
cd HilmiAdinko
```

## 2. Install dependencies

```bash
npm install
```

This installs:

| Package   | Purpose                         |
|-----------|---------------------------------|
| `express` | HTTP server framework           |
| `mysql2`  | MySQL database driver           |
| `dotenv`  | Environment variable loader     |
| `multer`  | File upload middleware          |
| `nodemon` | Auto-restart on file changes    |

## 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=4000

DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=hilmiadinko
```

> **Note:** `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME` are all required. The server will fail to connect to the database if any of these are missing.

## 4. Setup database

Create a MySQL database named `hilmiadinko` and import your schema.

Tables that are used by the API:
- `users` — columns: `idUser`, `name`, `email`
- `portfolio` — columns: `id`, `nama_proyek`, `lokasi`, `kategori`, `tahun`, `deskripsi`, `image_url`
- `kategori_layanan` — columns: `idkategori_layanan`, `kategori_layanan`
- `contact` — columns: `id`, `nama_lengkap`, `no_whatsapp`, `lokasi`, `keterangan`, `kategori`
- `testimoni` — columns: `id`, `nama_klien`, `waktu`, `rating`, `deskripsi`
- `portofolio` — legacy table
- `layanan`, `kontak`, `home`, `about` — legacy tables

## 5. Start the server

```bash
npm run dev
```

The server will start at: **http://localhost:4000**

## 6. Test the API

You can test the API using this Scalar documentation or tools like Postman / Insomnia.

Available base routes:
- `GET /` — Home page
- `GET /home` — Home data
- `GET /about` — About data
- `GET /layanan` — Layanan data
- `GET|POST /users` — User management
- `GET|POST /portfolio` — Portfolio CRUD
- `GET|POST /contact` — Contact CRUD
- `GET|POST /kategori` — Kategori CRUD
- `GET|POST /testimoniRoute` — Testimoni CRUD
- `POST /upload` — File upload