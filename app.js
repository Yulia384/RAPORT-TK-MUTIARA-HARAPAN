// ================= STATE & STORAGE KEYS =================
const STORAGE_KEYS = {
  CONFIG: "tk_mh_raport_config_v1",
  STUDENTS: "tk_mh_raport_students_v1",
  PREFS: "tk_mh_raport_prefs_v1"
};

let schoolConfig = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONFIG)) || { ...DEFAULT_SCHOOL_CONFIG };
let studentsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS)) || JSON.parse(JSON.stringify(INITIAL_STUDENTS));
let userPrefs = JSON.parse(localStorage.getItem(STORAGE_KEYS.PREFS)) || { paper: "a4", theme: "theme-emerald" };

let currentStudentId = studentsData.length > 0 ? studentsData[0].id : null;
let isKepsekAdmin = false; // true jika login via PIN, false jika Mode Pihak ke-3 / Percetakan

// ================= INISIALISASI DOM =================
document.addEventListener("DOMContentLoaded", () => {
  applyPreferences();
  bindEvents();
});

function saveAllToStorage() {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(schoolConfig));
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(studentsData));
  localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(userPrefs));
}

function applyPreferences() {
  document.body.classList.remove("paper-a4", "paper-f4");
  document.body.classList.add(`paper-${userPrefs.paper}`);

  document.body.classList.remove("theme-emerald", "theme-blue", "theme-teal", "theme-amber", "theme-purple");
  document.body.classList.add(userPrefs.theme);

  document.getElementById("select-paper").value = userPrefs.paper;
  document.getElementById("select-theme").value = userPrefs.theme;
}

// ================= LOGIN & KEAMANAN PIN =================
function enterWorkspace(adminMode) {
  isKepsekAdmin = adminMode;
  document.getElementById("login-overlay").classList.add("hidden");
  document.getElementById("app-toolbar").classList.remove("hidden");
  document.getElementById("raport-workspace").classList.remove("hidden");

  const badge = document.getElementById("role-badge");
  const pinChangeBox = document.getElementById("pin-change-box");

  if (isKepsekAdmin) {
    badge.textContent = "Mode Kepala Sekolah / Guru (Akses Penuh)";
    pinChangeBox.classList.remove("hidden");
  } else {
    badge.textContent = "Mode Percetakan / Pihak Ke-3 (Edit, Unduh & Print)";
    pinChangeBox.classList.add("hidden"); // Pihak ke-3 tidak bisa mengubah PIN Kepsek
  }

  refreshStudentDropdown();
  renderRaportDocument();
}

