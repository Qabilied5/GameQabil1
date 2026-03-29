(function initGameStorage() {
    const currentStatus = localStorage.getItem("insanityUnlocked");

    if (currentStatus === null) {
        localStorage.setItem("insanityUnlocked", "false");
        console.log("SYSTEM: First time user detected. Insanity Mode Locked.");
    }
})();

function handleInsanityClick() {
  const isUnlocked = localStorage.getItem("insanityUnlocked") === "true";
  
  if (!isUnlocked) {
    const modal = document.getElementById('insanity-modal');
    if (modal) modal.style.display = 'flex';
  } else {
    selectDifficulty('insanity');
  }
  
}

function checkInsanityLock() {
  const btn = document.getElementById('insanity-btn');
  
  if (btn.disabled) {
    const modal = document.getElementById('insanity-modal');
    modal.style.display = 'flex';
  }
}

function closeInsanityModal() {
  document.getElementById('insanity-modal').style.display = 'none';
}

window.unlockInsanityMode = function() {
  localStorage.setItem("expertWinner", "true");
  localStorage.setItem("insanityUnlocked", "true");
  console.log("Storage berhasil diisi!");
  
  const btn = document.getElementById('insanity-btn');
  if (btn) {
    btn.disabled = false;
    btn.classList.remove("locked");
    btn.innerText = "INSANITY";
  }
};

