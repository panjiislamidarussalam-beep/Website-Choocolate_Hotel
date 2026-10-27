
const form = document.getElementById("formSewa");
const tabel = document.getElementById("tabelSewa");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const pilihanLapangan = document.getElementById("lapangan");
    const lapangan = pilihanLapangan.value;
    const harga = Number(
        pilihanLapangan.selectedOptions[0].dataset.harga
    );

    const tanggal = document.getElementById("tanggal").value;
    const jam = document.getElementById("jam").value;
    const durasi = Number(document.getElementById("durasi").value);

    // Memeriksa data formulir
    if (!nama || !lapangan || !tanggal || !jam || !durasi) {
        alert("Mohon lengkapi semua data!");
        return;
    }

    // Memastikan tanggal tidak di masa lalu
    const hariIni = new Date();
    const tahun = hariIni.getFullYear();
    const bulan = String(hariIni.getMonth() + 1).padStart(2, "0");
    const hari = String(hariIni.getDate()).padStart(2, "0");
    const tanggalHariIni = `${tahun}-${bulan}-${hari}`;

    if (tanggal < tanggalHariIni) {
        alert("Tanggal sewa tidak boleh di masa lalu!");
        return;
    }

    // Memeriksa bentrok jadwal lapangan
    const pemesanan = Array.from(tabel.querySelectorAll("tr"))
        .filter(row => row.cells.length === 7);

    const jamMulai = Number(jam.split(":")[0]);
    const jamSelesai = jamMulai + durasi;

    if (jamSelesai > 21) {
        alert("Jam selesai maksimal pukul 21:00!");
        return;
    }

    for (const row of pemesanan) {
        const lapanganLama = row.cells[2].textContent;
        const tanggalLama = row.cells[3].textContent;
        const jamLama = row.cells[4].textContent;
        const durasiLama = Number(
            row.cells[5].textContent.replace(" Jam", "")
        );

        if (lapanganLama === lapangan && tanggalLama === tanggal) {
            const mulaiLama = Number(jamLama.split(":")[0]);
            const selesaiLama = mulaiLama + durasiLama;

            if (jamMulai < selesaiLama && jamSelesai > mulaiLama) {
                alert("Jadwal bentrok! Silakan pilih jam lain.");
                return;
            }
        }
    }

    // Menghitung total harga
    const total = harga * durasi;

    // Menghapus pesan jika belum ada pemesanan
    if (
        tabel.rows.length === 1 &&
        tabel.rows[0].cells.length === 1
    ) {
        tabel.innerHTML = "";
    }

    // Memasukkan data ke tabel
    const nomor = tabel.rows.length + 1;
    const baris = tabel.insertRow();

    const data = [
        nomor,
        nama,
        lapangan,
        tanggal,
        jam,
        durasi + " Jam",
        "Rp" + total.toLocaleString("id-ID")
    ];

    data.forEach(function(nilai) {
        baris.insertCell().textContent = nilai;
    });

    alert(
        "Pemesanan berhasil!\n" +
        "Total biaya: Rp" + total.toLocaleString("id-ID")
    );

    form.reset();
});
