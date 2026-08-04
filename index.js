document.querySelectorAll('.speak-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const text = button.getAttribute('data-text');
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
});
if (!document.querySelector('.page-transition')) {
  const transitionOverlay = document.createElement('div');
  transitionOverlay.className = 'page-transition';
  transitionOverlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(transitionOverlay);
}


document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    const isExternal = /^https?:\/\//i.test(href);
    if (isExternal) {
      return;
    }

    event.preventDefault();
    document.body.classList.add('page-transitioning');
    setTimeout(() => {
      window.location.href = href;
    }, 320);
  });
});

const slides = Array.from(document.querySelectorAll('.gallery-slide'));
const dots = Array.from(document.querySelectorAll('.gallery-dot'));
const prevBtn = document.querySelector('.gallery-btn.prev');
const nextBtn = document.querySelector('.gallery-btn.next');

let currentSlide = 0;
let autoRotate;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });
}

function startAutoRotate() {
  clearInterval(autoRotate);
  autoRotate = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

prevBtn?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  startAutoRotate();
});

nextBtn?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  startAutoRotate();
});

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.getAttribute('data-index')) || 0);
    startAutoRotate();
  });
});

showSlide(0);
startAutoRotate();