// ================= RENDER DOKUMEN RAPORT =================
function renderRaportDocument() {
  // Render Kop & Tanda Tangan Sekolah
  document.getElementById("view-yayasan").textContent = schoolConfig.yayasan;
  document.getElementById("view-school-name").textContent = schoolConfig.schoolName;
  document.getElementById("view-school-address").textContent = `Alamat: ${schoolConfig.schoolAddress}`;
  document.getElementById("view-npsn").textContent = schoolConfig.npsn;
  document.getElementById("r-semester").textContent = schoolConfig.semester;
  document.getElementById("r-tempat-tgl").textContent = schoolConfig.ttdDate;
  document.getElementById("r-nama-guru").textContent = schoolConfig.guruName;
  document.getElementById("r-nip-guru").textContent = schoolConfig.guruNip;
  document.getElementById("r-nama-kepsek").textContent = schoolConfig.kepsekName;
  document.getElementById("r-nip-kepsek").textContent = schoolConfig.kepsekNip;

  // Render Data Siswa Terpilih
  const student = studentsData.find(s => s.id === currentStudentId) || studentsData[0];
  if (!student) return;
  currentStudentId = student.id;

  document.getElementById("r-nama").textContent = student.nama;
  document.getElementById("r-nik").textContent = student.nik || "-";
  document.getElementById("r-nisn").textContent = student.nisn || "-";
  document.getElementById("r-rombel").textContent = student.rombel || "-";
  document.getElementById("r-ttl").textContent = `${student.tempatLahir || "-"}, ${formatTanggalIndo(student.tglLahir)}`;
  document.getElementById("r-agama").textContent = student.agama || "-";
  document.getElementById("r-jk").textContent = student.jk === "L" ? "Laki-laki" : (student.jk === "P" ? "Perempuan" : "-");
  document.getElementById("r-anak-ke").textContent = student.anakKe || "-";
  document.getElementById("r-ayah").textContent = student.ayah || "-";
  document.getElementById("r-ibu").textContent = student.ibu || "-";
  document.getElementById("r-pek-ayah").textContent = student.pekAyah || "-";
  document.getElementById("r-pek-ibu").textContent = student.pekIbu || "-";
  document.getElementById("r-alamat").textContent = student.alamat || "-";

  // Narasi Capaian
  document.getElementById("r-agama-narasi").textContent = student.agamaNarasi;
  document.getElementById("r-jatidiri-narasi").textContent = student.jatiDiriNarasi;
  document.getElementById("r-literasi-narasi").textContent = student.literasiNarasi;
  document.getElementById("r-p5-narasi").textContent = student.p5Narasi;
  document.getElementById("r-refleksi-ortu").textContent = student.refleksiOrtu;

  // Pertumbuhan & Kehadiran
  document.getElementById("r-bb").textContent = student.bb || "-";
  document.getElementById("r-tb").textContent = student.tb || "-";
  document.getElementById("r-lk").textContent = student.lk || "-";
  document.getElementById("r-sakit").textContent = student.sakit ?? 0;
  document.getElementById("r-izin").textContent = student.izin ?? 0;
  document.getElementById("r-alpha").textContent = student.alpha ?? 0;
}

function formatTanggalIndo(tglStr) {
  if (!tglStr || tglStr === "-") return "-";
  const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const parts = tglStr.split("-");
  if (parts.length === 3) {
    const m = parseInt(parts[1], 10) - 1;
    return `${parseInt(parts[2], 10)} ${bulan[m] || parts[1]} ${parts[0]}`;
  }
  return tglStr;
}

