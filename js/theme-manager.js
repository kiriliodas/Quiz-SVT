// Gestion du thème et des paramètres

// Fonction pour basculer le thème
function toggleTheme() {
  const isDarkTheme =
    document.documentElement.getAttribute("data-theme") === "dark";

  if (isDarkTheme) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    if (themeToggle) themeToggle.checked = false;
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    if (themeToggle) themeToggle.checked = true;
  }
}

// Fonction pour mettre à jour la couleur du thème et le gradient
function updateThemeColor(color) {
  // Mettre à jour les variables CSS
  document.documentElement.style.setProperty("--user-primary-color", color);
  document.documentElement.style.setProperty("--primary-color", color);

  // Mettre à jour le gradient de l'en-tête
  const quizHeader = document.querySelector(".quiz-header");
  if (quizHeader) {
    quizHeader.style.background = `linear-gradient(135deg, ${color}, ${getLighterColor(
      color
    )})`;
  }
}

// Fonction pour obtenir une version plus claire d'une couleur
function getLighterColor(hexColor) {
  // Convertir la couleur hex en RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Éclaircir la couleur
  r = Math.min(255, r + 30);
  g = Math.min(255, g + 30);
  b = Math.min(255, b + 30);

  // Convertir en hex
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Fonction pour charger les préférences utilisateur
function loadUserPreferences() {
  // Charger le thème
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) themeToggle.checked = true;
  }

  // Charger la couleur principale
  const primaryColor = localStorage.getItem("primaryColor");
  if (primaryColor) {
    // Mettre à jour la couleur et le gradient
    updateThemeColor(primaryColor);

    // Marquer l'option de couleur correspondante comme active
    const colorOptions = document.querySelectorAll(".color-option");
    colorOptions.forEach((option) => {
      if (option.dataset.color === primaryColor) {
        option.classList.add("active");
      }
    });
  } else {
    // Par défaut, marquer la première option comme active
    const colorOptions = document.querySelectorAll(".color-option");
    if (colorOptions.length > 0) {
      colorOptions[0].classList.add("active");
      // Appliquer la couleur par défaut
      updateThemeColor("#6c63ff");
    }
  }
}

// Initialiser les gestionnaires d'événements pour le thème
function initThemeManager() {
  const settingsBtn = document.getElementById("settings-btn");
  const settingsModal = document.getElementById("settings-modal");
  const closeSettingsBtn = document.getElementById("close-settings");
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const colorOptions = document.querySelectorAll(".color-option");

  // Ouvrir/fermer la modal des paramètres
  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("active");
    });
  }

  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener("click", () => {
      settingsModal.classList.remove("active");
    });
  }

  // Fermer la modal en cliquant en dehors
  if (settingsModal) {
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.remove("active");
      }
    });
  }

  // Changer le thème avec le bouton soleil/lune
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Changer le thème avec le switch dans les paramètres
  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Changer la couleur principale
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Supprimer la classe active de toutes les options
      colorOptions.forEach((opt) => opt.classList.remove("active"));

      // Ajouter la classe active à l'option sélectionnée
      option.classList.add("active");

      // Récupérer la couleur sélectionnée
      const color = option.dataset.color;

      // Appliquer la couleur et mettre à jour le gradient
      updateThemeColor(color);

      // Sauvegarder la préférence
      localStorage.setItem("primaryColor", color);
    });
  });

  // Charger les préférences utilisateur
  loadUserPreferences();
}

export { 
  toggleTheme, 
  updateThemeColor, 
  getLighterColor, 
  loadUserPreferences, 
  initThemeManager 
};