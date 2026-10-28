import { plural } from '../plural';
import type { Messages } from './en';

const p = plural('id');

const messages: Messages = {
	common: {
		createPoll: 'Buat polling',
		createAPoll: 'Buat polling',
		goHome: 'Kembali ke beranda',
		loading: 'Memuat',
		opensInNewTab: '(dibuka di tab baru)',
		votes: (count: number) => p(count, { other: '# suara' })
	},
	layout: {
		skipToContent: 'Lewati ke konten utama'
	},
	header: {
		mainNavigation: 'Navigasi utama',
		home: 'Beranda Pollmodoro',
		yourPolls: 'Polling saya',
		toggleTheme: 'Ganti mode gelap',
		language: 'Bahasa'
	},
	footer: {
		builtBy: 'Dibuat dengan 🍅 oleh {author}',
		source: 'Kode sumber di GitHub'
	},
	home: {
		metaTitle: 'Pollmodoro · Polling cepat, tanpa perlu daftar',
		metaDescription:
			'Pollmodoro adalah pembuat polling gratis tanpa perlu daftar. Tulis pertanyaan, bagikan tautannya, dan lihat hasilnya diperbarui secara langsung.',
		ogDescription:
			'Tulis pertanyaan, bagikan tautannya, dan lihat hasilnya diperbarui secara langsung. Gratis, tanpa perlu akun.',
		heroTitle: 'Buat polling. Bagikan tautan. Lihat suaranya.',
		heroText:
			'Pollmodoro adalah pembuat polling gratis tanpa perlu daftar. Tulis pertanyaan, tambahkan hingga sepuluh opsi, lalu kirim tautannya ke siapa pun yang perlu menjawab. Hasil diperbarui secara langsung saat suara masuk.',
		seeExample: 'Lihat contoh polling',
		howItWorks: 'Cara kerjanya',
		steps: {
			write: {
				title: 'Tulis pertanyaannya',
				text: 'Tambahkan judul, deskripsi opsional, dan dua sampai sepuluh opsi. Tentukan apakah orang boleh memilih lebih dari satu.'
			},
			share: {
				title: 'Bagikan tautannya',
				text: 'Setiap polling punya tautannya sendiri. Tempelkan di obrolan, email, atau unggahan. Tidak ada yang perlu akun untuk memilih.'
			},
			watch: {
				title: 'Pantau hasilnya',
				text: 'Suara muncul saat masuk, lengkap dengan jumlah dan persentase. Biarkan halaman terbuka dan hasilnya tetap diperbarui.'
			}
		},
		goodToKnow: 'Perlu diketahui',
		details: {
			noAccounts: {
				title: 'Tanpa akun',
				text: 'Tidak ada yang perlu didaftarkan. Polling yang dibuat disimpan di browser ini, di bawah "Polling saya".'
			},
			anonymous: {
				title: 'Voting anonim',
				text: 'Memberikan suara tidak meminta nama atau alamat email.'
			},
			choice: {
				title: 'Satu atau banyak pilihan',
				text: 'Biarkan orang memilih satu opsi, atau sebanyak yang mereka mau.'
			},
			bots: {
				title: 'Perlindungan bot',
				text: 'Membuat polling dan memberikan suara melewati Cloudflare Turnstile untuk mencegah suara otomatis.'
			},
			free: {
				title: 'Gratis',
				text: 'Tidak ada versi berbayar dan tidak ada batas jumlah polling.'
			},
			openSource: {
				title: 'Open source',
				text: 'Dibangun dengan SvelteKit dan Cloudflare Workers. Kodenya ada di GitHub.'
			}
		},
		closingTitle: 'Memang sesederhana itu.',
		closingText: 'Sebuah pertanyaan, beberapa opsi, dan tautan untuk dibagikan.'
	},
	preview: {
		label: 'Contoh polling',
		badge: 'Contoh polling',
		question: 'Mau makan siang di mana hari Jumat?',
		options: ['Tempat pizza di ujung jalan', 'Taco', 'Sushi', 'Terserah, aku tidak pilih-pilih'],
		footer: (count: number) => p(count, { other: '# suara · hasil diperbarui secara langsung' })
	},
	createPoll: {
		metaDescription:
			'Tulis pertanyaan, tambahkan beberapa opsi, dan dapatkan tautan untuk dibagikan.',
		intro: 'Ajukan pertanyaan, tambahkan beberapa opsi, dan tautan untuk dibagikan akan tersedia.',
		question: 'Pertanyaan',
		questionPlaceholder: 'Apa yang ingin ditanyakan?',
		description: 'Deskripsi',
		optional: '(opsional)',
		descriptionPlaceholder: 'Tambahkan konteks jika perlu.',
		options: 'Opsi',
		optionsHint: (min: number, max: number) => `Antara ${min} dan ${max} opsi untuk dipilih orang.`,
		optionPlaceholder: (position: number) => `Opsi ${position}`,
		removeOption: (position: number) => `Hapus opsi ${position}`,
		addOption: 'Tambah opsi',
		allowMultiple: 'Izinkan memilih lebih dari satu',
		allowMultipleDescription: 'Pemilih bisa memilih lebih dari satu opsi.',
		submitting: 'Membuat polling…',
		verificationRequired: 'Selesaikan verifikasi terlebih dahulu.',
		failed: 'Polling tidak dapat dibuat. Silakan coba lagi.',
		errors: {
			questionRequired: 'Pertanyaan wajib diisi',
			optionRequired: 'Opsi tidak boleh kosong',
			tooLong: (max: number) => p(max, { other: 'Maksimal # karakter' }),
			tooFewOptions: (min: number) => p(min, { other: 'Tambahkan minimal # opsi' }),
			tooManyOptions: (max: number) => p(max, { other: 'Bisa menambahkan hingga # opsi' })
		}
	},
	vote: {
		metaDescription: (title: string) => `Beri suara di "${title}" di Pollmodoro.`,
		ogDescription: 'Beri suara di polling ini dan lihat hasilnya secara langsung.',
		votesLabel: 'Suara',
		typeLabel: 'Jenis',
		createdLabel: 'Dibuat',
		multipleChoice: 'Banyak pilihan',
		singleChoice: 'Satu pilihan',
		createdOn: (date: string) => `Dibuat pada ${date}`,
		pickOneOrMore: 'Pilih satu atau lebih opsi',
		pickOne: 'Pilih satu opsi',
		optionVotes: (percentage: string, option: string) => `${percentage} dari suara untuk ${option}`,
		submit: 'Beri suara',
		submitMany: (count: number) => p(count, { other: 'Beri suara untuk # opsi' }),
		submitting: 'Mengirim…',
		submittingStatus: 'Suara sedang dikirim.',
		cannotVoteStatus: 'Pilih opsi dan selesaikan verifikasi untuk memberi suara.',
		success: 'Suara sudah masuk.',
		failed: 'Suara tidak dapat dikirim. Silakan coba lagi.',
		verification: 'Verifikasi bahwa bukan bot',
		disclaimer:
			'Polling ini dibuat oleh pengguna Pollmodoro. Isinya tidak dibuat atau didukung oleh Pollmodoro.'
	},
	share: {
		title: 'Bagikan polling ini',
		text: 'Siapa pun yang punya tautannya bisa memberi suara.',
		link: 'Tautan polling',
		copy: 'Salin',
		copied: 'Tautan disalin ke papan klip.',
		copyFailed: 'Tautan tidak dapat disalin.',
		emailBody: (url: string) => `Beri suara di polling ini: ${url}`,
		byEmail: 'Bagikan lewat email',
		on: (network: string) => `Bagikan ke ${network}`
	},
	createYourOwn: {
		title: 'Punya pertanyaan sendiri?',
		text: 'Polling gratis dan butuh sekitar satu menit untuk dibuat. Tidak perlu akun.'
	},
	pollNotFound: {
		title: 'Polling tidak ditemukan',
		text: 'Polling ini tidak ada, atau tautannya salah. Periksa kembali alamatnya, atau buat polling baru.'
	},
	yourPolls: {
		intro:
			'Polling yang dibuat di browser ini. Daftarnya disimpan secara lokal sehingga tidak muncul di perangkat lain, dan menghapus data browser akan menghapusnya (pollingnya sendiri tetap online).',
		loading: 'Memuat polling saya',
		empty: 'Belum ada polling yang dibuat di browser ini.'
	},
	error: {
		notFoundTitle: 'Halaman tidak ditemukan',
		notFoundText: 'Tidak ada apa pun di alamat ini. Periksa tautannya, atau kembali ke beranda.',
		title: 'Terjadi kesalahan',
		serverText: 'Server mengalami kesalahan. Silakan coba lagi sebentar lagi.',
		text: 'Terjadi kesalahan tak terduga. Silakan coba lagi.',
		tryAgain: 'Coba lagi'
	}
};

export default messages;
