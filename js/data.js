/* ==========================================================================
   Data Portofolio Proyek & Artikel Blog — Ryan Hamid Muhammad, S.Tr.T
   ========================================================================== */

const SITE_PAGES = [
  { id: "profil", num: "01", label: "Profil", href: "index.html" },
  { id: "cv", num: "02", label: "CV", href: "cv.html" },
  { id: "proyek", num: "03", label: "Proyek", href: "proyek.html" },
  { id: "blog", num: "04", label: "Blog", href: "blog.html" },
  { id: "kontak", num: "05", label: "Kontak", href: "kontak.html" }
];

const PROJECTS_DATA = [
  {
    id: "iov-ids",
    title: "Framework Deteksi Serangan Siber Berbasis AI untuk Keamanan IoV",
    category: "AI & Keamanan",
    year: "2026",
    role: "Peneliti & Pengembang Utama (Tugas Akhir S.Tr.T — PENS)",
    summary:
      "Arsitektur deep learning berlapis untuk mendeteksi intrusi dan manipulasi paket CAN-Bus pada jaringan Internet of Vehicles (IoV) secara akurat dan real-time.",
    challenge:
      "Komunikasi internal dan eksternal kendaraan modern (CAN-Bus & V2X) rentan terhadap serangan spoofing, fuzzing, maupun Denial-of-Service (DoS) yang membutuhkan deteksi latensi rendah dengan tingkat false-positive minimal.",
    solution:
      "Merancang dan membandingkan empat arsitektur pembelajaran mendalam (MLP, 1D-CNN, DCNN, serta ensemble MetaIDS) yang dilatih pada dataset Car Hacking, CAN-MIRGU, dan Survival Analysis untuk mengklasifikasikan anomali lalu lintas kendaraan secara presisi.",
    highlights: [
      "Evaluasi komparatif lintas 3 dataset standar keamanan otomotif (Car Hacking, CAN-MIRGU, Survival Analysis).",
      "Arsitektur MetaIDS menggabungkan ekstraksi fitur spasial-temporal 1D-CNN dengan klasifikasi meta-learner.",
      "Pipeline prapemrosesan data CAN-Bus otomatis untuk normalisasi payload heksadesimal dan interval waktu."
    ],
    tags: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "Keamanan IoV"],
    relatedArticleId: "artikel-iov-security"
  },
  {
    id: "iov-soc-dashboard",
    title: "IoV SOC Command Center — Simulasi Pemantauan Keamanan Kendaraan",
    category: "AI & Keamanan",
    year: "2026",
    role: "Full-Stack AI & Dashboard Developer",
    summary:
      "Dasbor interaktif Security Operations Center (SOC) untuk memvisualisasikan telemetri CAN-Bus dan peringatan dini serangan siber pada armada kendaraan terhubung.",
    challenge:
      "Hasil inferensi model deteksi serangan sering kali sulit dibaca secara cepat oleh operator keamanan tanpa antarmuka pemantauan visual yang terstruktur.",
    solution:
      "Membangun antarmuka command center berbasis Python menggunakan Streamlit dan Plotly Dash untuk memutar ulang aliran paket kendaraan, menampilkan skor kepercayaan model AI, serta mencatat log insiden secara langsung.",
    highlights: [
      "Visualisasi grafik telemetri real-time untuk distribusi jenis serangan (DoS, Fuzzy, Gear/RPM Spoofing).",
      "Mode simulasi aliran data langsung dari berbagai skenario dataset kendaraan.",
      "Ringkasan metrik akurasi, presisi, recall, dan F1-score per skenario pengujian."
    ],
    tags: ["Python", "Streamlit", "Plotly Dash", "Data Analysis", "Keamanan IoV"],
    relatedArticleId: "artikel-iov-security"
  },
  {
    id: "rfid-warehouse",
    title: "Sistem Pelacakan Gudang & Inventaris Berbasis RFID Web",
    category: "Web & Full-Stack",
    year: "2025",
    role: "Full-Stack Web & IoT Integration Developer",
    summary:
      "Aplikasi manajemen gudang berbasis web yang terintegrasi dengan pembaca RFID untuk pencatatan keluar-masuk barang secara otomatis dan pelacakan stok real-time.",
    challenge:
      "Pencatatan mutasi barang secara manual rentan terhadap selisih stok, keterlambatan pembaruan data, dan kesulitan audit riwayat pergerakan aset.",
    solution:
      "Mengembangkan sistem informasi inventaris menggunakan PHP, JavaScript, dan PostgreSQL yang menerima pemindaian tag RFID secara langsung, memvalidasi status barang, dan menyajikan laporan audit stok.",
    highlights: [
      "Pemindaian tag RFID otomatis ke antarmuka web tanpa input manual berulang.",
      "Struktur basis data relasional PostgreSQL dengan pencatatan jejak audit setiap transaksi.",
      "Dasbor ringkasan stok menipis, riwayat distribusi, dan ekspor laporan berkala."
    ],
    tags: ["PHP", "JavaScript", "PostgreSQL", "RFID & IoT", "Full-Stack Web"],
    relatedArticleId: "artikel-rfid-industri"
  },
  {
    id: "lintech-attendance-gate",
    title: "Sistem Pemindaian Absensi & Integrasi Gerbang Nirkabel",
    category: "IoT & Sistem",
    year: "2025",
    role: "IT Support & System Developer Intern — PT Lintech Duta Pratama",
    summary:
      "Solusi otomatisasi pencatatan kehadiran dan kontrol akses gerbang nirkabel untuk mendukung efisiensi operasional dan keamanan area kerja perusahaan.",
    challenge:
      "Kebutuhan integrasi antara perangkat pemindai identitas di titik akses lapangan dengan pencatatan data kehadiran yang andal pada jaringan internal perusahaan.",
    solution:
      "Merancang alur komunikasi nirkabel antara modul pembaca identitas, kontroler gerbang, dan aplikasi pencatatan berbasis web, disertai pemeliharaan konektivitas jaringan lokal.",
    highlights: [
      "Otomatisasi verifikasi identitas untuk membuka akses gerbang secara responsif.",
      "Sinkronisasi log waktu masuk dan keluar ke sistem pencatatan terpusat.",
      "Pengujian keandalan koneksi nirkabel dan pemecahan masalah perangkat di lapangan."
    ],
    tags: ["RFID & IoT", "JavaScript", "PHP", "Jaringan & Sistem", "Troubleshooting"],
    relatedArticleId: "artikel-rfid-industri"
  },
  {
    id: "axion-ai-assistant",
    title: "AXION AI — Asisten Desktop Interaktif dengan Routing Multi-LLM",
    category: "AI & Keamanan",
    year: "2026",
    role: "AI Software Developer",
    summary:
      "Asisten desktop berbasis Python untuk lingkungan Linux dengan interaksi suara (Text-to-Speech), routing cerdas multi-provider LLM, dan fallback model lokal via Ollama.",
    challenge:
      "Ketergantungan penuh pada satu layanan API cloud berisiko saat koneksi terbatas atau ketika dibutuhkan pemrosesan cepat secara privat di perangkat lokal.",
    solution:
      "Membangun arsitektur routing model adaptif di Python yang dapat mengalihkan permintaan secara otomatis antara API cloud dan model lokal Ollama dengan sintesis suara interaktif.",
    highlights: [
      "Mekanisme fallback otomatis ke Ollama lokal ketika API eksternal tidak tersedia.",
      "Antarmuka visual interaktif dengan umpan balik sintesis suara real-time.",
      "Struktur modular yang memudahkan penambahan perintah otomatisasi sistem."
    ],
    tags: ["Python", "LLM & Ollama", "AI Engineering", "Linux"],
    relatedArticleId: "artikel-axion-ollama"
  },
  {
    id: "haproxy-nginx-cluster",
    title: "Arsitektur Web High-Availability HAProxy, Nginx & Monitoring Grafana",
    category: "IoT & Sistem",
    year: "2025",
    role: "Systems & Infrastructure Engineer",
    summary:
      "Implementasi penyeimbang beban (load balancing) tervirtualisasi dengan pengujian stres Apache JMeter serta pemantauan metrik real-time menggunakan Telegraf, InfluxDB, dan Grafana.",
    challenge:
      "Lonjakan trafik pada satu node server web dapat menurunkan waktu respons dan menyebabkan kegagalan layanan saat beban puncak.",
    solution:
      "Mengonfigurasi HAProxy di depan klaster server Nginx untuk mendistribusikan trafik secara merata, melakukan benchmark performa dengan JMeter, dan memvisualisasikan metrik CPU, memori, serta throughput.",
    highlights: [
      "Distribusi beban trafik HTTP adaptif dengan failover otomatis antar node Nginx.",
      "Pengujian beban terukur menggunakan skenario konkurensi Apache JMeter.",
      "Visualisasi metrik kesehatan server real-time melalui stack Telegraf–InfluxDB–Grafana."
    ],
    tags: ["Linux", "Nginx & HAProxy", "Grafana & InfluxDB", "PostgreSQL"],
    relatedArticleId: "artikel-load-balancing"
  }
];

