
document.addEventListener("DOMContentLoaded", function () {
  const welcomePage = document.getElementById("welcomePage");
  const mainWebsite = document.getElementById("mainWebsite");
  const enterButton = document.getElementById("enterButton");
  const bookingForm = document.getElementById("bookingForm");
  const bookingList = document.getElementById("bookingList");
  const tanggalInput = document.getElementById("tanggal");
  const pesanStatus = document.getElementById("pesanStatus");

  // Harga setiap tipe kamar
  const hargaKamar = {
    Standar: 250000,
    Elite: 400000,
    VIP: 650000
  };

  // Menampilkan tahun saat ini
  document.getElementById("tahun").textContent =
    new Date().getFullYear();

  // Mengatur tanggal minimum check-in ke hari ini
  function tanggalHariIni() {
    const sekarang = new Date();
    const tahun = sekarang.getFullYear();
    const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
    const hari = String(sekarang.getDate()).padStart(2, "0");

    return `${tahun}-${bulan}-${hari}`;
  }

  tanggalInput.min = tanggalHariIni();

  // Tombol masuk ke halaman utama
  enterButton.addEventListener("click", function () {
    welcomePage.hidden = true;
    mainWebsite.hidden = false;
    window.scrollTo(0, 0);
  });

  // Format angka menjadi Rupiah
  function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(angka);
  }

  // Memproses formulir pemesanan
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const tipeKamar = document.getElementById("tipeKamar").value;
    const tanggal = tanggalInput.value;
    const malam = Number(document.getElementById("malam").value);

    // Memeriksa data
    if (!nama || !hargaKamar[tipeKamar] || !tanggal) {
      pesanStatus.textContent = "Mohon lengkapi semua data.";
      pesanStatus.style.color = "#b91c1c";
      return;
    }

    if (tanggal < tanggalHariIni()) {
      pesanStatus.textContent =
        "Tanggal check-in tidak boleh sebelum hari ini.";
      pesanStatus.style.color = "#b91c1c";
      return;
    }

    // Menghitung total biaya
    const total = hargaKamar[tipeKamar] * malam;

    // Menghapus pesan belum ada pemesanan
    const emptyRow = document.getElementById("emptyRow");
    if (emptyRow) {
      emptyRow.remove();
    }

    // Membuat baris tabel dengan aman
    const baris = document.createElement("tr");

    const dataPemesanan = [
      nama,
      "Kamar " + tipeKamar,
      tanggal,
      malam + " malam",
      formatRupiah(total)
    ];

    dataPemesanan.forEach(function (isi) {
      const sel = document.createElement("td");
      sel.textContent = isi;
      baris.appendChild(sel);
    });

    bookingList.appendChild(baris);

    pesanStatus.textContent =
      "Pemesanan berhasil ditambahkan! Total: " +
      formatRupiah(total);

    pesanStatus.style.color = "#166534";

    // Mengosongkan formulir setelah berhasil
    bookingForm.reset();
    tanggalInput.min = tanggalHariIni();
  });
});
