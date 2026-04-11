const ghostDetails = {
    Ana: {
        type: 'Brondong Slayer',
        threat: 'Extreme',
        evidence: ['Spirit Box', 'Ghost Writing', 'EMF Level 5'],
        signs: 'Suka bilang "anjing" dan bersifat jahat kek setan. Kalau mood jelek, level bacot naik 300% dan bikin satu lobby auto tobat.',

        tips: 'Jaga jarak 2-3 meter, jangan debat pas dia ngelucu ngegas, dan lempar camilan sebagai "ritual perdamaian" biar aura rusuh turun.'
    },
    Bayu: {
        type: 'Innocent Chaos',
        threat: 'Medium',
        evidence: ['Low Battery Alert', 'Random AFK', 'Unfiltered Voice'],
        signs: 'Polos, pikiran masih bocah, diajak ngomong kadang tidak nyambung. Suka godain cewek tapi masih labil, lalu sering ghosting karena baterai habis. Kadang bela-belain main sampai lowbat 0 persen.',
        tips: 'Kalau Bayu tiba-tiba hilang, cek dulu status baterai sebelum baper. Jangan langsung tersinggung kalau omongannya nyelekit, biasanya bukan niat jahat.'
    },
    Aswang: {
        type: 'Predatory',
        threat: 'Very High',
        evidence: ['Wither', 'EMF Level 5', 'Ghost Writing'],
        signs: 'Kecepatan Aswang meningkat setiap kali berhasil membunuh target.',
        tips: 'Taburkan salt di jalur lintasan untuk memperlambat geraknya saat dikejar.'
    },
    Banshee: {
        type: 'Harbinger',
        threat: 'High',
        evidence: ['Ghost Orbs', 'Handprints', 'Freezing Temps'],
        signs: 'Lebih sering memecahkan kaca dan kadang memakai wail khas ketika hunt.',
        tips: 'Prioritaskan audio cue dan cek area pecahan kaca untuk melacak pola aktivitas.'
    },
    Demon: {
        type: 'Aggressive',
        threat: 'Extreme',
        evidence: ['EMF Level 5', 'Handprints', 'Freezing Temps'],
        signs: 'Demon cenderung memburu lebih sering dibanding tipe lain.',
        tips: 'Bawa cross/crucifix lebih awal karena efeknya lebih kuat terhadap Demon.'
    },
    Dullahan: {
        type: 'Hunter',
        threat: 'Very High',
        evidence: ['Wither', 'Laser Projector', 'Freezing Temps'],
        signs: 'Foto bisa menampakkan wujud tanpa kepala, dan kecepatannya naik jika lama melihat target.',
        tips: 'Putus line-of-sight secepat mungkin agar akselerasinya tidak terus meningkat.'
    },
    Dybbuk: {
        type: 'Possessor',
        threat: 'High',
        evidence: ['Wither', 'Handprints', 'Freezing Temps'],
        signs: 'Bisa berinteraksi dengan mayat dan melempar corpse sebagai ciri khas.',
        tips: 'Gunakan Music Box secara taktis karena Dybbuk sempat terkena stun saat musik pertama kali diputar.'
    },
    Entity: {
        type: 'Anomalous',
        threat: 'High',
        evidence: ['Spirit Box', 'Handprints', 'Laser Projector'],
        signs: 'Memiliki kemampuan teleport dan relatif jarang melempar benda.',
        tips: 'Pantau perpindahan posisi mendadak dengan sensor berlapis untuk konfirmasi teleport.'
    },
    Ghoul: {
        type: 'Troublemaker',
        threat: 'High',
        evidence: ['Spirit Box', 'Freezing Temps', 'Ghost Orbs'],
        signs: 'Bisa ngamuk saat mendengar percakapan dan tidak dapat mematikan elektronik.',
        tips: 'Kurangi voice chat dekat area aktif, lalu verifikasi elektronik tetap hidup sebagai indikator.'
    },
    Leviathan: {
        type: 'Chaotic',
        threat: 'Very High',
        evidence: ['Ghost Orbs', 'Handprints', 'Ghost Writing'],
        signs: 'Sering melempar banyak objek sekaligus dan mampu mematikan lampu secara pasif.',
        tips: 'Pisahkan tim untuk pantau object-throw burst dan siapkan pencahayaan cadangan.'
    },
    Nightmare: {
        type: 'Hallucinatory',
        threat: 'High',
        evidence: ['EMF Level 5', 'Spirit Box', 'Ghost Orbs'],
        signs: 'Dapat memicu halusinasi dan cenderung hunt lebih sering di area gelap.',
        tips: 'Jaga ruangan tetap terang saat investigasi untuk menekan agresi hunt.'
    },
    Oni: {
        type: 'Manifestor',
        threat: 'Very High',
        evidence: ['Laser Projector', 'Spirit Box', 'Freezing Temps'],
        signs: 'Manifestasi lebih sering dan dapat sprint saat fase hunt.',
        tips: 'Gunakan ruang dengan banyak sudut untuk putus jarak ketika Oni mulai sprint.'
    },
    Phantom: {
        type: 'Ethereal',
        threat: 'High',
        evidence: ['EMF Level 5', 'Handprints', 'Ghost Orbs'],
        signs: 'Blink saat hunt lebih lambat dan cenderung kurang suka mengejar kelompok besar.',
        tips: 'Mainkan posisi tim berdekatan saat uji hunt untuk melihat pola target Phantom.'
    },
    Revenant: {
        type: 'Vengeful',
        threat: 'Extreme',
        evidence: ['Ghost Writing', 'EMF Level 5', 'Freezing Temps'],
        signs: 'Cooldown hunt rendah; setelah membunuh seseorang biasanya masuk fase istirahat.',
        tips: 'Fokus survive tiap hunt pertama karena chain hunt bisa terjadi lebih cepat.'
    },
    Shadow: {
        type: 'Shy',
        threat: 'Medium',
        evidence: ['EMF Level 5', 'Ghost Writing', 'Laser Projector'],
        signs: 'Jarang mengubah suhu dan lebih pasif di ruangan terang.',
        tips: 'Tingkatkan pencahayaan area favoritnya untuk mengurangi frekuensi aktivitas.'
    },
    Siren: {
        type: 'Luring',
        threat: 'High',
        evidence: ['Wither', 'Spirit Box', 'EMF Level 5'],
        signs: 'Memperlambat pemain yang terlihat saat hunt dan respons Spirit Box selalu suara wanita.',
        tips: 'Gunakan Spirit Box sebagai cek utama, lalu hindari duel garis pandang saat hunt.'
    },
    Skinwalker: {
        type: 'Mimic',
        threat: 'Very High',
        evidence: ['Freezing Temps', 'Ghost Writing', 'Spirit Box'],
        signs: 'Bisa meniru kemampuan ghost lain serta memalsukan bukti Ghost Orbs.',
        tips: 'Jangan simpulkan dari satu gejala; cari inkonsistensi bukti untuk mengidentifikasi mimic.'
    },
    Specter: {
        type: 'Territorial',
        threat: 'High',
        evidence: ['EMF Level 5', 'Freezing Temps', 'Laser Projector'],
        signs: 'Sangat terikat pada favorite room, sering lempar benda, dan hampir tidak roaming di luar hunt.',
        tips: 'Lock area investigasi di satu ruangan inti karena Specter biasanya menetap di sana.'
    },
    Spirit: {
        type: 'Classic',
        threat: 'Medium',
        evidence: ['Handprints', 'Ghost Writing', 'Spirit Box'],
        signs: 'Tidak punya kekuatan dominan, namun bisa mengubah warna api lilin.',
        tips: 'Jika pola bukti terasa netral dan lilin berubah warna, pertimbangkan Spirit.'
    },
    Umbra: {
        type: 'Shadowy',
        threat: 'High',
        evidence: ['Ghost Orbs', 'Laser Projector', 'Handprints'],
        signs: 'Tidak menghasilkan suara langkah kaki dan bergerak lebih lambat di ruangan terang.',
        tips: 'Nyalakan lampu di area lintasan untuk menurunkan tekanan chase dari Umbra.'
    },
    Wendigo: {
        type: 'Monstrous',
        threat: 'Very High',
        evidence: ['Ghost Orbs', 'Ghost Writing', 'Laser Projector'],
        signs: 'Tidak memulai hunt di dekat api menyala dan makin cepat saat average sanity turun.',
        tips: 'Pertahankan flame aktif di titik rawan dan jaga sanity tim agar tidak drop cepat.'
    },
    'The Wisp': {
        type: 'Flame-bound',
        threat: 'High',
        evidence: ['Wither', 'Laser Projector', 'Ghost Orbs'],
        signs: 'Dapat menyalakan lilin sendiri dan hanya bisa memulai hunt dari favorite room.',
        tips: 'Pantau ruangan favorit dengan ketat; jika hunt selalu berasal dari titik itu, Wisp makin kuat indikasinya.'
    },
    Wraith: {
        type: 'Malevolent',
        threat: 'Very High',
        evidence: ['EMF Level 5', 'Spirit Box', 'Laser Projector'],
        signs: 'Menguras energi tim lebih cepat dan enggan mengganggu garis salt.',
        tips: 'Gunakan salt line sebagai tes perilaku; minim gangguan salt mengarah kuat ke Wraith.'
    }
}

export default ghostDetails