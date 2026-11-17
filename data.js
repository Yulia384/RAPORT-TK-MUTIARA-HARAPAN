// ================= KONFIGURASI DEFAULT SEKOLAH & PIN =================
const DEFAULT_SCHOOL_CONFIG = {
  pin: "12345",
  yayasan: "YAYASAN PENDIDIKAN MUTIARA HARAPAN",
  schoolName: "TK MUTIARA HARAPAN",
  schoolAddress: "Sei Meranti, Kec. Tanjung Medan, Kab. Rokan Hilir, Prov. Riau - Kode Pos 28983",
  npsn: "-",
  semester: "I (Ganjil) / Tahun Ajaran 2026-2027",
  kepsekName: "Kepala Sekolah TK Mutiara Harapan",
  kepsekNip: "-",
  guruName: "Guru Kelas Rombel B",
  guruNip: "-",
  ttdDate: "Tanjung Medan, 19 Desember 2026"
};

// Fungsi pembuat narasi otomatis sesuai nama siswa (dapat diedit kapan saja)
function generateDefaultNarasi(nama) {
  return {
    agamaNarasi: `Ananda ${nama} menunjukkan perkembangan yang sangat baik dalam mengenal ajaran agama yang dianutnya. Ananda terbiasa mengucapkan salam, berdoa sebelum dan sesudah melakukan kegiatan, serta menunjukkan sikap santun, jujur, dan menyayangi teman maupun ciptaan Tuhan di lingkungan sekolah.`,
    jatiDiriNarasi: `Ananda ${nama} mampu mengenali dan mengelola emosinya dengan baik saat bermain bersama teman. Ananda menunjukkan kemandirian dalam merawat diri, berani tampil percaya diri di depan kelas, serta memiliki koordinasi motorik kasar dan halus yang berkembang optimal sesuai usianya.`,
    literasiNarasi: `Ananda ${nama} menunjukkan rasa ingin tahu yang tinggi melalui kegiatan eksplorasi dan bermain. Ananda mampu menyimak cerita, mengungkapkan gagasan secara lisan dengan runtut, mengenal konsep bilangan dan bentuk geometri sederhana, serta mengekspresikan imajinasinya melalui karya seni dan menggambar.`,
    p5Narasi: `Dalam kegiatan Projek Penguatan Profil Pelajar Pancasila (P5), ananda ${nama} aktif bergotong royong, menghargai perbedaan, serta antusias menjaga kebersihan dan kelestarian lingkungan sekitar sekolah.`,
    refleksiOrtu: `Terima kasih atas pendampingan dan kerja sama Ayah/Bunda di rumah dalam mendukung pembiasaan baik serta kemandirian ananda ${nama}.`
  };
}

