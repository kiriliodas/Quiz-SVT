// Animations et effets visuels

// Fonction pour créer des particules
function createParticles() {
  const particlesContainer = document.querySelector('.particles-container');
  if (!particlesContainer) return;
  
  // Vider le conteneur de particules
  particlesContainer.innerHTML = '';
  
  // Créer des particules
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Positionner aléatoirement la particule
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const size = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    
    // Appliquer les styles
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Ajouter la particule au conteneur
    particlesContainer.appendChild(particle);
  }
}

// Fonction pour initialiser les animations
function initAnimations() {
  // Créer les particules
  createParticles();
  
  // Recréer les particules lors du redimensionnement de la fenêtre
  window.addEventListener('resize', createParticles);
}

export { initAnimations };