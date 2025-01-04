// #######################
// Author: Herry Saptiawan

// Mendefinisikan waktu dalam milidetik
const second = 1000,        // 1 detik = 1000 ms
      minute = second * 60, // 1 menit = 60 detik
      hour = minute * 60,   // 1 jam = 60 menit
      day = hour * 24,      // 1 hari = 24 jam

// Mengambil elemen container untuk kembang api dan elemen tahun baru
      fireworkContainer = document.querySelector('.fireworks-container'),
      newYear = document.querySelector('#new-year-year');

// Set tanggal target untuk New Year (TESTING ONLY)
// let new_year = "January 03, 2025 22:31:40", // Tanggal target New Year

// Set tanggal target untuk New Year
let new_year = "January 01, 2026 00:00:00", // Tanggal target New Year

// Mendapatkan tahun yang akan datang secara otomatis berdasarkan tanggal target
    comingYear = new Date(new_year).getFullYear();
newYear.innerHTML = comingYear;  // Menampilkan tahun baru di elemen

// Menghitung waktu countdown menuju tahun baru
const countDown = new Date(new_year).getTime();

// Interval untuk memperbarui countdown setiap detik
const interval = setInterval(function () {
    let now = new Date().getTime(),  // Waktu sekarang
        distance = countDown - now;  // Selisih waktu

    // Menghitung jumlah hari, jam, menit, dan detik yang tersisa
    let days = Math.floor(distance / day);   // Menghitung jumlah hari
    let hours = Math.floor((distance % day) / hour);  // Menghitung jumlah jam
    let minutes = Math.floor((distance % hour) / minute);  // Menghitung jumlah menit
    let seconds = Math.floor((distance % minute) / second);  // Menghitung jumlah detik

    // Memperbarui elemen dengan format angka dua digit jika kurang dari 10
    document.getElementById('days-num').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours-num').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes-num').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds-num').innerText = seconds < 10 ? '0' + seconds : seconds;

    // Menyembunyikan elemen waktu jika waktu tersisa kurang dari sehari
    if (distance <= day) {
        document.getElementById('days').style.display = "none"; // Menyembunyikan bagian hari
    }

    // Menyembunyikan elemen waktu jika waktu tersisa kurang dari satu jam
    if (distance <= hour) {
        document.getElementById('hours').style.display = "none"; // Menyembunyikan bagian jam
    }

    // Menyembunyikan elemen waktu jika waktu tersisa kurang dari satu menit
    if (distance <= minute) {
        document.getElementById('minutes').style.display = "none"; // Menyembunyikan bagian menit
        document.getElementById('seconds').classList.remove('scale');  // Menghapus kelas 'scale' dari elemen detik
        document.getElementById('seconds-num').style.fontSize = '35rem';  // Membesarkan font detik
        document.querySelectorAll('.time p').forEach(p => p.style.display = 'none');  // Menyembunyikan elemen waktu lainnya
    }

    // Ketika waktu tersisa kurang dari 10 detik, animasi scale pada detik dan hapus angka 0 pada detik
    if (distance <= second * 10) {
        document.getElementById('seconds-num').innerText = seconds;  // Menghapus angka 0 pada detik
        document.getElementById('seconds').classList.add('scale');  // Menambahkan animasi scale dan opacity pada detik
    }    

    // Saat waktu tersisa kurang dari 1 detik, tampilkan animasi dan kembang api
    if (distance <= second) {
        document.getElementById('happy-new-year').classList.add('fadeIn'); // Menambahkan animasi 'fadeIn' pada elemen
        document.getElementById("countdown-container").style.display = "none"; // Menyembunyikan countdown
        document.getElementById("happy-new-year").style.display = "block"; // Menampilkan pesan selamat tahun baru
        fireworks.start();  // Memulai animasi kembang api
        clearInterval(interval);  // Menghentikan interval countdown
    }

}, 1000);  // Interval yang dijalankan setiap detik

// Inisialisasi animasi Kembang Api
const fireworks = new Fireworks(fireworkContainer, {
    // speed: 10,           // Kecepatan kembang api
    // acceleration: 1,     // Akselerasi kembang api
    // friction: 1,         // Friksi atau gesekan pada kembang api
    // gravity: 1,          // Gravitasi yang mempengaruhi jalur kembang api
    particles: 200,      // Jumlah partikel pada ledakan
    // explosion: 5        // Ukuran ledakan
});