// ================= DATA LENGKAP 26 PESERTA DIDIK (DARI EXCEL) =================
const RAW_STUDENTS_EXCEL = [
  { id: 1, nama: "ABDUL KHOIRIE", jk: "L", nisn: "-", nik: "1407081901210001", tempatLahir: "KABUPATEN ROKAN HILIR", tglLahir: "2021-01-19", agama: "Islam", rombel: "Rombel B", anakKe: "1", ayah: "ZULFAN ARIANDA PANE", pekAyah: "Wiraswasta", ibu: "NOVITA DEWI", pekIbu: "Tidak bekerja", alamat: "PEMATANG SAWAH ATAS, RT 2/RW 5, KASANG BANGSAWAN, Kec. Pujud", bb: "20", tb: "110", lk: "51" },
  { id: 2, nama: "ALFAEZA SALEH", jk: "L", nisn: "-", nik: "1406040102210001", tempatLahir: "KAMPUNG PANJANG", tglLahir: "2021-02-01", agama: "Islam", rombel: "Rombel B", anakKe: "3", ayah: "ILHAM SALEH", pekAyah: "Petani", ibu: "ARYANIK", pekIbu: "Tidak bekerja", alamat: "KAMPUNG PANJANG, RT 2/RW 2, RANTAU PANJANG, Kec. Tambusai", bb: "24", tb: "110", lk: "51" },
  { id: 3, nama: "ATHALLAH RAFIQ SYAHPUTRA", jk: "L", nisn: "-", nik: "1407161102210002", tempatLahir: "TANJUNG MEDAN", tglLahir: "2021-02-11", agama: "Islam", rombel: "Rombel B", anakKe: "2", ayah: "IIS PURWADI", pekAyah: "Wiraswasta", ibu: "REZA APRIYA UTAMI", pekIbu: "Tidak bekerja", alamat: "DUSUN TEBING TINGGI I, RT 2/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "18", tb: "100", lk: "50" },
  { id: 4, nama: "DAFFA AFFNAN FADLAN", jk: "L", nisn: "-", nik: "1407160609210001", tempatLahir: "KABUPATEN ROKAN HILIR", tglLahir: "2021-09-06", agama: "Islam", rombel: "Rombel B", anakKe: "1", ayah: "MUHAMMAD WAHYU", pekAyah: "-", ibu: "SITI AMINAH", pekIbu: "Tidak bekerja", alamat: "DUSUN TEBING TINGGI II, RT 1/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "25", tb: "110", lk: "51" },
  { id: 5, nama: "DANIEL", jk: "L", nisn: "-", nik: "1407161608200002", tempatLahir: "TANJUNG MEDAN", tglLahir: "2020-08-16", agama: "Kristen", rombel: "Rombel B", anakKe: "1", ayah: "ANDIKA PRATAMA", pekAyah: "Karyawan Swasta", ibu: "SOPIA", pekIbu: "Tidak bekerja", alamat: "DUSUN TEBING TINGGI II, RT 2/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "20", tb: "111", lk: "51" },
  { id: 6, nama: "DESVIA ADRIELLA TOBING", jk: "P", nisn: "-", nik: "1407165312200003", tempatLahir: "KABUPATEN ROKAN HILIR", tglLahir: "2020-12-13", agama: "Kristen", rombel: "Rombel B", anakKe: "5", ayah: "HOTBEN L TOBING", pekAyah: "Wiraswasta", ibu: "ROULINA SIHOTANG", pekIbu: "Tidak bekerja", alamat: "TEBING TINGGI III, RT 1/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "18", tb: "110", lk: "51" },
  { id: 7, nama: "DOMINIK NAPATAR SIHOMBING", jk: "L", nisn: "-", nik: "6105012906210002", tempatLahir: "SINTANG", tglLahir: "2021-06-29", agama: "Katholik", rombel: "Rombel B", anakKe: "2", ayah: "TOMSON SIHOMBING", pekAyah: "Wiraswasta", ibu: "NELLI", pekIbu: "Tidak bekerja", alamat: "DUSUN TEBING TINGGI II, RT 2/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "25", tb: "110", lk: "55" },
  { id: 8, nama: "FELICYA BIRGITTA OCA", jk: "P", nisn: "-", nik: "1407164707210002", tempatLahir: "KABUPATEN ROKAN HILIR", tglLahir: "2021-07-07", agama: "Islam", rombel: "Rombel B", anakKe: "2", ayah: "MUHD JAYUSMAN DP", pekAyah: "Wiraswasta", ibu: "SITI ASWATUL JANAH", pekIbu: "Tidak bekerja", alamat: "DUSUN TEBING TINGGI I, RT 1/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "20", tb: "110", lk: "51" },
  { id: 9, nama: "FEODORA TINDAON", jk: "P", nisn: "-", nik: "1407165206210003", tempatLahir: "BAGAN BATU", tglLahir: "2021-06-12", agama: "Katholik", rombel: "Rombel B", anakKe: "4", ayah: "FRIWANDO SITINDAON", pekAyah: "-", ibu: "LISMA SITIO", pekIbu: "Tidak bekerja", alamat: "DUSUN DARUSSALAM, RT 2/RW 2, SEI MERANTI DARUSSALAM, Kec. Tanjung Medan", bb: "23", tb: "120", lk: "54" },
  { id: 10, nama: "FUTRI ENGJELIKA SILAEN", jk: "P", nisn: "-", nik: "1407165701210001", tempatLahir: "BAGAN BATU", tglLahir: "2021-01-17", agama: "Kristen", rombel: "Rombel B", anakKe: "2", ayah: "LEONARDO SILAEN", pekAyah: "Wiraswasta", ibu: "FITRI HUTASOIT", pekIbu: "Wiraswasta", alamat: "DUSUN MERANTI, RT 2/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "22", tb: "110", lk: "50" },
  { id: 11, nama: "GERALDO SAMOSIR", jk: "L", nisn: "-", nik: "1407161705210002", tempatLahir: "BAGAN BATU", tglLahir: "2021-05-17", agama: "Kristen", rombel: "Rombel B", anakKe: "2", ayah: "JUSPAIR SAMOSIR", pekAyah: "Petani", ibu: "LISBET BR HUTASOIT", pekIbu: "Tidak bekerja", alamat: "DUSUN TEBING TINGGI II, RT 1/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "24", tb: "110", lk: "51" },
  { id: 12, nama: "JACELLYN FELECIA BORU NAINGGOLAN", jk: "P", nisn: "-", nik: "1407164404210002", tempatLahir: "BAGAN BATU", tglLahir: "2021-04-04", agama: "Kristen", rombel: "Rombel B", anakKe: "2", ayah: "JANUARI H. NAINGGOLAN", pekAyah: "Karyawan Swasta", ibu: "EFFI JURIA BR SIANTURI", pekIbu: "Tidak bekerja", alamat: "JL. LINTAS TANJUNG MEDAN MAHATO, RT 1/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "25", tb: "115", lk: "52" },
  { id: 13, nama: "MARTIN MIRACLE SITORUS", jk: "L", nisn: "-", nik: "1407162309200001", tempatLahir: "TANJUNG MEDAN", tglLahir: "2020-09-23", agama: "Kristen", rombel: "Rombel B", anakKe: "2", ayah: "RAYANTO SITORUS", pekAyah: "Wiraswasta", ibu: "NITA SUPRIANI BR SIANTURI", pekIbu: "Tidak bekerja", alamat: "SEI MERANTI, RT 1/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "23", tb: "110", lk: "50" },
  { id: 14, nama: "METHA MARIA HARIANJA", jk: "P", nisn: "-", nik: "1207264804210002", tempatLahir: "KABUPATEN DELI SERDANG", tglLahir: "2021-04-08", agama: "Kristen", rombel: "Rombel B", anakKe: "1", ayah: "GOKLAS HENDRA FREDDY HARIANJA", pekAyah: "Karyawan Swasta", ibu: "APRILIANTI BR TUMANGGOR", pekIbu: "Tidak bekerja", alamat: "DUSUN TEBING TINGGI 1, RT 1/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "20", tb: "110", lk: "50" },
  { id: 15, nama: "MUHAMMAD RAFFASYA NUGRAHA", jk: "L", nisn: "-", nik: "1406090111210001", tempatLahir: "RAMBAH BARU", tglLahir: "2021-11-01", agama: "Islam", rombel: "Rombel B", anakKe: "2", ayah: "RAMA DWI NUGRAHA", pekAyah: "Wiraswasta", ibu: "LILIS DAYANI", pekIbu: "Tidak bekerja", alamat: "RANTAU PANJANG DUSUN KAMPUNG PANJANG, RT 2/RW 2, RANTAU PANJANG, Kec. Tanjung Medan", bb: "23", tb: "110", lk: "50" },
  { id: 16, nama: "ORLE SEPTIA BORU SINAGA", jk: "P", nisn: "-", nik: "1407085809200001", tempatLahir: "BAGAN BATU", tglLahir: "2020-09-18", agama: "Kristen", rombel: "Rombel B", anakKe: "3", ayah: "ARNIUS SINAGA", pekAyah: "Wiraswasta", ibu: "SERI DEWI SIREGAR", pekIbu: "Tidak bekerja", alamat: "DUSUN BANGUN JADI, RT 3/RW 2, BAKTI MAKMUR, Kec. Bagan Sinembah", bb: "23", tb: "110", lk: "50" },
  { id: 17, nama: "QIAN PUSPINATA", jk: "L", nisn: "-", nik: "1302102706210001", tempatLahir: "SOLOK", tglLahir: "2021-06-27", agama: "Islam", rombel: "Rombel B", anakKe: "1", ayah: "ERIC MENDINATA", pekAyah: "Lainnya", ibu: "PUSPITA SARI", pekIbu: "Tidak bekerja", alamat: "JORONG TIGO BALAI DUSUN TIGO BALAI, KOTO LAWEH, Kec. Lembang Jaya", bb: "18", tb: "110", lk: "52" },
  { id: 18, nama: "WIRA PRADANA", jk: "L", nisn: "-", nik: "1407160908200001", tempatLahir: "TANJUNG MEDAN", tglLahir: "2020-08-09", agama: "Islam", rombel: "Rombel B", anakKe: "2", ayah: "SUYETNO", pekAyah: "Tidak bekerja", ibu: "JUMIYEM", pekIbu: "Tidak bekerja", alamat: "DUSUN MERANTI, RT 1/RW 1, SEI MERANTI, Kec. Tanjung Medan", bb: "20", tb: "110", lk: "51" },
  { id: 19, nama: "YULIANDA HUTAGALUNG", jk: "P", nisn: "-", nik: "1407165410210001", tempatLahir: "TANJUNG MEDAN", tglLahir: "2021-10-14", agama: "Kristen", rombel: "Rombel B", anakKe: "2", ayah: "JULIPER HUTAGALUNG", pekAyah: "Wiraswasta", ibu: "ELSERIA SITORUS PANE", pekIbu: "Tidak bekerja", alamat: "SEI MERANTI, RT 2/RW 2, SEI MERANTI, Kec. Tanjung Medan", bb: "18", tb: "110", lk: "50" },
  { id: 20, nama: "MUHAMMAD ADAM", jk: "L", nisn: "-", nik: "-", tempatLahir: "-", tglLahir: "-", agama: "Islam", rombel: "Rombel A", anakKe: "-", ayah: "-", pekAyah: "-", ibu: "-", pekIbu: "-", alamat: "Sei Meranti, Kec. Tanjung Medan", bb: "-", tb: "-", lk: "-" },
  { id: 21, nama: "DELIMA NABABAN", jk: "P", nisn: "-", nik: "-", tempatLahir: "-", tglLahir: "-", agama: "Kristen", rombel: "Rombel A", anakKe: "-", ayah: "-", pekAyah: "-", ibu: "-", pekIbu: "-", alamat: "Sei Meranti, Kec. Tanjung Medan", bb: "-", tb: "-", lk: "-" },
  { id: 22, nama: "ALIANDO ALVARO KENZY", jk: "L", nisn: "-", nik: "-", tempatLahir: "-", tglLahir: "-", agama: "-", rombel: "Rombel A", anakKe: "-", ayah: "-", pekAyah: "-", ibu: "-", pekIbu: "-", alamat: "Sei Meranti, Kec. Tanjung Medan", bb: "-", tb: "-", lk: "-" },
  { id: 23, nama: "ANUGRAH SAPUTRA ZEGA", jk: "L", nisn: "-", nik: "-", tempatLahir: "-", tglLahir: "-", agama: "Kristen", rombel: "Rombel A", anakKe: "-", ayah: "-", pekAyah: "-", ibu: "-", pekIbu: "-", alamat: "Sei Meranti, Kec. Tanjung Medan", bb: "-", tb: "-", lk: "-" },
  { id: 24, nama: "MUHAMMAD ALFAHRIANSYAH", jk: "L", nisn: "-", nik: "-", tempatLahir: "-", tglLahir: "-", agama: "Islam", rombel: "Rombel A", anakKe: "-", ayah: "-", pekAyah: "-", ibu: "-", pekIbu: "-", alamat: "Sei Meranti, Kec. Tanjung Medan", bb: "-", tb: "-", lk: "-" },
  { id: 25, nama: "FEODORA TINDAON (A)", jk: "P", nisn: "-", nik: "-", tempatLahir: "BAGAN BATU", tglLahir: "2021-06-12", agama: "Katholik", rombel: "Rombel A", anakKe: "4", ayah: "FRIWANDO SITINDAON", pekAyah: "-", ibu: "LISMA SITIO", pekIbu: "-", alamat: "DUSUN DARUSSALAM, SEI MERANTI, Kec. Tanjung Medan", bb: "-", tb: "-", lk: "-" },
  { id: 26, nama: "KRISTIAN", jk: "L", nisn: "-", nik: "-", tempatLahir: "-", tglLahir: "-", agama: "Kristen", rombel: "Rombel A", anakKe: "-", ayah: "-", pekAyah: "-", ibu: "-", pekIbu: "-", alamat: "Sei Meranti, Kec. Tanjung Medan", bb: "-", tb: "-", lk: "-" }
];

// Gabungkan biodata siswa dengan narasi & absensi default
const INITIAL_STUDENTS = RAW_STUDENTS_EXCEL.map(s => ({
  ...s,
  sakit: 0,
  izin: 0,
  alpha: 0,
  ...generateDefaultNarasi(s.nama)
}));