function botAIEasy() {
        if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;
        const b = game.bot,
          now = Date.now();
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
          const prio = ["ulti", "burning", "super_punch", "strike"];
          targetSkill = prio.find((id) => isReady(id));
        }
        if (!targetSkill) targetSkill = "strike";
        const s = SKILLS.find((x) => x.id === targetSkill);
        if (s && b.mana >= s.cost && now >= (b.cds[targetSkill] || 0))
          useSkill(targetSkill, "bot");
        else useSkill("strike", "bot");
      }

      /* BOT AI NORMAL */
      function botAI() {
        if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;
        const b = game.bot,
          p = game.p1,
          now = Date.now();
        const getRemCD = (id) => Math.max(0, ((b.cds[id] || 0) - now) / 1000);
        const isReady = (id) => {
          const s = SKILLS.find((x) => x.id === id);
          return s && b.mana >= s.cost && now >= (b.cds[id] || 0);
        };
        let targetSkill = null,
          currentCD = 0;
        if (b.hp < 35 && b.mana >= 10) {
          let cdSH = getRemCD("super_heal");
          if (cdSH < 4.7) {
            targetSkill = "super_heal";
            currentCD = cdSH;
          }
        }
        if (!targetSkill && b.mana >= 30) {
          let cdU = getRemCD("ulti"),
            cdP = getRemCD("super_punch");
          if (p.hp <= 55 && b.mana >= 65 && cdU < 4.9) {
            targetSkill = "ulti";
            currentCD = cdU;
            if (cdU > 0)
              log("JOVITA: 'Tunggu sebentar... ini akan segera berakhir!'");
          } else if (isReady("burning") && p.hp > 55) {
            targetSkill = "burning";
          } else if (b.mana >= 30 && cdP < 4.7 && cdU > 5) {
            targetSkill = "super_punch";
            currentCD = cdP;
          } else if (isReady("ulti")) {
            targetSkill = "ulti";
          }
        }
        if (!targetSkill && b.hp < 130) {
          if (isReady("heal") && b.mana >= 50) targetSkill = "heal";
          else if (isReady("vampire") && b.mana >= 45) targetSkill = "vampire";
        }
        if (!targetSkill) {
          targetSkill = "strike";
          currentCD = getRemCD("strike");
        }
        const execute = () => {
          if (game.turn !== "bot" || !game.active) return;
          const s = SKILLS.find((x) => x.id === targetSkill);
          if (s && b.mana >= s.cost && Date.now() >= (b.cds[targetSkill] || 0))
            useSkill(targetSkill, "bot");
          else if (b.mana >= 5) useSkill("strike", "bot");
          else log("JOVITA: 'Kehabisan energi...'");
        };
        if (currentCD === 0) execute();
        else if (currentCD < 4.7) setTimeout(execute, currentCD * 1000 + 100);
        else {
          targetSkill = "strike";
          let cdS = getRemCD("strike");
          if (cdS === 0) execute();
          else setTimeout(execute, cdS * 1000 + 100);
        }
      }

      /* BOT AI HARD */
      function botAIHard() {
        if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;
        const b = game.bot,
          p = game.p1,
          now = Date.now();
        const getRemCD = (id) => Math.max(0, ((b.cds[id] || 0) - now) / 1000);
        const isReady = (id) => {
          const s = SKILLS.find((x) => x.id === id);
          return s && b.mana >= s.cost && now >= (b.cds[id] || 0);
        };
        let targetSkill = null,
          currentCD = 0;
        if (b.hp < 35) {
          let cdSH = getRemCD("super_heal");
          if (cdSH < 4.7 && b.mana >= 10) {
            targetSkill = "super_heal";
            currentCD = cdSH;
          } else if (isReady("heal")) targetSkill = "heal";
          else if (isReady("vampire")) targetSkill = "vampire";
        } else if (b.hp >= 35 && b.hp < 100) {
          if (isReady("heal")) targetSkill = "heal";
          else if (isReady("vampire")) targetSkill = "vampire";
        }
        if (!targetSkill) {
          let cdU = getRemCD("ulti"),
            cdP = getRemCD("super_punch");
          if (p.hp <= 55 && b.mana >= 65 && cdU < 4.9) {
            targetSkill = "ulti";
            currentCD = cdU;
          } else if (isReady("burning") && p.hp > 55) targetSkill = "burning";
          else if (b.mana >= 30 && cdP < 4.7 && cdU > 5) {
            targetSkill = "super_punch";
            currentCD = cdP;
          } else if (isReady("ulti")) targetSkill = "ulti";
        }
        if (!targetSkill) {
          targetSkill = "strike";
          currentCD = getRemCD("strike");
        }
        const execute = () => {
          if (game.turn !== "bot" || !game.active) return;
          const s = SKILLS.find((x) => x.id === targetSkill);
          if (s && b.mana >= s.cost && Date.now() >= (b.cds[targetSkill] || 0))
            useSkill(targetSkill, "bot");
          else if (targetSkill !== "strike") useSkill("strike", "bot");
        };
        if (currentCD === 0) execute();
        else if (currentCD < 4.7) setTimeout(execute, currentCD * 1000 + 100);
        else {
          targetSkill = "strike";
          let cdS = getRemCD("strike");
          setTimeout(execute, cdS * 1000 + 100);
        }
      }

      /* BOT AI Expert */
      function botAIExpert() {
        if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;
        const b = game.bot,
          p = game.p1,
          now = Date.now();

        const getRemCD = (id) => Math.max(0, ((b.cds[id] || 0) - now) / 1000);
        const isReady = (id) => {
          const s = SKILLS.find((x) => x.id === id);
          return s && b.mana >= s.cost && now >= (b.cds[id] || 0);
        };

        let targetSkill = null,
          currentCD = 0;

        if (!targetSkill && p.hp < 50) {

          const playerIsSafe = p.shield > 0 || p.isShielded;
          
          if (!playerIsSafe) {
            let cdU = getRemCD("ulti");
            const sUlti = SKILLS.find(x => x.id === "ulti");
            
            if (b.mana >= (sUlti ? sUlti.cost : 0)) {
              if (cdU === 0) {
                targetSkill = "ulti";
              } else if (cdU < 4.8) {
                targetSkill = "ulti";
                currentCD = cdU;
                if (Math.random() > 0.5) log("JOVITA: 'Sembunyi saja selagi bisa, ajalmu sebentar lagi...'");
              }
            }
          } else {
            if (isReady("burning")) targetSkill = "burning";
          }
        }

        if (b.hp < 70 && p.hp > 50) {
        const skillsToTry = ["heal", "vampire", "super_punch", "super_heal"];
    
        for (let id of skillsToTry) {
          let cd = getRemCD(id);
          const s = SKILLS.find(x => x.id === id);
          
          if (s && b.mana >= s.cost) {
            if (cd === 0) {
              targetSkill = id;
              break;
            } else if (cd < 4.8) {
              targetSkill = id;
              currentCD = cd;
              break;
            }
          }
        }

        if (targetSkill === "super_heal" && currentCD === 0) {
          b.afterSuperHeal = true; 
        }

        if (!targetSkill && b.afterSuperHeal) {
          let cdF = getRemCD("freeze");
          let cdU = getRemCD("ulti");
          
          if (isReady("freeze") || (cdF > 0 && cdF < 4.8)) {
            targetSkill = "freeze";
            currentCD = cdF;
            b.afterSuperHeal = false;
          } else if (isReady("ulti") || (cdU > 0 && cdU < 4.8)) {
            targetSkill = "ulti";
            currentCD = cdU;
            b.afterSuperHeal = false;
          }
        }
      }

        if (p.shield > 0 || p.isShielded) {
          let cdFreeze = getRemCD("freeze");
          let cdBurning = getRemCD("burning");

          if (isReady("freeze")) {
            targetSkill = "freeze";
          } 

          else if (cdBurning > 0 && cdBurning < 4.8) {
            const sBurning = SKILLS.find(x => x.id === "burning");
            if (b.mana >= (sBurning ? sBurning.cost : 0)) {
              targetSkill = "burning";
              currentCD = cdBurning;
            }
          }

          else if (isReady("burning")) {
            targetSkill = "burning";
          }
        }

        if (!targetSkill && b.hp > 80) {
          if (isReady("burning")) targetSkill = "burning";
          else if (isReady("super_punch")) targetSkill = "super_punch";
          else if (isReady("vampire")) targetSkill = "vampire";
          else if (isReady("ulti")) targetSkill = "ulti";
        }

        if (b.hp < 35) {
          let cdSH = getRemCD("super_heal");
          if (cdSH < 4.7 && b.mana >= 10) {
            targetSkill = "super_heal";
            currentCD = cdSH;
          } else if (isReady("heal")) targetSkill = "heal";
          else if (isReady("vampire")) targetSkill = "vampire";
        } else if (b.hp >= 35 && b.hp < 100) {
          if (isReady("heal")) targetSkill = "heal";
          else if (isReady("vampire")) targetSkill = "vampire";
        }

        if (!targetSkill) {
          let cdU = getRemCD("ulti"),
            cdP = getRemCD("super_punch");
          if (p.hp <= 55 && b.mana >= 65 && cdU < 4.9) {
            targetSkill = "ulti";
            currentCD = cdU;
          } else if (isReady("burning") && p.hp > 55) targetSkill = "burning";
          else if (b.mana >= 30 && cdP < 4.7 && cdU > 5) {
            targetSkill = "super_punch";
            currentCD = cdP;
          } else if (isReady("ulti")) targetSkill = "ulti";
        }

        // if (!targetSkill) {
        //   let cdU = getRemCD("ulti"),
        //     cdP = getRemCD("super_punch");
        //   if (p.hp <= 55 && b.mana >= 65 && cdU < 4.9) {
        //     targetSkill = "ulti";
        //     currentCD = cdU;
        //   } else if (isReady("burning") && p.hp > 55) targetSkill = "burning";
        //   else if (b.mana >= 30 && cdP < 4.7 && cdU > 5) {
        //     targetSkill = "super_punch";
        //     currentCD = cdP;
        //   } else if (isReady("ulti")) targetSkill = "ulti";
        // }

        if (!targetSkill) {
          targetSkill = "strike";
          currentCD = getRemCD("strike");
        }

        const execute = () => {
          if (game.turn !== "bot" || !game.active) return;
          const s = SKILLS.find((x) => x.id === targetSkill);
          if (s && b.mana >= s.cost && Date.now() >= (b.cds[targetSkill] || 0))
            useSkill(targetSkill, "bot");
          else if (targetSkill !== "strike") useSkill("strike", "bot");
        };
        if (currentCD === 0) execute();
        else if (currentCD < 4.7) setTimeout(execute, currentCD * 1000 + 100);
        else {
          targetSkill = "strike";
          let cdS = getRemCD("strike");
          setTimeout(execute, cdS * 1000 + 100);
        }
      }

  window.addEventListener('load', () => {
  const isUnlocked = localStorage.getItem("insanityUnlocked") === "true";
  const btn = document.getElementById('insanity-btn');
  
  if (isUnlocked && btn) {
    btn.disabled = false;
    btn.removeAttribute("disabled");
    btn.classList.remove("locked");
    btn.style.filter = "none";
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
    btn.innerText = "INSANITY";
    console.log("INSANITY: Mode Restored from Storage.");
  }
});