const BLOG_ARTICLES = [
  {
    id: "artikel-iov-security",
    title: "Merancang Deteksi Intrusi Kendaraan Terhubung (IoV) dengan Deep Learning",
    category: "AI & Keamanan Siber",
    date: "Oktober 2026",
    readTime: "5 menit baca",
    excerpt:
      "Bagaimana arsitektur 1D-CNN dan MetaIDS mempelajari pola paket CAN-Bus untuk mengenali serangan spoofing maupun DoS pada kendaraan modern.",
    content: [
      "Perkembangan kendaraan modern yang saling terhubung melalui ekosistem Internet of Vehicles (IoV) membawa peningkatan besar pada kenyamanan dan keselamatan berkendara. Namun, keterhubungan antara Controller Area Network (CAN-Bus) internal dengan jaringan eksternal juga membuka celah keamanan siber baru.",
      "Protokol CAN-Bus pada awalnya dirancang untuk keandalan komunikasi antar Electronic Control Unit (ECU) dengan latensi rendah, bukan untuk enkripsi atau autentikasi kriptografis yang kompleks. Akibatnya, jika penyerang berhasil menyuntikkan pesan palsu ke dalam bus, sistem kendaraan dapat menerima perintah manipulatif.",
      "Dalam penelitian tugas akhir saya di Politeknik Elektronika Negeri Surabaya (PENS), saya mengevaluasi pendekatan berbasis kecerdasan buatan menggunakan arsitektur MLP, 1D-CNN, DCNN, hingga MetaIDS. Pendekatan 1D-CNN terbukti efektif menangkap pola sekuensial antar frame CAN-Bus tanpa memerlukan rekayasa fitur manual yang rumit.",
      "Kunci utama keberhasilan implementasi ini bukan hanya akurasi pada data uji, melainkan keseimbangan antara kecepatan inferensi dan rendahnya tingkat alarm palsu agar tetap relevan untuk diterapkan pada perangkat komputasi tepi (edge) di kendaraan."
    ],
    relatedProjectId: "iov-ids"
  },
  {
    id: "artikel-rfid-industri",
    title: "Pelajaran Lapangan: Mengintegrasikan RFID dan Gerbang Nirkabel di Industri",
    category: "Web & IoT",
    date: "Juli 2025",
    readTime: "4 menit baca",
    excerpt:
      "Catatan teknis saat membangun sistem pemindaian absensi, gerbang nirkabel, serta pelacakan inventaris gudang berbasis web dan PostgreSQL.",
    content: [
      "Membangun perangkat lunak di lingkungan laboratorium sangat berbeda dengan menerapkannya langsung di area operasional industri. Selama menjalani praktik kerja di PT Lintech Duta Pratama dan mengembangkan sistem pelacakan gudang berbasis RFID, tantangan terbesar justru sering muncul di titik temu antara perangkat keras dan jaringan.",
      "Pada sistem pemindaian absensi dan gerbang nirkabel, kestabilan sinyal serta kecepatan respons pembacaan kartu menentukan kelancaran alur masuk-keluar personel. Keterlambatan sepersekian detik saja dapat menimbulkan antrean di titik akses.",
      "Untuk mengatasinya, arsitektur komunikasi dirancang agar perangkat pembaca mengirimkan payload ringkas ke layanan backend, sementara pencatatan transaksi ke basis data PostgreSQL dilengkapi validasi duplikasi pemindaian (debouncing) dalam rentang waktu tertentu.",
      "Pengalaman ini menegaskan pentingnya komunikasi teknis yang erat antara tim pengembang sistem, tim jaringan lapangan, dan pengguna harian agar solusi yang dibangun benar-benar mudah dirawat."
    ],
    relatedProjectId: "rfid-warehouse"
  },
  {
    id: "artikel-axion-ollama",
    title: "Membangun Asisten AI Hybrid dengan Routing Multi-Model dan Ollama Lokal",
    category: "AI Engineering",
    date: "Oktober 2026",
    readTime: "4 menit baca",
    excerpt:
      "Menggabungkan kecerdasan model cloud dengan keandalan model lokal via Ollama untuk menciptakan asisten desktop yang tetap bekerja saat offline.",
    content: [
      "Ketika merancang AXION AI sebagai asisten interaktif berbasis Python di Linux, salah satu prinsip arsitektur yang saya terapkan adalah ketahanan layanan (resilience). Asisten produktivitas tidak boleh berhenti berfungsi hanya karena gangguan jaringan atau batas kuota API.",
      "Dengan menerapkan lapisan routing multi-provider, setiap permintaan pengguna dievaluasi terlebih dahulu. Tugas penalaran kompleks dapat diarahkan ke model cloud ketika koneksi tersedia, sementara perintah cepat atau mode privat langsung dialihkan ke model lokal yang dijalankan melalui Ollama.",
      "Integrasi antara pemrosesan bahasa alami dan umpan balik suara (Text-to-Speech) memberikan pengalaman interaksi yang jauh lebih natural di lingkungan desktop sehari-hari."
    ],
    relatedProjectId: "axion-ai-assistant"
  },
  {
    id: "artikel-load-balancing",
    title: "Mengukur Ketahanan Server Web dengan HAProxy, Nginx, dan Grafana",
    category: "Sistem & Infrastruktur",
    date: "Desember 2025",
    readTime: "5 menit baca",
    excerpt:
      "Langkah praktis menguji distribusi beban server menggunakan Apache JMeter dan memantau bottleneck sumber daya secara visual.",
    content: [
      "Aplikasi web yang dirancang dengan baik tetap membutuhkan fondasi arsitektur server yang siap menghadapi lonjakan permintaan bersamaan. Melalui konfigurasi HAProxy sebagai reverse proxy dan load balancer di depan beberapa instance Nginx, beban trafik dapat dibagi secara proporsional.",
      "Untuk membuktikan efektivitas konfigurasi tersebut, pengujian dilakukan secara terukur menggunakan Apache JMeter dengan meningkatkan jumlah pengguna konkuren secara bertahap.",
      "Seluruh metrik latensi, throughput, serta penggunaan CPU dan memori dikumpulkan oleh Telegraf ke InfluxDB dan ditampilkan pada dasbor Grafana. Pendekatan berbasis observabilitas ini memudahkan identifikasi titik jenuh sistem sebelum aplikasi digunakan secara luas."
    ],
    relatedProjectId: "haproxy-nginx-cluster"
  }
];