function refreshStudentDropdown() {
  const select = document.getElementById("select-student");
  select.innerHTML = "";
  studentsData.forEach((s, idx) => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${idx + 1}. ${s.nama} (${s.rombel})`;
    if (s.id === currentStudentId) opt.selected = true;
    select.appendChild(opt);
  });
  document.getElementById("student-count").textContent = studentsData.length;
}

// ================= EDIT, TAMBAH, & HAPUS SISWA =================
function openEditModal(studentId) {
  const s = studentsData.find(item => item.id === studentId);
  if (!s) return;

  document.getElementById("edit-id").value = s.id;
  document.getElementById("edit-nama").value = s.nama;
  document.getElementById("edit-jk").value = s.jk || "L";
  document.getElementById("edit-rombel").value = s.rombel || "";
  document.getElementById("edit-nik").value = s.nik || "";
  document.getElementById("edit-nisn").value = s.nisn || "";
  document.getElementById("edit-agama").value = s.agama || "";
  document.getElementById("edit-tempat-lahir").value = s.tempatLahir || "";
  document.getElementById("edit-tgl-lahir").value = s.tglLahir || "";
  document.getElementById("edit-anak-ke").value = s.anakKe || "";
  document.getElementById("edit-ayah").value = s.ayah || "";
  document.getElementById("edit-pek-ayah").value = s.pekAyah || "";
  document.getElementById("edit-ibu").value = s.ibu || "";
  document.getElementById("edit-pek-ibu").value = s.pekIbu || "";
  document.getElementById("edit-alamat").value = s.alamat || "";
  document.getElementById("edit-bb").value = s.bb || "";
  document.getElementById("edit-tb").value = s.tb || "";
  document.getElementById("edit-lk").value = s.lk || "";
  document.getElementById("edit-sakit").value = s.sakit ?? 0;
  document.getElementById("edit-izin").value = s.izin ?? 0;
  document.getElementById("edit-alpha").value = s.alpha ?? 0;
  document.getElementById("edit-agama-narasi").value = s.agamaNarasi || "";
  document.getElementById("edit-jatidiri-narasi").value = s.jatiDiriNarasi || "";
  document.getElementById("edit-literasi-narasi").value = s.literasiNarasi || "";
  document.getElementById("edit-p5-narasi").value = s.p5Narasi || "";
  document.getElementById("edit-refleksi-ortu").value = s.refleksiOrtu || "";

  document.getElementById("modal-edit").classList.remove("hidden");
}

function renderStudentsTable(filterText = "") {
  const tbody = document.getElementById("students-table-body");
  tbody.innerHTML = "";

  const filtered = studentsData.filter(s => s.nama.toLowerCase().includes(filterText.toLowerCase()));
  filtered.forEach((s, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${s.nama}</strong></td>
      <td>${s.jk}</td>
      <td>${s.tempatLahir}, ${s.tglLahir}</td>
      <td>${s.rombel}</td>
      <td>Ayah: ${s.ayah}<br/>Ibu: ${s.ibu}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="selectAndView(${s.id})">Lihat</button>
        <button class="btn btn-sm btn-warning" onclick="openEditModal(${s.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${s.id})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.selectAndView = function(id) {
  currentStudentId = id;
  refreshStudentDropdown();
  renderRaportDocument();
  document.getElementById("modal-students").classList.add("hidden");
};

window.deleteStudent = function(id) {
  if (studentsData.length <= 1) {
    alert("Minimal harus tersisa 1 data siswa.");
    return;
  }
  const target = studentsData.find(s => s.id === id);
  if (confirm(`Yakin ingin menghapus data raport atas nama "${target.nama}"?`)) {
    studentsData = studentsData.filter(s => s.id !== id);
    if (currentStudentId === id) currentStudentId = studentsData[0].id;
    saveAllToStorage();
    refreshStudentDropdown();
    renderStudentsTable(document.getElementById("search-student").value);
    renderRaportDocument();
  }
};

// ================= EKSPOR PDF & GOOGLE DOCS (.DOC) =================
function downloadAsPDF() {
  const student = studentsData.find(s => s.id === currentStudentId);
  const element = document.getElementById("raport-document");
  const isF4 = userPrefs.paper === "f4";

  const opt = {
    margin: [5, 5, 5, 5],
    filename: `Raport_${student.nama.replace(/\s+/g, "_")}_${userPrefs.paper.toUpperCase()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: {
      unit: "mm",
      format: isF4 ? [215, 330] : "a4",
      orientation: "portrait"
    }
  };

  html2pdf().set(opt).from(element).save();
}

function downloadAsGoogleDoc() {
  const student = studentsData.find(s => s.id === currentStudentId);
  const contentHtml = document.getElementById("raport-document").innerHTML;
  const isF4 = userPrefs.paper === "f4";

  // Ambil warna tema aktif agar identik 100% di Google Docs / MS Word
  const computed = getComputedStyle(document.body);
  const primaryColor = computed.getPropertyValue("--primary").trim();
  const primaryDark = computed.getPropertyValue("--primary-dark").trim();
  const primaryLight = computed.getPropertyValue("--primary-light").trim();

  const pageSizeCss = isF4 ? "21.5cm 33.0cm" : "21.0cm 29.7cm";

  const docTemplate = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Raport ${student.nama}</title>
      <style>
        @page { size: ${pageSizeCss}; margin: 1.2cm 1.5cm; }
        body { font-family: "Times New Roman", serif; font-size: 10.5pt; color: #000; }
        .kop-surat { text-align: center; }
        .logo-circle { display: none; }
        .kop-text h3 { font-size: 13pt; margin: 0; }
        .kop-text h1 { font-size: 16pt; color: ${primaryDark}; margin: 2px 0; }
        .kop-text p { font-size: 9.5pt; margin: 2px 0; }
        .kop-line { border-top: 3px solid ${primaryColor}; margin: 8px 0 12px 0; }
        .doc-title { text-align: center; margin-bottom: 12px; }
        .doc-title h2 { font-size: 13pt; color: ${primaryDark}; text-decoration: underline; margin: 0; }
        .doc-title p { font-size: 10pt; font-weight: bold; margin: 2px 0; }
        .identity-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 10.5pt; }
        .identity-table td { padding: 3px 4px; vertical-align: top; }
        .section-box { border: 1.5px solid ${primaryColor}; margin-bottom: 10px; }
        .section-header { background-color: ${primaryColor}; color: #ffffff; font-family: Arial, sans-serif; font-size: 9.5pt; font-weight: bold; padding: 5px 8px; }
        .section-body { padding: 8px; text-align: justify; }
        .two-col-grid { width: 100%; margin-bottom: 10px; }
        .mini-table { width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 10pt; }
        .mini-table th { background-color: ${primaryLight}; color: ${primaryDark}; border: 1px solid ${primaryColor}; padding: 4px 6px; }
        .mini-table td { border: 1px solid ${primaryColor}; padding: 4px 6px; }
        .signature-grid { width: 100%; margin-top: 16px; }
        .sig-box { width: 48%; display: inline-block; text-align: center; vertical-align: top; }
        .signature-center { text-align: center; margin-top: 14px; }
        .sig-space { height: 48px; }
        .sig-name { font-weight: bold; }
      </style>
    </head>
    <body>${contentHtml}</body>
    </html>
  `;

  const blob = new Blob(["\ufeff", docTemplate], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Raport_${student.nama.replace(/\s+/g, "_")}_GoogleDocs.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ================= EVENT LISTENERS =================
function bindEvents() {
  // Login PIN
  const checkPin = () => {
    const val = document.getElementById("pin-input").value.trim();
    if (val === schoolConfig.pin) {
      document.getElementById("login-error").classList.add("hidden");
      document.getElementById("pin-input").value = "";
      enterWorkspace(true);
    } else {
      document.getElementById("login-error").classList.remove("hidden");
    }
  };

  document.getElementById("btn-login").addEventListener("click", checkPin);
  document.getElementById("pin-input").addEventListener("keypress", e => {
    if (e.key === "Enter") checkPin();
  });

  // Masuk Pihak Ke-2 / Ke-3 / Percetakan
  document.getElementById("btn-guest-mode").addEventListener("click", () => enterWorkspace(false));

  // Logout
  document.getElementById("btn-logout").addEventListener("click", () => {
    document.getElementById("app-toolbar").classList.add("hidden");
    document.getElementById("raport-workspace").classList.add("hidden");
    document.getElementById("login-overlay").classList.remove("hidden");
  });

  // Ganti Siswa, Ukuran Kertas, Tema Warna
  document.getElementById("select-student").addEventListener("change", e => {
    currentStudentId = parseInt(e.target.value, 10);
    renderRaportDocument();
  });

  document.getElementById("select-paper").addEventListener("change", e => {
    userPrefs.paper = e.target.value;
    applyPreferences();
    saveAllToStorage();
  });

  document.getElementById("select-theme").addEventListener("change", e => {
    userPrefs.theme = e.target.value;
    applyPreferences();
    saveAllToStorage();
  });

  // Edit Raport Siswa Saat Ini
  document.getElementById("btn-edit-current").addEventListener("click", () => openEditModal(currentStudentId));

  // Simpan Edit Siswa
  document.getElementById("form-edit-student").addEventListener("submit", e => {
    e.preventDefault();
    const id = parseInt(document.getElementById("edit-id").value, 10);
    const idx = studentsData.findIndex(s => s.id === id);
    if (idx !== -1) {
      studentsData[idx] = {
        ...studentsData[idx],
        nama: document.getElementById("edit-nama").value.trim(),
        jk: document.getElementById("edit-jk").value,
        rombel: document.getElementById("edit-rombel").value.trim(),
        nik: document.getElementById("edit-nik").value.trim(),
        nisn: document.getElementById("edit-nisn").value.trim(),
        agama: document.getElementById("edit-agama").value.trim(),
        tempatLahir: document.getElementById("edit-tempat-lahir").value.trim(),
        tglLahir: document.getElementById("edit-tgl-lahir").value.trim(),
        anakKe: document.getElementById("edit-anak-ke").value.trim(),
        ayah: document.getElementById("edit-ayah").value.trim(),
        pekAyah: document.getElementById("edit-pek-ayah").value.trim(),
        ibu: document.getElementById("edit-ibu").value.trim(),
        pekIbu: document.getElementById("edit-pek-ibu").value.trim(),
        alamat: document.getElementById("edit-alamat").value.trim(),
        bb: document.getElementById("edit-bb").value.trim(),
        tb: document.getElementById("edit-tb").value.trim(),
        lk: document.getElementById("edit-lk").value.trim(),
        sakit: parseInt(document.getElementById("edit-sakit").value, 10) || 0,
        izin: parseInt(document.getElementById("edit-izin").value, 10) || 0,
        alpha: parseInt(document.getElementById("edit-alpha").value, 10) || 0,
        agamaNarasi: document.getElementById("edit-agama-narasi").value.trim(),
        jatiDiriNarasi: document.getElementById("edit-jatidiri-narasi").value.trim(),
        literasiNarasi: document.getElementById("edit-literasi-narasi").value.trim(),
        p5Narasi: document.getElementById("edit-p5-narasi").value.trim(),
        refleksiOrtu: document.getElementById("edit-refleksi-ortu").value.trim()
      };
      saveAllToStorage();
      refreshStudentDropdown();
      renderStudentsTable();
      renderRaportDocument();
      document.getElementById("modal-edit").classList.add("hidden");
    }
  });

  // Modal Daftar Siswa
  document.getElementById("btn-open-students").addEventListener("click", () => {
    renderStudentsTable();
    document.getElementById("modal-students").classList.remove("hidden");
  });

  document.getElementById("search-student").addEventListener("input", e => {
    renderStudentsTable(e.target.value);
  });

  document.getElementById("btn-add-student").addEventListener("click", () => {
    const newId = studentsData.length > 0 ? Math.max(...studentsData.map(s => s.id)) + 1 : 1;
    const namaBaru = "SISWA BARU " + newId;
    const newStudent = {
      id: newId,
      nama: namaBaru,
      jk: "L",
      nisn: "-",
      nik: "-",
      tempatLahir: "TANJUNG MEDAN",
      tglLahir: "2021-01-01",
      agama: "Islam",
      rombel: "Rombel B",
      anakKe: "1",
      ayah: "-",
      pekAyah: "-",
      ibu: "-",
      pekIbu: "-",
      alamat: "Sei Meranti, Kec. Tanjung Medan",
      bb: "20",
      tb: "110",
      lk: "50",
      sakit: 0,
      izin: 0,
      alpha: 0,
      ...generateDefaultNarasi(namaBaru)
    };
    studentsData.push(newStudent);
    currentStudentId = newId;
    saveAllToStorage();
    refreshStudentDropdown();
    renderStudentsTable();
    renderRaportDocument();
    openEditModal(newId);
  });

  document.getElementById("btn-reset-default").addEventListener("click", () => {
    if (confirm("Kembalikan seluruh data siswa sesuai file Excel awal? Perubahan yang belum diekspor akan ditimpa.")) {
      studentsData = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
      currentStudentId = studentsData[0].id;
      saveAllToStorage();
      refreshStudentDropdown();
      renderStudentsTable();
      renderRaportDocument();
    }
  });

  // Modal Pengaturan Kepsek & Ganti PIN
  document.getElementById("btn-open-settings").addEventListener("click", () => {
    document.getElementById("set-yayasan").value = schoolConfig.yayasan;
    document.getElementById("set-school-name").value = schoolConfig.schoolName;
    document.getElementById("set-school-address").value = schoolConfig.schoolAddress;
    document.getElementById("set-npsn").value = schoolConfig.npsn;
    document.getElementById("set-semester").value = schoolConfig.semester;
    document.getElementById("set-kepsek-name").value = schoolConfig.kepsekName;
    document.getElementById("set-kepsek-nip").value = schoolConfig.kepsekNip;
    document.getElementById("set-guru-name").value = schoolConfig.guruName;
    document.getElementById("set-guru-nip").value = schoolConfig.guruNip;
    document.getElementById("set-ttd-date").value = schoolConfig.ttdDate;
    document.getElementById("set-old-pin").value = "";
    document.getElementById("set-new-pin").value = "";
    document.getElementById("modal-settings").classList.remove("hidden");
  });

  document.getElementById("form-settings").addEventListener("submit", e => {
    e.preventDefault();

    // Validasi Ganti PIN khusus Kepsek
    const oldPin = document.getElementById("set-old-pin").value.trim();
    const newPin = document.getElementById("set-new-pin").value.trim();
    if (isKepsekAdmin && newPin !== "") {
      if (oldPin !== schoolConfig.pin) {
        alert("PIN Lama salah! PIN gagal diperbarui.");
        return;
      }
      if (newPin.length < 4) {
        alert("PIN Baru minimal 4 karakter.");
        return;
      }
      schoolConfig.pin = newPin;
      alert("PIN Kepala Sekolah berhasil diperbarui!");
    }

    schoolConfig.yayasan = document.getElementById("set-yayasan").value.trim();
    schoolConfig.schoolName = document.getElementById("set-school-name").value.trim();
    schoolConfig.schoolAddress = document.getElementById("set-school-address").value.trim();
    schoolConfig.npsn = document.getElementById("set-npsn").value.trim();
    schoolConfig.semester = document.getElementById("set-semester").value.trim();
    schoolConfig.kepsekName = document.getElementById("set-kepsek-name").value.trim();
    schoolConfig.kepsekNip = document.getElementById("set-kepsek-nip").value.trim();
    schoolConfig.guruName = document.getElementById("set-guru-name").value.trim();
    schoolConfig.guruNip = document.getElementById("set-guru-nip").value.trim();
    schoolConfig.ttdDate = document.getElementById("set-ttd-date").value.trim();

    saveAllToStorage();
    renderRaportDocument();
    document.getElementById("modal-settings").classList.add("hidden");
  });

  // Ekspor & Impor File Proyek (.json) untuk Pihak Ke-2 / Ke-3 / Tukang Print
  document.getElementById("btn-export-backup").addEventListener("click", () => {
    const payload = {
      schoolConfig: { ...schoolConfig, pin: "*****" }, // PIN Kepsek tidak ikut terbocor ke file luar
      studentsData,
      userPrefs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Data_Raport_TK_Mutiara_Harapan_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  });

  document.getElementById("import-backup-input").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (imported.studentsData && Array.isArray(imported.studentsData)) {
          studentsData = imported.studentsData;
          if (imported.schoolConfig) {
            const currentPin = schoolConfig.pin;
            schoolConfig = { ...imported.schoolConfig, pin: currentPin };
          }
          if (imported.userPrefs) userPrefs = imported.userPrefs;
          currentStudentId = studentsData[0]?.id || null;
          applyPreferences();
          saveAllToStorage();
          refreshStudentDropdown();
          renderRaportDocument();
          alert("File proyek raport berhasil dimuat!");
        } else {
          alert("Format file tidak valid.");
        }
      } catch (err) {
        alert("Gagal membaca file JSON.");
      }
    };
    reader.readAsText(file);
  });

  // Tombol Print, PDF, & Google Docs
  document.getElementById("btn-print").addEventListener("click", () => window.print());
  document.getElementById("btn-download-pdf").addEventListener("click", downloadAsPDF);
  document.getElementById("btn-download-doc").addEventListener("click", downloadAsGoogleDoc);

  // Tutup Modal
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.getAttribute("data-close")).classList.add("hidden");
    });
  });
}