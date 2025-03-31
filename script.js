document.addEventListener('DOMContentLoaded', () => {
    // Gestion du thème et des paramètres
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Charger les préférences utilisateur
    loadUserPreferences();
    
    // Ouvrir/fermer la modal des paramètres
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });
    
    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
    
    // Fermer la modal en cliquant en dehors
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
    
    // Fonction pour basculer le thème
    function toggleTheme() {
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDarkTheme) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (themeToggle) themeToggle.checked = false;
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeToggle) themeToggle.checked = true;
        }
    }
    
    // Changer le thème avec le bouton soleil/lune
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Changer le thème avec le switch dans les paramètres
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Changer la couleur principale
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Supprimer la classe active de toutes les options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Ajouter la classe active à l'option sélectionnée
            option.classList.add('active');
            
            // Récupérer la couleur sélectionnée
            const color = option.dataset.color;
            
            // Appliquer la couleur et mettre à jour le gradient
            updateThemeColor(color);
            
            // Sauvegarder la préférence
            localStorage.setItem('primaryColor', color);
        });
    });
    
    // Fonction pour mettre à jour la couleur du thème et le gradient
    function updateThemeColor(color) {
        // Mettre à jour les variables CSS
        document.documentElement.style.setProperty('--user-primary-color', color);
        document.documentElement.style.setProperty('--primary-color', color);
        
        // Mettre à jour le gradient de l'en-tête
        const quizHeader = document.querySelector('.quiz-header');
        if (quizHeader) {
            quizHeader.style.background = `linear-gradient(135deg, ${color}, ${getLighterColor(color)})`;
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
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    // Charger les préférences utilisateur
    function loadUserPreferences() {
        // Charger le thème
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
        
        // Charger la couleur principale
        const primaryColor = localStorage.getItem('primaryColor');
        if (primaryColor) {
            // Mettre à jour la couleur et le gradient
            updateThemeColor(primaryColor);
            
            // Marquer l'option de couleur correspondante comme active
            colorOptions.forEach(option => {
                if (option.dataset.color === primaryColor) {
                    option.classList.add('active');
                }
            });
        } else {
            // Par défaut, marquer la première option comme active
            colorOptions[0].classList.add('active');
            // Appliquer la couleur par défaut
            updateThemeColor('#6c63ff');
        }
    }
    // Données du quiz
    const quizData = [
        {
            question: "Quel type de cellule est responsable de la production d'anticorps dans le système immunitaire humain?",
            options: [
                { text: "Les macrophages", correct: false },
                { text: "Les lymphocytes B", correct: true },
                { text: "Les neutrophiles", correct: false },
                { text: "Les lymphocytes T cytotoxiques", correct: false }
            ],
            feedback: {
                correct: "Bravo! Les lymphocytes B sont effectivement responsables de la production d'anticorps.",
                incorrect: "Incorrect. Ce sont les lymphocytes B qui produisent les anticorps dans le système immunitaire."
            }
        },
        {
            question: "Quelle est la principale fonction des anticorps dans le système immunitaire?",
            options: [
                { text: "Détruire directement les pathogènes par phagocytose", correct: false },
                { text: "Activer les lymphocytes T", correct: false },
                { text: "Se lier aux antigènes pour les neutraliser ou faciliter leur élimination", correct: true },
                { text: "Produire des cytokines inflammatoires", correct: false }
            ],
            feedback: {
                correct: "Excellent! Les anticorps se lient spécifiquement aux antigènes pour les neutraliser ou faciliter leur élimination par d'autres cellules immunitaires.",
                incorrect: "Incorrect. Les anticorps se lient spécifiquement aux antigènes pour les neutraliser ou faciliter leur élimination par d'autres cellules immunitaires."
            }
        },
        {
            question: "Quel organe est considéré comme le site principal de maturation des lymphocytes T?",
            options: [
                { text: "La rate", correct: false },
                { text: "Le thymus", correct: true },
                { text: "La moelle osseuse", correct: false },
                { text: "Les ganglions lymphatiques", correct: false }
            ],
            feedback: {
                correct: "Correct! Le thymus est l'organe où les lymphocytes T immatures migrent pour se développer et apprendre à distinguer le soi du non-soi.",
                incorrect: "Incorrect. C'est le thymus qui est le site principal de maturation des lymphocytes T."
            }
        },
        {
            question: "Qu'est-ce que la phagocytose?",
            options: [
                { text: "Un processus par lequel certaines cellules immunitaires englobent et digèrent des particules étrangères", correct: true },
                { text: "La production d'anticorps par les lymphocytes B", correct: false },
                { text: "La division des cellules immunitaires", correct: false },
                { text: "La libération d'histamine lors d'une réaction allergique", correct: false }
            ],
            feedback: {
                correct: "Parfait! La phagocytose est le processus par lequel des cellules comme les macrophages et les neutrophiles englobent et digèrent des particules étrangères.",
                incorrect: "Incorrect. La phagocytose est le processus par lequel des cellules comme les macrophages englobent et digèrent des particules étrangères."
            }
        },
        {
            question: "Quelle est la différence principale entre l'immunité innée et l'immunité adaptative?",
            options: [
                { text: "L'immunité innée est plus rapide mais moins spécifique que l'immunité adaptative", correct: true },
                { text: "L'immunité innée n'existe que chez les mammifères", correct: false },
                { text: "L'immunité adaptative ne nécessite pas de contact préalable avec un pathogène", correct: false },
                { text: "L'immunité innée est acquise après la naissance, contrairement à l'immunité adaptative", correct: false }
            ],
            feedback: {
                correct: "Excellent! L'immunité innée constitue la première ligne de défense, rapide mais peu spécifique, tandis que l'immunité adaptative est plus lente mais très spécifique et possède une mémoire immunitaire.",
                incorrect: "Incorrect. L'immunité innée est rapide mais peu spécifique, tandis que l'immunité adaptative est plus lente mais très spécifique et possède une mémoire immunitaire."
            }
        }
    ];

    // Variables globales
    let currentQuestion = 0;
    let score = 0;
    let points = 0;
    let selectedOption = null;
    const totalQuestions = quizData.length;
    const hintCost = 5; // Coût d'un indice en points

    // Éléments du DOM
    const questionNumberEl = document.getElementById('current-question');
    const questionTextEl = document.querySelector('.question-text h2');
    const optionsContainer = document.querySelector('.options-container');
    const feedbackContainer = document.querySelector('.feedback-container');
    const correctFeedback = document.querySelector('.feedback.correct');
    const incorrectFeedback = document.querySelector('.feedback.incorrect');
    const validateBtn = document.getElementById('validate-btn');
    const nextBtn = document.getElementById('next-btn');
    const hintBtn = document.getElementById('hint-btn');
    const pointsValueEl = document.getElementById('points-value');
    const progressBar = document.querySelector('.progress');
    const totalQuestionsEl = document.querySelector('.total-questions');

    // Initialisation
    function initQuiz() {
        // Mettre à jour le nombre total de questions
        totalQuestionsEl.textContent = `/${totalQuestions}`;
        
        // Réinitialiser les points
        points = 0;
        updatePointsDisplay();
        
        // Charger la première question
        loadQuestion();
        
        // Ajouter les écouteurs d'événements
        validateBtn.addEventListener('click', validateAnswer);
        nextBtn.addEventListener('click', nextQuestion);
        hintBtn.addEventListener('click', useHint);
        
        // Créer les particules d'arrière-plan
        createParticles();
    }
    
    // Mettre à jour l'affichage des points
    function updatePointsDisplay(animate = false) {
        pointsValueEl.textContent = points;
        
        // Activer/désactiver le bouton d'indice en fonction des points disponibles
        if (points >= hintCost) {
            hintBtn.disabled = false;
        } else {
            hintBtn.disabled = true;
        }
        
        // Ajouter une animation lorsque les points sont mis à jour
        if (animate) {
            pointsValueEl.classList.add('points-added');
            setTimeout(() => {
                pointsValueEl.classList.remove('points-added');
            }, 500);
        }
    }

    // Charger une question
    function loadQuestion() {
        // Réinitialiser l'état
        selectedOption = null;
        feedbackContainer.classList.add('hidden');
        correctFeedback.classList.add('hidden');
        incorrectFeedback.classList.add('hidden');
        validateBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        
        // Réinitialiser l'état du bouton d'indice
        if (points >= hintCost) {
            hintBtn.disabled = false;
        } else {
            hintBtn.disabled = true;
        }
        
        // Mettre à jour le numéro de question
        questionNumberEl.textContent = currentQuestion + 1;
        
        // Mettre à jour la barre de progression
        const progressPercentage = ((currentQuestion) / totalQuestions) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Charger la question et les options
        const questionData = quizData[currentQuestion];
        questionTextEl.textContent = questionData.question;
        
        // Générer les options
        optionsContainer.innerHTML = '';
        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.dataset.correct = option.correct;
            optionElement.dataset.index = index;
            
            const letterElement = document.createElement('span');
            letterElement.classList.add('option-letter');
            letterElement.textContent = String.fromCharCode(65 + index); // A, B, C, D
            
            const textElement = document.createElement('span');
            textElement.classList.add('option-text');
            textElement.textContent = option.text;
            
            optionElement.appendChild(letterElement);
            optionElement.appendChild(textElement);
            optionsContainer.appendChild(optionElement);
            
            // Ajouter l'écouteur d'événement pour la sélection
            optionElement.addEventListener('click', () => selectOption(optionElement));
        });
    }

    // Sélectionner une option
    function selectOption(optionElement) {
        // Supprimer la sélection précédente
        const options = document.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        
        // Sélectionner la nouvelle option
        optionElement.classList.add('selected');
        selectedOption = optionElement;
    }
    
    // Utiliser un indice
    function useHint() {
        // Vérifier si l'utilisateur a assez de points
        if (points < hintCost) {
            hintBtn.classList.add('shake');
            setTimeout(() => hintBtn.classList.remove('shake'), 500);
            return;
        }
        
        // Déduire les points
        points -= hintCost;

        // Identifier les mauvaises réponses
        const options = document.querySelectorAll('.option');
        const incorrectOptions = Array.from(options).filter(opt => opt.dataset.correct === 'false');
        
        // Griser une mauvaise réponse au hasard
        if (incorrectOptions.length > 0) {
            // Choisir une mauvaise réponse au hasard
            const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
            const optionToDisable = incorrectOptions[randomIndex];
            
            // Griser cette option complète (cercle et texte)
            optionToDisable.classList.add('disabled');
            const letterElement = optionToDisable.querySelector('.option-letter');
            letterElement.classList.add('grayed-out');
        }

        updatePointsDisplay();
        
        // Désactiver le bouton d'indice pour cette question
        hintBtn.disabled = true;
    }

    // Valider la réponse
    function validateAnswer() {
        if (!selectedOption) {
            // Animation de secousse pour indiquer qu'une sélection est nécessaire
            validateBtn.classList.add('shake');
            setTimeout(() => validateBtn.classList.remove('shake'), 500);
            return;
        }
        
        // Afficher le feedback
        feedbackContainer.classList.remove('hidden');
        
        const isCorrect = selectedOption.dataset.correct === 'true';
        if (isCorrect) {
            // Augmenter le score et les points
            score++;
            points += 10; // Ajouter 10 points pour une bonne réponse
            updatePointsDisplay(true);
            
            correctFeedback.classList.remove('hidden');
            selectedOption.classList.add('correct');
            
            // Désactiver les options
            const options = document.querySelectorAll('.option');
            options.forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            // Cacher le bouton de validation et afficher le bouton suivant
            validateBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
        } else {
            // Mauvaise réponse - retour à la case départ
            incorrectFeedback.classList.remove('hidden');
            selectedOption.classList.add('incorrect');
            
            // Mettre en évidence la bonne réponse
            const options = document.querySelectorAll('.option');
            options.forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                }
                opt.style.pointerEvents = 'none';
            });
            
            // Cacher le bouton de validation
            validateBtn.classList.add('hidden');
            
            // Afficher un message de retour à la case départ
            setTimeout(() => {
                // Réinitialiser le quiz après 2 secondes
                currentQuestion = 0;
                score = 0;
                // Garder les points accumulés
                loadQuestion();
            }, 2000);
        }
    }

    // Passer à la question suivante
    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < totalQuestions) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    // Afficher les résultats
    function showResults() {
        // Cacher les éléments de question
        document.querySelector('.question-card').innerHTML = `
            <div class="results-container">
                <h2>Quiz terminé!</h2>
                <div class="score-container">
                    <div class="score-circle">
                        <span class="score-number">${score}</span>
                        <span class="score-total">/${totalQuestions}</span>
                    </div>
                </div>
                <p class="score-message">${getScoreMessage(score, totalQuestions)}</p>
                <button id="restart-btn" class="btn">Recommencer le quiz</button>
            </div>
        `;
        
        // Mettre à jour la barre de progression
        progressBar.style.width = '100%';
        
        // Ajouter l'écouteur d'événement pour recommencer
        document.getElementById('restart-btn').addEventListener('click', restartQuiz);
    }

    // Obtenir un message basé sur le score
    function getScoreMessage(score, total) {
        const percentage = (score / total) * 100;
        
        if (percentage === 100) {
            return "Parfait! Vous êtes un expert du système immunitaire!";
        } else if (percentage >= 80) {
            return "Excellent! Vous avez une très bonne connaissance du système immunitaire.";
        } else if (percentage >= 60) {
            return "Bien! Vous avez une bonne compréhension des bases du système immunitaire.";
        } else if (percentage >= 40) {
            return "Pas mal. Vous connaissez quelques concepts du système immunitaire.";
        } else {
            return "Continuez à apprendre! Le système immunitaire est complexe mais fascinant.";
        }
    }

    // Recommencer le quiz
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        points = 0; // Réinitialiser les points
        updatePointsDisplay();
        loadQuestion();
        
        // Recréer la structure de la carte de question
        document.querySelector('.question-card').innerHTML = `
            <div class="question-number">Question <span id="current-question">1</span><span class="total-questions">/${totalQuestions}</span></div>
            <div class="question-text">
                <h2></h2>
            </div>
            
            <div class="options-container"></div>
            
            <div class="feedback-container hidden">
                <div class="feedback correct hidden">
                    <i class="fas fa-check-circle"></i>
                    <p></p>
                </div>
                <div class="feedback incorrect hidden">
                    <i class="fas fa-times-circle"></i>
                    <p></p>
                </div>
            </div>
            
            <div class="action-buttons">
                <button id="hint-btn" class="btn hint-btn">Indice <span class="hint-cost">(5 pts)</span></button>
                <button id="validate-btn" class="btn">Valider ma réponse</button>
                <button id="next-btn" class="btn hidden">Question suivante</button>
            </div>
        `;
        
        // Réinitialiser les références aux éléments DOM
        questionNumberEl = document.getElementById('current-question');
        questionTextEl = document.querySelector('.question-text h2');
        optionsContainer = document.querySelector('.options-container');
        feedbackContainer = document.querySelector('.feedback-container');
        correctFeedback = document.querySelector('.feedback.correct');
        incorrectFeedback = document.querySelector('.feedback.incorrect');
        validateBtn = document.getElementById('validate-btn');
        nextBtn = document.getElementById('next-btn');
        hintBtn = document.getElementById('hint-btn');
        
        // Réinitialiser les écouteurs d'événements
        validateBtn.addEventListener('click', validateAnswer);
        nextBtn.addEventListener('click', nextQuestion);
        hintBtn.addEventListener('click', useHint);
        
        // Charger la première question
        loadQuestion();
    }

    // Créer les particules d'arrière-plan
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        const particleColors = ['#6c63ff', '#4caf50', '#ff5722', '#2196f3', '#9c27b0'];
        const particleShapes = ['circle', 'triangle', 'square'];
        
        // Créer 50 particules
        for (let i = 0; i < 200; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle'); 
            
            // Taille aléatoire entre 5 et 20px
            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Position aléatoire
            const posX = Math.random() * 100;
            const posY = Math.random() * 100 + 100; // Commencer en dessous de l'écran
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Couleur aléatoire
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            particle.style.backgroundColor = color;
            
            // Forme aléatoire
            const shape = particleShapes[Math.floor(Math.random() * particleShapes.length)];
            if (shape === 'triangle') {
                particle.style.borderRadius = '0';
                particle.style.width = '0';
                particle.style.height = '0';
                particle.style.borderLeft = `${size/2}px solid transparent`;
                particle.style.borderRight = `${size/2}px solid transparent`;
                particle.style.borderBottom = `${size}px solid ${color}`;
                particle.style.backgroundColor = 'transparent';
            } else if (shape === 'square') {
                particle.style.borderRadius = '2px';
            }
            
            // Animation aléatoire
            const duration = Math.random() * 20 + 10; // Entre 10 et 30 secondes
            const delay = Math.random() * 5; // Délai entre 0 et 5 secondes
            
            particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
            
            // Ajouter la particule au conteneur
            particlesContainer.appendChild(particle);
        }
    }

    // Démarrer le quiz
    initQuiz();
});

// Ajouter une classe d'animation de secousse
document.styleSheets[0].insertRule(`
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`, document.styleSheets[0].cssRules.length);

document.styleSheets[0].insertRule(`
    .shake {
        animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
`, document.styleSheets[0].cssRules.length);
