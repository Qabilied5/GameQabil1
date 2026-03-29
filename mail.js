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
        body: 'Terima kasih sudah mendukung game ini. Jangan lupa cek mode PvP jika kamu ingin menantang temanmu secara langsung!<br><br>Berikan Saranmu!<br><b>IG: <span style="color: #bba934;">@qabilied</span></b>',
        sig: "— Developer"
    },
    'jovita_note': {
        title: "A Note from Jovita",
        date: "29 March 2026",
        body: 'hah kalah? lebih baik main pou<br><br>',
        sig: "— Jovita"
    },
    'skills_note': {
        title: "Skills & Event Information",
        date: "Updated",
        body: `
        Selamat datang di pusat informasi teknik <b>Mage War</b>. Berikut adalah rincian mekanik skill yang berlaku pada versi saat ini: <br><br>
        
        <b style="color: #b8860b;">— ATTACK —</b><br>
        • <b>Strike:</b> Serangan konvensional. Memberikan damage stabil dan <span style="color: #3498db;"><b>memulihkan Mana</b></span> (<span style="color: #3498db;">+25 Player</span> / <span style="color: #3498db;">+15 Bot</span>).<br>
        • <b>Vampire (🦇):</b> Mengonsumsi HP lawan sebesar <span style="color: #ff4444;">20 poin</span> dan mengonversinya menjadi <span style="color: #2ecc71;"><b>+25 HP self-heal</b></span>.<br>
        • <b>Super Punch:</b> Serangan fisik brutal yang dilepaskan dalam <b>3x rangkaian serangan</b> beruntun. <span style="color: #ff4444;">15 poin / HIT</span><br>
        • <b>Ultimate (💥):</b> Ledakan energi masif. Memberikan damage hingga <span style="color: #ff4444;">50 HP</span> (Player/Bot) atau <span style="color: #ff4444;"><b>75 HP (Insanity Bot)</b></span>.<br><br>

        <b style="color: #b8860b;">— DEFENSE & RESTORATION —</b><br>
        • <b>Shield (🛡️):</b> Mengaktifkan proteksi magis. Mengurangi seluruh damage yang masuk sebesar <b><span style="color: #ddff00;">75% </span> selama 2 turn</b>.<br>
        • <b>Heal:</b> Restorasi instan sebesar <span style="color: #2ecc71;">+35 HP</span> (Player) atau <span style="color: #2ecc71;">+45 HP</span> (Bot).<br>
        • <b>Super Heal (✨):</b> Status regenerasi aktif yang memulihkan total <span style="color: #2ecc71;"><b>111% HP</b></span> dalam durasi 5 detik.<br><br>

        <b style="color: #b8860b;">— ELEMENTAL DEBUFFS —</b><br>
        • <b>Burning (🔥):</b> Efek terbakar yang memberikan <span style="color: #ff4444;"><i>Damage-over-Time</i></span> (DoT) selama <b>6 detik</b>.<br>
        • <b>Freeze (❄️):</b> Menghentikan seluruh pergerakan lawan (Stun) selama <b>3 detik</b> penuh (Skip 1 turn lawan).<br><br>

        <b style="color: #b8860b;">— INSANITY MODE EVENT LOG —</b><br>
        Pada tingkat kesulitan <b>Insanity</b>, sistem melakukan <i>Overclock</i> pada Bot: <br>
        1. <b>Compressed Cooldown:</b> Skill dengan CD >10s dipangkas menjadi <b>9.9 detik</b>.<br>
        2. <b>Mana Efficiency:</b> Bot mendapatkan scaling damage lebih tinggi pada skill dasar.<br><br>
        
        <b style="color: #b8860b;">— SPECIAL EVENTS —</b><br>
        • <span style="color: #2ecc71;"><b>Healing Event:</b></span> Muncul secara berkala selama 30 detik untuk memulihkan <span style="color: #2ecc71;"><b>HP</b></span> setiap detik bagi pemain yang sedang bertahan.<br>
        • <span style="color: #3498db;"><b>Mana Event:</b></span> Lonjakan energi astral selama 30 detik yang memberikan tambahan <span style="color: #3498db;"><b>Mana</b></span> secara signifikan untuk mempercepat penggunaan Skills terutama Ultimate.<br><br>

        <b style="color: #b8860b;">— THE 9 SKILLS —</b><br>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid rgba(255, 204, 0, 0.2); font-family: monospace; font-size: 0.85rem;">
          <thead>
            <tr style="background: rgba(184, 134, 11, 0.2); color: #ffcc00;">
              <th style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 8px; text-align: left;">SKILLS</th>
              <th style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 8px; text-align: center;">MANA</th>
              <th style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 8px; text-align: center;">CD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Strike</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">5</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">5s</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Super Heal</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">10</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">90s</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Freeze</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">15</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">30s</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Shield</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">20</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">10s</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Super Punch</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">30</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">15s</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Vampire / Burning</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">45</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">15-20s</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Heal</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">50</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">13s</td>
            </tr>
            <tr>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px;">Ultimate (Ulti)</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center; color: #3498db;">65</td>
              <td style="border: 1px solid rgba(255, 204, 0, 0.2); padding: 6px; text-align: center;">30s</td>
            </tr>
          </tbody>
        </table>
        <br>
        
        <i>Pahami cooldown lawan, kuasai Mana, dan menangkan duel!<br><br></i>
    `,
        sig: "— Mortal"
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