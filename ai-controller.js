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