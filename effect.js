/* ---------- VFX HELPERS ---------- */
      function createHealParticle(pid) {
        const card = document.getElementById(`${pid}-card`);
        const rect = card.getBoundingClientRect();
        const p = document.createElement("div");
        p.className = "heal-particle";
        p.innerText = "+";
        p.style.left = rect.left + Math.random() * rect.width + "px";
        p.style.top = rect.top + Math.random() * (rect.height / 2) + "px";
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1000);
      }

      function createStrikeVisual(targetPid) {
        const card = document.getElementById(`${targetPid}-card`);
        const arena = document.getElementById("arena");
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const flash = document.createElement("div");
        flash.className = "hit-flash";
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
        arena.classList.add("heavy-shake");
        setTimeout(() => arena.classList.remove("heavy-shake"), 400);
        const strike = document.createElement("div");
        strike.className = "strike-effect";
        strike.style.left = centerX - 100 + "px";
        strike.style.top = centerY - 17 + "px";
        strike.style.setProperty("--rot", `${Math.random() * 360}deg`);
        document.body.appendChild(strike);
        setTimeout(() => strike.remove(), 300);
        for (let i = 0; i < 12; i++) {
          const spark = document.createElement("div");
          spark.className = "strike-spark";
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
        const sCard = document.getElementById(`${sourcePid}-card`);
        const tCard = document.getElementById(`${targetPid}-card`);
        const sRect = sCard.getBoundingClientRect();
        const tRect = tCard.getBoundingClientRect();
        const dim = document.createElement("div");
        dim.className = "vamp-dim";
        document.body.appendChild(dim);
        setTimeout(() => dim.remove(), 1000);
        sCard.classList.add("vampire-active");
        setTimeout(() => sCard.classList.remove("vampire-active"), 1000);
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            const orb = document.createElement("div");
            orb.className = "vamp-orb";
            const startX =
              tRect.left + tRect.width / 2 + (Math.random() - 0.5) * 50;
            const startY =
              tRect.top + tRect.height / 2 + (Math.random() - 0.5) * 50;
            const dx = sRect.left + sRect.width / 2 - startX;
            const dy = sRect.top + sRect.height / 2 - startY;
            orb.style.left = startX + "px";
            orb.style.top = startY + "px";
            orb.style.setProperty("--dx", `${dx}px`);
            orb.style.setProperty("--dy", `${dy}px`);
            document.body.appendChild(orb);
            setTimeout(() => orb.remove(), 800);
          }, i * 100);
        }
      }

      function createSuperPunchVisual(targetPid) {
        const card = document.getElementById(`${targetPid}-card`);
        const arena = document.getElementById("arena");
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const txt = document.createElement("div");
        txt.className = "punch-text";
        txt.innerText = "SUPER PUNCH!";
        txt.style.left = centerX - 80 + Math.random() * 40 + "px";
        txt.style.top = centerY - 50 + "px";
        document.body.appendChild(txt);
        setTimeout(() => txt.remove(), 800);
        const flash = document.createElement("div");
        flash.className = "hit-flash";
        flash.style.background = "rgba(251,191,36,0.35)";
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 150);
        arena.classList.add("heavy-shake");
        setTimeout(() => arena.classList.remove("heavy-shake"), 500);
        const impact = document.createElement("div");
        impact.style.cssText = `position:fixed;left:${centerX - 50}px;top:${centerY - 50}px;width:100px;height:100px;border:4px solid #fbbf24;border-radius:50%;animation:pulse-out 0.3s ease-out forwards;pointer-events:none;z-index:9999;`;
        document.body.appendChild(impact);
        setTimeout(() => impact.remove(), 300);
        for (let i = 0; i < 20; i++) {
          const spark = document.createElement("div");
          spark.className = "strike-spark";
          spark.style.background = "#fbbf24";
          spark.style.boxShadow = "0 0 8px #fbbf24";
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
        const flash = document.createElement("div");
        flash.className = "hit-flash";
        flash.style.background = "rgba(74,222,128,0.25)";
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 250);
        const symbols = ["+", "💖", "✨", "🌿"];
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const p = document.createElement("div");
            p.className = "super-heal-particle";
            p.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            const angle = Math.random() * Math.PI * 2;
            const dist = 100 + Math.random() * 150;
            p.style.left = centerX + "px";
            p.style.top = centerY + "px";
            p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
            p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
            p.style.setProperty("--rot", `${(Math.random() - 0.5) * 360}deg`);
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1200);
          }, i * 30);
        }
      }