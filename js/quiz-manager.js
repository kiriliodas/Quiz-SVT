// Gestion du quiz
import quizData from '../data/quiz-data.js';

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let hintsUsed = 0;

// Fonction pour initialiser le quiz
function initQuiz() {
  // Afficher la première question
  showQuestion(currentQuestion);
  
  // Initialiser les gestionnaires d'événements
  const validateBtn = document.getElementById("validate-btn");
  const nextBtn = document.getElementById("next-btn");
  const hintBtn = document.getElementById("hint-btn");
  
  if (validateBtn) {
    validateBtn.addEventListener("click", validateAnswer);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", nextQuestion);
  }
  
  if (hintBtn) {
    hintBtn.addEventListener("click", showHint);
  }
  
  // Ajouter des écouteurs d'événements aux options
  setupOptionListeners();
}

// Fonction pour afficher une question
function showQuestion(index) {
  if (index >= quizData.length) {
    showResults();
    return;
  }
  
  const questionData = quizData[index];
  const questionText = document.querySelector(".question-text h2");
  const optionsContainer = document.querySelector(".options-container");
  const currentQuestionSpan = document.getElementById("current-question");
  const totalQuestionsSpan = document.querySelector(".total-questions");
  const progressBar = document.querySelector(".progress");
  
  // Mettre à jour le texte de la question
  if (questionText) {
    questionText.textContent = questionData.question;
  }
  
  // Mettre à jour le numéro de la question
  if (currentQuestionSpan) {
    currentQuestionSpan.textContent = index + 1;
  }
  
  // Mettre à jour le nombre total de questions
  if (totalQuestionsSpan) {
    totalQuestionsSpan.textContent = `/${quizData.length}`;
  }
  
  // Mettre à jour la barre de progression
  if (progressBar) {
    const progressPercentage = ((index + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  // Générer les options
  if (optionsContainer) {
    optionsContainer.innerHTML = "";
    
    questionData.options.forEach((option, optionIndex) => {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.dataset.correct = option.correct;
      
      const optionLetter = document.createElement("span");
      optionLetter.className = "option-letter";
      optionLetter.textContent = String.fromCharCode(65 + optionIndex); // A, B, C, D...
      
      const optionText = document.createElement("span");
      optionText.className = "option-text";
      optionText.textContent = option.text;
      
      optionElement.appendChild(optionLetter);
      optionElement.appendChild(optionText);
      optionsContainer.appendChild(optionElement);
    });
    
    // Réinitialiser les écouteurs d'événements pour les nouvelles options
    setupOptionListeners();
  }
  
  // Réinitialiser l'état de la question
  selectedOption = null;
  resetFeedback();
  
  // Cacher le bouton suivant et afficher le bouton de validation
  const validateBtn = document.getElementById("validate-btn");
  const nextBtn = document.getElementById("next-btn");
  
  if (validateBtn) validateBtn.classList.remove("hidden");
  if (nextBtn) nextBtn.classList.add("hidden");
}

// Fonction pour configurer les écouteurs d'événements des options
function setupOptionListeners() {
  const options = document.querySelectorAll(".option");
  
  options.forEach((option) => {
    option.addEventListener("click", () => {
      // Supprimer la classe selected de toutes les options
      options.forEach((opt) => opt.classList.remove("selected"));
      
      // Ajouter la classe selected à l'option cliquée
      option.classList.add("selected");
      
      // Mettre à jour l'option sélectionnée
      selectedOption = option;
    });
  });
}

// Fonction pour valider la réponse
function validateAnswer() {
  if (!selectedOption) {
    // Aucune option sélectionnée
    showToast("Veuillez sélectionner une réponse", "warning");
    return;
  }
  
  const isCorrect = selectedOption.dataset.correct === "true";
  const feedbackContainer = document.querySelector(".feedback-container");
  const correctFeedback = document.querySelector(".feedback.correct");
  const incorrectFeedback = document.querySelector(".feedback.incorrect");
  const validateBtn = document.getElementById("validate-btn");
  const nextBtn = document.getElementById("next-btn");
  
  // Afficher le feedback approprié
  if (feedbackContainer) feedbackContainer.classList.remove("hidden");
  
  if (isCorrect) {
    // Réponse correcte
    selectedOption.classList.add("correct");
    if (correctFeedback) {
      correctFeedback.classList.remove("hidden");
      correctFeedback.querySelector("p").textContent = quizData[currentQuestion].feedback.correct;
    }
    
    // Ajouter des points
    addPoints(10);
  } else {
    // Réponse incorrecte
    selectedOption.classList.add("incorrect");
    if (incorrectFeedback) {
      incorrectFeedback.classList.remove("hidden");
      incorrectFeedback.querySelector("p").textContent = quizData[currentQuestion].feedback.incorrect;
    }
    
    // Montrer la bonne réponse
    const correctOption = document.querySelector('.option[data-correct="true"]');
    if (correctOption) correctOption.classList.add("correct");
  }
  
  // Désactiver les options
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.style.pointerEvents = "none";
  });
  
  // Cacher le bouton de validation et afficher le bouton suivant
  if (validateBtn) validateBtn.classList.add("hidden");
  if (nextBtn) nextBtn.classList.remove("hidden");
}

// Fonction pour passer à la question suivante
function nextQuestion() {
  currentQuestion++;
  
  if (currentQuestion < quizData.length) {
    showQuestion(currentQuestion);
  } else {
    showResults();
  }
}

// Fonction pour afficher les résultats
function showResults() {
  const quizContainer = document.querySelector(".quiz-container");
  
  if (quizContainer) {
    quizContainer.innerHTML = `
      <div class="quiz-header">
        <h1><i class="fas fa-trophy"></i> Résultats</h1>
        <p class="subtitle">Votre score final</p>
      </div>
      <div class="results-card">
        <div class="score-container">
          <div class="score-circle">
            <span class="score-value">${score}</span>
            <span class="score-label">points</span>
          </div>
        </div>
        <div class="results-details">
          <p>Vous avez terminé le quiz sur le système immunitaire!</p>
          <p>Vous avez obtenu <strong>${score} points</strong>.</p>
          <p>Indices utilisés: <strong>${hintsUsed}</strong></p>
        </div>
        <div class="action-buttons">
          <button id="restart-btn" class="btn">Recommencer le quiz</button>
        </div>
      </div>
    `;
    
    // Ajouter un écouteur d'événement pour le bouton de redémarrage
    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        // Réinitialiser le quiz
        currentQuestion = 0;
        score = 0;
        hintsUsed = 0;
        
        // Recharger la page
        window.location.reload();
      });
    }
  }
}

