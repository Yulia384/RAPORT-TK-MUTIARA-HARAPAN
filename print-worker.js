// ================= PRINT WORKER: CETAK MASSAL SELURUH SISWA =================
function printAllStudents() {
  const container = document.createElement("div");
  container.id = "mass-print-container";
  
  // Ambil template lembar raport dan gandakan untuk setiap siswa
  studentsData.forEach((student, index) => {
    const sheetClone = document.getElementById("raport-document").cloneNode(true);
    sheetClone.id = `sheet-student-${student.id}`;
    sheetClone.style.pageBreakAfter = "always";
    sheetClone.style.marginBottom = "20mm";
    
    // Render data siswa ke dalam kloning elemen
    sheetClone.querySelector("#r-nama").textContent = student.nama;
    sheetClone.querySelector("#r-nik").textContent = student.nik || "-";
    sheetClone.querySelector("#r-nisn").textContent = student.nisn || "-";
    sheetClone.querySelector("#r-rombel").textContent = student.rombel || "-";
    sheetClone.querySelector("#r-ttl").textContent = `${student.tempatLahir || "-"}, ${student.tglLahir || "-"}`;
    sheetClone.querySelector("#r-agama").textContent = student.agama || "-";
    sheetClone.querySelector("#r-jk").textContent = student.jk === "L" ? "Laki-laki" : "Perempuan";
    sheetClone.querySelector("#r-anak-ke").textContent = student.anakKe || "-";
    sheetClone.querySelector("#r-ayah").textContent = student.ayah || "-";
    sheetClone.querySelector("#r-ibu").textContent = student.ibu || "-";
    sheetClone.querySelector("#r-pek-ayah").textContent = student.pekAyah || "-";
    sheetClone.querySelector("#r-pek-ibu").textContent = student.pekIbu || "-";
    sheetClone.querySelector("#r-alamat").textContent = student.alamat || "-";
    
    sheetClone.querySelector("#r-agama-narasi").textContent = student.agamaNarasi;
    sheetClone.querySelector("#r-jatidiri-narasi").textContent = student.jatiDiriNarasi;
    sheetClone.querySelector("#r-literasi-narasi").textContent = student.literasiNarasi;
    sheetClone.querySelector("#r-p5-narasi").textContent = student.p5Narasi;
    sheetClone.querySelector("#r-refleksi-ortu").textContent = student.refleksiOrtu;
    
    sheetClone.querySelector("#r-bb").textContent = student.bb || "-";
    sheetClone.querySelector("#r-tb").textContent = student.tb || "-";
    sheetClone.querySelector("#r-lk").textContent = student.lk || "-";
    sheetClone.querySelector("#r-sakit").textContent = student.sakit ?? 0;
    sheetClone.querySelector("#r-izin").textContent = student.izin ?? 0;
    sheetClone.querySelector("#r-alpha").textContent = student.alpha ?? 0;

    container.appendChild(sheetClone);
  });

  document.body.appendChild(container);
  window.print();
  document.body.removeChild(container);
}