// BOT INSANITY
function botAIInsanity() {
  if (game.turn !== "bot" || !game.active || game.bot.freeze > 0) return;

  const b = game.bot,
    p = game.p1,
    now = Date.now();

  const getRemCD = (id) => Math.max(0, ((b.cds[id] || 0) - now) / 1000);
  const isReady = (id) => {
    const s = SKILLS.find((x) => x.id === id);
    return s && b.mana >= s.cost && now >= (b.cds[id] || 0);
  };

  let targetSkill = null,
    currentCD = 0;

  // --- 1. LOGIKA ANTISIPASI ULTIMATE PLAYER (SHIELD LOGIC) ---
  // Jika HP Bot < 50, dan Player punya mana cukup untuk Ulti (>55)
  if (b.hp < 50 && p.mana >= 55) {
    const sHeal = SKILLS.find(x => x.id === "heal");
    const sVamp = SKILLS.find(x => x.id === "vampire");
    
    const cannotHeal = (!isReady("heal") && getRemCD("heal") > 4.8) || (sHeal && b.mana < sHeal.cost);
    const cannotVamp = (!isReady("vampire") && getRemCD("vampire") > 4.8) || (sVamp && b.mana < sVamp.cost);

    // Jika bot tidak bisa memulihkan diri dengan cepat, pilih Shield untuk bertahan
    if (cannotHeal && cannotVamp) {
      if (isReady("shield")) {
        targetSkill = "shield";
      } else if (getRemCD("shield") < 4.8) {
        targetSkill = "shield";
        currentCD = getRemCD("shield");
      }
    }
  }

  // --- 2. OFFENSIVE: FINISHING BLOW (P1 HP < 50) ---
  if (!targetSkill && p.hp < 50) {
    const playerIsSafe = p.shield > 0 || p.isShielded;
    if (!playerIsSafe) {
      let cdU = getRemCD("ulti");
      const sUlti = SKILLS.find(x => x.id === "ulti");
      if (b.mana >= (sUlti ? sUlti.cost : 0)) {
        if (cdU < 4.8) {
          targetSkill = "ulti";
          currentCD = cdU;
          if (Math.random() > 0.7 && cdU === 0) log("JOVITA: 'Sembunyi saja selagi bisa, ajalmu sebentar lagi...'");
        }
      }
    } else {
      if (isReady("burning")) targetSkill = "burning";
    }
  }

  // --- 3. SUSTAIN & RECOVERY (BOT HP < 70) ---
  if (!targetSkill && b.hp < 70) {
    const skillsToTry = ["super_heal", "heal", "vampire", "super_punch"];
    for (let id of skillsToTry) {
      let cd = getRemCD(id);
      const s = SKILLS.find(x => x.id === id);
      if (s && b.mana >= s.cost && cd < 4.8) {
        targetSkill = id;
        currentCD = cd;
        if (id === "super_heal" && cd === 0) b.afterSuperHeal = true;
        break;
      }
    }
  }

  // --- 4. COUNTER SHIELD & DEBUFF ---
  if (!targetSkill && (p.shield > 0 || p.isShielded)) {
    if (isReady("freeze")) targetSkill = "freeze";
    else if (getRemCD("burning") < 4.8) {
      targetSkill = "burning";
      currentCD = getRemCD("burning");
    }
  }

  // --- 5. AGGRESSIVE STATE (HIGH HP) ---
  if (!targetSkill && b.hp > 80) {
    const priority = ["burning", "super_punch", "vampire", "ulti"];
    for (let id of priority) {
      if (isReady(id)) {
        targetSkill = id;
        break;
      }
    }
  }

  // --- 6. EMERGENCY HEAL (LOW HP) ---
  if (!targetSkill && b.hp < 35) {
    if (getRemCD("super_heal") < 4.7 && b.mana >= 10) {
      targetSkill = "super_heal";
      currentCD = getRemCD("super_heal");
    } else if (isReady("heal")) targetSkill = "heal";
  }

  // --- 7. DEFAULT STRIKE ---
  if (!targetSkill) {
    targetSkill = "strike";
    currentCD = getRemCD("strike");
  }

  // --- EXECUTION ENGINE ---
  const execute = () => {
    if (game.turn !== "bot" || !game.active) return;
    const s = SKILLS.find((x) => x.id === targetSkill);
    if (s && b.mana >= s.cost && Date.now() >= (b.cds[targetSkill] || 0)) {
      useSkill(targetSkill, "bot");
    } else {
      useSkill("strike", "bot");
    }
  };

  if (currentCD === 0) {
    execute();
  } else if (currentCD < 4.7) {
    setTimeout(execute, currentCD * 1000 + 100);
  } else {
    targetSkill = "strike";
    setTimeout(execute, getRemCD("strike") * 1000 + 100);
  }
}