// Fonction pour afficher un indice
function showHint() {
  const hintCost = 5;
  
  if (score < hintCost) {
    showToast("Vous n'avez pas assez de points pour utiliser un indice", "error");
    return;
  }
  
  // Trouver la bonne réponse
  const correctOption = document.querySelector('.option[data-correct="true"]');
  
  if (correctOption) {
    // Mettre en évidence la bonne réponse
    correctOption.classList.add("hint");
    
    // Déduire des points
    addPoints(-hintCost);
    
    // Incrémenter le compteur d'indices utilisés
    hintsUsed++;
    
    // Désactiver le bouton d'indice
    const hintBtn = document.getElementById("hint-btn");
    if (hintBtn) hintBtn.disabled = true;
  }
}

// Fonction pour ajouter des points
function addPoints(points) {
  score += points;
  const pointsValue = document.getElementById("points-value");
  
  if (pointsValue) {
    pointsValue.textContent = score;
    
    // Animation pour les points
    pointsValue.classList.add("points-added");
    setTimeout(() => {
      pointsValue.classList.remove("points-added");
    }, 500);
  }
}

// Fonction pour réinitialiser le feedback
function resetFeedback() {
  const feedbackContainer = document.querySelector(".feedback-container");
  const correctFeedback = document.querySelector(".feedback.correct");
  const incorrectFeedback = document.querySelector(".feedback.incorrect");
  
  if (feedbackContainer) feedbackContainer.classList.add("hidden");
  if (correctFeedback) correctFeedback.classList.add("hidden");
  if (incorrectFeedback) incorrectFeedback.classList.add("hidden");
}

// Fonction pour afficher un toast
function showToast(message, type = "info") {
  // Créer l'élément toast s'il n'existe pas déjà
  let toast = document.querySelector(".toast");
  
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  
  // Définir le message et le type
  toast.textContent = message;
  toast.className = `toast ${type}`;
  
  // Afficher le toast
  toast.classList.add("show");
  
  // Masquer le toast après 3 secondes
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

export { initQuiz };