const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const label = document.querySelector(".toggle-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const daysGrid = document.querySelector(".days-grid");
const dayDialog = document.querySelector(".day-dialog");
const racketSection = document.querySelector(".scroll-racket");
const featureSections = document.querySelectorAll(".scroll-feature");

const routines = [
  {
    day: "Pirmdiena",
    intro: "Dienas plāns no rīta līdz vakaram.",
    schedule: [
      ["07:00", "Pamostos, brokastoju"],
      ["08:00", "Dodos uz trolejbusu"],
      ["08:30 - 14:00", "Universitātē lekcijas"],
      ["14:10", "Dodos atpakaļ mājās"],
      ["17:00", "Vakariņas sāku taisīt"],
      ["19:30", "Sazvanos ar draugu un spēlēju spēli"],
      ["21:00", "Skatos seriālu"],
      ["23:00", "Gulēt"]
    ]
  },
  {
    day: "Otrdiena",
    intro: "Dienas plāns no rīta līdz vakaram.",
    schedule: [
      ["08:30", "Pamostos, brokastoju"],
      ["09:30", "Sāku mācīties"],
      ["12:00", "Pusdienas"],
      ["14:00", "Dodos uz trolejbusu"],
      ["16:10", "Dodos no universitātes uz mājām"],
      ["17:30", "Vakariņas"],
      ["23:00", "Gulēt"]
    ]
  },
  {
    day: "Trešdiena",
    intro: "Dienas plāns no rīta līdz vakaram.",
    schedule: [
      ["08:00", "Pamostos"],
      ["08:30", "Pieslēdzos tīmekļa dizaina lekcijai"],
      ["10:30", "Programmēju vai mācos"],
      ["12:00", "Pusdienas"],
      ["16:30", "Pieslēdzos attālinātai lekcijai"],
      ["17:00", "Vakariņas"],
      ["19:00", "Pastaiga pa āru"],
      ["23:00", "Gulēt"]
    ]
  },
  {
    day: "Ceturtdiena",
    intro: "Dienas plāns no rīta līdz vakaram.",
    schedule: [
      ["08:30", "Pamostos, brokastoju"],
      ["10:00", "Sāku mācīties vai programmēju"],
      ["12:00", "Aizeju uz veikalu"],
      ["13:00", "Pusdienas"],
      ["16:30", "Pievienojos attālinātai lekcijai"],
      ["18:00", "Vakariņas"],
      ["20:00", "Paskatos seriālu vai ko citu daru"],
      ["23:00", "Gulēt"]
    ]
  },
  {
    day: "Piektdiena",
    intro: "Dienas plāns no rīta līdz vakaram.",
    schedule: [
      ["09:00", "Pamostos"],
      ["10:00", "Mācos"],
      ["12:00", "Pusdienas"],
      ["13:00", "Turpinu mācīties"],
      ["14:00 - 16:00", "Seminārs attālināti"],
      ["17:00", "Vakariņas"],
      ["18:30", "Pastaiga pa āru"],
      ["20:00", "Atpūta"],
      ["00:00", "Gulēt"]
    ]
  }
];

function applyTheme(theme) {
  const darkMode = theme === "dark";

  root.dataset.theme = theme;
  toggle.setAttribute("aria-pressed", String(darkMode));
  toggle.setAttribute("aria-label", `Switch to ${darkMode ? "light" : "dark"} mode`);
  label.textContent = darkMode ? "Gaišs" : "Tumšs";
  themeColor.setAttribute("content", darkMode ? "#090d0b" : "#ffffff");
}

applyTheme(root.dataset.theme);

toggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem("form-theme", nextTheme);
});

function getSectionProgress(section) {
  const rect = section.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const start = viewportHeight * 0.94;
  const end = viewportHeight * 0.48;

  return Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

if (racketSection) {
  const racketArt = racketSection.querySelector(".racket-art");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  const updateRacketProgress = () => {
    if (reducedMotion) {
      racketSection.classList.add("is-visible");
      racketArt?.style.setProperty("--racket-progress", 1);
      return;
    }

    const progress = easeOutCubic(getSectionProgress(racketSection));

    racketArt?.style.setProperty("--racket-progress", progress.toFixed(3));
    racketSection.classList.toggle("is-visible", progress > 0.12);
    ticking = false;
  };

  const requestRacketUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateRacketProgress);
    }
  };

  updateRacketProgress();
  window.addEventListener("scroll", requestRacketUpdate, { passive: true });
  window.addEventListener("resize", requestRacketUpdate);
}

if (featureSections.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;

  const updateFeatureSections = () => {
    featureSections.forEach((section) => {
      const art = section.querySelector("[data-scroll-art]");

      if (reducedMotion) {
        section.classList.add("is-visible");
        art?.style.setProperty("--feature-progress", 1);
        return;
      }

      const progress = easeOutCubic(getSectionProgress(section));

      art?.style.setProperty("--feature-progress", progress.toFixed(3));
      section.classList.toggle("is-visible", progress > 0.12);
    });

    ticking = false;
  };

  const requestFeatureUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateFeatureSections);
    }
  };

  updateFeatureSections();
  window.addEventListener("scroll", requestFeatureUpdate, { passive: true });
  window.addEventListener("resize", requestFeatureUpdate);
}

function createTimeline() {
  return `
    <span class="time-mark time-one">07:00</span>
    <span class="time-mark time-two">11:00</span>
    <span class="time-mark time-three">16:00</span>
    <span class="time-mark time-four">20:00</span>
    <span class="timeline-line"></span>
    <span class="timeline-node node-one"></span>
    <span class="timeline-node node-two"></span>
    <span class="timeline-node node-three"></span>
    <span class="timeline-node node-four"></span>
    <span class="timeline-path path-one"></span>
    <span class="timeline-path path-two"></span>
    <span class="timeline-path path-three"></span>
  `;
}

function openDay(index) {
  const routine = routines[index];

  document.querySelector("#dialog-number").textContent = `Day ${String(index + 1).padStart(2, "0")}`;
  document.querySelector("#dialog-title").textContent = routine.day;
  document.querySelector("#dialog-intro").textContent = routine.intro;
  document.querySelector("#routine-list").innerHTML = `
    <ol class="day-schedule">
      ${routine.schedule.map(([time, activity]) => `
        <li>
          <span class="schedule-time">${time}</span>
          <span class="schedule-activity">${activity}</span>
        </li>
      `).join("")}
    </ol>
  `;
  dayDialog.showModal();
}

if (daysGrid && dayDialog) {
  daysGrid.innerHTML = routines.map((routine, index) => `
    <button class="day-card" type="button" data-index="${index}" aria-label="Atvērt dienu: ${routine.day}">
      <span class="card-visual" aria-hidden="true">
        <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
        ${createTimeline()}
      </span>
      <span class="card-body">
        <span class="card-day">${routine.day}</span>
        <span class="card-labels"><span>Dienas plāns</span><span>Laiki</span></span>
        <span class="open-day">Atvērt</span>
      </span>
    </button>
  `).join("");

  daysGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".day-card");

    if (card) {
      openDay(Number(card.dataset.index));
    }
  });

  document.querySelector(".dialog-close").addEventListener("click", () => {
    dayDialog.close();
  });

  dayDialog.addEventListener("click", (event) => {
    const bounds = dayDialog.getBoundingClientRect();
    const withinDialog = event.clientX >= bounds.left
      && event.clientX <= bounds.right
      && event.clientY >= bounds.top
      && event.clientY <= bounds.bottom;

    if (!withinDialog) {
      dayDialog.close();
    }
  });
}
