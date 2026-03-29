const mailData = {
    'v250': {
        title: "Update v2.50.0",
        date: "29 March 2026",
        body: `
            Greetings, Mage! <br><br>
            Iterasi <b>"The Omniscient Insanity"</b> telah tiba. Update ini berfokus pada peningkatan kecerdasan taktis BOT dan penyeimbangan mekanik combat untuk memberikan tantangan yang lebih adil namun mematikan. <br><br>
            <b>What's New?</b><br>
            • <b>Intelligent Shielding:</b> Bot INSANITY MODE kini mampu memprediksi serangan berdasarkan sisa Mana pemain. Ia tidak akan membuang Shield jika seranganmu tidak mematikan.<br>
            • <b>Insanity Mode:</b> Pengurangan cooldown (Max 10s) untuk semua skill BOT di Mode Insanity. Penambahan damage pada skill bot<br>
            - <b>Skill BOT lebih sakit!</b>:<br>
            >> ULTI | 35-50 > 50-75.<br>
            >> SUPER PUNCH | 15 > 20<br>
            >> Strike | 10-16 > 15-20<br>
            • <b>Bot Nerfed:</b> Pengurangan amount skill: {heal} pada bot | 55 > 45
            <br>
            <br>
        `,
        sig: "— Developer"
    },
    'dev_note': {
        title: "A Note from Developer",
        date: "28 March 2026",
        body: 'Terima kasih sudah mendukung game ini. Jangan lupa cek mode PvP jika kamu ingin menantang temanmu secara langsung!<br><br><b>IGN: <span style="color: #bba934;">@qabilied</span></b>',
        sig: "— Developer"
    }
};

function openMail() {
    document.getElementById('mail-overlay').style.display = 'flex';
    if(document.querySelector('.notification-dot')) {
        document.querySelector('.notification-dot').style.display = 'none';
    }
}

function closeMail() {
    document.getElementById('mail-overlay').style.display = 'none';
}

function viewMailDetail(id) {
    const data = mailData[id];
    const area = document.getElementById('detail-content-area');
    
    area.innerHTML = `
        <div class="mail-header">
            <h2 class="mail-title">${data.title}</h2>
        </div>
        <div class="mail-body">
            <p class="mail-date">~ ${data.date}</p>
            <p class="mail-text" style="color:#e0e0e0; font-family:'Crimson Text',serif;">${data.body}</p>
            <p class="mail-signature" style="color:#ffcc00; text-align:right; font-family:'Cinzel',serif;">${data.sig}</p>
        </div>
    `;
    document.getElementById('mail-detail-overlay').style.display = 'flex';
}

function closeMailDetail() {
    document.getElementById('mail-detail-overlay').style.display = 'none';
}