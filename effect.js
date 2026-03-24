function createHealParticle(pid) {
  const card = document.getElementById(`${pid}-card`);
  const rect = card.getBoundingClientRect();
  const p = document.createElement("div");

  p.className = "heal-particle";
  p.innerText = "+";

  // Posisi acak di sekitar kartu
  const x = rect.left + Math.random() * rect.width;
  const y = rect.top + Math.random() * (rect.height / 2);

  p.style.left = x + "px";
  p.style.top = y + "px";

  document.body.appendChild(p);

  // Hapus elemen dari DOM setelah animasi selesai
  setTimeout(() => p.remove(), 1000);
}

function createStrikeVisual(targetPid) {
  const card = document.getElementById(`${targetPid}-card`);
  const arena = document.getElementById("arena");
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 1. Flash Merah di seluruh layar
  const flash = document.createElement("div");
  flash.className = "hit-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 200);

  // 2. Guncangan Arena (Bukan cuma kartu)
  arena.classList.add("heavy-shake");
  setTimeout(() => arena.classList.remove("heavy-shake"), 400);

  // 3. Tambahkan Efek Sabetan (Strike Effect yang tadi)
  const strike = document.createElement("div");
  strike.className = "strike-effect"; // Pastikan class dari jawaban sebelumnya masih ada
  strike.style.left = centerX - 100 + "px";
  strike.style.top = centerY - 20 + "px";
  strike.style.setProperty("--rot", `${Math.random() * 360}deg`);
  document.body.appendChild(strike);
  setTimeout(() => strike.remove(), 300);

  // 4. Ledakan Partikel "Darah/Percikan"
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.className = "strike-spark";

    // Arah ledakan acak
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200;

    spark.style.left = centerX + "px";
    spark.style.top = centerY + "px";
    spark.style.setProperty("--tx", `${tx}px`);
    spark.style.setProperty("--ty", `${ty}px`);

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 500);
  }
}

function createVampireVisual(sourcePid, targetPid) {
  const sourceCard = document.getElementById(`${sourcePid}-card`);
  const targetCard = document.getElementById(`${targetPid}-card`);

  const sRect = sourceCard.getBoundingClientRect();
  const tRect = targetCard.getBoundingClientRect();

  // 1. Efek Layar Menggelap
  const dim = document.createElement("div");
  dim.className = "vamp-dim";
  document.body.appendChild(dim);
  setTimeout(() => dim.remove(), 1000);

  // 2. Aura pada Pengguna
  sourceCard.classList.add("vampire-active");
  setTimeout(() => sourceCard.classList.remove("vampire-active"), 1000);

  // 3. Kirim "Orbs" dari Musuh ke Pengguna
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const orb = document.createElement("div");
      orb.className = "vamp-orb";

      // Titik awal (tengah kartu musuh dengan sedikit acak)
      const startX = tRect.left + tRect.width / 2 + (Math.random() - 0.5) * 50;
      const startY = tRect.top + tRect.height / 2 + (Math.random() - 0.5) * 50;

      // Hitung jarak ke kartu tujuan
      const dx = sRect.left + sRect.width / 2 - startX;
      const dy = sRect.top + sRect.height / 2 - startY;

      orb.style.left = startX + "px";
      orb.style.top = startY + "px";
      orb.style.setProperty("--dx", `${dx}px`);
      orb.style.setProperty("--dy", `${dy}px`);

      document.body.appendChild(orb);
      setTimeout(() => orb.remove(), 800);
    }, i * 100); // Orbs muncul bergantian
  }
}

function createSuperPunchVisual(targetPid) {
  const card = document.getElementById(`${targetPid}-card`);
  const arena = document.getElementById("arena");
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // --- 1. TEKS "SUPER PUNCH!" ---
  const txt = document.createElement("div");
  txt.className = "punch-text";
  txt.innerText = "SUPER PUNCH!";
  // Posisi teks sedikit acak agar jika muncul beruntun tidak menumpuk sempurna
  txt.style.left = centerX - 80 + Math.random() * 40 + "px";
  txt.style.top = centerY - 50 + "px";
  document.body.appendChild(txt);
  setTimeout(() => txt.remove(), 800);

  // 2. Flash Kuning
  const flash = document.createElement("div");
  flash.className = "hit-flash";
  flash.style.background = "rgba(241, 196, 15, 0.4)";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 150);

  // 3. Getaran Gila
  arena.classList.add("heavy-shake");
  setTimeout(() => arena.classList.remove("heavy-shake"), 500);

  // 4. Efek Ledakan Pukulan (Lingkaran)
  const impact = document.createElement("div");
  impact.style.position = "fixed";
  impact.style.left = centerX - 50 + "px";
  impact.style.top = centerY - 50 + "px";
  impact.style.width = "100px";
  impact.style.height = "100px";
  impact.style.border = "5px solid #f1c40f";
  impact.style.borderRadius = "50%";
  impact.style.animation = "pulse-out 0.3s ease-out forwards";
  impact.style.pointerEvents = "none";
  impact.style.zIndex = "9999";
  document.body.appendChild(impact);
  setTimeout(() => impact.remove(), 300);

  // 5. Partikel Emas
  for (let i = 0; i < 20; i++) {
    const spark = document.createElement("div");
    spark.className = "strike-spark";
    spark.style.background = "#f1c40f";
    spark.style.boxShadow = "0 0 10px #f1c40f";
    const tx = (Math.random() - 0.5) * 400;
    const ty = (Math.random() - 0.5) * 400;
    spark.style.left = centerX + "px";
    spark.style.top = centerY + "px";
    spark.style.setProperty("--tx", `${tx}px`);
    spark.style.setProperty("--ty", `${ty}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

function createSuperHealVisual(pid) {
  const card = document.getElementById(`${pid}-card`);
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 1. Flash Layar Hijau Lembut (Soft Flash)
  const flash = document.createElement("div");
  flash.className = "hit-flash"; // Gunakan class flash yang sudah ada
  flash.style.background = "rgba(0, 255, 136, 0.3)";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 250);

  // 2. Ledakan Partikel Super
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.className = "super-heal-particle";

      // Simbol acak: Plus, Hati, atau Kilauan
      const symbols = ["+", "💖", "✨", "🌿"];
      p.innerText = symbols[Math.floor(Math.random() * symbols.length)];

      // Tentukan arah ledakan acak
      const angle = Math.random() * Math.PI * 2; // 0 hingga 360 derajat
      const dist = 100 + Math.random() * 150; // Jarak sebaran
      const dx = Math.cos(angle) * dist + "px";
      const dy = Math.sin(angle) * dist + "px";
      const rot = (Math.random() - 0.5) * 360 + "deg";

      p.style.left = centerX + "px";
      p.style.top = centerY + "px";
      p.style.setProperty("--dx", dx);
      p.style.setProperty("--dy", dy);
      p.style.setProperty("--rot", rot);

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }, i * 30); // Muncul berurutan cepat
  }
}
