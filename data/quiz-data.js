// Données du quiz sur le système immunitaire
const quizData = [
  {
    question:
      "Quel type de cellule est responsable de la production d'anticorps dans le système immunitaire humain?",
    options: [
      { text: "Les macrophages", correct: false },
      { text: "Les lymphocytes B", correct: true },
      { text: "Les neutrophiles", correct: false },
      { text: "Les lymphocytes T cytotoxiques", correct: false },
    ],
    feedback: {
      correct:
        "Bravo! Les lymphocytes B sont effectivement responsables de la production d'anticorps.",
      incorrect:
        "Incorrect. Ce sont les lymphocytes B qui produisent les anticorps dans le système immunitaire.",
    },
  },
  {
    question:
      "Quelle est la principale fonction des anticorps dans le système immunitaire?",
    options: [
      {
        text: "Détruire directement les pathogènes par phagocytose",
        correct: false,
      },
      { text: "Activer les lymphocytes T", correct: false },
      {
        text: "Se lier aux antigènes pour les neutraliser ou faciliter leur élimination",
        correct: true,
      },
      { text: "Produire des cytokines inflammatoires", correct: false },
    ],
    feedback: {
      correct:
        "Excellent! Les anticorps se lient spécifiquement aux antigènes pour les neutraliser ou faciliter leur élimination par d'autres cellules immunitaires.",
      incorrect:
        "Incorrect. Les anticorps se lient spécifiquement aux antigènes pour les neutraliser ou faciliter leur élimination par d'autres cellules immunitaires.",
    },
  },
  {
    question:
      "Quel organe est considéré comme le site principal de maturation des lymphocytes T?",
    options: [
      { text: "La rate", correct: false },
      { text: "Le thymus", correct: true },
      { text: "La moelle osseuse", correct: false },
      { text: "Les ganglions lymphatiques", correct: false },
    ],
    feedback: {
      correct:
        "Correct! Le thymus est l'organe où les lymphocytes T immatures migrent pour se développer et apprendre à distinguer le soi du non-soi.",
      incorrect:
        "Incorrect. C'est le thymus qui est le site principal de maturation des lymphocytes T.",
    },
  },
  {
    question: "Qu'est-ce que la phagocytose?",
    options: [
      {
        text: "Un processus par lequel certaines cellules immunitaires englobent et digèrent des particules étrangères",
        correct: true,
      },
      {
        text: "La production d'anticorps par les lymphocytes B",
        correct: false,
      },
      {
        text: "La division des cellules souches hématopoïétiques",
        correct: false,
      },
      {
        text: "La migration des leucocytes vers les sites d'infection",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Bravo! La phagocytose est effectivement le processus par lequel certaines cellules immunitaires, comme les macrophages et les neutrophiles, englobent et digèrent des particules étrangères.",
      incorrect:
        "Incorrect. La phagocytose est le processus par lequel certaines cellules immunitaires englobent et digèrent des particules étrangères.",
    },
  },
  {
    question:
      "Quelle est la différence principale entre l'immunité innée et l'immunité adaptative?",
    options: [
      {
        text: "L'immunité innée est spécifique à certains pathogènes, tandis que l'immunité adaptative est non spécifique",
        correct: false,
      },
      {
        text: "L'immunité innée est présente dès la naissance, tandis que l'immunité adaptative se développe tout au long de la vie",
        correct: true,
      },
      {
        text: "L'immunité innée implique des anticorps, tandis que l'immunité adaptative n'en utilise pas",
        correct: false,
      },
      {
        text: "L'immunité innée est acquise par vaccination, tandis que l'immunité adaptative est héritée des parents",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Excellent! L'immunité innée est présente dès la naissance et constitue la première ligne de défense non spécifique, tandis que l'immunité adaptative se développe au cours de la vie en réponse à des expositions spécifiques à des pathogènes.",
      incorrect:
        "Incorrect. L'immunité innée est présente dès la naissance et constitue la première ligne de défense non spécifique, tandis que l'immunité adaptative se développe au cours de la vie en réponse à des expositions spécifiques à des pathogènes.",
    },
  },
];

// Exporter les données pour les utiliser dans d'autres fichiers
export default quizData;