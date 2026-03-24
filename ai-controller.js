function botAIEasy() {
  if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;

  const b = game.bot;
  const now = Date.now();

  const isReady = (id) => {
    const s = SKILLS.find((x) => x.id === id);
    return s && b.mana >= s.cost && now >= (b.cds[id] || 0);
  };

  let targetSkill = null;

  if (b.hp < 30) {
    if (isReady("super_heal")) targetSkill = "super_heal";
    else if (isReady("heal")) targetSkill = "heal";
    else if (isReady("vampire")) targetSkill = "vampire";
  }

  if (!targetSkill) {
    const prioritySkills = ["ulti", "burning", "super_punch", "strike"];

    targetSkill = prioritySkills.find((id) => isReady(id));
  }

  // 3. Cadangan Terakhir: Jika tidak ada mana buat skill, paksa Strike
  if (!targetSkill) targetSkill = "strike";

  const s = SKILLS.find((x) => x.id === targetSkill);
  if (s && b.mana >= s.cost && now >= (b.cds[targetSkill] || 0)) {
    useSkill(targetSkill, "bot");
  } else {
    useSkill("strike", "bot");
  }
}

function botAI() {
  if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;

  const b = game.bot;
  const p = game.p1;
  const now = Date.now();

  // Helper untuk sisa CD
  const getRemCD = (id) => Math.max(0, ((b.cds[id] || 0) - now) / 1000);

  // Helper untuk cek apakah skill BISA diklik (Mana cukup & CD 0)
  const isReady = (id) => {
    const s = SKILLS.find((x) => x.id === id);
    return s && b.mana >= s.cost && now >= (b.cds[id] || 0);
  };

  let targetSkill = null;
  let currentCD = 0;

  // --- STRATEGI UTAMA ---

  // 1. EMERGENCY HEAL (Hanya jika Mana Cukup & CD hampir habis)
  if (b.hp < 35 && b.mana >= 10) {
    let cdSHeal = getRemCD("super_heal");
    if (cdSHeal < 4.7) {
      targetSkill = "super_heal";
      currentCD = cdSHeal;
    }
  }

  // 2. AGGRESSIVE COMBO (Hanya jika Mana Sehat)
  if (!targetSkill && b.mana >= 30) {
    let cdUlti = getRemCD("ulti");
    let cdPunch = getRemCD("super_punch");
    let cdBurning = getRemCD("burning");

    // PRIORITAS A: FINISHER (Jika P1 sekarat, tunggu Ulti)
    // Jika darah P1 <= 55 dan Ulti dikit lagi ready, TUNGGU!
    if (p.hp <= 55 && b.mana >= 65 && cdUlti < 4.9) {
      targetSkill = "ulti";
      currentCD = cdUlti;
      if (cdUlti > 0)
        log("JOVITA: 'Tunggu sebentar... ini akan segera berakhir!'");
    }

    // PRIORITAS B: BURNING (Hanya jika darah P1 masih tebal)
    else if (isReady("burning") && p.hp > 55) {
      targetSkill = "burning";
    }

    // PRIORITAS C: SUPER PUNCH (Hanya jika Ulti masih lama CD-nya)
    else if (b.mana >= 30 && cdPunch < 4.7 && cdUlti > 5) {
      targetSkill = "super_punch";
      currentCD = cdPunch;
    }

    // PRIORITAS D: ULTI NORMAL (Jika Mana cukup dan ready)
    else if (isReady("ulti")) {
      targetSkill = "ulti";
    }
  }

  // 3. DEFENSE & RECOVERY
  if (!targetSkill && b.hp < 130) {
    if (isReady("heal") && b.mana >= 50) targetSkill = "heal";
    else if (isReady("vampire") && b.mana >= 45) targetSkill = "vampire";
  }

  // 4. MANA RECOVERY (STRIKE) - biar ga bengong
  // Jika tidak ada targetSkill (karena Mana kurang atau skill utama sedang CD lama)
  if (!targetSkill) {
    targetSkill = "strike";
    currentCD = getRemCD("strike");
  }

  // --- EKSEKUSI ---
  const execute = () => {
    if (game.turn !== "bot" || !game.active) return;

    // Cek apakah targetSkill benar-benar bisa dipakai saat ini
    const s = SKILLS.find((x) => x.id === targetSkill);

    if (s && b.mana >= s.cost && Date.now() >= (b.cds[targetSkill] || 0)) {
      useSkill(targetSkill, "bot");
    } else {
      // JIKA GAGAL (Mana tiba-tiba kurang/CD belum pas), PAKSA STRIKE TANPA SYARAT
      // Selama Mana >= 5, strike harus keluar.
      if (b.mana >= 5) {
        useSkill("strike", "bot");
      } else {
        log("JOVITA: 'Kehabisan energi... Menunggu pemulihan!'");
      }
    }
  };

  // Delay
  if (currentCD === 0) {
    execute();
  } else if (currentCD < 4.7) {
    setTimeout(execute, currentCD * 1000 + 100);
  } else {
    // Jika CD skill utama terlalu lama (> 4.7 detik), langsung pindah ke Strike
    targetSkill = "strike";
    let cdStrike = getRemCD("strike");
    if (cdStrike === 0) execute();
    else setTimeout(execute, cdStrike * 1000 + 100);
  }
}

