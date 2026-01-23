document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initReveal();
  initPrompts();
  initContact();
});

/* ================= THEME ================= */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* ================= REVEAL ================= */
function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // ✅ performance fix
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ================= PROMPTS ================= */
function initPrompts() {
  const grid = document.getElementById("prompts-grid");
  const searchBar = document.getElementById("search-bar");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!grid) return;

  const prompts = [
    { text: "Generate a photorealistic image of a serene mountain lake at sunset.", category: "generate" },
    { text: "Enhance this image with cinematic lighting and sharp details.", category: "enhance" },
    { text: "Create a 4K cinematic shot of a futuristic city at night.", category: "cinematic" },

  { text: "Generate a photorealistic image of a serene mountain lake at sunset with perfect reflections and cinematic lighting.", category: "generate" },
  { text: "Enhance this image by increasing sharpness, clarity, and natural colors without losing realism.", category: "enhance" },
  { text: "Create a 4K cinematic scene of a lone warrior standing on a cliff with dramatic clouds and wind effects.", category: "cinematic" },

  { text: "Generate an ultra-realistic portrait of a young woman with soft studio lighting and natural skin texture.", category: "generate" },
  { text: "Enhance this portrait by improving skin details, eye sharpness, and balanced lighting.", category: "enhance" },
  { text: "Create a cinematic close-up shot of a face with shallow depth of field and dramatic shadows.", category: "cinematic" },

  { text: "Generate a high-detail image of a futuristic city at night with neon lights and reflections.", category: "generate" },
  { text: "Enhance this cityscape by adding rain effects, reflections, and sharper building textures.", category: "enhance" },
  { text: "Create a cinematic aerial shot of a cyberpunk city in 4K ultra-realistic style.", category: "cinematic" },

  { text: "Generate a realistic image of a dense forest with sunlight rays passing through trees.", category: "generate" },
  { text: "Enhance this forest image by adding depth, fog, and realistic shadows.", category: "enhance" },
  { text: "Create a cinematic jungle scene with mist, dramatic lighting, and wide-angle view.", category: "cinematic" },

  { text: "Generate an ultra-realistic image of a luxury sports car on a mountain road.", category: "generate" },
  { text: "Enhance this car image by adding reflections, sharper edges, and realistic lighting.", category: "enhance" },
  { text: "Create a cinematic car commercial shot with motion blur and dramatic sunset lighting.", category: "cinematic" },

  { text: "Generate a realistic beach scene with turquoise water, golden sand, and palm trees.", category: "generate" },
  { text: "Enhance this beach image with better color grading and realistic water reflections.", category: "enhance" },
  { text: "Create a cinematic tropical island shot using drone-style perspective.", category: "cinematic" },

  { text: "Generate an ultra-realistic image of a modern gaming room with RGB lighting.", category: "generate" },
  { text: "Enhance this room image by balancing colors and improving light glow effects.", category: "enhance" },
  { text: "Create a cinematic gaming setup shot with moody lighting and depth.", category: "cinematic" },

  { text: "Generate a realistic image of a snow-covered mountain peak under blue sky.", category: "generate" },
  { text: "Enhance this snow scene by improving contrast and ice texture details.", category: "enhance" },
  { text: "Create a cinematic alpine scene with dramatic clouds and wide framing.", category: "cinematic" },

  { text: "Generate an ultra-realistic image of a lion in the wild with sharp fur details.", category: "generate" },
  { text: "Enhance this wildlife image by improving fur texture and eye sharpness.", category: "enhance" },
  { text: "Create a cinematic wildlife shot with shallow depth and dramatic background.", category: "cinematic" },

  { text: "Generate a realistic image of a street at night with neon signs and reflections.", category: "generate" },
  { text: "Enhance this night street image with better highlights and reduced noise.", category: "enhance" },
  { text: "Create a cinematic cyber-street shot inspired by movie-style lighting.", category: "cinematic" },

  { text: "Generate an ultra-realistic image of a professional photographer studio setup.", category: "generate" },
  { text: "Enhance this studio image by improving lighting balance and shadows.", category: "enhance" },
  { text: "Create a cinematic behind-the-scenes studio shot with depth and contrast.", category: "cinematic" },

  { text: "Generate a realistic image of a spaceship orbiting Earth with detailed textures.", category: "generate" },
  { text: "Enhance this space image by sharpening stars and improving planet glow.", category: "enhance" },
  { text: "Create a cinematic space scene with dramatic lighting and ultra-wide view.", category: "cinematic" },

  { text: "Generate an ultra-realistic image of a medieval castle on a hill.", category: "generate" },
  { text: "Enhance this castle image by adding fog, depth, and sharper stone textures.", category: "enhance" },
  { text: "Create a cinematic fantasy castle shot with epic lighting and clouds.", category: "cinematic" },

  { text: "Generate a realistic image of a luxury watch with macro-level detail.", category: "generate" },
  { text: "Enhance this product image by improving reflections and material realism.", category: "enhance" },
  { text: "Create a cinematic product shot with dramatic shadows and spotlight lighting.", category: "cinematic" }
];

  const ALL_PROMPTS = [...prompts]; // ✅ blank issue fix

  function render(list) {
    grid.innerHTML = "";
    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "prompt-card";
      card.innerHTML = `
        <p>${p.text}</p>
        <button class="copy-btn">Copy Prompt</button>
      `;

      card.querySelector(".copy-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(p.text);
      });

      grid.appendChild(card);
    });
  }

  requestAnimationFrame(() => {
  render(ALL_PROMPTS);
});

if (searchBar) {
  searchBar.addEventListener("input", () => {
    const q = searchBar.value.toLowerCase();
    render(
      ALL_PROMPTS.filter(p =>
        p.text.toLowerCase().includes(q)
      )
    );
  });
}

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.category;
      render(cat === "all"
        ? ALL_PROMPTS
        : ALL_PROMPTS.filter(p => p.category === cat)
      );
    });
  });
}

/* ================= CONTACT ================= */
function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
  });
}