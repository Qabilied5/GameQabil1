const mailData = {
'v300': {
        title: "NEW UPDATE - The Ancient Awakening",
        date: "April 1, 2026",
        body: `
        <style>

            @keyframes insanity-glow {
                from { text-shadow: 0 0 10px #7b2cbf, 0 0 20px #9d4edd; filter: brightness(1); }
                to { text-shadow: 0 0 20px #9d4edd, 0 0 40px #240046, 0 0 60px #5a189a; filter: brightness(1.4); }
            }

            @keyframes flame-glow {
                0% { text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500; }
                50% { text-shadow: 0 0 10px #ff8c00, 0 0 20px #ff4500; }
                100% { text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500; }
            }
            .fire-text {
                color: #fff; font-weight: 900;
                background: linear-gradient(to bottom, #ffea00, #ff4500);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                animation: flame-glow 1.5s infinite alternate;
                font-family: "Cinzel Decorative", serif; letter-spacing: 2px;
                text-transform: uppercase;
            }
            .mail-section { margin-bottom: 15px; line-height: 1.6; font-size: 0.95rem; }
            .ritual-box { 
                border: 1px solid #ff4500; 
                background: rgba(20, 0, 0, 0.6); 
                padding: 15px; 
                margin: 15px 0;
                border-radius: 4px;
            }
            .sentinel-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            .sentinel-table th { border-bottom: 1px solid #ff4500; padding: 8px; text-align: left; color: #ffd700; }
            .sentinel-table td { padding: 8px; border-bottom: 1px solid #333; }
        </style>

        <div class="mail-section">
            Greetings, mage!. The celestial seals have crumbled. 
            The primordial <span class="fire-text">SENTINELS</span> have awoken from their timeless slumber to serve those who possess the strength to command them.
        </div>

        <div class="ritual-box">
            <b>THE RITUAL OF SUMMONING:</b><br>
            These ancient entities only heed the call of those who have conquered the <b style="
    color: #ff0000; 
    text-transform: uppercase; 
    letter-spacing: 1px;
    text-shadow: 0 0 5px #ff0000, 0 0 10px #8b0000, 0 0 20px #000; 
    background: rgba(139, 0, 0, 0.2); 
    padding: 0 4px; 
    border-radius: 2px;
    animation: pulse-red 1s infinite alternate;
">EXPERT MODE</b>. Once bound to your soul, they shall accompany you even into the depths of <b style="
    color: #e0aaff; 
    text-transform: uppercase; 
    letter-spacing: 2px;
    background: rgba(45, 0, 94, 0.4);
    padding: 0 5px;
    border-radius: 3px;
    text-shadow: 0 0 8px #7b2cbf, 0 0 15px #9d4edd, 0 0 25px #240046;
    animation: insanity-tremor 0.2s infinite, insanity-glow 2s infinite alternate;
    display: inline-block;
">INSANITY MODE</b>.
        </div>

        <div class="mail-section">
            <b>THE ETERNAL CYCLE:</b><br>
            A <span class="fire-text">SENTINEL</span> breathes with the rhythm of battle. They remain <b>ACTIVE for 30s, with a</b> 60% chance to unleash their powers every 5s, followed by a <b>30s RESTING</b> period to recover their essence.
        </div>

        <div class="mail-section">
            <strong>The Primordial Lineage:</strong>
            <table class="sentinel-table">
                <thead>
                    <tr>
                        <th>Sentinel</th>
                        <th>Core Power</th>
                        <th>Passive Curse</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="color:#4da6ff"><b>THALOR</b></td>
                        <td>Dual Shield (Every 10s)</td>
                        <td>15% Chance: Heal +20HP</td>
                    </tr>
                    <tr>
                        <td style="color:#0ff040"><b>HERA</b></td>
                        <td>13-25 HP Regeneration</td>
                        <td>15% Chance: 15 DMG Strike</td>
                    </tr>
                    <tr>
                        <td style="color:#ff4444"><b>HADES</b></td>
                        <td>15-25 Oblivion Damage</td>
                        <td>5% Chance: 75% HP Execution</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mail-section">
            <strong>The Gacha Forge Probabilities:</strong><br>
            <span style="font-size: 0.8rem; opacity: 0.8;">Your current Sentinel is not eternal. If you wishest to experience the might of another Sentinel, you mayest return to the Forge and invoke the Gacha anew to replace your current Sentinel.</span>
            <table class="sentinel-table" style="margin-top: 10px;">
                <thead>
                    <tr>
                        <th>Sentinel Entity</th>
                        <th>Summon Chance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="color:#4da6ff">THALOR</td>
                        <td>33.3%</td>
                    </tr>
                    <tr>
                        <td style="color:#0ff040">HERA</td>
                        <td>33.3%</td>
                    </tr>
                    <tr>
                        <td style="color:#ff4444">HADES</td>
                        <td>33.3%</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mail-section">
            Step into the <b>Gacha Forge</b>, claim your destiny, and let the world tremble as the <span class="fire-text">SENTINELS</span> rise!
            <br><br>
            <i style="color: #bbb; font-size: 0.85rem;">
                Dost thou seek to bind a different soul? The ritual can be performed infinitely. Vanquish the <b>EXPERT</b> trial once more to invoke another <b>GACHA RITUAL</b> and command a new power.
            </i>
        </div>
        `,
        sig: "— DEVELOPER"
    },
    'dev_note': {
        title: "A Note from Developer",
        date: "28 March 2026",
        body: 'Terima kasih sudah mendukung game ini. Jangan lupa cek mode PvP jika kamu ingin menantang temanmu secara langsung!<br><br> Multiplayer penuh saat ini sedang dalam proses pengerjaan, jadi nantikan update selanjutnya!<br><br>Berikan Saranmu!<br><b>IG: <span style="color: #bba934;">@qabilied</span></b>',
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
    },
    'new-update-gold': {
        title: "NEW UPDATE! - Player Skins & Gold Method",
        date: "April 12, 2026",
        body: `
        <style>
            .gold-text {
                color: #ffd700;
                font-weight: bold;
                text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
            }
            .reward-table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
                background: rgba(255, 215, 0, 0.05);
                border: 1px solid rgba(255, 215, 0, 0.2);
            }
            .reward-table td {
                padding: 10px;
                border-bottom: 1px solid rgba(255, 215, 0, 0.1);
                font-family: monospace;
            }
            .reward-table tr:last-child td { border: none; }
            .diff-name { color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
            .gold-amount { color: #ffd700; text-align: right; font-weight: bold; }
        </style>

        <div class="mail-section">
            Greetings, Mage! The royal treasury has been unsealed. You may now accumulate <span class="gold-text">GOLD</span> every time you vanquish a foe in the arena.
        </div>

        <div class="ritual-box" style="border-color: #ffd700;">
            <b class="gold-text">BOSS REWARD SYSTEM:</b><br>
            The greater the trial, the larger the treasure you shall claim:
            <table class="reward-table">
                <tr>
                    <td class="diff-name">Normal Mode</td>
                    <td class="gold-amount">25 GOLD</td>
                </tr>
                <tr>
                    <td class="diff-name" style="color: #4da6ff;">Hard Mode</td>
                    <td class="gold-amount">150 GOLD</td>
                </tr>
                <tr>
                    <td class="diff-name" style="color: #ff4444;">Expert Mode</td>
                    <td class="gold-amount">450 GOLD</td>
                </tr>
                <tr>
                    <td class="diff-name" style="color: #e0aaff;">Insanity Mode</td>
                    <td class="gold-amount">1000 GOLD</td>
                </tr>
            </table>
        </div>

        <div class="mail-section">
            <b>THE SKIN VAULT:</b><br>
            Use your hard-earned Gold to awaken a new identity in the <span class="gold-text">SKIN VAULT</span>. Change your appearance and display your dominance to all who dare face you.
            <br><br>
            <i style="color: #bbb; font-size: 0.85rem;">
                Prepare yourself, for the vault shall expand with even more skins in the future. The current collection is but the beginning of your journey toward ultimate cosmetic power!
            </i>
        </div>
        `,
        sig: "— THE TREASURER"
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
    
    // area.scrollTop = 0;
    
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

    // Reset ke atas
    setTimeout(() => {
        area.scrollTo({
            top: 0,
            behavior: 'instant'
        });
        area.scrollTop = 0;
    }, 10);
}

function closeMailDetail() {
    document.getElementById('mail-detail-overlay').style.display = 'none';
}

// >> Logic Button Assistive Ball buat mail
const ball = document.getElementById("mail-trigger");
let isDragging = false;
let isMoving = false;
let startX, startY, offsetX, offsetY;
const threshold = 8;

function dragStart(e) {
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    
    const rect = ball.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    isDragging = true;
    isMoving = false; 
    ball.style.transition = "none";
}

function dragMove(e) {
    if (!isDragging) return;

    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;


    const dist = Math.hypot(clientX - startX, clientY - startY);
    if (dist > threshold) {
        isMoving = true;
    }

    if (isMoving) {
        e.preventDefault();
        
        let x = clientX - offsetX;
        let y = clientY - offsetY;


        const maxX = window.innerWidth - ball.offsetWidth;
        const maxY = window.innerHeight - ball.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        ball.style.left = x + "px";
        ball.style.top = y + "px";
        ball.style.right = "auto";
        ball.style.bottom = "auto";
    }
}

function dragEnd() {
    if (!isDragging) return;

    if (!isMoving) {
        openMail();
    }

    isDragging = false;
    isMoving = false;
}

ball.addEventListener("mousedown", dragStart);
window.addEventListener("mousemove", dragMove);
window.addEventListener("mouseup", dragEnd);

ball.addEventListener("touchstart", dragStart, { passive: false });
window.addEventListener("touchmove", dragMove, { passive: false });
window.addEventListener("touchend", dragEnd);