function botAIHard() {
  if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;

  const b = game.bot;
  const p = game.p1;
  const now = Date.now();

  const getRemCD = (id) => Math.max(0, ((b.cds[id] || 0) - now) / 1000);
  const isReady = (id) => {
    const s = SKILLS.find((x) => x.id === id);
    return s && b.mana >= s.cost && now >= (b.cds[id] || 0);
  };

  let targetSkill = null;
  let currentCD = 0;

  // --- LOGIKA PEMILIHAN STRATEGI ---

  // 1. KONDISI DARAT (URGENT HEAL)
  if (b.hp < 35) {
    let cdSHeal = getRemCD("super_heal");
    if (cdSHeal < 4.7 && b.mana >= 10) {
      targetSkill = "super_heal";
      currentCD = cdSHeal;
    } else if (isReady("heal")) {
      targetSkill = "heal";
    } else if (isReady("vampire")) {
      targetSkill = "vampire";
    }
  }
  // 2. KONDISI HP SEDANG (DEFENSIVE-AGRESSIVE)
  else if (b.hp >= 35 && b.hp < 100) {
    if (isReady("heal")) targetSkill = "heal";
    else if (isReady("vampire")) targetSkill = "vampire";
  }

  // 3. JIKA BELUM ADA TARGET (Atau HP > 100), CARI COMBO SERANG
  if (!targetSkill) {
    let cdUlti = getRemCD("ulti");
    let cdPunch = getRemCD("super_punch");

    // Prioritas Finisher
    if (p.hp <= 55 && b.mana >= 65 && cdUlti < 4.9) {
      targetSkill = "ulti";
      currentCD = cdUlti;
    } else if (isReady("burning") && p.hp > 55) {
      targetSkill = "burning";
    } else if (b.mana >= 30 && cdPunch < 4.7 && cdUlti > 5) {
      targetSkill = "super_punch";
      currentCD = cdPunch;
    } else if (isReady("ulti")) {
      targetSkill = "ulti";
    }
  }

  if (!targetSkill) {
    targetSkill = "strike";
    currentCD = getRemCD("strike");
  }

  // --- EKSEKUSI ---
  const execute = () => {
    if (game.turn !== "bot" || !game.active) return;

    const s = SKILLS.find((x) => x.id === targetSkill);

    // Cek lagi apakah benar-benar siap
    if (s && b.mana >= s.cost && Date.now() >= (b.cds[targetSkill] || 0)) {
      useSkill(targetSkill, "bot");
    } else {
      // Jika skill pilihan gagal (mana kurang/CD), paksa strike untuk isi mana
      if (targetSkill !== "strike") {
        useSkill("strike", "bot");
      }
    }
  };

  if (currentCD === 0) {
    execute();
  } else if (currentCD < 4.7) {
    setTimeout(execute, currentCD * 1000 + 100);
  } else {
    // Jika nunggu kelamaan, langsung strike saja
    targetSkill = "strike";
    let cdS = getRemCD("strike");
    setTimeout(execute, cdS * 1000 + 100);
  }
}
